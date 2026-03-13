import { Link } from 'react-router'
import { useEffect, useRef } from 'react'

export function Test() {
  const skyRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      // The container scrolls at full speed (normal).
      // Sky compensates 90% of scroll → appears to move at 10% speed (nearly stuck)
      if (skyRef.current) {
        skyRef.current.style.transform = `translateY(${scrollY * 0.9}px)`
      }
      // Text compensates 65% → appears to move at 35% speed
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.65}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="text-black">
      {/* Hero — all layers in same container, guaranteed overlap */}
      <div className="relative overflow-hidden bg-black">
        {/* Sky — absolute, slightly oversized to cover anti-alias seam */}
        <img
          ref={skyRef}
          src="/sky.png"
          alt=""
          className="absolute -inset-x-0 z-0 block w-full will-change-transform"
          style={{ top: '-2px', height: 'calc(100% + 4px)' }}
        />

        {/* DAIJ text — absolute, between sky and grass */}
        <div
          ref={textRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center will-change-transform"
          style={{ paddingBottom: '15%' }}
        >
          <h1
            className="font-display text-[16vw] leading-none font-black tracking-tighter text-white select-none"
            style={{ textShadow: '0 4px 60px rgba(0,0,0,0.4)' }}
          >
            DAIJ
          </h1>
        </div>

        {/* Grass — relative, sizes the container, scrolls normally */}
        <img
          src="/grass.png"
          alt=""
          className="relative z-20 block w-full -translate-y-4"
        />
      </div>

      {/* Content below the hero */}
      <div className="relative z-30 bg-white">
        {/* Features */}
        <section className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase">
              The Future of Music
            </p>
            <h2 className="font-display mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              AI-Generated. Human-Rated.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Three leading AI models compose original tracks. You listen blind
              and decide which sounds best.
            </p>
          </div>

          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            {[
              {
                title: 'Listen Blind',
                desc: 'Tracks are played without revealing which AI made them. No bias, just vibes.',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
                title: 'Vote & Rank',
                desc: 'Pick your favorite in head-to-head matchups. Every vote shapes the leaderboard.',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20v-4" />
                  </svg>
                ),
              },
              {
                title: 'Discover',
                desc: 'Explore tracks from Claude, ChatGPT, and Gemini. Find your next favorite song.',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-gray-50 py-16">
          <div className="mx-auto grid max-w-4xl gap-8 px-6 text-center sm:grid-cols-3">
            {[
              { value: '3', label: 'AI Models' },
              { value: '100+', label: 'Tracks Generated' },
              { value: '10K+', label: 'Votes Cast' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-extrabold text-indigo-600">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to be the judge?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Jump into the arena and start voting on AI-generated music today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/arena"
              className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Enter the Arena
            </Link>
            <Link
              to="/leaderboard"
              className="rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-50"
            >
              View Leaderboard
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t px-6 py-8">
          <p className="text-center text-xs text-gray-400">
            daij — AI-generated music experiment
          </p>
        </footer>
      </div>
    </div>
  )
}
