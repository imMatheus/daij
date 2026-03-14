import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getProviderImage } from '@/lib/utils'
import { fetchJson } from '@/lib/api'
import { useSongs } from '@/useSongs'
import { PlayingWave } from '@/components/PlayingWave'
import type { Song } from '@/songs'
import { Button } from '@/components/button'
import { Dropdown } from '@/components/dropdown'
import { useTheme, THEME_COLORS } from '@/useTheme'
import { ClaudeAI, OpenAI, Gemini } from '@/components/icons'
import { Loader } from '@/components/Loader'

const PROVIDER_ICONS = {
  claude: ClaudeAI,
  chatgpt: OpenAI,
  gemini: Gemini,
} as const

const PROVIDER_CARDS = [
  {
    provider: 'claude' as const,
    eyebrow: 'ANTHROPIC',
    title: 'Claude',
  },
  {
    provider: 'chatgpt' as const,
    eyebrow: 'OPENAI',
    title: 'ChatGPT',
  },
  {
    provider: 'gemini' as const,
    eyebrow: 'GOOGLE',
    title: 'Gemini',
  },
]

export const Home = () => {
  const { theme, setTheme, themes } = useTheme()

  return (
    <div className="min-h-screen pb-10">
      <HeroArcs />
      <div className="mt-14 mb-5">
        <HeroTitle />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-4 flex w-max gap-3">
          <Link to="/arena">
            <Button>Rank songs</Button>
          </Link>
          <Link to="/leaderboard">
            <Button>Leaderboard</Button>
          </Link>
        </div>

        <h3 className="text-secondary mb-3 text-center text-xl font-medium">
          DAIJ is a platform for ranking and voting on AI-generated music.
        </h3>

        <div className="mt-20 space-y-20">
          <FeaturedSection />
          <LatestSongs />
          <AboutSection />
        </div>

        <footer className="pt-20 pb-52">
          <p className="text-tertiary text-center text-[10px]">
            daij — AI-generated music experiment
          </p>

          <div className="mb-2 flex items-start justify-between">
            <Dropdown
              trigger={
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block size-3 rounded-full"
                    style={{ background: THEME_COLORS[theme] }}
                  />
                  Theme
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path
                      d="M2.5 4.5L6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              }
              items={themes.map((t) => ({
                label: (
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block size-3 shrink-0 rounded-full"
                      style={{
                        background: THEME_COLORS[t],
                      }}
                    />
                    <span className="capitalize">{t}</span>
                    {t === theme && (
                      <svg
                        className="text-secondary ml-auto h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8.5l3.5 3.5L13 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                ),
                onClick: () => setTheme(t),
              }))}
            />
          </div>
        </footer>
      </div>
    </div>
  )
}

const ARCS = [
  { width: '100%', height: 48 },
  { width: '85%', height: 42 },
  { width: '70%', height: 34 },
  { width: '55%', height: 26 },
  { width: '40%', height: 18 },
]

function HeroArcs() {
  return (
    <div className="relative mx-auto mb-6 flex w-3/5 max-w-7xl flex-col items-center gap-0 overflow-hidden">
      {ARCS.map((arc, i) => (
        <div
          key={i}
          className="flex items-end justify-center rounded-full"
          style={{
            width: arc.width,
            height: arc.height,
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(var(--key-color-base))',
            boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22), inset 0 0 6px 0px rgba(255, 255, 255, 0.06), 0 1px 5px rgba(var(--key-color-base) / 0.29), 0 1px 8px rgba(var(--key-color-base) / 0.14)`,
            zIndex: ARCS.length - i,
            animation: `heroArc-${i} 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both`,
          }}
        />
      ))}
      <style>
        {ARCS.map((arc, i) => {
          const offsetAbove = ARCS.slice(0, i).reduce(
            (sum, a) => sum + a.height,
            0,
          )
          const startY = -(offsetAbove + arc.height)
          return `
            @keyframes heroArc-${i} {
              0% { 
                transform: translateY(${startY}px) scale(0.9); 
                opacity: 0.9;
                filter: blur(8px);
              }
              100% { 
                transform: translateY(0) scale(1); 
                opacity: 1;
                filter: blur(0px);
              }
            }
          `
        }).join('')}
      </style>
    </div>
  )
}

function HeroTitle() {
  const delay = ARCS.length * 0.1 + 0.3
  return (
    <h1
      className="font-panchang text-center text-9xl font-black tracking-widest uppercase"
      style={{
        animation: `heroTitle 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
      }}
    >
      <style>
        {`
          @keyframes heroTitle {
            0% {
              opacity: 0;
              transform: translateY(16px);
              filter: blur(6px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0px);
            }
          }
        `}
      </style>
      daij
    </h1>
  )
}

const STEPS = [
  {
    number: '01',
    title: 'Listen blind',
    description:
      'Two AI-generated songs play head-to-head. No labels, no bias — just music.',
    icon: (
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Cast your vote',
    description:
      'Pick the track that moves you. Every vote updates the ELO rankings in real time.',
    icon: (
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 9V5a3 3 0 0 0-6 0v4" />
        <path d="M5 9h14l1 12H4L5 9z" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'See who leads',
    description:
      'The leaderboard reveals which AI models consistently produce the best music.',
    icon: (
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
]

function AboutSection() {
  return (
    <section>
      <h2 className="text-primary mb-8 text-center text-[22px] leading-tight font-bold">
        How it works
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="relative overflow-hidden rounded-2xl p-6"
            style={{
              background:
                'linear-gradient(180deg, var(--surface) 0%, rgba(255,255,255,0) 100%)',
              boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.06)',
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-panchang text-key text-xs font-bold">
                {step.number}
              </span>
              <span className="text-tertiary">{step.icon}</span>
            </div>
            <h3 className="text-primary mb-1 text-base font-semibold">
              {step.title}
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturedSection() {
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {PROVIDER_CARDS.map((card) => (
        <Link
          key={card.provider}
          to={`/${card.provider}`}
          className="group block"
        >
          <div className="mb-2">
            <p className="text-secondary flex items-center gap-1 text-[11px] leading-tight font-medium tracking-wider uppercase">
              {(() => {
                const Icon = PROVIDER_ICONS[card.provider]
                return <Icon className="size-3" />
              })()}
              {card.eyebrow}
            </p>
            <p className="text-primary font-medium tracking-wider">
              {card.title}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={getProviderImage(card.provider)}
              alt={card.title}
              className="aspect-[1.74/1] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-[0.5px] ring-black/15 ring-inset" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[rgba(51,51,51,0.2)] opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-100" />
          </div>
        </Link>
      ))}
    </section>
  )
}

function LatestSongs() {
  const { data: songs } = useQuery({
    queryKey: ['top-songs'],
    queryFn: () => fetchJson<Song[]>('/leaderboard/songs'),
  })

  const displaySongs = songs?.slice(0, 16)

  return (
    <section className="">
      <div className="mb-3">
        <Link
          to="/leaderboard"
          className="text-primary hover:text-secondary inline-flex items-center gap-1 text-[22px] leading-tight font-medium transition-colors"
        >
          Top songs
          <svg className="size-4" viewBox="0 0 64 64" fill="currentColor">
            <path d="M19.817 61.863c1.48 0 2.672-.515 3.702-1.546l24.243-23.63c1.352-1.385 1.996-2.737 2.028-4.443 0-1.674-.644-3.09-2.028-4.443L23.519 4.138c-1.03-.998-2.253-1.513-3.702-1.513-2.994 0-5.409 2.382-5.409 5.344 0 1.481.612 2.833 1.739 3.96l20.99 20.347-20.99 20.283c-1.127 1.126-1.739 2.478-1.739 3.96 0 2.93 2.415 5.344 5.409 5.344Z" />
          </svg>
        </Link>
      </div>

      {!displaySongs ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      className="group hover:bg-surface relative flex cursor-pointer items-center gap-3 py-[8px] pr-2 transition-colors"
    >
      <div className="absolute right-0 bottom-0 left-0 h-[0.5px] bg-[rgba(0,0,0,0.15)]"></div>
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

      <div className="min-w-0 flex-1 font-medium tracking-wider">
        <p className="text-primary truncate text-xs">{song.name}</p>
        <p className="text-secondary truncate text-xs">
          {providerLabel(song.provider)}
        </p>
      </div>
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
