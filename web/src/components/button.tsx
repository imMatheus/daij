import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, className, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'cursor-pointer rounded-full px-5 py-[9px] text-base font-semibold transition-opacity hover:opacity-90 focus:border-0 focus:ring-0 focus:outline-none',
        disabled && 'cursor-default opacity-30',
        className,
      )}
      disabled={disabled}
      style={{
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(var(--key-color-base))',
        color: 'rgba(var(--key-color-base) / 1)',
        boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22), inset 0 0 6px 0px rgba(255, 255, 255, 0.06), 0 1px 5px rgba(var(--key-color-base) / 0.29), 0 1px 8px rgba(var(--key-color-base) / 0.14)`,
        outline: 'none',
        border: 'none',
      }}
      {...props}
    >
      <span
        className="flex items-center gap-1"
        style={{
          background:
            'linear-gradient(180deg, color(display-p3 1 1 1 / 0.94) 0%, color(display-p3 1 1 1 / 0.76) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: `inset 0 0 0 rgba(255, 255, 255, 0.15),
              0 4px 13px rgba(0, 0, 0, 0.08),
              0 0.5px 2px rgba(0, 0, 0, 0.13)`,
        }}
      >
        {children}
      </span>
    </button>
  )
}
