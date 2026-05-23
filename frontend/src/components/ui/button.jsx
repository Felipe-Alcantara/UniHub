import { forwardRef } from 'react'

const variants = {
  default: 'bg-indigo-500 text-white hover:bg-indigo-600',
  outline: 'border border-white/10 bg-transparent hover:bg-white/5 text-zinc-50',
  ghost: 'bg-transparent hover:bg-white/5 text-zinc-50',
  secondary: 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700',
  success: 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400',
  warning: 'bg-amber-400 text-zinc-950 hover:bg-amber-300',
}

const sizes = {
  md: 'h-10 px-4 py-2 text-sm',
  sm: 'h-9 px-3 text-sm',
  lg: 'h-11 px-6 text-base',
  icon: 'h-10 w-10',
}

const Button = forwardRef(({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={props.type || 'button'}
      className={`
        inline-flex items-center justify-center gap-2 rounded-2xl font-medium whitespace-nowrap
        transition-all duration-300 cursor-pointer
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
