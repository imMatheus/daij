import { useRef, useState } from 'react'
import { useSongs } from '@/useSongs'
import { getProviderImage, MYSTERY_IMAGE } from '@/lib/utils'

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function providerLabel(provider: 'claude' | 'chatgpt' | 'gemini') {
  switch (provider) {
    case 'claude':
      return 'Claude'
    case 'chatgpt':
      return 'ChatGPT'
    case 'gemini':
      return 'Gemini'
  }
}

export const Player = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    pause,
    resume,
    seek,
    playNext,
    playPrev,
    hasNext,
    hasPrev,
    anonymous,
  } = useSongs()
  const progressRef = useRef<HTMLDivElement>(null)
  const [hoverProgress, setHoverProgress] = useState<number | null>(null)

  if (!currentSong) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const getRatio = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current
    if (!bar) return 0
    const rect = bar.getBoundingClientRect()
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration === 0) return
    seek(getRatio(e) * duration)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoverProgress(getRatio(e) * 100)
  }

  const handleMouseLeave = () => {
    setHoverProgress(null)
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-96 -translate-x-1/2 border border-black/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3 p-3">
        <img
          src={anonymous ? MYSTERY_IMAGE : getProviderImage(currentSong.provider)}
          alt={anonymous ? '???' : currentSong.name}
          className="size-10 object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-black">
            {anonymous ? '???' : currentSong.name}
          </p>
          <p className="text-fg-muted text-xs">
            {anonymous ? '???' : providerLabel(currentSong.provider)} &middot;{' '}
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={playPrev}
            disabled={!hasPrev}
            className="flex size-8 cursor-pointer items-center justify-center border text-black transition-colors hover:bg-black hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="4" y="4" width="3" height="16" />
              <polygon points="20,4 9,12 20,20" />
            </svg>
          </button>

          <button
            onClick={isPlaying ? pause : resume}
            className="flex size-8 cursor-pointer items-center justify-center border text-black transition-colors hover:bg-black hover:text-white"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </button>

          <button
            onClick={playNext}
            disabled={!hasNext}
            className="flex size-8 cursor-pointer items-center justify-center border text-black transition-colors hover:bg-black hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="4,4 15,12 4,20" />
              <rect x="17" y="4" width="3" height="16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-3 pb-3">
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-1 w-full cursor-pointer overflow-hidden bg-black/10"
        >
          {hoverProgress !== null && (
            <div
              className="absolute top-0 left-0 h-full bg-black/20"
              style={{ width: `${hoverProgress}%` }}
            />
          )}
          <div
            className="bg-bg relative h-full transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
