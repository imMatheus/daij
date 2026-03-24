import { useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { useSongs } from '@/useSongs'
import { formatDuration, getAudioTxtUrl, getProviderImage, providerLabel } from '@/lib/utils'
import { StrudelEditor } from '@/components/StrudelEditor'
import { Button } from '@/components/button'
import { PlayIcon, PauseIcon } from '@/components/icons'

export const SongPage = () => {
  const { provider, slug } = useParams<{ provider: string; slug: string }>()
  const { songs, play, currentSong, isPlaying, pause, resume } = useSongs()
  const [strudelCode, setStrudelCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const song = songs?.find(
    (s) => s.provider === provider && s.audioUrl === `/${provider}/${slug}.mp3`,
  )

  useEffect(() => {
    if (!song?.audioUrl) return
    fetch(getAudioTxtUrl(song.audioUrl))
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.text()
      })
      .then(setStrudelCode)
      .catch(() => setStrudelCode(null))
      .finally(() => setLoading(false))
  }, [song?.audioUrl])

  const isCurrent = currentSong?.id === song?.id
  const isActive = isCurrent && isPlaying

  const handlePlay = () => {
    if (!song) return
    if (isActive) {
      pause()
    } else if (isCurrent) {
      resume()
    } else {
      play(song)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-7">
      {!songs ? (
        <p
          className="text-secondary py-12 text-center"
          style={{ font: '400 13px/1.23 var(--font-sans)' }}
        >
          Loading...
        </p>
      ) : !song ? (
        <p
          className="text-secondary py-12 text-center"
          style={{ font: '400 13px/1.23 var(--font-sans)' }}
        >
          Song not found.
        </p>
      ) : (
        <>
          {/* Hero */}
          <div className="mb-6 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-6">
            <div className="relative size-40 shrink-0 overflow-hidden rounded-2xl shadow-lg sm:size-56">
              <img
                src={getProviderImage(song.provider)}
                alt={song.name}
                className="size-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />
            </div>
            <div className="min-w-0 py-1">
              <div className="mb-1 flex items-center gap-2 text-xs text-secondary">
                <Link
                  to={`/${provider}`}
                  className="transition-colors hover:text-primary"
                >
                  {providerLabel(provider!)}
                </Link>
                <span>/</span>
                <span>{song.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-primary sm:text-4xl">
                {song.name}
              </h1>
              {song.prompt && (
                <p className="mt-2 max-w-md text-sm text-secondary italic">
                  &ldquo;{song.prompt}&rdquo;
                </p>
              )}
              <div className="mt-2 flex items-center gap-2 text-xs text-secondary">
                <span>{formatDuration(song.duration)}</span>
                <span>&middot;</span>
                <span>ELO {Math.round(song.eloRating)}</span>
                <span>&middot;</span>
                <span>
                  {song.wins} {song.wins === 1 ? 'win' : 'wins'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pb-6">
            <Button onClick={handlePlay}>
              {isActive ? (
                <PauseIcon className="size-3.5" />
              ) : (
                <PlayIcon className="size-3.5" />
              )}
              {isActive ? 'Pause' : 'Play'}
            </Button>
          </div>

          {/* Strudel editor */}
          <div className="border-divider border-t py-6">
            <h3
              className="text-primary mb-4"
              style={{ font: '700 17px/1.29 var(--font-sans)' }}
            >
              Strudel Code
            </h3>
            {loading ? (
              <p
                className="text-secondary"
                style={{ font: '400 13px/1.23 var(--font-sans)' }}
              >
                Loading code...
              </p>
            ) : strudelCode ? (
              <StrudelEditor code={strudelCode} />
            ) : (
              <p
                className="text-secondary"
                style={{ font: '400 13px/1.23 var(--font-sans)' }}
              >
                No strudel code available for this song.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
