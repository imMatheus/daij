// renderer.ts
// Core rendering engine. Opens strudel.cc in a headless browser via Puppeteer,
// injects Strudel code through the CodeMirror API, captures audio output by
// monkey-patching AudioNode, and encodes the result as a 48kHz stereo WAV file.
// Also exports estimateDuration() to guess song length from code comments/BPM.

import puppeteer, { type Page } from "puppeteer"
import { writeFileSync, unlinkSync } from "fs"
import { spawnSync } from "child_process"

const SAMPLE_RATE = 48000

// ── Monkey-patch (injected into browser before any scripts) ────────────
const MONKEY_PATCH = `(function() {
  window.__capturedLeft = [];
  window.__capturedRight = [];
  window.__isCapturing = false;
  window.__captureStats = { connects: 0, destConnects: 0, chunks: 0 };

  if (typeof AudioNode === 'undefined') return;

  var origConnect = AudioNode.prototype.connect;
  var setupDone = new WeakSet();

  AudioNode.prototype.connect = function() {
    var dest = arguments[0];
    window.__captureStats.connects++;

    var isDest = false;
    try { isDest = dest instanceof AudioDestinationNode; } catch(e) {}
    if (!isDest) {
      try { isDest = dest && dest.constructor && dest.constructor.name === 'AudioDestinationNode'; } catch(e) {}
    }

    if (isDest) {
      window.__captureStats.destConnects++;
      var ctx = this.context;

      if (!setupDone.has(ctx)) {
        setupDone.add(ctx);
        var gain = ctx.createGain();
        var proc = ctx.createScriptProcessor(4096, 2, 2);
        proc.onaudioprocess = function(e) {
          if (window.__isCapturing) {
            window.__captureStats.chunks++;
            window.__capturedLeft.push(new Float32Array(e.inputBuffer.getChannelData(0)));
            window.__capturedRight.push(new Float32Array(e.inputBuffer.getChannelData(1)));
          }
        };
        origConnect.call(gain, proc);
        origConnect.call(proc, dest);
        ctx.__captureGain = gain;
      }
      return origConnect.call(this, ctx.__captureGain);
    }
    return origConnect.apply(this, arguments);
  };
})();`

// ── WAV encoder (runs inside the browser) ──────────────────────────────
const WAV_ENCODER = `(function() {
  var left = window.__capturedLeft;
  var right = window.__capturedRight;
  var sampleRate = ${SAMPLE_RATE};

  var totalSamples = 0;
  for (var i = 0; i < left.length; i++) totalSamples += left[i].length;
  if (totalSamples === 0) return null;

  var numChannels = 2;
  var dataSize = totalSamples * numChannels * 2;
  var buf = new ArrayBuffer(44 + dataSize);
  var dv = new DataView(buf);

  function w(o, s) { for (var i = 0; i < s.length; i++) dv.setUint8(o+i, s.charCodeAt(i)); }

  w(0,'RIFF'); dv.setUint32(4, 36+dataSize, true);
  w(8,'WAVE'); w(12,'fmt ');
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true);
  dv.setUint16(22, numChannels, true);
  dv.setUint32(24, sampleRate, true);
  dv.setUint32(28, sampleRate * numChannels * 2, true);
  dv.setUint16(32, numChannels * 2, true);
  dv.setUint16(34, 16, true);
  w(36,'data'); dv.setUint32(40, dataSize, true);

  var pos = 44;
  for (var c = 0; c < left.length; c++) {
    var lc = left[c], rc = right[c];
    for (var s = 0; s < lc.length; s++) {
      dv.setInt16(pos, Math.round(Math.max(-1,Math.min(1,lc[s]))*32767), true); pos+=2;
      dv.setInt16(pos, Math.round(Math.max(-1,Math.min(1,rc[s]))*32767), true); pos+=2;
    }
  }

  var bytes = new Uint8Array(buf);
  var parts = [];
  var CHUNK = 8192;
  for (var i = 0; i < bytes.length; i += CHUNK) {
    parts.push(String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i+CHUNK, bytes.length))));
  }
  return { base64: btoa(parts.join('')), samples: totalSamples, sampleRate: sampleRate };
})()`

// ── Code insertion via CodeMirror 6 API ────────────────────────────────
async function insertCode(page: Page, code: string): Promise<boolean> {
  const result = await page.evaluate((c: string) => {
    const content = document.querySelector(".cm-content") as any
    const view = content?.cmView?.view
    if (view && view.dispatch) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: c },
      })
      return true
    }
    return false
  }, code)
  return result
}

// ── Main render function ───────────────────────────────────────────────

export async function renderSong(
  strudelCode: string,
  outputPath: string,
  duration: number,
): Promise<void> {
  console.log(`Rendering (${duration}s at ${SAMPLE_RATE}Hz) -> ${outputPath}`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"],
  })

  try {
    const page = await browser.newPage()

    page.on("pageerror", (err: Error) =>
      console.log(`  [page error] ${err.message}`),
    )

    await page.evaluateOnNewDocument(MONKEY_PATCH)

    console.log("  Opening strudel.cc...")
    await page.goto("https://strudel.cc/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    })

    console.log("  Waiting for editor...")
    await page.waitForSelector(".cm-editor", { timeout: 15000 })
    await new Promise((r) => setTimeout(r, 2000))

    console.log("  Inserting code...")
    if (!(await insertCode(page, strudelCode))) {
      throw new Error("Failed to insert code. CodeMirror view not found.")
    }

    console.log("  Starting playback...")
    const playBtn = await page.evaluateHandle(() => {
      const buttons = document.querySelectorAll("button")
      for (const btn of buttons) {
        if (btn.textContent?.trim().toLowerCase() === "play") return btn
      }
      return null
    })
    const playEl = playBtn.asElement()
    if (!playEl) {
      throw new Error("Play button not found.")
    }
    await playEl.click()

    console.log("  Waiting for audio to start...")
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 1000))
      const stats = await page.evaluate(
        () => (window as any).__captureStats as { connects: number },
      )
      if (stats.connects > 10) {
        console.log(
          `  Audio active (${stats.connects} connects), waiting for samples...`,
        )
        await new Promise((r) => setTimeout(r, 3000))
        break
      }
    }

    await page.evaluate(() => {
      ; (window as any).__isCapturing = true
    })
    console.log("  Recording started")

    const totalWait = (duration + 5) * 1000
    const start = Date.now()

    while (Date.now() - start < totalWait) {
      await new Promise((r) => setTimeout(r, 3000))
      const elapsed = Math.floor((Date.now() - start) / 1000)
      const stats = await page.evaluate(
        () =>
          (window as any).__captureStats as {
            connects: number
            destConnects: number
            chunks: number
          },
      )
      process.stdout.write(
        `\r  ${elapsed}s | chunks=${stats.chunks} connects=${stats.connects}  `,
      )
    }

    await page.evaluate(() => {
      ; (window as any).__isCapturing = false
    })
    await page.keyboard.down("Control")
    await page.keyboard.press(".")
    await page.keyboard.up("Control")

    const finalStats = await page.evaluate(
      () => (window as any).__captureStats,
    )
    console.log(`\n  Capture stats: ${JSON.stringify(finalStats)}`)

    console.log("  Encoding WAV...")
    const result = await page.evaluate(WAV_ENCODER)

    if (!result) {
      throw new Error("No audio was captured. Playback may have failed.")
    }

    const { base64, samples, sampleRate } = result as {
      base64: string
      samples: number
      sampleRate: number
    }
    console.log(
      `  Captured ${samples} samples (${(samples / sampleRate).toFixed(1)}s)`,
    )

    const wavBuffer = Buffer.from(base64, "base64")

    if (outputPath.endsWith(".mp3")) {
      const tempWav = outputPath.replace(/\.mp3$/, ".tmp.wav")
      writeFileSync(tempWav, wavBuffer)
      console.log(`  Converting to MP3...`)
      const result = spawnSync("ffmpeg", ["-y", "-v", "error", "-i", tempWav, "-b:a", "192k", outputPath])
      unlinkSync(tempWav)
      if (result.status !== 0) {
        throw new Error(`ffmpeg conversion failed: ${result.stderr?.toString()}`)
      }
    } else {
      writeFileSync(outputPath, wavBuffer)
    }

    const stat = Bun.file(outputPath).size
    console.log(`  Done! Size: ${(stat / 1024 / 1024).toFixed(1)} MB`)
  } finally {
    await browser.close()
  }
}

// ── Duration estimation from Strudel code ──────────────────────────────

export function estimateDuration(code: string): number {
  // Try to parse duration comment like "≈ 2:42" or "~ 2:42"
  const durationMatch = code.match(/[≈~]\s*(\d+):(\d+)/)
  if (durationMatch) {
    return parseInt(durationMatch[1]) * 60 + parseInt(durationMatch[2])
  }

  // Try to parse BPM and bar counts from arrange()
  const cpmMatch = code.match(/setcpm\((\d+)\s*\/\s*4\)/)
  if (cpmMatch) {
    const bpm = parseInt(cpmMatch[1])
    const cpm = bpm / 4
    // Find bar counts in arrange() calls
    const arrangeMatches = [...code.matchAll(/\[(\d+),\s/g)]
    if (arrangeMatches.length > 0) {
      // Group consecutive bar counts (they belong to the same arrange call)
      // Take the max total from any single arrange block
      const barCounts = arrangeMatches.map((m) => parseInt(m[1]))
      // Sum all bars (assuming they're from one arrange)
      const totalBars = barCounts.reduce((a, b) => a + b, 0)
      // Divide by number of $: patterns (each arrange has its own set of bars)
      const patternCount = (code.match(/\$:/g) || []).length
      const barsPerPattern = patternCount > 0 ? totalBars / patternCount : totalBars
      const durationSec = (barsPerPattern / cpm) * 60
      if (durationSec > 30 && durationSec < 600) {
        return Math.max(Math.ceil(durationSec), 70)
      }
    }
  }

  return 70 // default 2.5 minutes
}
