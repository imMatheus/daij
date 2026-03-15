// import-songs.ts
// Imports song metadata into the database (Drizzle ORM). Scans provider
// directories for .wav files, extracts duration and song name, and inserts
// new entries. Skips songs that already exist in the database.
//
// Usage: bun scripts/import-songs.ts

import { resolve, dirname, basename } from "path"
import { existsSync, readdirSync } from "fs"
import { eq, and } from "drizzle-orm"
import { db } from "../server/db"
import { songs } from "../server/db/schema"

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")
const PROMPTS_PATH = resolve(PROJECT_ROOT, "data/prompts.json")
const PUBLIC_DIR = resolve(PROJECT_ROOT, "web/public")
const PROVIDERS = ["claude", "chatgpt", "gemini"]

type PromptEntry = { slug: string; text: string; category: string }

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
  // Load prompts for slug -> text mapping
  const promptEntries: PromptEntry[] = JSON.parse(
    await Bun.file(PROMPTS_PATH).text(),
  )
  const promptMap = new Map(promptEntries.map((p) => [p.slug, p.text]))
  console.log(`Loaded ${promptEntries.length} prompts`)

  let songsInserted = 0
  let songsSkipped = 0

  for (const provider of PROVIDERS) {
    const provDir = resolve(PUBLIC_DIR, provider)
    if (!existsSync(provDir)) continue

    const wavFiles = readdirSync(provDir).filter((f) => f.endsWith(".wav"))

    for (const wavFile of wavFiles) {
      const slug = basename(wavFile, ".wav")
      const txtPath = resolve(provDir, `${slug}.txt`)
      const wavPath = resolve(provDir, wavFile)
      const audioUrl = `/${provider}/${wavFile}`

      // Check if song already exists
      const [existing] = await db
        .select()
        .from(songs)
        .where(and(eq(songs.audioUrl, audioUrl), eq(songs.provider, provider)))

      if (existing) {
        songsSkipped++
        continue
      }

      // Get duration from WAV header
      let duration = 150
      try {
        duration = await getWavDuration(wavPath)
      } catch {
        console.warn(`  Could not read WAV header for ${wavFile}, using default duration`)
      }

      // Match slug to prompt text
      const prompt = promptMap.get(slug) ?? null

      // Get song name from .txt comment or title-case the slug
      let name = titleCase(slug)
      if (existsSync(txtPath)) {
        const code = await Bun.file(txtPath).text()
        const nameMatch = code.match(/\/\/.*?"(.+?)"/)
        if (nameMatch) name = nameMatch[1]
      }

      await db.insert(songs).values({
        name,
        theme: prompt ?? slug,
        provider,
        audioUrl,
        duration,
        prompt,
      })
      songsInserted++
      console.log(`  + ${provider}/${slug} (${duration}s${prompt ? ", prompt: " + prompt : ""})`)
    }
  }

  console.log(
    `\nDone. Inserted ${songsInserted} songs, skipped ${songsSkipped} existing.`,
  )
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
