import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router'
import { fetchJson } from '@/lib/api'
import type { Song } from '@/songs'
import { cn, getProviderImage, providerLabel } from '@/lib/utils'
import { SongRow } from '@/components/SongRow'
import { Button } from '@/components/button'
import { ClaudeAI, OpenAI, Gemini } from '@/components/icons'

type ModelStats = {
  provider: string
  avgElo: number
  songCount: number
  wins: number
  totalVotes: number
}

export const Leaderboard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = (searchParams.get('tab') === 'models' ? 'models' : 'songs') as
    | 'songs'
    | 'models'
  const setTab = (t: 'songs' | 'models') => setSearchParams({ tab: t })

  const songsQuery = useQuery({
    queryKey: ['leaderboard-songs'],
    queryFn: () => fetchJson<Song[]>('/leaderboard/songs'),
  })

  const modelsQuery = useQuery({
    queryKey: ['leaderboard-models'],
    queryFn: () => fetchJson<ModelStats[]>('/leaderboard/models'),
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-7">
      <header className="pb-4">
        <h1 className="text-primary text-3xl font-bold">Leaderboard</h1>
        <p className="text-secondary mt-1 text-sm">
          Rankings based on ELO scores
        </p>
      </header>

      <div className="pb-4">
        <div className="flex gap-2">
          {(['songs', 'models'] as const).map((t) => (
            <Button key={t} onClick={() => setTab(t)}>
              {t === 'songs' ? 'Top Songs' : 'Top Models'}
            </Button>
          ))}
        </div>
      </div>

      {tab === 'songs' && (
        <div>
          <div
            className="border-divider text-secondary flex items-center border-b px-5 py-2"
            style={{ font: '400 11px/1.27 var(--font-sans)' }}
          >
            <span className="w-8 shrink-0 text-center">#</span>
            <span className="ml-3 flex-1">Title</span>
            <span className="w-14 shrink-0 text-right">Listens</span>
            <span className="w-16 shrink-0 text-right">Wins</span>
            <span className="w-16 shrink-0 text-right">Win Rate</span>
            <span className="w-14 shrink-0 text-right">ELO</span>
          </div>
          {songsQuery.isLoading ? (
            <p
              className="text-secondary py-12 text-center"
              style={{ font: '400 13px/1.23 var(--font-sans)' }}
            >
              Loading...
            </p>
          ) : (
            songsQuery.data?.map((song, i) => (
              <SongRow
                key={song.id}
                song={song}
                index={i + 1}
                queue={songsQuery.data}
                trailing={
                  <div
                    className="flex items-center"
                    style={{ font: '400 12px/1.25 var(--font-sans)' }}
                  >
                    <span className="text-secondary w-14 shrink-0 text-right">
                      {song.listens}
                    </span>
                    <span className="text-secondary w-16 shrink-0 text-right">
                      {song.wins}
                    </span>
                    <span className="text-secondary w-16 shrink-0 text-right">
                      {song.totalVotes > 0
                        ? Math.round((song.wins / song.totalVotes) * 100)
                        : 0}
                      %
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
      )}

      {tab === 'models' && (
        <div>
          {modelsQuery.isLoading ? (
            <p
              className="text-secondary py-12 text-center"
              style={{ font: '400 13px/1.23 var(--font-sans)' }}
            >
              Loading...
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {modelsQuery.data?.map((model, i) => (
                <ModelCard key={model.provider} model={model} rank={i + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const PROVIDER_ICONS: Record<string, typeof ClaudeAI> = {
  claude: ClaudeAI,
  chatgpt: OpenAI,
  gemini: Gemini,
}

const RANK_LABELS = ['1st', '2nd', '3rd']

function ModelCard({ model, rank }: { model: ModelStats; rank: number }) {
  const Icon = PROVIDER_ICONS[model.provider]
  const winRate =
    model.totalVotes > 0 ? Math.round((model.wins / model.totalVotes) * 100) : 0

  return (
    <Link
      to={`/${model.provider}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getProviderImage(model.provider)}
          alt={providerLabel(model.provider)}
          className="size-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:blur-[3px]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />

        <div className="absolute bottom-0 left-0 w-full p-5">
          <p className="mb-1 text-xs font-semibold tracking-wider text-white/60 uppercase">
            {RANK_LABELS[rank - 1]}
          </p>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="size-5 brightness-0 invert" />}
            <span className="text-2xl font-bold text-white">
              {providerLabel(model.provider)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-[rgba(0,0,0,0.06)]">
        <Stat
          label="Avg ELO"
          value={Math.round(model.avgElo).toString()}
          highlight
        />
        <Stat label="Win Rate" value={`${winRate}%`} />
        <Stat label="Wins" value={model.wins.toString()} />
      </div>
    </Link>
  )
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="bg-surface flex flex-col items-center py-4">
      <span
        className={cn(
          'text-lg font-bold',
          highlight ? 'text-key' : 'text-primary',
        )}
      >
        {value}
      </span>
      <span className="text-secondary text-[11px] font-medium tracking-wider uppercase">
        {label}
      </span>
    </div>
  )
}
