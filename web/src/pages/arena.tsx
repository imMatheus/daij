import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router'
import { fetchJson, postJson } from '@/lib/api'
import { useSongs } from '@/useSongs'
import type { Song } from '@/songs'
import { cn, getProviderImage, MYSTERY_IMAGE } from '@/lib/utils'

type VoteOutcome = 'left_wins' | 'right_wins' | 'tie' | 'both_bad'

type ArenaPair = {
  songs: Song[]
  prompt: string
}

function providerLabel(provider: Song['provider']) {
  switch (provider) {
    case 'claude':
      return 'Claude'
    case 'chatgpt':
      return 'ChatGPT'
    case 'gemini':
      return 'Gemini'
  }
}

function SongCard({
  song,
  label,
  revealed,
  pair,
}: {
  song: Song
  label: string
  revealed: boolean
  pair: Song[]
}) {
  const { play, pause, currentSong, isPlaying } = useSongs()
  const isActive = currentSong?.id === song.id && isPlaying

  return (
    <div className="flex flex-1 flex-col items-center gap-4 p-6">
      <p className="text-fg-muted text-xs font-medium tracking-widest uppercase">
        {label}
      </p>
      <img
        src={revealed ? getProviderImage(song.provider) : MYSTERY_IMAGE}
        alt={revealed ? song.name : label}
        className="size-32 object-cover"
      />
      {revealed ? (
        <>
          <p className="text-center text-lg font-bold text-black">
            {song.name}
          </p>
          <p className="text-fg-muted text-sm">
            {providerLabel(song.provider)}
          </p>
        </>
      ) : (
        <p className="text-center text-lg font-bold text-black">???</p>
      )}
      <button
        onClick={() =>
          isActive ? pause() : play(song, pair, { anonymous: !revealed, loop: true })
        }
        className="border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-black"
      >
        {isActive ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

export const Arena = () => {
  const { clearContext, setAnonymous } = useSongs()
  const [voted, setVoted] = useState(false)

  const {
    data: arenaData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['arena-pair'],
    queryFn: () => fetchJson<ArenaPair>('/arena/pair'),
  })

  const pair = arenaData?.songs
  const prompt = arenaData?.prompt

  const voteMutation = useMutation({
    mutationFn: (outcome: VoteOutcome) =>
      postJson('/arena/vote', {
        songAId: pair![0].id,
        songBId: pair![1].id,
        outcome,
      }),
    onSuccess: () => {
      setVoted(true)
      setAnonymous(false)
    },
  })

  const nextMatchup = () => {
    setVoted(false)
    clearContext()
    refetch()
  }

  const voteButtons: { label: string; outcome: VoteOutcome }[] = [
    { label: 'Left is better', outcome: 'left_wins' },
    { label: 'Right is better', outcome: 'right_wins' },
    { label: "It's a tie", outcome: 'tie' },
    { label: 'Both are bad', outcome: 'both_bad' },
  ]

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
                Arena
              </h1>
            </div>
            <Link
              to="/leaderboard"
              className="text-fg-muted text-sm transition-colors hover:text-black"
            >
              Leaderboard &rarr;
            </Link>
          </div>
          <p className="text-fg-muted mt-2 text-sm">
            Listen to two songs and pick your favorite
          </p>
        </header>

        <div className="p-6">
          {isLoading ? (
            <p className="text-fg-muted py-12 text-center text-sm">
              Loading matchup...
            </p>
          ) : !pair || pair?.length < 2 ? (
            <p className="text-fg-muted py-12 text-center text-sm">
              Need songs from at least 2 different models to start.
            </p>
          ) : (
            <>
              <div className="mb-6 border p-4 text-center">
                <p className="text-fg-muted mb-1 text-xs font-medium tracking-widest uppercase">
                  Prompt
                </p>
                <p className="font-serif text-lg text-black">
                  &ldquo;{prompt}&rdquo;
                </p>
              </div>
              <div className="grid gap-px sm:grid-cols-2 border max-sm:divide-y sm:divide-x">
                <SongCard song={pair![0]} label="Song A" revealed={voted} pair={pair!} />
                <SongCard song={pair![1]} label="Song B" revealed={voted} pair={pair!} />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3 border-t pt-8">
                {voted ? (
                  <button
                    onClick={nextMatchup}
                    className="border border-black bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-black"
                  >
                    Next matchup
                  </button>
                ) : (
                  voteButtons.map((btn) => (
                    <button
                      key={btn.outcome}
                      onClick={() => voteMutation.mutate(btn.outcome)}
                      disabled={voteMutation.isPending}
                      className={cn(
                        'border px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white',
                        voteMutation.isPending && 'opacity-50',
                      )}
                    >
                      {btn.label}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
