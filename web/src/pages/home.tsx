import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { cn, getProviderImage } from '@/lib/utils'
import { fetchJson } from '@/lib/api'
import { DotFlow } from '@/components/ui/dot-flow'
import { SongRow } from '@/components/SongRow'
import type { Song } from '@/songs'

export const Home = () => {
  return (
    <div className="min-h-screen">
      <WelcomeSection />

      {/* Pixel banner */}
      <section
        style={{ backgroundColor: BACKGROUND_COLOR }}
        className="relative flex items-center justify-center overflow-hidden py-24"
      >
        <div className="absolute inset-0 flex items-center justify-center px-4 lg:px-32">
          <PixelTextSVG />
        </div>
        <div className="relative z-10 min-h-[420px] w-full max-w-lg rounded-3xl p-8">
          {/* <p>lol</p> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fafafa] px-6 pt-4 pb-12">
        <p className="text-center text-xs text-black/30">
          daij — AI-generated music experiment
        </p>
      </footer>
    </div>
  )
}

const PIXEL_LETTERS: Record<string, number[][]> = {
  D: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  ],
  A: [
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  ],
  I: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  J: [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
}

// const BACKGROUND_COLOR = '#f0ebe5'
// const PIXEL_COLORS = ['#2702c2', '#e63946', '#ff5400', '#a5be00', '#fb5607']

// const BACKGROUND_COLOR = '#fff'
// const PIXEL_COLORS = [
//   '#2d00f7', // Blue: Pure, bold blue with a pristine vibrance, universally trusted and representing coolness, loyalty, and peace.
//   '#b100e8', // Purple (X11): Royal purple radiates regal energy, creativity, and vibrant play.
//   '#bc00dd', // Hyper Magenta: Electrifying fusion of pink and purple, dazzling vibrancy.
//   '#e500a4', // Electric Rose: Electrifying fuchsia-pink hue radiates bold energy.
//   '#f20089', // Deep Pink: Brilliant magenta intensity, full of passion and life.
//   '#6a00f4', // Electric Indigo: Radiant violet pulses with electric fantasy, curiosity, and invention.
//   '#8900f2', // Ultra Violet: Intense electric purple promises innovation and futuristic dreams.
//   '#d100d1', // Vivid Orchid: Vivid, electrifying fusion of pink and purple, creative and exuberant.
//   '#db00b6', // Vivid Orchid: Vivid, electrifying fusion of pink and purple, creative and exuberant.
//   '#a100f2', // Purple (X11): Royal purple radiates regal energy, creativity, and vibrant play.
// ]

const BACKGROUND_COLOR = '#fff'
const PIXEL_COLORS = [
  '#2702c2',
  '#8338ec',

  // '#ffbe0b',
  // '#8338ec',
  // '#3a86ff',

  // '#ff006e',
  // '#fb5607',
]

function PixelTextSVG() {
  const cellSize = 10
  const pixelGap = 0 // space between cubes within a letter
  const step = cellSize + pixelGap
  const letterGap = 20 // space between letters
  let blockIndex = 0

  const letters = [
    { char: 'D', grid: PIXEL_LETTERS.D },
    { char: 'A', grid: PIXEL_LETTERS.A },
    { char: 'I', grid: PIXEL_LETTERS.I },
    { char: 'J', grid: PIXEL_LETTERS.J },
  ]

  const offsets: number[] = []
  let x = 0
  for (const { grid } of letters) {
    offsets.push(x)
    x += grid[0].length * step - pixelGap + letterGap
  }
  const totalWidth = x - letterGap
  const rows = letters[0].grid.length
  const totalHeight = rows * step - pixelGap

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className="h-full w-auto max-w-full"
      shapeRendering="crispEdges"
    >
      {letters.map(({ char, grid }, li) =>
        grid.flatMap((row, ri) =>
          row.map((filled, ci) => {
            if (!filled) return null
            const color = PIXEL_COLORS[blockIndex++ % PIXEL_COLORS.length]
            return (
              <rect
                key={`${char}-${ri}-${ci}`}
                data-letter={char}
                data-row={ri}
                data-col={ci}
                x={offsets[li] + ci * step}
                y={ri * step}
                width={cellSize}
                height={cellSize}
                fill={color}
              />
            )
          }),
        ),
      )}
    </svg>
  )
}

function PixelArc() {
  const cols = 32
  const maxHeight = 4
  const center = (cols - 1) / 2

  return (
    <div className="flex items-end justify-center">
      {Array.from({ length: cols }, (_, i) => {
        const dist = Math.abs(i - center) / center
        const height = Math.round(maxHeight * (1 - dist * dist))
        if (height === 0) return <div key={i} className="w-3 sm:w-4" />
        return (
          <div key={i} className="flex w-3 flex-col gap-[1px] sm:w-4">
            {Array.from({ length: height }, (_, j) => (
              <div
                key={j}
                className="h-3 w-full"
                style={{
                  backgroundColor: PIXEL_COLORS[(i + j) % PIXEL_COLORS.length],
                  animation: `pixelExpand 2000ms ease-in-out ${j * 0.1}s infinite`,
                  // animationDelay: `${j * -0.2}s`,
                }}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

const MODEL_CARDS = [
  {
    name: 'Claude',
    provider: 'claude' as const,
    description: 'By Anthropic',
    color: '#8338ec',
  },
  {
    name: 'ChatGPT',
    provider: 'chatgpt' as const,
    description: 'By OpenAI',
    color: '#3a86ff',
  },
  {
    name: 'Gemini',
    provider: 'gemini' as const,
    description: 'By Google',
    color: '#ffbe0b',
  },
]

function TopSongs() {
  const { data: songs } = useQuery({
    queryKey: ['leaderboard-songs'],
    queryFn: () => fetchJson<Song[]>('/leaderboard/songs'),
  })

  const top10 = songs?.slice(0, 10)

  return (
    <div className="border-b">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h3 className="text-sm font-bold tracking-widest text-black uppercase">
          Top 10
        </h3>
        <Link
          to="/leaderboard"
          className="text-fg-muted text-sm transition-colors hover:text-black"
        >
          See all &rarr;
        </Link>
      </div>
      {!top10 ? (
        <p className="text-fg-muted py-8 text-center text-sm">Loading...</p>
      ) : (
        top10.map((song, i) => (
          <SongRow
            key={song.id}
            song={song}
            index={i + 1}
            queue={top10}
            trailing={
              <span className="text-fg-muted text-sm font-semibold">
                {Math.round(song.eloRating)}
              </span>
            }
          />
        ))
      )}
    </div>
  )
}

function WelcomeSection() {
  return (
    <section className="">
      <div className="mx-auto w-full max-w-6xl border-x text-black">
        {/* Hero row */}
        <div className="border-b pb-6">
          <div className="mb-5 rotate-180">
            <PixelArc />
          </div>
          <div className="pt-10 text-center">
            <h2 className="font-serif text-6xl font-extrabold tracking-tight sm:text-6xl">
              daij
            </h2>
            <p className="text-fg-muted mt-4 text-base">
              AI-generated music. Blind rankings. You pick what sounds best.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {/* <Link
                to="/test"
                className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2 text-xs font-medium uppercase tracking-wider text-white shadow-[2px_2px_10px_rgba(0,0,0,0.12)] transition-colors hover:bg-gray-800"
              >
                &rarr; Landing Page
              </Link> */}
              <Link to="/arena">
                <DotFlow
                  items={[
                    {
                      title: 'Vote on songs',
                      frames: [
                        // pulse out
                        [24],
                        [17, 23, 25, 31],
                        [10, 16, 18, 24, 30, 32, 38],
                        [3, 9, 11, 17, 23, 25, 31, 37, 39, 45],
                        [
                          2, 4, 8, 10, 12, 16, 18, 24, 30, 32, 36, 38, 40, 44,
                          46,
                        ],
                        // pulse in
                        [3, 9, 11, 17, 23, 25, 31, 37, 39, 45],
                        [10, 16, 18, 24, 30, 32, 38],
                        [17, 23, 25, 31],
                        [24],
                        // build trophy (shifted down 1 row)
                        [31, 38],
                        [30, 31, 32, 38],
                        [30, 31, 32, 37, 38, 39],
                        [23, 24, 25, 30, 31, 32, 36, 37, 38, 39, 40],
                        [
                          16, 17, 18, 23, 24, 25, 30, 31, 32, 36, 37, 38, 39,
                          40,
                        ],
                        [
                          8, 9, 10, 11, 12, 16, 17, 18, 23, 24, 25, 30, 31, 32,
                          36, 37, 38, 39, 40,
                        ],
                        // full trophy with handles
                        [
                          8, 9, 10, 11, 12, 14, 16, 17, 18, 20, 21, 23, 24, 25,
                          27, 30, 31, 32, 36, 37, 38, 39, 40,
                        ],
                        [
                          8, 9, 10, 11, 12, 14, 16, 17, 18, 20, 21, 23, 24, 25,
                          27, 30, 31, 32, 36, 37, 38, 39, 40,
                        ],
                        [
                          8, 9, 10, 11, 12, 14, 16, 17, 18, 20, 21, 23, 24, 25,
                          27, 30, 31, 32, 36, 37, 38, 39, 40,
                        ],
                        [
                          8, 9, 10, 11, 12, 14, 16, 17, 18, 20, 21, 23, 24, 25,
                          27, 30, 31, 32, 36, 37, 38, 39, 40,
                        ],
                      ],
                      duration: 120,
                      repeatCount: 1,
                    },
                  ]}
                />
              </Link>
              <Link to="/leaderboard">
                <DotFlow
                  items={[
                    {
                      title: 'Leaderboard',
                      frames: [
                        [42],
                        [42, 35],
                        [42, 35, 28],
                        [42, 35, 28, 21],
                        [42, 35, 28, 21, 43],
                        [42, 35, 28, 21, 43, 36],
                        [42, 35, 28, 21, 43, 36, 29],
                        [42, 35, 28, 21, 43, 36, 29, 44],
                        [42, 35, 28, 21, 43, 36, 29, 44, 37],
                        [42, 35, 28, 21, 43, 36, 29, 44, 37, 45],
                        [42, 35, 28, 21, 43, 36, 29, 44, 37, 45, 46],
                      ],
                      duration: 100,
                      repeatCount: 2,
                    },
                  ]}
                />
              </Link>
            </div>
          </div>
        </div>

        <TopSongs />

        {/* Model cards */}
        <div className="grid border-b sm:grid-cols-3">
          {MODEL_CARDS.map((model, i) => (
            <Link
              key={model.provider}
              to={`/${model.provider}`}
              className={cn(
                'group relative block aspect-square overflow-hidden p-3',
                i === 1 && 'border-x border-black',
              )}
            >
              <div className="relative h-full overflow-hidden rounded-xl">
                <img
                  src={getProviderImage(model.provider)}
                  alt={model.name}
                  className="size-full object-cover"
                />

                <div
                  className="absolute right-0 bottom-0 left-0 rounded-b-xl p-4"
                  style={{
                    backgroundImage:
                      'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                  }}
                >
                  <h3 className="font-display mb-3 text-2xl font-extrabold text-white uppercase">
                    {model.name}
                  </h3>
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-medium tracking-wider text-black uppercase shadow-[2px_2px_10px_rgba(0,0,0,0.12)] transition-colors hover:bg-black hover:text-white">
                      <span>&rarr;</span>
                      {model.description}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
