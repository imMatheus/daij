import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export const Button = ({
  children,
  className,
  disabled,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none',
        variant === 'primary' &&
          'bg-black text-white hover:bg-black/80',
        variant === 'secondary' &&
          'text-primary hover:bg-black/5 ring-1 ring-black/10 ring-inset',
        disabled && 'pointer-events-none opacity-30',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
