import { createContext, useContext } from 'react'
import type { Song } from './songs'

type PlayOptions = {
  anonymous?: boolean
  loop?: boolean
}

type SongsContextType = {
  songs: Song[] | null
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  queue: Song[]
  hasNext: boolean
  hasPrev: boolean
  anonymous: boolean
  setAnonymous: (value: boolean) => void
  play: (song: Song, queue?: Song[], options?: PlayOptions) => void
  pause: () => void
  resume: () => void
  clearContext: () => void
  seek: (time: number) => void
  playNext: () => void
  playPrev: () => void
}

export const SongsContext = createContext<SongsContextType | undefined>(
  undefined,
)

export const useSongs = () => {
  const context = useContext(SongsContext)
  if (context === undefined) {
    throw new Error('useSongs must be used within a SongsContext')
  }
  return context
}
