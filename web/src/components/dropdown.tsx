import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: React.ReactNode
  onClick?: () => void
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  className?: string
}

export const Dropdown = ({ trigger, items, className }: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(245, 245, 245, 1) 100%)',
          color: 'var(--primary)',
          boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.5),
            inset 0 0 6px 0px rgba(255, 255, 255, 0.15),
            0 1px 3px rgba(0, 0, 0, 0.08),
            0 1px 8px rgba(0, 0, 0, 0.05)`,
          border: 'none',
          outline: 'none',
        }}
      >
        {trigger}
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl py-1"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%)',
            boxShadow: `0 4px 24px rgba(0, 0, 0, 0.12),
              0 1px 5px rgba(0, 0, 0, 0.08),
              inset 0 0 0 0.5px rgba(0, 0, 0, 0.06)`,
          }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onClick?.()
                setOpen(false)
              }}
              className="text-primary hover:bg-surface w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
