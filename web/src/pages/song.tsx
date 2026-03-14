import { useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { useSongs } from '@/useSongs'
import { formatDuration, getProviderImage } from '@/lib/utils'
import { StrudelEditor } from '@/components/StrudelEditor'
import { Button } from '@/components/button'
import { PlayIcon, PauseIcon } from '@/components/icons'

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

export const SongPage = () => {
  const { provider, slug } = useParams<{ provider: string; slug: string }>()
  const { songs, play, currentSong, isPlaying, pause, resume } = useSongs()
  const [strudelCode, setStrudelCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const song = songs?.find(
    (s) => s.provider === provider && s.audioUrl === `/${provider}/${slug}.wav`,
  )

  useEffect(() => {
    if (!provider || !slug) return
    fetch(`/${provider}/${slug}.txt`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.text()
      })
      .then(setStrudelCode)
      .catch(() => setStrudelCode(null))
      .finally(() => setLoading(false))
  }, [provider, slug])

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
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl">
        <header className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-secondary hover:text-primary transition-colors"
              style={{ font: '400 12px/1.25 var(--font-sans)' }}
            >
              Home
            </Link>
            {song && (
              <>
                <span className="text-tertiary">/</span>
                <Link
                  to={`/${provider}`}
                  className="text-secondary hover:text-primary transition-colors"
                  style={{ font: '400 12px/1.25 var(--font-sans)' }}
                >
                  {providerLabel(provider!)}
                </Link>
              </>
            )}
          </div>
        </header>

        {!songs ? (
          <p
            className="text-secondary px-5 py-12 text-center"
            style={{ font: '400 13px/1.23 var(--font-sans)' }}
          >
            Loading...
          </p>
        ) : !song ? (
          <p
            className="text-secondary px-5 py-12 text-center"
            style={{ font: '400 13px/1.23 var(--font-sans)' }}
          >
            Song not found.
          </p>
        ) : (
          <>
            {/* Hero */}
            <div className="flex gap-5 px-5 pb-6">
              <img
                src={getProviderImage(song.provider)}
                alt={song.name}
                className="size-36 shrink-0 rounded-xl object-cover sm:size-44"
              />
              <div className="flex flex-col justify-end">
                <p
                  className="text-secondary uppercase"
                  style={{ font: '600 11px/1.27 var(--font-sans)' }}
                >
                  {providerLabel(song.provider)}
                </p>
                <h1
                  className="text-primary mt-1"
                  style={{ font: '700 26px/1.23 var(--font-sans)' }}
                >
                  {song.name}
                </h1>
                {song.prompt && (
                  <p
                    className="text-secondary mt-2 italic"
                    style={{ font: '400 13px/1.38 var(--font-sans)' }}
                  >
                    &ldquo;{song.prompt}&rdquo;
                  </p>
                )}
                <div
                  className="text-tertiary mt-2 flex items-center gap-2"
                  style={{ font: '400 12px/1.25 var(--font-sans)' }}
                >
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
            <div className="flex items-center gap-3 px-5 pb-6">
              <Button onClick={handlePlay}>
                {isActive ? <PauseIcon className="size-3.5" /> : <PlayIcon className="size-3.5" />}
                {isActive ? 'Pause' : 'Play'}
              </Button>
            </div>

            {/* Strudel editor */}
            <div className="border-divider border-t px-5 py-6">
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
    </div>
  )
}
