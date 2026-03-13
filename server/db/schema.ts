import { pgTable, serial, text, integer, real, timestamp } from 'drizzle-orm/pg-core'

export const songs = pgTable('songs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  provider: text('provider').notNull(),
  audioUrl: text('audio_url').notNull(),
  duration: integer('duration').notNull(),
  eloRating: real('elo_rating').notNull().default(1200),
  totalVotes: integer('total_votes').notNull().default(0),
  wins: integer('wins').notNull().default(0),
  prompt: text('prompt'),
})

export const votes = pgTable('votes', {
  id: serial('id').primaryKey(),
  songAId: integer('song_a_id')
    .notNull()
    .references(() => songs.id),
  songBId: integer('song_b_id')
    .notNull()
    .references(() => songs.id),
  outcome: text('outcome').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
