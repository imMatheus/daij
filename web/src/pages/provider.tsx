import { useParams, Link } from 'react-router'
import { useSongs } from '@/useSongs'
import { formatDuration, getProviderImage } from '@/lib/utils'
import { SongRow } from '@/components/SongRow'
import { Button } from '@/components/button'
import {
  PlayIcon,
  ShuffleIcon,
  ClaudeAI,
  OpenAI,
  Gemini,
} from '@/components/icons'
import type { Song } from '@/songs'

const PROVIDER_ICONS: Record<string, typeof ClaudeAI> = {
  claude: ClaudeAI,
  chatgpt: OpenAI,
  gemini: Gemini,
}

const PROVIDER_EYEBROWS: Record<string, string> = {
  claude: 'ANTHROPIC',
  chatgpt: 'OPENAI',
  gemini: 'GOOGLE',
}

const providerMeta: Record<
  Song['provider'],
  { label: string; description: string }
> = {
  claude: {
    label: 'Claude',
    description:
      "opus-4.6",
  },
  chatgpt: {
    label: 'ChatGPT',
    description:
      "gpt-5.3-codex",
  },
  gemini: {
    label: 'Gemini',
    description:
      "gemini-3-flash",
  },
}

function formatTotalDuration(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  if (hrs > 0) return `${hrs} hr ${mins} min`
  return `${mins} min`
}

export const Provider = () => {
  const { provider } = useParams<{ provider: string }>()
  const { songs, play } = useSongs()

  const meta = providerMeta[provider as Song['provider']]

  if (!meta || !provider) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-7">
        <p className="text-secondary py-12 text-center text-sm">
          Provider not found.
        </p>
      </div>
    )
  }

  const providerSongs = (
    songs?.filter((s) => s.provider === provider) ?? []
  ).sort((a, b) => b.eloRating - a.eloRating)
  const totalDuration = providerSongs.reduce((sum, s) => sum + s.duration, 0)
  const coverImage = getProviderImage(provider)

  return (
    <div className="mx-auto max-w-7xl px-3 py-7">
      {/* Hero */}
      <div className="mb-6 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-6">
        <div className="relative size-40 shrink-0 overflow-hidden rounded-2xl shadow-lg sm:size-56">
          <img
            src={coverImage}
            alt={meta.label}
            className="size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />
        </div>
        <div className="min-w-0 py-1">
          <h1 className="font-panchang text-3xl font-black tracking-wide text-primary uppercase sm:text-5xl">
            {meta.label}
          </h1>
          <p className="max-md:hidden mt-2 max-w-md text-sm text-secondary">
            {meta.description}
          </p>
          <p className="mt-2 text-xs text-secondary">
            {providerSongs.length}{' '}
            {providerSongs.length === 1 ? 'song' : 'songs'} &middot;{' '}
            {formatTotalDuration(totalDuration)}
          </p>
        </div>
      </div>

      {/* Actions */}
      {providerSongs.length > 0 && (
        <div className="flex items-center gap-3 pb-6">
          <Button onClick={() => play(providerSongs[0], providerSongs)}>
            <PlayIcon className="size-3.5" />
            Play all
          </Button>
          <Button
            onClick={() => {
              const shuffled = [...providerSongs].sort(
                () => Math.random() - 0.5,
              )
              play(shuffled[0], shuffled)
            }}
          >
            <ShuffleIcon className="size-3.5" />
            Shuffle
          </Button>
        </div>
      )}

      {/* Song list */}
      <div className="border-divider border-t">
        <div
          className="border-divider text-secondary flex items-center border-b px-1 sm:px-5 py-2"
          style={{ font: '400 11px/1.27 var(--font-sans)' }}
        >
          <span className="w-8 shrink-0 text-center">#</span>
          <span className="ml-3 flex-1">Title</span>
          <span className="max-sm:hidden w-14 shrink-0 text-right">Listens</span>
          <span className="w-14 shrink-0 text-right">Wins</span>
          <span className="w-14 shrink-0 text-right">ELO</span>
        </div>

        {!songs ? (
          <p
            className="text-secondary py-12 text-center"
            style={{ font: '400 13px/1.23 var(--font-sans)' }}
          >
            Loading...
          </p>
        ) : providerSongs.length === 0 ? (
          <p
            className="text-secondary py-12 text-center"
            style={{ font: '400 13px/1.23 var(--font-sans)' }}
          >
            No tracks yet.
          </p>
        ) : (
          providerSongs.map((song, i) => (
            <SongRow
              key={song.id}
              song={song}
              index={i + 1}
              showProvider={false}
              queue={providerSongs}
              trailing={
                <div
                  className="flex items-center"
                  style={{ font: '400 12px/1.25 var(--font-sans)' }}
                >
                  <span className="text-secondary w-14 shrink-0 text-right">
                    {song.listens}
                  </span>
                  <span className="text-secondary max-sm:hidden w-14 shrink-0 text-right">
                    {song.wins}
                  </span>
                  <span
                    className="text-primary w-14 shrink-0 text-right"
                    style={{ fontWeight: 600 }}
                  >
                    {Math.round(song.eloRating)}
                  </span>
                </div>
              }
            />
          ))
        )}
      </div>

      {/* Other providers */}
      <section className="mt-16">
        <h3 className="text-secondary mb-4 text-xs font-semibold tracking-widest uppercase">
          Other models
        </h3>
        <div className="flex flex-wrap gap-4">
          {(Object.keys(providerMeta) as Song['provider'][])
            .filter((p) => p !== provider)
            .map((p) => {
              const Icon = PROVIDER_ICONS[p]
              return (
                <Link key={p} to={`/${p}`} className="group block w-80">
                  <div className="mb-2">
                    <p className="text-secondary flex items-center gap-1 text-[11px] leading-tight font-medium tracking-wider uppercase">
                      {Icon && <Icon className="size-3" />}
                      {PROVIDER_EYEBROWS[p]}
                    </p>
                    <p className="text-primary font-medium tracking-wider">
                      {providerMeta[p].label}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={getProviderImage(p)}
                      alt={providerMeta[p].label}
                      className="aspect-square w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:blur-[3px]"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />
                  </div>
                </Link>
              )
            })}
        </div>
      </section>
    </div>
  )
}
