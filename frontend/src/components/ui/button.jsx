import { forwardRef } from 'react'

const variants = {
  primary: 'bg-[#E86A10] text-white hover:bg-[#FF7B1C] border border-[#E86A10]',
  outline: 'border border-white/15 bg-transparent text-zinc-100 hover:bg-white/5',
  ghost: 'bg-transparent text-zinc-200 hover:bg-white/5 border border-transparent',
  surface: 'bg-[#1E2127] text-zinc-100 hover:bg-[#262A31] border border-white/10',
  success: 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 border border-emerald-400',
  danger: 'bg-red-500 text-white hover:bg-red-400 border border-red-400',
}

const sizes = {
  md: 'h-10 px-4 text-sm',
  sm: 'h-9 px-3 text-sm',
  lg: 'h-11 px-6 text-sm',
  icon: 'h-10 w-10',
}

const Button = forwardRef(({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={props.type || 'button'}
      className={`ui-button ui-button-${variant} inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
