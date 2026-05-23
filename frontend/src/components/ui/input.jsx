import { forwardRef } from 'react'

const Input = forwardRef(({ className = '', label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          h-10 w-full rounded-xl bg-zinc-800/50 border border-white/10
          px-3 text-sm text-zinc-50 placeholder:text-zinc-500
          transition-all duration-300
          focus:outline-none focus:border-indigo-500/50
          focus:shadow-[0_0_0_2px_rgba(99,102,241,0.4),0_0_0_4px_rgba(99,102,241,0.2)]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-400">{error}</span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
