import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getProviderImage } from '@/lib/utils'
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

export function Test() {
  return (
    <div className="mx-auto max-w-7xl py-7">
      <div
        className="flex aspect-7/3 w-full flex-col justify-end rounded-3xl px-12 pb-6"
        style={{
          backgroundSize: 'cover',
          // backgroundImage: "url(https://cdn.midjourney.com/eb1d1de6-d0b5-49dd-a3c9-ed1775f62e5a/0_0.png)",
          backgroundImage:
            'url(https://cdn.midjourney.com/99c9da35-4609-4211-a78b-4bf70359c8b8/0_0.png)',
        }}
      >
        <h1 className="mb-2 text-8xl font-semibold tracking-wide text-white">
          DAIJ
        </h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-lg font-medium text-white">
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
          </button>
          <button className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-lg font-medium text-white">
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
          </button>
        </div>
      </div>

      <section className="my-32">
        <h3 className="text-center text-5xl font-semibold tracking-wide uppercase">
          See s
          <ClaudeAI className="inline-block size-7 -translate-y-1" />
          ngs <br />fr
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
                  className="aspect-square w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[rgba(51,51,51,0.2)] opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LatestSongs />
    </div>
  )
}

function providerLabel(provider: string) {
  switch (provider) {
    case 'claude':
      return 'Claude'
    case 'chatgpt':
      return 'ChatGPT'
    case 'gemini':
      return 'Gemini'
    default:
      return provider
  }
}

function LatestSongs() {
  const { data: songs } = useQuery({
    queryKey: ['top-songs'],
    queryFn: () => fetchJson<Song[]>('/leaderboard/songs'),
  })

  const displaySongs = songs?.slice(0, 16)

  return (
    <section className="mt-20">
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
            <PlayingWave />
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
