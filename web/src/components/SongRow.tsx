import type { ReactNode } from 'react'
import { cn, getProviderImage, providerLabel } from '@/lib/utils'
import { useSongs } from '@/useSongs'
import { PlayingWave } from '@/components/PlayingWave'
import type { Song } from '@/songs'

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
      className="group border-divider hover:bg-surface flex cursor-pointer items-center gap-3 border-b px-5 py-[5px] transition-colors"
    >
      <span
        className="w-6 shrink-0 text-center"
        style={{ font: '400 12px/1.25 var(--font-sans)' }}
      >
        {isActive ? (
          <>
            <span className="group-hover:hidden">
              <PlayingWave theme={'black'} />
            </span>
            <span className="text-primary hidden group-hover:inline">❚❚</span>
          </>
        ) : isCurrent ? (
          <>
            <span className="text-primary group-hover:hidden">❚❚</span>
            <span className="text-primary hidden group-hover:inline">▶</span>
          </>
        ) : (
          <>
            <span className="text-secondary group-hover:hidden">{index}</span>
            <span className="text-primary hidden group-hover:inline">▶</span>
          </>
        )}
      </span>
      <img
        src={getProviderImage(song.provider)}
        alt={song.name}
        className="size-10 rounded-md object-cover"
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-primary truncate',
            isCurrent ? 'font-medium' : '',
          )}
          style={{ font: '400 12px/1.25 var(--font-sans)' }}
        >
          {song.name}
        </p>
        {showProvider && (
          <p
            className="text-secondary truncate"
            style={{ font: '400 12px/1.25 var(--font-sans)' }}
          >
            {providerLabel(song.provider)}
          </p>
        )}
      </div>
      {trailing}
    </div>
  )
}
