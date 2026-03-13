import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { db } from './db'
import { songs, votes } from './db/schema'
import { eq, ne, sql, desc, isNotNull, sum, count, avg } from 'drizzle-orm'

const app = new Hono()

app.use('*', cors())

app.get('/songs', async (c) => {
  const allSongs = await db.select().from(songs)
  return c.json(allSongs)
})

app.get('/arena/pair', async (c) => {
  // Try to find a prompt with songs from 2+ providers
  const [matched] = await db
    .select({ prompt: songs.prompt })
    .from(songs)
    .where(isNotNull(songs.prompt))
    .groupBy(songs.prompt)
    .having(sql`COUNT(DISTINCT ${songs.provider}) >= 2`)
    .orderBy(sql`RANDOM()`)
    .limit(1)

  if (matched?.prompt) {
    const songsForPrompt = await db
      .select()
      .from(songs)
      .where(eq(songs.prompt, matched.prompt))

    // Group by provider, pick one from each
    const byProvider = new Map<string, (typeof songsForPrompt)>()
    for (const s of songsForPrompt) {
      if (!byProvider.has(s.provider)) byProvider.set(s.provider, [])
      byProvider.get(s.provider)!.push(s)
    }

    const providers = [...byProvider.keys()]
    const listA = byProvider.get(providers[0])!
    const listB = byProvider.get(providers[1])!
    const songA = listA[Math.floor(Math.random() * listA.length)]
    const songB = listB[Math.floor(Math.random() * listB.length)]

    const pair = Math.random() > 0.5 ? [songA, songB] : [songB, songA]
    return c.json({ songs: pair, prompt: matched.prompt })
  }

  // Fallback: pick random songs from different providers
  const [songA] = await db.select().from(songs).orderBy(sql`RANDOM()`).limit(1)
  if (!songA) return c.json({ error: 'No songs' }, 404)

  const [songB] = await db
    .select()
    .from(songs)
    .where(ne(songs.provider, songA.provider))
    .orderBy(sql`RANDOM()`)
    .limit(1)
  if (!songB) return c.json({ error: 'Need songs from 2+ providers' }, 404)

  const pair = Math.random() > 0.5 ? [songA, songB] : [songB, songA]
  return c.json({ songs: pair, prompt: null })
})

app.post('/arena/vote', async (c) => {
  const { songAId, songBId, outcome } = await c.req.json<{
    songAId: number
    songBId: number
    outcome: 'left_wins' | 'right_wins' | 'tie' | 'both_bad'
  }>()

  const K = 4
  const actualA = outcome === 'left_wins' ? 1 : outcome === 'right_wins' ? 0 : 0.5
  const actualB = outcome === 'right_wins' ? 1 : outcome === 'left_wins' ? 0 : 0.5

  // Subquery to get the other song's rating for atomic ELO computation
  const ratingB = db.select({ r: songs.eloRating }).from(songs).where(eq(songs.id, songBId))
  const ratingA = db.select({ r: songs.eloRating }).from(songs).where(eq(songs.id, songAId))

  await db
    .update(songs)
    .set({
      eloRating: sql`${songs.eloRating} + ${K} * (${actualA} - 1.0 / (1.0 + POWER(10, ((${ratingB}) - ${songs.eloRating}) / 400.0)))`,
      totalVotes: sql`${songs.totalVotes} + 1`,
      wins: outcome === 'left_wins' ? sql`${songs.wins} + 1` : songs.wins,
    })
    .where(eq(songs.id, songAId))

  await db
    .update(songs)
    .set({
      eloRating: sql`${songs.eloRating} + ${K} * (${actualB} - 1.0 / (1.0 + POWER(10, ((${ratingA}) - ${songs.eloRating}) / 400.0)))`,
      totalVotes: sql`${songs.totalVotes} + 1`,
      wins: outcome === 'right_wins' ? sql`${songs.wins} + 1` : songs.wins,
    })
    .where(eq(songs.id, songBId))

  await db.insert(votes).values({ songAId, songBId, outcome })

  return c.json({ ok: true })
})

app.get('/leaderboard/songs', async (c) => {
  const result = await db.select().from(songs).orderBy(desc(songs.eloRating))
  return c.json(result)
})

app.get('/leaderboard/models', async (c) => {
  const result = await db
    .select({
      provider: songs.provider,
      avgElo: avg(songs.eloRating).mapWith(Number),
      songCount: count().mapWith(Number),
      wins: sum(songs.wins).mapWith(Number),
      totalVotes: sum(songs.totalVotes).mapWith(Number),
    })
    .from(songs)
    .groupBy(songs.provider)
    .orderBy(desc(avg(songs.eloRating)))
  return c.json(result)
})

export default {
  port: 3001,
  fetch: app.fetch,
}
