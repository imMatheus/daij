import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getProviderImage } from '@/lib/utils'
import { fetchJson } from '@/lib/api'
import { useSongs } from '@/useSongs'
import { PlayingWave } from '@/components/PlayingWave'
import type { Song } from '@/songs'
import { Button } from '@/components/button'

const PROVIDER_CARDS = [
  {
    provider: 'claude' as const,
    eyebrow: 'ANTHROPIC',
    title: 'Claude',
    subtitle: 'Melodic patterns through code-driven synthesis',
  },
  {
    provider: 'chatgpt' as const,
    eyebrow: 'OPENAI',
    title: 'ChatGPT',
    subtitle: 'Creative prompting meets algorithmic composition',
  },
  {
    provider: 'gemini' as const,
    eyebrow: 'GOOGLE',
    title: 'Gemini',
    subtitle: 'Language translated into layered soundscapes',
  },
]

export const Home = () => {
  return (
    <div className="min-h-screen bg-white py-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* header-emphasized: 700 34px/1.176 */}
        <h1 className="text-primary mb-2 text-5xl font-bold">DAIJ</h1>

        <h3 className="text-secondary mb-3 text-xl font-medium">
          DAIJ is a platform for ranking and voting on AI-generated music.
        </h3>

        <div className="mb-10 flex gap-3">
          <Link to="/arena">
            <Button>Rank songs</Button>
          </Link>
          <Link to="/leaderboard">
            <Button>Leaderboard</Button>
          </Link>
        </div>

        <FeaturedSection />
        <LatestSongs />

        <footer className="">
          <p className="text-tertiary text-center text-[10px]">
            daij — AI-generated music experiment
          </p>
        </footer>
      </div>
    </div>
  )
}

function FeaturedSection() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PROVIDER_CARDS.map((card) => (
        <Link
          key={card.provider}
          to={`/${card.provider}`}
          className="group block"
        >
          {/* description: margin-bottom 15px, min-height 60px */}
          <div className="mb-[15px] min-h-[60px]">
            {/* eyebrow: subhead-emphasized = 600 11px/1.27 */}
            <p
              className="text-secondary uppercase"
              style={{ font: '600 11px/1.27 var(--font-sans)' }}
            >
              {card.eyebrow}
            </p>
            {/* title: title-2 = 400 16px/1.375 */}
            <p
              className="text-primary line-clamp-2"
              style={{ font: '400 16px/1.375 var(--font-sans)' }}
            >
              {card.title}
            </p>
            {/* subtitle: title-2 = 400 16px/1.375, systemSecondary */}
            <p
              className="text-secondary line-clamp-1"
              style={{ font: '400 16px/1.375 var(--font-sans)' }}
            >
              {card.subtitle}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={getProviderImage(card.provider)}
              alt={card.title}
              className="aspect-[1.74/1] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />
            {/* hover overlay: rgba(51,51,51,.3) */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[rgba(51,51,51,0.3)] opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-100" />
            {/* artwork description: padding 24px 16px 16px */}
            <div
              className="absolute right-0 bottom-0 left-0 min-h-[100px] rounded-b-2xl px-4 pt-6 pb-4"
              style={{
                backgroundImage:
                  'linear-gradient(transparent, rgba(0,0,0,0.4))',
              }}
            >
              {/* callout: 400 12px/1.25 */}
              <p
                className="line-clamp-3 text-white"
                style={{ font: '400 12px/1.25 var(--font-sans)' }}
              >
                {card.subtitle}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}

function LatestSongs() {
  const { data: songs } = useQuery({
    queryKey: ['all-songs'],
    queryFn: () => fetchJson<Song[]>('/songs'),
  })

  const displaySongs = songs?.slice(0, 16)

  return (
    <section className="">
      {/* Section header with chevron link */}
      <div className="mb-3">
        <Link
          to="/leaderboard"
          className="text-primary hover:text-secondary inline-flex items-center gap-1 transition-colors"
          style={{ font: '700 22px/1.18 var(--font-sans)' }}
        >
          Latest Songs
          <svg
            className="h-[18px] w-[18px]"
            viewBox="0 0 64 64"
            fill="currentColor"
          >
            <path d="M19.817 61.863c1.48 0 2.672-.515 3.702-1.546l24.243-23.63c1.352-1.385 1.996-2.737 2.028-4.443 0-1.674-.644-3.09-2.028-4.443L23.519 4.138c-1.03-.998-2.253-1.513-3.702-1.513-2.994 0-5.409 2.382-5.409 5.344 0 1.481.612 2.833 1.739 3.96l20.99 20.347-20.99 20.283c-1.127 1.126-1.739 2.478-1.739 3.96 0 2.93 2.415 5.344 5.409 5.344Z" />
          </svg>
        </Link>
      </div>

      {!displaySongs ? (
        <p
          className="text-secondary py-8 text-center"
          style={{ font: '400 13px/1.23 var(--font-sans)' }}
        >
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displaySongs.map((song) => (
            <SongCell key={song.id} song={song} queue={displaySongs} />
          ))}
        </div>
      )}
    </section>
  )
}

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

function SongCell({ song, queue }: { song: Song; queue: Song[] }) {
  const { play, pause, resume, currentSong, isPlaying } = useSongs()
  const isCurrent = currentSong?.id === song.id
  const isActive = isCurrent && isPlaying

  const handleClick = () => {
    if (isActive) pause()
    else if (isCurrent) resume()
    else play(song, queue)
  }

  return (
    <div
      onClick={handleClick}
      className="group border-divider hover:bg-surface flex cursor-pointer items-center gap-3 border-b py-[5px] transition-colors"
    >
      {/* Thumbnail — 40px, border-radius 6px, subtle shadow */}
      <div className="relative size-10 shrink-0 overflow-hidden rounded-md">
        <img
          src={getProviderImage(song.provider)}
          alt={song.name}
          className="size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 rounded-md ring-[0.5px] ring-black/10 ring-inset" />
        {/* Hover play overlay */}
        {isActive ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <PlayingWave />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm text-white">▶</span>
          </div>
        )}
      </div>

      {/* Song info — callout: 400 12px/1.25 */}
      <div className="min-w-0 flex-1">
        <p
          className="text-primary truncate"
          style={{ font: '400 12px/1.25 var(--font-sans)' }}
        >
          {song.name}
        </p>
        <p
          className="text-secondary truncate"
          style={{ font: '400 12px/1.25 var(--font-sans)' }}
        >
          {providerLabel(song.provider)}
        </p>
      </div>

      {/* More button — keyColor #fa233b */}
      <button
        className="shrink-0 px-1 transition-opacity hover:opacity-70"
        style={{
          color: 'var(--key-color)',
          font: '800 16px/1 var(--font-sans)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        &middot;&middot;&middot;
      </button>
    </div>
  )
}

{
  /* <div className="p-10 flex gap-3">


          <button className="mt-6 px-5 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-0 focus:border-0"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12pt',
              fontWeight: 500,
              paddingTop: '9px',
              paddingBottom: '9px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), color(display-p3 0.29 0.025 0.3)',
              color: 'color(display-p3 0.29 0.025 1)',
              // #ff0054
              boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              inset 0 0 6px 0px rgba(255, 255, 255, 0.06)`,
              // boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              // inset 0 0 6px 0px rgba(255, 255, 255, 0.06),
              // 0 1px 5px color(display-p3 0.29 0.025 1 / 0.29),
              // 0 1px 8px color(display-p3 0.29 0.025 1 / 0.14)`,
              outline: 'none',
              border: 'none',
            }}>
            <span
              style={{
                background: 'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16.2891 16.416"
                style={{
                  filter: 'drop-shadow(0 4px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 0.5px 2px rgba(0, 0, 0, 0.13))'
                }}

              >
                <title>Play trailer</title><defs data-sentry-element="defs" data-sentry-source-file="PreviewButton.tsx"><linearGradient id="playGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-sentry-element="linearGradient" data-sentry-source-file="PreviewButton.tsx"><stop offset="0%" stopColor="color(display-p3 1 1 1 / 0.94)" data-sentry-element="stop" data-sentry-source-file="PreviewButton.tsx"></stop><stop offset="100%" stop-color="color(display-p3 1 1 1 / 0.76)"></stop></linearGradient></defs><path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578Z" fill="url(#playGradient)"></path></svg>
              Trailer</span>
          </button>


          <button className="mt-6 px-5 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-0 focus:border-0"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12pt',
              fontWeight: 500,
              paddingTop: '9px',
              paddingBottom: '9px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), #ff0054',
              color: '#ff0054',
              // #ff0054
              // boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              // inset 0 0 6px 0px rgba(255, 255, 255, 0.06)`,
              boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              inset 0 0 6px 0px rgba(255, 255, 255, 0.06),
              0 1px 5px rgba(255, 0, 84, 0.29),
              0 1px 8px rgba(255, 0, 84, 0.14)`,
              outline: 'none',
              border: 'none',
            }}>
            <span
              style={{
                background: 'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16.2891 16.416"
                style={{
                  filter: 'drop-shadow(0 4px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 0.5px 2px rgba(0, 0, 0, 0.13))'
                }}

              >
                <title>Play trailer</title><defs data-sentry-element="defs" data-sentry-source-file="PreviewButton.tsx"><linearGradient id="playGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-sentry-element="linearGradient" data-sentry-source-file="PreviewButton.tsx"><stop offset="0%" stopColor="color(display-p3 1 1 1 / 0.94)" data-sentry-element="stop" data-sentry-source-file="PreviewButton.tsx"></stop><stop offset="100%" stop-color="color(display-p3 1 1 1 / 0.76)"></stop></linearGradient></defs><path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578Z" fill="url(#playGradient)"></path></svg>
              Trailer</span>
          </button>



          <button className="mt-6 px-5 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-0 focus:border-0"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12pt',
              fontWeight: 500,
              paddingTop: '9px',
              paddingBottom: '9px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(214, 34, 70)',
              color: 'rgb(214, 34, 70)',
              // #ff0054
              // boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              // inset 0 0 6px 0px rgba(255, 255, 255, 0.06)`,
              boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              inset 0 0 6px 0px rgba(255, 255, 255, 0.06),
              0 1px 5px rgba(214, 34, 70, 0.29),
              0 1px 8px rgba(214, 34, 70, 0.14)`,
              outline: 'none',
              border: 'none',
            }}>
            <span
              style={{
                background: 'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16.2891 16.416"
                style={{
                  filter: 'drop-shadow(0 4px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 0.5px 2px rgba(0, 0, 0, 0.13))'
                }}

              >
                <title>Play trailer</title><defs data-sentry-element="defs" data-sentry-source-file="PreviewButton.tsx"><linearGradient id="playGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-sentry-element="linearGradient" data-sentry-source-file="PreviewButton.tsx"><stop offset="0%" stopColor="color(display-p3 1 1 1 / 0.94)" data-sentry-element="stop" data-sentry-source-file="PreviewButton.tsx"></stop><stop offset="100%" stop-color="color(display-p3 1 1 1 / 0.76)"></stop></linearGradient></defs><path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578Z" fill="url(#playGradient)"></path></svg>
              Trailer</span>
          </button>


          <button className="mt-6 px-5 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-0 focus:border-0"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12pt',
              fontWeight: 500,
              paddingTop: '9px',
              paddingBottom: '9px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(41, 191, 18)',
              color: 'rgb(41, 191, 18)',
              boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              inset 0 0 6px 0px rgba(255, 255, 255, 0.06),
              0 1px 5px rgba(41, 191, 18, 0.29),
              0 1px 8px rgba(41, 191, 18, 0.14)`,
              outline: 'none',
              border: 'none',
            }}>
            <span
              style={{
                background: 'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16.2891 16.416"
                style={{
                  filter: 'drop-shadow(0 4px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 0.5px 2px rgba(0, 0, 0, 0.13))'
                }}

              >
                <title>Play trailer</title><defs data-sentry-element="defs" data-sentry-source-file="PreviewButton.tsx"><linearGradient id="playGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-sentry-element="linearGradient" data-sentry-source-file="PreviewButton.tsx"><stop offset="0%" stopColor="color(display-p3 1 1 1 / 0.94)" data-sentry-element="stop" data-sentry-source-file="PreviewButton.tsx"></stop><stop offset="100%" stop-color="color(display-p3 1 1 1 / 0.76)"></stop></linearGradient></defs><path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578Z" fill="url(#playGradient)"></path></svg>
              Trailer</span>
          </button>

          <button className="mt-6 px-5 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-0 focus:border-0"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12pt',
              fontWeight: 500,
              paddingTop: '9px',
              paddingBottom: '9px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(7, 42, 200)',
              color: 'rgb(7, 42, 200)',
              boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              inset 0 0 6px 0px rgba(255, 255, 255, 0.06),
              0 1px 5px rgba(7, 42, 200, 0.29),
              0 1px 8px rgba(7, 42, 200, 0.14)`,
              outline: 'none',
              border: 'none',
            }}>
            <span
              style={{
                background: 'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16.2891 16.416"
                style={{
                  filter: 'drop-shadow(0 4px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 0.5px 2px rgba(0, 0, 0, 0.13))'
                }}

              >
                <title>Play trailer</title><defs data-sentry-element="defs" data-sentry-source-file="PreviewButton.tsx"><linearGradient id="playGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-sentry-element="linearGradient" data-sentry-source-file="PreviewButton.tsx"><stop offset="0%" stopColor="color(display-p3 1 1 1 / 0.94)" data-sentry-element="stop" data-sentry-source-file="PreviewButton.tsx"></stop><stop offset="100%" stop-color="color(display-p3 1 1 1 / 0.76)"></stop></linearGradient></defs><path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578Z" fill="url(#playGradient)"></path></svg>
              Trailer</span>
          </button>

          <button className="mt-6 px-5 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-0 focus:border-0"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12pt',
              fontWeight: 500,
              paddingTop: '9px',
              paddingBottom: '9px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(255, 189, 0)',
              color: 'rgb(255, 189, 0)',
              boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              inset 0 0 6px 0px rgba(255, 255, 255, 0.06),
              0 1px 5px rgba(255, 189, 0, 0.29),
              0 1px 8px rgba(255, 189, 0, 0.14)`,
              outline: 'none',
              border: 'none',
            }}>
            <span
              style={{
                background: 'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16.2891 16.416"
                style={{
                  filter: 'drop-shadow(0 4px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 0.5px 2px rgba(0, 0, 0, 0.13))'
                }}

              >
                <title>Play trailer</title><defs data-sentry-element="defs" data-sentry-source-file="PreviewButton.tsx"><linearGradient id="playGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-sentry-element="linearGradient" data-sentry-source-file="PreviewButton.tsx"><stop offset="0%" stopColor="color(display-p3 1 1 1 / 0.94)" data-sentry-element="stop" data-sentry-source-file="PreviewButton.tsx"></stop><stop offset="100%" stop-color="color(display-p3 1 1 1 / 0.76)"></stop></linearGradient></defs><path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578Z" fill="url(#playGradient)"></path></svg>
              Trailer</span>
          </button>


          <button className="mt-6 px-5 rounded-full hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-0 focus:border-0"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12pt',
              fontWeight: 500,
              paddingTop: '9px',
              paddingBottom: '9px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(251, 86, 7)',
              color: 'rgb(251, 86, 7)',
              boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22),
              inset 0 0 6px 0px rgba(255, 255, 255, 0.06),
              0 1px 5px rgba(251, 86, 7, 0.29),
              0 1px 8px rgba(251, 86, 7, 0.14)`,
              outline: 'none',
              border: 'none',
            }}>
            <span
              style={{
                background: 'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16.2891 16.416"
                style={{
                  filter: 'drop-shadow(0 4px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 0.5px 2px rgba(0, 0, 0, 0.13))'
                }}

              >
                <title>Play trailer</title><defs data-sentry-element="defs" data-sentry-source-file="PreviewButton.tsx"><linearGradient id="playGradient" x1="0%" y1="0%" x2="0%" y2="100%" data-sentry-element="linearGradient" data-sentry-source-file="PreviewButton.tsx"><stop offset="0%" stopColor="color(display-p3 1 1 1 / 0.94)" data-sentry-element="stop" data-sentry-source-file="PreviewButton.tsx"></stop><stop offset="100%" stop-color="color(display-p3 1 1 1 / 0.76)"></stop></linearGradient></defs><path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578Z" fill="url(#playGradient)"></path></svg>
              Trailer</span>
          </button>

        </div> */
}
