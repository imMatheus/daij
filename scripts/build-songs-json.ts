// build-songs-json.ts
// Builds a metadata manifest (data/songs.json) from rendered songs. Finds all
// .wav files across provider directories, extracts song names from code comments,
// reads WAV duration, and maps slugs back to prompt text.
//
// Usage: bun scripts/build-songs-json.ts

import { resolve, dirname, basename } from "path"
import { existsSync, readdirSync } from "fs"

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")
const PROMPTS_PATH = resolve(PROJECT_ROOT, "data/prompts.json")
const PUBLIC_DIR = resolve(PROJECT_ROOT, "web/public")
const OUTPUT_PATH = resolve(PROJECT_ROOT, "data/songs.json")
const PROVIDERS = ["claude", "chatgpt", "gemini"] as const

type PromptEntry = { slug: string; text: string; category: string }

type SongEntry = {
  name: string
  provider: string
  audioUrl: string
  duration: number
  prompt: string | null
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

async function getWavDuration(path: string): Promise<number> {
  const file = Bun.file(path)
  const headerBuf = await file.slice(0, 44).arrayBuffer()
  const view = new DataView(headerBuf)

  const sampleRate = view.getUint32(24, true)
  const numChannels = view.getUint16(22, true)
  const bitsPerSample = view.getUint16(34, true)
  const dataSize = view.getUint32(40, true)

  return Math.round(dataSize / (sampleRate * numChannels * (bitsPerSample / 8)))
}

async function main() {
  const promptEntries: PromptEntry[] = JSON.parse(
    await Bun.file(PROMPTS_PATH).text(),
  )
  const promptMap = new Map(promptEntries.map((p) => [p.slug, p.text]))
  console.log(`Loaded ${promptEntries.length} prompts`)

  // Find slugs that have a .wav in both providers
  const slugsByProvider = PROVIDERS.map((provider) => {
    const provDir = resolve(PUBLIC_DIR, provider)
    if (!existsSync(provDir)) return new Set<string>()
    return new Set(
      readdirSync(provDir)
        .filter((f) => f.endsWith(".wav"))
        .map((f) => basename(f, ".wav")),
    )
  })
  const commonSlugs = [...slugsByProvider[0]].filter((s) => slugsByProvider.every((set) => set.has(s))).sort()
  console.log(`Found ${commonSlugs.length} songs present in all ${PROVIDERS.length} providers`)

  const songs: SongEntry[] = []

  for (const provider of PROVIDERS) {
    const provDir = resolve(PUBLIC_DIR, provider)

    for (const slug of commonSlugs) {
      const txtPath = resolve(provDir, `${slug}.txt`)
      const wavPath = resolve(provDir, `${slug}.wav`)
      const audioUrl = `/${provider}/${slug}.wav`

      let duration = 150
      try {
        duration = await getWavDuration(wavPath)
      } catch {
        console.warn(`  Could not read WAV header for ${provider}/${slug}.wav, using default duration`)
      }

      const prompt = promptMap.get(slug) ?? null

      let name = titleCase(slug)
      if (existsSync(txtPath)) {
        const code = await Bun.file(txtPath).text()
        const nameMatch = code.match(/\/\/.*?"(.+?)"/)
        if (nameMatch) name = nameMatch[1]
      }

      songs.push({
        name,
        provider,
        audioUrl,
        duration,
        prompt,
      })
    }
  }

  await Bun.write(OUTPUT_PATH, JSON.stringify(songs, null, 2))
  console.log(`\nWrote ${songs.length} songs to ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
