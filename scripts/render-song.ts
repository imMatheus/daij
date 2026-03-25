// render-song.ts
// Renders a single Strudel .txt file to .mp3 audio using Puppeteer + strudel.cc.
// Useful for re-rendering individual songs or testing.
//
// Usage: bun scripts/render-song.ts <song-name> [--provider claude|chatgpt|gemini] [--duration <seconds>]

import { readFileSync, existsSync } from "fs"
import { resolve, dirname } from "path"
import { renderSong, estimateDuration } from "./lib/renderer"

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")

function parseArgs() {
  const args = process.argv.slice(2)
  const songName = args.find((a) => !a.startsWith("--"))

  const pi = args.indexOf("--provider")
  const provider = pi !== -1 ? args[pi + 1] : "claude"

  const di = args.indexOf("--duration")
  const explicitDuration = di !== -1 ? parseInt(args[di + 1], 10) : NaN

  if (!songName) {
    console.error(
      "Usage: bun scripts/render-song.ts <song-name> [--provider claude|chatgpt|gemini] [--duration <seconds>]",
    )
    process.exit(1)
  }
  return { songName, provider, explicitDuration }
}

async function main() {
  const { songName, provider, explicitDuration } = parseArgs()

  const inputPath = resolve(
    PROJECT_ROOT,
    "data",
    provider,
    `${songName}.txt`,
  )
  const outputPath = resolve(
    PROJECT_ROOT,
    "data",
    provider,
    `${songName}.mp3`,
  )

  if (!existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`)
    process.exit(1)
  }

  const strudelCode = readFileSync(inputPath, "utf-8")
  const duration = isNaN(explicitDuration)
    ? estimateDuration(strudelCode)
    : explicitDuration

  console.log(`Rendering "${songName}" from ${provider}`)
  await renderSong(strudelCode, outputPath, duration)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
