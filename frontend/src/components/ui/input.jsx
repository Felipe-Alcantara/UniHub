import { forwardRef } from 'react'

const Input = forwardRef(({ className = '', label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? <label className="text-sm font-medium text-[#C8CDD6]">{label}</label> : null}
      <input
        ref={ref}
        className={`h-10 w-full rounded-xl border border-white/10 bg-[#131518] px-3 text-sm text-white placeholder:text-[#8A919E] transition-colors focus:border-[#E86A10] focus:outline-none ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
