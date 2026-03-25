CREATE TABLE "listens" (
	"id" serial PRIMARY KEY NOT NULL,
	"song_id" integer NOT NULL,
	"ip" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "songs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"provider" text NOT NULL,
	"audio_url" text NOT NULL,
	"duration" integer NOT NULL,
	"elo_rating" real DEFAULT 1200 NOT NULL,
	"total_votes" integer DEFAULT 0 NOT NULL,
	"wins" integer DEFAULT 0 NOT NULL,
	"prompt" text,
	"listens" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vote_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"song_a_id" integer NOT NULL,
	"song_b_id" integer NOT NULL,
	"ip" text NOT NULL,
	"outcome" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"voted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "listens" ADD CONSTRAINT "listens_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote_sessions" ADD CONSTRAINT "vote_sessions_song_a_id_songs_id_fk" FOREIGN KEY ("song_a_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote_sessions" ADD CONSTRAINT "vote_sessions_song_b_id_songs_id_fk" FOREIGN KEY ("song_b_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "listens_rate_limit_idx" ON "listens" USING btree ("song_id","ip","created_at");