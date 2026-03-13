import { resolve, dirname } from "path"

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")
const OUTPUT_PATH = resolve(PROJECT_ROOT, "data/prompts.json")

type Prompt = {
  slug: string
  text: string
  category: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/-$/, "")
}

const prompts: Prompt[] = [
  // ── Mood (20) ──────────────────────────────────────────────────────────
  { text: "a melancholic song", category: "mood" },
  { text: "an uplifting energetic track", category: "mood" },
  { text: "a peaceful ambient piece", category: "mood" },
  { text: "an anxious and tense composition", category: "mood" },
  { text: "a dreamy and ethereal song", category: "mood" },
  { text: "a nostalgic track that feels like old memories", category: "mood" },
  { text: "an aggressive and intense beat", category: "mood" },
  { text: "a playful and whimsical tune", category: "mood" },
  { text: "a mysterious and dark atmosphere", category: "mood" },
  { text: "a warm and cozy song for a rainy day", category: "mood" },
  { text: "a triumphant and victorious anthem", category: "mood" },
  { text: "a lonely and isolated soundscape", category: "mood" },
  { text: "a romantic and tender melody", category: "mood" },
  { text: "a chaotic and unpredictable piece", category: "mood" },
  { text: "a serene and meditative track", category: "mood" },
  { text: "a bittersweet song about endings", category: "mood" },
  { text: "a euphoric and ecstatic dance track", category: "mood" },
  { text: "a somber funeral march", category: "mood" },
  { text: "a carefree summer vibe", category: "mood" },
  { text: "a suspenseful and eerie track", category: "mood" },

  // // ── Genre (20) ─────────────────────────────────────────────────────────
  { text: "a lo-fi hip hop beat", category: "genre" },
  { text: "a jazz ballad with walking bass", category: "genre" },
  { text: "an 8-bit chiptune adventure theme", category: "genre" },
  { text: "a bossa nova track", category: "genre" },
  { text: "a drum and bass roller", category: "genre" },
  { text: "a classical waltz in three-four time", category: "genre" },
  { text: "a reggae dub track with heavy delay", category: "genre" },
  { text: "a funk groove with slap bass", category: "genre" },
  { text: "a deep house track with a four on the floor kick", category: "genre" },
  { text: "a blues shuffle with gritty guitar", category: "genre" },
  { text: "a minimal techno loop", category: "genre" },
  { text: "a trap beat with heavy 808s", category: "genre" },
  { text: "a country folk song with acoustic guitar", category: "genre" },
  { text: "an ambient drone piece", category: "genre" },
  { text: "a disco track with groovy bassline", category: "genre" },
  { text: "a breakbeat with chopped samples", category: "genre" },
  { text: "a synthwave retro track", category: "genre" },
  { text: "a garage rock song", category: "genre" },
  { text: "a downtempo trip hop beat", category: "genre" },
  { text: "a latin salsa rhythm", category: "genre" },

  // ── Artist-style (20) ──────────────────────────────────────────────────
  { text: "a song in the style of Billie Eilish with dark, layered vocals", category: "artist-style" },
  { text: "a song in the style of Kendrick Lamar with intricate storytelling", category: "artist-style" },
  { text: "a song in the style of Tyler, The Creator with quirky production", category: "artist-style" },
  { text: "a song in the style of FKA twigs with experimental art pop elements", category: "artist-style" },
  { text: "a song in the style of SZA with soulful alt-R&B vibes", category: "artist-style" },
  { text: "a song in the style of Rosalía blending flamenco and modern beats", category: "artist-style" },
  { text: "a song in the style of Fred again.. with emotive sample-based dance music", category: "artist-style" },
  { text: "a song in the style of Drake with introspective rap and melodic hooks", category: "artist-style" },
  { text: "a song in the style of Arca with glitchy avant-garde electronics", category: "artist-style" },
  { text: "a song in the style of James Blake with sparse, emotional production", category: "artist-style" },
  { text: "a song in the style of Doja Cat blending pop, hip hop, and retro sounds", category: "artist-style" },
  { text: "a song in the style of Rina Sawayama with genre-blending pop maximalism", category: "artist-style" },
  { text: "a song in the style of JID with rapid-fire, clever lyricism", category: "artist-style" },
  { text: "a song in the style of Caroline Polachek with ethereal art-pop vocals", category: "artist-style" },
  { text: "a song in the style of BADBADNOTGOOD merging jazz and hip-hop", category: "artist-style" },
  { text: "a song in the style of Tash Sultana with layered live looping", category: "artist-style" },
  { text: "a song in the style of Justin Bieber", category: "artist-style" },
  { text: "a song in the style of Yves Tumor with psychedelic experimental rock", category: "artist-style" },
  { text: "a song in the style of Joey Bada$$ with classic boom bap influences", category: "artist-style" },
  { text: "a song in the style of ODESZA with widescreen electronic beats", category: "artist-style" },

  // ── Scenario (20) ─────────────────────────────────────────────────────
  { text: "music for a sunrise on the beach", category: "scenario" },
  { text: "soundtrack for a car chase scene", category: "scenario" },
  { text: "background music for studying late at night", category: "scenario" },
  { text: "music for walking through a forest", category: "scenario" },
  { text: "soundtrack for a space exploration scene", category: "scenario" },
  { text: "music for a rainy window coffee shop", category: "scenario" },
  { text: "soundtrack for an underwater adventure", category: "scenario" },
  { text: "music for a midnight train ride", category: "scenario" },
  { text: "soundtrack for a robot coming to life", category: "scenario" },
  { text: "music for a street market in a foreign city", category: "scenario" },
  { text: "soundtrack for watching the northern lights", category: "scenario" },
  { text: "music for a skateboard montage", category: "scenario" },
  { text: "soundtrack for a heist movie", category: "scenario" },
  { text: "music for floating in zero gravity", category: "scenario" },
  { text: "soundtrack for a retro arcade", category: "scenario" },
  { text: "music for cooking dinner alone", category: "scenario" },
  { text: "soundtrack for a snowfall in the city", category: "scenario" },
  { text: "music for a sunset rooftop party", category: "scenario" },
  { text: "soundtrack for an old silent film", category: "scenario" },
  { text: "music for waking up on a lazy sunday", category: "scenario" },

  // ── Concept (20) ───────────────────────────────────────────────────────
  { text: "a song that gradually speeds up over time", category: "concept" },
  { text: "a conversation between piano and drums", category: "concept" },
  { text: "minimalist repetition with subtle variations", category: "concept" },
  { text: "a song built entirely from vocal samples", category: "concept" },
  { text: "polyrhythmic patterns in five against four", category: "concept" },
  { text: "a song that deconstructs itself halfway through", category: "concept" },
  { text: "layers that enter one by one until full orchestra", category: "concept" },
  { text: "a song using only percussion instruments", category: "concept" },
  { text: "call and response between two melodic voices", category: "concept" },
  { text: "a song that sounds like a machine waking up", category: "concept" },
  { text: "music made from reversed and pitch-shifted sounds", category: "concept" },
  { text: "a canon where the same melody echoes with delay", category: "concept" },
  { text: "a song that transitions through four seasons", category: "concept" },
  { text: "glitchy and broken digital artifacts as music", category: "concept" },
  { text: "a lullaby that slowly distorts into noise", category: "concept" },
  { text: "two songs playing simultaneously that harmonize", category: "concept" },
  { text: "a song with no melody just rhythm and texture", category: "concept" },
  { text: "a three-act story told through music", category: "concept" },
  { text: "a song that feels like it's underwater", category: "concept" },
  { text: "generative music that evolves with randomness", category: "concept" },
].map((p) => ({
  ...p,
  slug: slugify(p.text),
}))

await Bun.write(OUTPUT_PATH, JSON.stringify(prompts, null, 2))
console.log(`Wrote ${prompts.length} prompts to ${OUTPUT_PATH}`)
