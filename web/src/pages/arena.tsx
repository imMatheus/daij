import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
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
  const [hoveredOutcome, setHoveredOutcome] = useState<VoteOutcome | null>(null)

  const highlightLeft =
    hoveredOutcome === 'left_wins' ||
    hoveredOutcome === 'tie' ||
    hoveredOutcome === 'both_bad'
  const highlightRight =
    hoveredOutcome === 'right_wins' ||
    hoveredOutcome === 'tie' ||
    hoveredOutcome === 'both_bad'

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
    setHoveredOutcome(null)
    clearContext()
    refetch()
  }

  const voteButtons = [
    {
      label: 'Left is better',
      outcome: 'left_wins' as const,
      imgUrl:
        'https://cdn.midjourney.com/4d20398c-237b-42b5-bc51-0167e0524eff/0_3.png',
    },
    {
      label: "It's a tie",
      outcome: 'tie' as const,
      imgUrl:
        'https://cdn.midjourney.com/585761a4-f2a8-4d05-8fa2-1bd311be48eb/0_1.png',
    },
    {
      label: 'Both are bad',
      outcome: 'both_bad' as const,
      imgUrl:
        'https://cdn.midjourney.com/6e1bcde8-1dd7-43fe-9647-0cfd78866b16/0_0.png',
    },
    {
      label: 'Right is better',
      outcome: 'right_wins' as const,
      imgUrl:
        'https://cdn.midjourney.com/bd255b07-bcf6-4664-a91e-0fbadfa2f04b/0_1.png',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-3 pt-7 pb-24">
      <header className="pt-3 pb-4 md:pt-6 md:pb-8 md:text-center">
        <p className="text-secondary mb-2 text-xs font-semibold tracking-widest uppercase">
          Head to head
        </p>
        <h1 className="font-panchang text-primary text-2xl font-black tracking-wide uppercase md:text-5xl">
          Arena
        </h1>
        <p className="text-secondary mt-2 text-sm md:mx-auto md:max-w-sm">
          Two AI-generated songs go head-to-head. Listen blind, then cast your
          vote.
        </p>
      </header>

      <div className="pb-8">
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
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div
                className={cn(
                  'rounded-xl border-2 transition-colors duration-150',
                  highlightLeft ? 'border-[#f6211f]!' : 'border-divider!',
                )}
              >
                <SongCard
                  song={pair![0]}
                  label="Song A"
                  revealed={voted}
                  pair={pair!}
                />
              </div>
              <div
                className={cn(
                  'rounded-xl border-2 transition-colors duration-150',
                  highlightRight ? 'border-[#f6211f]!' : 'border-divider!',
                )}
              >
                <SongCard
                  song={pair![1]}
                  label="Song B"
                  revealed={voted}
                  pair={pair!}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-1.5 md:mt-8 md:gap-3">
              {voted ? (
                <Button onClick={nextMatchup}>Next matchup</Button>
              ) : (
                voteButtons.map((btn, i) => {
                  const isLast = i === voteButtons.length - 1
                  return (
                    <button
                      key={btn.outcome}
                      onClick={() => voteMutation.mutate(btn.outcome)}
                      onMouseEnter={() => setHoveredOutcome(btn.outcome)}
                      onMouseLeave={() => setHoveredOutcome(null)}
                      disabled={voteMutation.isPending}
                      className={cn(
                        isLast
                          ? 'pr-8 pl-2 md:pr-12 md:pl-4'
                          : 'pr-2 pl-8 md:pl-4 md:pl-12',
                        'group/btn relative flex cursor-pointer items-center justify-center gap-1 overflow-visible rounded-full bg-[#f6211f] py-2 text-xs font-medium text-white md:text-base',
                      )}
                    >
                      {btn.label}

                      <img
                        src={btn.imgUrl}
                        alt=""
                        className={cn(
                          isLast
                            ? 'right-1 group-hover/btn:right-0'
                            : 'left-1 group-hover/btn:left-0',
                          'absolute top-1/2 size-5.5 -translate-y-1/2 rounded-full transition-all duration-200 ease-out group-hover/btn:size-10 md:size-8',
                        )}
                      />
                    </button>
                  )
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
