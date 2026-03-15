import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Arena', path: '/arena' },
  { label: 'Leaderboard', path: '/leaderboard' },
]

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)

  if (!isHome && !scrolled) {
    setScrolled(true)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav
      className={cn(
        'border-divider top-0 z-1 border-[0.5px] border-dashed bg-white/80 backdrop-blur-xl transition-all duration-300',
        isHome ? 'fixed w-full' : 'sticky',
        scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
      )}
    >
      <div className="px-5">
        <div className="mx-auto flex h-11 max-w-7xl items-center gap-6">
          <Link
            to="/"
            className="text-primary text-sm font-bold tracking-wider"
          >
            DAIJ
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                  isActive(item.path)
                    ? 'text-primary bg-surface'
                    : 'text-secondary hover:text-primary',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
