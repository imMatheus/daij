import { resolve, dirname } from 'path'
import { db } from './index'
import { songs as songsTable, votes, listens } from './schema'

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), '../../..')
const SONGS_PATH = resolve(PROJECT_ROOT, 'data/songs.json')

async function seed() {
  const songData = JSON.parse(await Bun.file(SONGS_PATH).text())

  console.log('Clearing listens...')
  await db.delete(listens)
  console.log('Clearing votes...')
  await db.delete(votes)
  console.log('Clearing songs...')
  await db.delete(songsTable)
  console.log('Inserting songs...')
  await db.insert(songsTable).values(
    songData.map((s: any) => ({
      name: s.name,
      provider: s.provider,
      audioUrl: s.audioUrl,
      duration: s.duration,
      prompt: s.prompt,
    })),
  )
  console.log(`Seeded ${songData.length} songs.`)
  process.exit(0)
}

seed()
