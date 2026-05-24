const variantStyles = {
  neutral: 'bg-white/5 text-[#C8CDD6] border-white/10',
  brand: 'bg-[#E86A10]/20 text-[#FFB679] border-[#E86A10]/40',
  success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  warning: 'bg-amber-400/20 text-amber-100 border-amber-400/40',
  urgent: 'bg-red-500/20 text-red-200 border-red-500/40',
  info: 'bg-sky-500/20 text-sky-200 border-sky-500/40',
}

function Badge({ variant = 'neutral', className = '', children, ...props }) {
  return (
    <span
      className={`ui-badge ui-badge-${variant} inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
