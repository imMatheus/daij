import { useEffect, useRef, useState } from 'react'
import { useSongs } from '@/useSongs'
import { Button } from '@/components/button'
import { PlayIcon, PauseIcon } from '@/components/icons'

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
      <div className="sticky top-0 mb-3 flex items-center gap-2">
        {playing ? (
          <Button onClick={handleStop}>
            <PauseIcon className="size-3" />
            Stop
          </Button>
        ) : (
          <Button onClick={handlePlay} disabled={!ready}>
            <PlayIcon className="size-3" />
            Play
          </Button>
        )}
        <span
          className="text-tertiary"
          style={{ font: '400 11px/1.27 var(--font-sans)' }}
        >
          ctrl+enter to play &middot; ctrl+. to stop
        </span>
      </div>
      <div
        ref={wrapperRef}
        className="border-divider overflow-hidden rounded-lg border [&_.cm-editor]:text-sm"
      />
    </div>
  )
}
