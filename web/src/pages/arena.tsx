import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router'
import { fetchJson, postJson } from '@/lib/api'
import { useSongs } from '@/useSongs'
import type { Song } from '@/songs'
import { cn, getProviderImage, MYSTERY_IMAGE, providerLabel } from '@/lib/utils'
import { Button } from '@/components/button'

type VoteOutcome = 'left_wins' | 'right_wins' | 'tie' | 'both_bad'

type ArenaPair = {
  songs: Song[]
  prompt: string
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
      <p
        className="text-secondary uppercase"
        style={{ font: '600 11px/1.27 var(--font-sans)' }}
      >
        {label}
      </p>
      <img
        src={revealed ? getProviderImage(song.provider) : MYSTERY_IMAGE}
        alt={revealed ? song.name : label}
        className="size-32 rounded-xl object-cover"
      />
      {revealed ? (
        <>
          <p
            className="text-primary text-center"
            style={{ font: '700 17px/1.29 var(--font-sans)' }}
          >
            {song.name}
          </p>
          <p
            className="text-secondary"
            style={{ font: '400 12px/1.25 var(--font-sans)' }}
          >
            {providerLabel(song.provider)}
          </p>
        </>
      ) : (
        <p
          className="text-primary text-center"
          style={{ font: '700 17px/1.29 var(--font-sans)' }}
        >
          ???
        </p>
      )}
      <Button
        onClick={() =>
          isActive
            ? pause()
            : play(song, pair, { anonymous: !revealed, loop: true })
        }
      >
        {isActive ? 'Pause' : 'Play'}
      </Button>
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
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl">
        <header className="px-5 pt-6 pb-4">
          <h1 className="text-primary text-3xl font-bold">
            Arena
          </h1>
          <p className="text-secondary mt-1 text-sm">
            Listen to two songs and pick your favorite
          </p>
        </header>

        <div className="px-5 pb-8">
          {isLoading ? (
            <p
              className="text-secondary py-12 text-center"
              style={{ font: '400 13px/1.23 var(--font-sans)' }}
            >
              Loading matchup...
            </p>
          ) : !pair || pair?.length < 2 ? (
            <p
              className="text-secondary py-12 text-center"
              style={{ font: '400 13px/1.23 var(--font-sans)' }}
            >
              Need songs from at least 2 different models to start.
            </p>
          ) : (
            <>
              <div className="bg-surface mb-6 rounded-xl p-4 text-center">
                <p
                  className="text-secondary mb-1 uppercase"
                  style={{ font: '600 11px/1.27 var(--font-sans)' }}
                >
                  Prompt
                </p>
                <p
                  className="text-primary"
                  style={{ font: '400 16px/1.375 var(--font-sans)' }}
                >
                  &ldquo;{prompt}&rdquo;
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-divider rounded-xl border">
                  <SongCard
                    song={pair![0]}
                    label="Song A"
                    revealed={voted}
                    pair={pair!}
                  />
                </div>
                <div className="border-divider rounded-xl border">
                  <SongCard
                    song={pair![1]}
                    label="Song B"
                    revealed={voted}
                    pair={pair!}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {voted ? (
                  <Button onClick={nextMatchup}>Next matchup</Button>
                ) : (
                  voteButtons.map((btn) => (
                    <Button
                      key={btn.outcome}
                      onClick={() => voteMutation.mutate(btn.outcome)}
                      disabled={voteMutation.isPending}
                    >
                      {btn.label}
                    </Button>
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
