import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Arena', path: '/arena' },
  { label: 'Leaderboard', path: '/leaderboard' },
]

export function Navbar() {
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav
      className={cn(
        'border-divider top-0 z-1 border-[0.5px] border-dashed bg-white/80 backdrop-blur-xl transition-[transform,opacity] duration-300',
      )}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      <div className="px-5">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-primary flex items-center gap-1 text-sm font-bold tracking-wider"
            >
              <img src="/logo.png" alt="DAIJ" className="size-4 rounded-full" />
              <span>
                DAIJ
              </span>
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
          <div className="flex">
            <div className="flex gap-4">
              <a
                href="https://x.com/whosmatu"
                target="_blank"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="currentColor"
                >
                  <path d="M19.633 7.997c.013.176.013.353.013.53 0 5.402-4.11 11.635-11.635 11.635-2.314 0-4.466-.675-6.276-1.844.322.039.634.052.969.052 1.922 0 3.688-.651 5.098-1.747-1.803-.033-3.326-1.221-3.847-2.854.254.039.508.065.776.065.373 0 .747-.052 1.096-.146-1.875-.377-3.293-2.029-3.293-4.017v-.052a4.56 4.56 0 0 0 2.087.584c-1.219-.814-2.014-2.206-2.014-3.782 0-.83.221-1.604.604-2.273C4.114 8.519 7.164 10.1 10.528 10.24c-.079-.33-.125-.672-.125-1.026 0-2.492 2.02-4.512 4.512-4.512 1.299 0 2.474.547 3.298 1.426a8.933 8.933 0 0 0 2.857-1.092 4.486 4.486 0 0 1-1.983 2.491 9.058 9.058 0 0 0 2.606-.703 9.531 9.531 0 0 1-2.259 2.34z" />
                </svg>
              </a>
              <a
                href="https://github.com/immatheus/daij"
                target="_blank"
                className="hover:text-secondary transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.489 2 12.026c0 4.423 2.867 8.174 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.164-1.11-1.475-1.11-1.475-.908-.62.069-.608.069-.608 1.003.071 1.53 1.033 1.53 1.033.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.635-1.338-2.221-.252-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.908-1.295 2.748-1.025 2.748-1.025.545 1.382.202 2.402.1 2.656.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.697-4.566 4.945.359.31.678.926.678 1.868 0 1.348-.013 2.438-.013 2.77 0 .269.18.579.688.481C19.135 20.196 22 16.448 22 12.026 22 6.489 17.523 2 12 2Z" />
                </svg>
              </a>
            </div>
            {/* <Button>
              Rank songs
            </Button> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
