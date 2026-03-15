// batch-render.ts
// Finds all Strudel .txt files that don't have a corresponding .wav and renders
// them to audio using Puppeteer + strudel.cc. Processes in parallel batches.
//
// Usage: bun scripts/batch-render.ts [--provider claude|chatgpt|gemini] [--concurrency 3]

import { existsSync, readdirSync } from "fs"
import { readFileSync } from "fs"
import { resolve, dirname, basename } from "path"
import { renderSong, estimateDuration } from "./lib/renderer"

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")
const PUBLIC_DIR = resolve(PROJECT_ROOT, "web/public")
const PROVIDERS = ["claude", "chatgpt", "gemini"]
const DEFAULT_CONCURRENCY = 3

function parseArgs() {
  const args = process.argv.slice(2)
  const ci = args.indexOf("--concurrency")
  const concurrency = ci !== -1 ? parseInt(args[ci + 1], 10) : DEFAULT_CONCURRENCY

  const pi = args.indexOf("--provider")
  const provider = pi !== -1 ? args[pi + 1] : undefined

  if (provider && !PROVIDERS.includes(provider)) {
    console.error(`--provider must be one of: ${PROVIDERS.join(", ")}`)
    process.exit(1)
  }

  return { concurrency, provider }
}

async function main() {
  const { concurrency, provider } = parseArgs()
  const toRender: { provider: string; slug: string; txtPath: string; wavPath: string }[] = []
  const providers = provider ? [provider] : PROVIDERS

  for (const provider of providers) {
    const provDir = resolve(PUBLIC_DIR, provider)
    if (!existsSync(provDir)) continue

    const files = readdirSync(provDir).filter((f) => f.endsWith(".txt"))
    for (const file of files) {
      const slug = basename(file, ".txt")
      const txtPath = resolve(provDir, file)
      const wavPath = resolve(provDir, `${slug}.wav`)

      if (!existsSync(wavPath)) {
        toRender.push({ provider, slug, txtPath, wavPath })
      }
    }
  }

  if (toRender.length === 0) {
    console.log("All songs already rendered. Nothing to do.")
    return
  }

  console.log(`Found ${toRender.length} songs to render (concurrency: ${concurrency}):\n`)
  for (const song of toRender) {
    console.log(`  ${song.provider}/${song.slug}`)
  }
  console.log()

  let completed = 0
  let failed = 0

  // Process in chunks of `concurrency`
  for (let i = 0; i < toRender.length; i += concurrency) {
    const batch = toRender.slice(i, i + concurrency)

    const results = await Promise.allSettled(
      batch.map(async (song) => {
        const label = `${song.provider}/${song.slug}`
        console.log(`[start] ${label} (${completed + 1}-${Math.min(completed + batch.length, toRender.length)}/${toRender.length})`)

        const code = readFileSync(song.txtPath, "utf-8")
        const duration = estimateDuration(code)
        await renderSong(code, song.wavPath, duration)
        return label
      }),
    )

    for (const result of results) {
      if (result.status === "fulfilled") {
        completed++
        console.log(`[done] ${result.value} (${completed}/${toRender.length})`)
      } else {
        failed++
        completed++
        console.error(`[FAILED] ${result.reason}`)
      }
    }
  }

  console.log(`\nBatch rendering complete. ${completed - failed} succeeded, ${failed} failed.`)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
