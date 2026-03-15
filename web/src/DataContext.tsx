import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Song } from './songs'
import { SongsContext } from './useSongs'
import { postJson } from './lib/api'

export const SongsProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[] | null>(null)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [queue, setQueue] = useState<Song[]>([])
  const [loop, setLoop] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const queueRef = useRef<Song[]>([])
  const currentSongRef = useRef<Song | null>(null)
  const loopRef = useRef(false)
  const listenSentRef = useRef(false)
  const continuousStartRef = useRef<number | null>(null)

  useEffect(() => {
    queueRef.current = queue
  }, [queue])

  useEffect(() => {
    currentSongRef.current = currentSong
  }, [currentSong])

  useEffect(() => {
    loopRef.current = loop
  }, [loop])

  const currentIndex = currentSong
    ? queue.findIndex((s) => s.id === currentSong.id)
    : -1
  const hasNext =
    currentIndex >= 0 &&
    (currentIndex < queue.length - 1 || (loop && queue.length > 1))
  const hasPrev =
    currentIndex >= 0 && (currentIndex > 0 || (loop && queue.length > 1))

  useEffect(() => {
    fetch('http://localhost:3001/songs')
      .then((res) => res.json())
      .then((data) => setSongs(data))
  }, [])

  const playInternal = (song: Song) => {
    const audio = audioRef.current
    if (!audio) return

    listenSentRef.current = false
    continuousStartRef.current = Date.now()

    setCurrentTime(0)
    setDuration(0)
    audio.src = song.audioUrl
    audio.play()
    setCurrentSong(song)
    setIsPlaying(true)
  }

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      if (
        !listenSentRef.current &&
        continuousStartRef.current !== null &&
        Date.now() - continuousStartRef.current >= 3000 &&
        currentSongRef.current
      ) {
        listenSentRef.current = true
        postJson(`/songs/${currentSongRef.current.id}/listen`, {}).catch(() => {})
      }
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => {
      const q = queueRef.current
      const cur = currentSongRef.current
      const isLoop = loopRef.current
      if (cur && q.length > 0) {
        const idx = q.findIndex((s) => s.id === cur.id)
        if (idx >= 0) {
          if (idx < q.length - 1) {
            playInternal(q[idx + 1])
            return
          }
          if (isLoop) {
            playInternal(q[0])
            return
          }
        }
      }
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [])

  const play = (
    song: Song,
    newQueue?: Song[],
    options?: { anonymous?: boolean; loop?: boolean },
  ) => {
    playInternal(song)
    setQueue(newQueue ?? [])
    setLoop(options?.loop ?? false)
    setAnonymous(options?.anonymous ?? false)
  }

  const pause = () => {
    audioRef.current?.pause()
    continuousStartRef.current = null
    setIsPlaying(false)
  }

  const resume = () => {
    audioRef.current?.play()
    if (!listenSentRef.current) {
      continuousStartRef.current = Date.now()
    }
    setIsPlaying(true)
  }

  const clearContext = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
    }
    setCurrentSong(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setQueue([])
    setLoop(false)
    setAnonymous(false)
  }

  const seek = (time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }

  const playNext = () => {
    if (!hasNext) return
    const nextIndex = currentIndex < queue.length - 1 ? currentIndex + 1 : 0
    playInternal(queue[nextIndex])
  }

  const playPrev = () => {
    if (!hasPrev) return
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1
    playInternal(queue[prevIndex])
  }

  return (
    <SongsContext.Provider
      value={{
        songs,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        queue,
        hasNext,
        hasPrev,
        anonymous,
        setAnonymous,
        play,
        pause,
        resume,
        clearContext,
        seek,
        playNext,
        playPrev,
      }}
    >
      {children}
    </SongsContext.Provider>
  )
}
