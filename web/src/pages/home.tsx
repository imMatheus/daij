import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getProviderImage, providerLabel } from '@/lib/utils'
import { fetchJson } from '@/lib/api'
import { useSongs } from '@/useSongs'
import { PlayingWave } from '@/components/PlayingWave'
import type { Song } from '@/songs'
import { ClaudeAI, OpenAI, Gemini } from '@/components/icons'
import { Loader } from '@/components/Loader'

const PROVIDER_ICONS = {
  claude: ClaudeAI,
  chatgpt: OpenAI,
  gemini: Gemini,
} as const

const PROVIDER_CARDS = [
  {
    provider: 'claude' as const,
    eyebrow: 'ANTHROPIC',
    title: 'Claude',
  },
  {
    provider: 'chatgpt' as const,
    eyebrow: 'OPENAI',
    title: 'ChatGPT',
  },
  {
    provider: 'gemini' as const,
    eyebrow: 'GOOGLE',
    title: 'Gemini',
  },
]

export function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-7">
      <div className="relative flex aspect-7/3 w-full flex-col justify-end overflow-hidden rounded-3xl px-12 pb-6">
        <img
          // src="https://cdn.midjourney.com/99c9da35-4609-4211-a78b-4bf70359c8b8/0_0.png"
          // src="https://cdn.midjourney.com/130a2b36-3161-43ac-bfe1-d56cc8af7f9e/0_0.png"
          // src="https://cdn.midjourney.com/2caad6fe-2675-4b5b-9812-0d3eb1bf2e9e/0_0.png"
          src='https://cdn.midjourney.com/9d27d884-9688-407d-a7f3-dc2c73414a7c/0_0.png'
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{
            animation: 'heroUnblur 2.4s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          }}
        />
        <style>
          {`
            @keyframes heroUnblur {
              0% { filter: blur(20px) saturate(1.2); transform: scale(1.15); }
              100% { filter: blur(0px) saturate(1); transform: scale(1); }
            }
          `}
        </style>
        <h1 className="relative mb-2 text-8xl font-semibold tracking-wide text-white">
          DAIJ
        </h1>
        <div className="relative flex gap-2">
          <Link
            to="/arena"
            className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-lg font-medium text-white"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            Rank songs
          </Link>
          <Link
            to="/leaderboard"
            className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-lg font-medium text-white"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
            Leaderboard
          </Link>
        </div>
      </div>

      <section className="mt-16">
        <h3 className="text-center text-5xl font-semibold tracking-wide uppercase">
          See s
          <ClaudeAI className="inline-block size-7 -translate-y-1" />
          ngs <br />
          fr
          <OpenAI className="inline-block size-7 -translate-y-1" />m m
          <Gemini className="inline-block size-7 -translate-y-1" />
          dels
        </h3>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {PROVIDER_CARDS.map((card) => (
            <Link
              key={card.provider}
              to={`/${card.provider}`}
              className="group block"
            >
              <div className="mb-2">
                <p className="text-secondary flex items-center gap-1 text-[11px] leading-tight font-medium tracking-wider uppercase">
                  {(() => {
                    const Icon = PROVIDER_ICONS[card.provider]
                    return <Icon className="size-3" />
                  })()}
                  {card.eyebrow}
                </p>
                <p className="text-primary font-medium tracking-wider">
                  {card.title}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={getProviderImage(card.provider)}
                  alt={card.title}
                  className="aspect-square w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:blur-[3px]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LatestSongs />

      {/* <AboutSection /> */}
    </div>
  )
}

function LatestSongs() {
  const { data: songs } = useQuery({
    queryKey: ['top-songs'],
    queryFn: () => fetchJson<Song[]>('/leaderboard/songs'),
  })

  const displaySongs = songs?.slice(0, 16)

  return (
    <section className="mt-10">
      <div className="mb-3">
        <Link
          to="/leaderboard"
          className="text-primary hover:text-secondary inline-flex items-center gap-1 text-[22px] leading-tight font-medium transition-colors"
        >
          Top songs
          <svg className="size-4" viewBox="0 0 64 64" fill="currentColor">
            <path d="M19.817 61.863c1.48 0 2.672-.515 3.702-1.546l24.243-23.63c1.352-1.385 1.996-2.737 2.028-4.443 0-1.674-.644-3.09-2.028-4.443L23.519 4.138c-1.03-.998-2.253-1.513-3.702-1.513-2.994 0-5.409 2.382-5.409 5.344 0 1.481.612 2.833 1.739 3.96l20.99 20.347-20.99 20.283c-1.127 1.126-1.739 2.478-1.739 3.96 0 2.93 2.415 5.344 5.409 5.344Z" />
          </svg>
        </Link>
      </div>

      {!displaySongs ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displaySongs.map((song) => (
            <SongCell key={song.id} song={song} queue={displaySongs} />
          ))}
        </div>
      )}
    </section>
  )
}

function AboutSection() {
  return (
    <section className="mt-24 mb-10">
      <div className="grid grid-cols-1 items-center gap-12 sm:grid-cols-2">
        <div>
          <p className="text-secondary mb-3 text-xs font-semibold tracking-widest uppercase">
            What is this
          </p>
          <h2 className="text-primary text-4xl leading-tight font-bold">
            Same prompt.
            <br />
            Different AI.
            <br />
            <span className="text-secondary">You pick the winner.</span>
          </h2>
        </div>

        <div className="text-secondary space-y-4 text-[15px] leading-relaxed">
          <p>
            Every model gets the same creative brief — compose a song using{' '}
            <a
              href="https://strudel.cc"
              target="_blank"
              className="text-primary underline decoration-black/20 underline-offset-2 transition-colors hover:decoration-black/50"
            >
              Strudel.cc
            </a>
            , a live-coding music tool. The result is 100 prompts across mood,
            genre, artist style, and more — each interpreted by Claude, ChatGPT,
            and Gemini.
          </p>
          <p>
            In the arena, songs play back-to-back with no labels. You vote on
            sound alone. Wins and losses feed an ELO system that ranks every
            track and every model over time.
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              to="/arena"
              className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black/80"
            >
              Try the arena
            </Link>
            <Link
              to="/leaderboard"
              className="text-primary ring-inset flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ring-1 ring-black/10 transition-colors hover:bg-black/5"
            >
              See rankings
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function SongCell({ song, queue }: { song: Song; queue: Song[] }) {
  const { play, pause, resume, currentSong, isPlaying } = useSongs()
  const isCurrent = currentSong?.id === song.id
  const isActive = isCurrent && isPlaying

  const handleClick = () => {
    if (isActive) pause()
    else if (isCurrent) resume()
    else play(song, queue)
  }

  return (
    <div
      onClick={handleClick}
      className="group hover:bg-surface relative flex cursor-pointer items-center gap-3 py-[8px] pr-2 transition-colors"
    >
      <div className="absolute right-0 bottom-0 left-0 h-[0.5px] bg-[rgba(0,0,0,0.15)]"></div>
      <div className="relative size-10 shrink-0 overflow-hidden rounded-md">
        <img
          src={getProviderImage(song.provider)}
          alt={song.name}
          className="size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 rounded-md ring-[0.5px] ring-black/10 ring-inset" />
        {isActive ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <PlayingWave theme="white" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm text-white">▶</span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 font-medium tracking-wider">
        <p className="text-primary truncate text-xs">{song.name}</p>
        <p className="text-secondary truncate text-xs">
          {providerLabel(song.provider)}
        </p>
      </div>
    </div>
  )
}
