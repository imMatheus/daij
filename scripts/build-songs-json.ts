// build-songs-json.ts
// Builds a metadata manifest (data/songs.json) from rendered songs. Finds all
// .mp3 files across provider directories, extracts song names from code comments,
// reads MP3 duration via ffprobe, and maps slugs back to prompt text.
//
// Usage: bun scripts/build-songs-json.ts

import { resolve, dirname, basename } from "path"
import { existsSync, readdirSync } from "fs"

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")
const PROMPTS_PATH = resolve(PROJECT_ROOT, "data/prompts.json")
const PUBLIC_DIR = resolve(PROJECT_ROOT, "data")
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

async function getAudioDuration(path: string): Promise<number> {
  const result = Bun.spawnSync(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path])
  const duration = parseFloat(result.stdout.toString().trim())
  if (isNaN(duration)) throw new Error(`Could not read duration for ${path}`)
  return Math.round(duration)
}

async function main() {
  const promptEntries: PromptEntry[] = JSON.parse(
    await Bun.file(PROMPTS_PATH).text(),
  )
  const promptMap = new Map(promptEntries.map((p) => [p.slug, p.text]))
  console.log(`Loaded ${promptEntries.length} prompts`)

  // Find slugs that have a .mp3 in both providers
  const slugsByProvider = PROVIDERS.map((provider) => {
    const provDir = resolve(PUBLIC_DIR, provider)
    if (!existsSync(provDir)) return new Set<string>()
    return new Set(
      readdirSync(provDir)
        .filter((f) => f.endsWith(".mp3"))
        .map((f) => basename(f, ".mp3")),
    )
  })
  const commonSlugs = [...slugsByProvider[0]].filter((s) => slugsByProvider.every((set) => set.has(s))).sort()
  console.log(`Found ${commonSlugs.length} songs present in all ${PROVIDERS.length} providers`)

  const songs: SongEntry[] = []

  for (const provider of PROVIDERS) {
    const provDir = resolve(PUBLIC_DIR, provider)

    for (const slug of commonSlugs) {
      const txtPath = resolve(provDir, `${slug}.txt`)
      const mp3Path = resolve(provDir, `${slug}.mp3`)
      const audioUrl = `/${provider}/${slug}.mp3`

      let duration = 150
      try {
        duration = await getAudioDuration(mp3Path)
      } catch {
        console.warn(`  Could not read duration for ${provider}/${slug}.mp3, using default duration`)
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
