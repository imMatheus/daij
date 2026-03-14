import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { fetchJson } from '@/lib/api'
import type { Song } from '@/songs'
import { cn } from '@/lib/utils'
import { SongRow } from '@/components/SongRow'
import { Button } from '@/components/button'

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
  })

  const modelsQuery = useQuery({
    queryKey: ['leaderboard-models'],
    queryFn: () => fetchJson<ModelStats[]>('/leaderboard/models'),
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl">
        <header className="px-5 pt-6 pb-4">
          <Link
            to="/"
            className="text-secondary hover:text-primary transition-colors"
            style={{ font: '400 12px/1.25 var(--font-sans)' }}
          >
            &larr; Home
          </Link>
          <h1
            className="text-primary mt-2"
            style={{ font: '700 34px/1.176 var(--font-sans)' }}
          >
            Leaderboard
          </h1>
          <p
            className="text-secondary mt-1"
            style={{ font: '400 13px/1.23 var(--font-sans)' }}
          >
            Rankings based on ELO scores
          </p>
        </header>

        <div className="px-5 pb-4">
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
            <div
              className="border-divider text-secondary flex items-center border-b px-5 py-2"
              style={{ font: '400 11px/1.27 var(--font-sans)' }}
            >
              <span className="w-8 shrink-0 text-center">#</span>
              <span className="ml-3 flex-1">Model</span>
              <span className="w-16 shrink-0 text-right">Wins</span>
              <span className="w-16 shrink-0 text-right">Win Rate</span>
              <span className="w-16 shrink-0 text-right">Avg ELO</span>
            </div>
            {modelsQuery.isLoading ? (
              <p
                className="text-secondary py-12 text-center"
                style={{ font: '400 13px/1.23 var(--font-sans)' }}
              >
                Loading...
              </p>
            ) : (
              modelsQuery.data?.map((model, i) => (
                <Link
                  to={`/${model.provider}`}
                  key={model.provider}
                  className="border-divider hover:bg-surface flex items-center gap-3 border-b px-5 py-3 transition-colors"
                >
                  <span
                    className={cn(
                      'w-8 text-center',
                      i === 0 ? 'text-key' : 'text-secondary',
                    )}
                    style={{ font: '800 12px/1.25 var(--font-sans)' }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-primary"
                      style={{ font: '400 12px/1.25 var(--font-sans)' }}
                    >
                      {providerLabel(model.provider)}
                    </p>
                    <p
                      className="text-secondary"
                      style={{ font: '400 11px/1.27 var(--font-sans)' }}
                    >
                      {model.songCount}{' '}
                      {model.songCount === 1 ? 'song' : 'songs'}
                    </p>
                  </div>
                  <div
                    className="flex items-center"
                    style={{ font: '400 12px/1.25 var(--font-sans)' }}
                  >
                    <span className="text-secondary w-16 shrink-0 text-right">
                      {model.wins}
                    </span>
                    <span className="text-secondary w-16 shrink-0 text-right">
                      {model.totalVotes > 0
                        ? Math.round((model.wins / model.totalVotes) * 100)
                        : 0}
                      %
                    </span>
                    <span className="w-16 shrink-0 text-right">
                      <span
                        className="bg-key/10 text-key rounded-md px-2 py-0.5"
                        style={{ font: '600 11px/1.27 var(--font-sans)' }}
                      >
                        {Math.round(model.avgElo)}
                      </span>
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
