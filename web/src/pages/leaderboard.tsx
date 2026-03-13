import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { fetchJson } from '@/lib/api'
import type { Song } from '@/songs'
import { cn } from '@/lib/utils'
import { SongRow } from '@/components/SongRow'

type ModelStats = {
  provider: string
  avgElo: number
  songCount: number
  wins: number
  totalVotes: number
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

export const Leaderboard = () => {
  const [tab, setTab] = useState<'songs' | 'models'>('songs')

  const songsQuery = useQuery({
    queryKey: ['leaderboard-songs'],
    queryFn: () => fetchJson<Song[]>('/leaderboard/songs'),
    enabled: tab === 'songs',
  })

  const modelsQuery = useQuery({
    queryKey: ['leaderboard-models'],
    queryFn: () => fetchJson<ModelStats[]>('/leaderboard/models'),
    enabled: tab === 'models',
  })

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl border-x">
        <header className="border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-fg-muted text-sm transition-colors hover:text-black"
              >
                &larr; Home
              </Link>
              <span className="text-fg-muted">/</span>
              <h1 className="font-serif text-2xl font-extrabold tracking-tight text-black">
                Leaderboard
              </h1>
            </div>
            <Link
              to="/arena"
              className="text-fg-muted text-sm transition-colors hover:text-black"
            >
              Arena &rarr;
            </Link>
          </div>
          <p className="text-fg-muted mt-2 text-sm">
            Rankings based on ELO scores
          </p>
        </header>

        <div className="border-b p-6">
          <div className="flex gap-2">
            {(['songs', 'models'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'px-5 py-2 text-sm font-medium transition-colors',
                  tab === t
                    ? 'border border-black bg-black text-white'
                    : 'border text-black hover:bg-black hover:text-white',
                )}
              >
                {t === 'songs' ? 'Top Songs' : 'Top Models'}
              </button>
            ))}
          </div>
        </div>

        {tab === 'songs' && (
          <div>
            <div className="text-fg-muted flex items-center border-b px-6 py-2.5 text-xs font-medium">
              <span className="w-8 shrink-0 text-center">#</span>
              <span className="ml-4 flex-1">Title</span>
              <span className="w-20 shrink-0 text-right">Wins</span>
              <span className="w-20 shrink-0 text-right">Win Rate</span>
              <span className="w-16 shrink-0 text-right">ELO</span>
            </div>
            {songsQuery.isLoading ? (
              <p className="text-fg-muted py-12 text-center text-sm">
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
                    <div className="flex items-center text-sm">
                      <span className="w-20 shrink-0 text-right text-fg-muted">
                        {song.wins}
                      </span>
                      <span className="w-20 shrink-0 text-right text-fg-muted">
                        {song.totalVotes > 0 ? Math.round((song.wins / song.totalVotes) * 100) : 0}%
                      </span>
                      <span className="w-16 shrink-0 text-right font-semibold text-black">
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
            <div className="text-fg-muted flex items-center border-b px-6 py-2.5 text-xs font-medium">
              <span className="w-8 shrink-0 text-center">#</span>
              <span className="ml-4 flex-1">Model</span>
              <span className="w-20 shrink-0 text-right">Wins</span>
              <span className="w-20 shrink-0 text-right">Win Rate</span>
              <span className="w-20 shrink-0 text-right">Avg ELO</span>
            </div>
            {modelsQuery.isLoading ? (
              <p className="text-fg-muted py-12 text-center text-sm">
                Loading...
              </p>
            ) : (
              modelsQuery.data?.map((model, i) => (
                <div
                  key={model.provider}
                  className="flex items-center gap-4 border-b px-6 py-4"
                >
                  <span
                    className={cn(
                      'w-8 text-center text-sm font-bold',
                      i === 0 ? 'text-accent' : 'text-fg-muted',
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black">
                      {providerLabel(model.provider)}
                    </p>
                    <p className="text-fg-muted text-xs">
                      {model.songCount}{' '}
                      {model.songCount === 1 ? 'song' : 'songs'}
                    </p>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-20 shrink-0 text-right text-fg-muted">
                      {model.wins}
                    </span>
                    <span className="w-20 shrink-0 text-right text-fg-muted">
                      {model.totalVotes > 0 ? Math.round((model.wins / model.totalVotes) * 100) : 0}%
                    </span>
                    <span className="w-20 shrink-0 text-right">
                      <span className="border-accent/20 bg-accent/5 text-accent border px-2 py-0.5 text-xs font-semibold">
                        {Math.round(model.avgElo)}
                      </span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
