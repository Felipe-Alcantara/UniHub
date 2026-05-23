const variantStyles = {
  default: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  urgent: 'bg-red-950/80 text-red-300 border-red-700/60',
  warning: 'bg-yellow-400/20 text-yellow-100 border-yellow-400/40',
  success: 'bg-green-950/80 text-green-300 border-green-700/60',
  info: 'bg-blue-950/80 text-blue-300 border-blue-700/60',
  neutral: 'bg-zinc-800/80 text-zinc-300 border-zinc-600/40',
}

function Badge({ variant = 'default', className = '', children, ...props }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full border px-3 py-1
        text-xs font-medium transition-colors
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
