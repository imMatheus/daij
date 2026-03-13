import type { ReactNode } from 'react'
import { cn, getProviderImage } from '@/lib/utils'
import { useSongs } from '@/useSongs'
import { PlayingWave } from '@/components/PlayingWave'
import type { Song } from '@/songs'

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

export function SongRow({
  song,
  index,
  trailing,
  showProvider = true,
  queue,
}: {
  song: Song
  index: number
  trailing?: ReactNode
  showProvider?: boolean
  queue?: Song[]
}) {
  const { play, pause, resume, currentSong, isPlaying } = useSongs()
  const isCurrent = currentSong?.id === song.id
  const isActive = isCurrent && isPlaying

  const handleClick = () => {
    if (isActive) {
      pause()
    } else if (isCurrent) {
      resume()
    } else {
      play(song, queue)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer items-center gap-4 border-b px-6 py-3 transition-colors hover:bg-black/[0.02]"
    >
      <span className="w-6 shrink-0 text-center text-sm font-bold">
        {isActive ? (
          <>
            <span className="group-hover:hidden">
              <PlayingWave />
            </span>
            <span className="hidden text-black group-hover:inline">❚❚</span>
          </>
        ) : isCurrent ? (
          <>
            <span className="text-black group-hover:hidden">❚❚</span>
            <span className="hidden text-black group-hover:inline">▶</span>
          </>
        ) : (
          <>
            <span className="text-fg-muted group-hover:hidden">{index}</span>
            <span className="hidden text-black group-hover:inline">▶</span>
          </>
        )}
      </span>
      <img
        src={getProviderImage(song.provider)}
        alt={song.name}
        className="size-10 object-cover"
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm font-medium',
            isCurrent ? 'font-bold text-black' : 'text-black',
          )}
        >
          {song.name}
        </p>
        {showProvider && (
          <p className="text-fg-muted text-xs">
            {providerLabel(song.provider)}
          </p>
        )}
      </div>
      {trailing}
    </div>
  )
}
