import { useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { useSongs } from '@/useSongs'
import { formatDuration, getProviderImage } from '@/lib/utils'
import { StrudelEditor } from '@/components/StrudelEditor'

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
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl border-x">
        <header className="border-b p-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-fg-muted text-sm transition-colors hover:text-black"
            >
              &larr; Home
            </Link>
            {song && (
              <>
                <span className="text-fg-muted">/</span>
                <Link
                  to={`/${provider}`}
                  className="text-fg-muted text-sm transition-colors hover:text-black"
                >
                  {providerLabel(provider!)}
                </Link>
                <span className="text-fg-muted">/</span>
                <h1 className="truncate font-serif text-2xl font-extrabold tracking-tight text-black">
                  {song.name}
                </h1>
              </>
            )}
          </div>
        </header>

        {!songs ? (
          <p className="text-fg-muted py-12 text-center text-sm">Loading...</p>
        ) : !song ? (
          <p className="text-fg-muted py-12 text-center text-sm">
            Song not found.
          </p>
        ) : (
          <>
            {/* Hero */}
            <div className="flex gap-6 border-b p-6">
              <img
                src={getProviderImage(song.provider)}
                alt={song.name}
                className="size-36 shrink-0 object-cover sm:size-44"
              />
              <div className="flex flex-col justify-end">
                <p className="text-fg-muted text-xs font-medium tracking-widest uppercase">
                  {providerLabel(song.provider)}
                </p>
                <h2 className="mt-1 font-serif text-3xl font-extrabold text-black sm:text-4xl">
                  {song.name}
                </h2>
                {song.prompt && (
                  <p className="text-fg-muted mt-2 text-sm italic">
                    &ldquo;{song.prompt}&rdquo;
                  </p>
                )}
                <div className="text-fg-muted mt-2 flex items-center gap-3 text-sm">
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
            <div className="flex items-center gap-3 border-b p-6">
              <button
                onClick={handlePlay}
                className="border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-black"
              >
                {isActive ? 'Pause' : 'Play'}
              </button>
            </div>

            {/* Strudel editor */}
            <div className="border-b p-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-black">
                Strudel Code
              </h3>
              {loading ? (
                <p className="text-fg-muted text-sm">Loading code...</p>
              ) : strudelCode ? (
                <StrudelEditor code={strudelCode} />
              ) : (
                <p className="text-fg-muted text-sm">
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
