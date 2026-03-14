import { useEffect, useRef, useState } from 'react'
import { useSongs } from '@/useSongs'

type StrudelEditorEl = HTMLElement & {
  editor: {
    evaluate: () => void
    stop: () => void
    setTheme: (t: string) => void
  } | null
}

export function StrudelEditor({ code }: { code: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const editorElRef = useRef<StrudelEditorEl | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const { pause: pausePlayer, isPlaying: isPlayerPlaying } = useSongs()
  const prevPlaying = useRef(false)

  // When strudel starts (via button or keyboard), pause the song player
  useEffect(() => {
    if (playing && !prevPlaying.current) {
      pausePlayer()
    }
    prevPlaying.current = playing
  }, [playing, pausePlayer])

  // When song player starts, stop strudel
  useEffect(() => {
    if (isPlayerPlaying && playing) {
      editorElRef.current?.editor?.stop()
      setPlaying(false)
    }
  }, [isPlayerPlaying, playing])

  // Stop strudel when tab becomes hidden
  useEffect(() => {
    if (!playing) return

    const onVisibilityChange = () => {
      if (document.hidden) {
        editorElRef.current?.editor?.stop()
        setPlaying(false)
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [playing])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let disposed = false

    async function init() {
      await import('@strudel/repl')

      if (disposed || !wrapper) return

      const el = document.createElement('strudel-editor') as StrudelEditorEl
      el.setAttribute('code', code)
      el.addEventListener('update', ((e: CustomEvent) => {
        setPlaying(e.detail?.started ?? false)
      }) as EventListener)

      wrapper.appendChild(el)
      editorElRef.current = el

      el.editor?.setTheme('githubLight')

      setReady(true)
    }

    init()

    return () => {
      disposed = true
      editorElRef.current?.editor?.stop()
      editorElRef.current = null
      wrapper.replaceChildren()
      setReady(false)
      setPlaying(false)
    }
  }, [code])

  const handlePlay = () => {
    pausePlayer()
    editorElRef.current?.editor?.evaluate()
  }

  const handleStop = () => {
    editorElRef.current?.editor?.stop()
    setPlaying(false)
  }

  return (
    <div>
      <div className="mb-3 sticky top-0 flex items-center gap-2">
        {playing ? (
          <button
            onClick={handleStop}
            className="flex items-center gap-1.5 border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="4" y="4" width="16" height="16" />
            </svg>
            Stop
          </button>
        ) : (
          <button
            onClick={handlePlay}
            disabled={!ready}
            className="flex items-center gap-1.5 border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-black disabled:cursor-default disabled:opacity-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="6,4 20,12 6,20" />
            </svg>
            Play
          </button>
        )}
        <span className="text-fg-muted text-xs">
          ctrl+enter to play &middot; ctrl+. to stop
        </span>
      </div>
      <div
        ref={wrapperRef}
        // className="overflow-hidden border border-black/10 [&_.cm-editor]:max-h-[600px] [&_.cm-editor]:text-sm"
        className="overflow-hidden border border-black/10 [&_.cm-editor]:text-sm"
      />
    </div>
  )
}
