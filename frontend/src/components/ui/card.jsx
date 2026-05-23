function Card({ className = '', glow = false, children, ...props }) {
  return (
    <div
      className={`
        rounded-3xl border bg-zinc-950/50 border-white/10
        transition-all duration-300 hover:border-white/20
        ${glow ? 'unihub-card-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-5 pb-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className = '', children, ...props }) {
  return (
    <h3 className={`text-base font-bold leading-tight text-zinc-50 ${className}`} {...props}>
      {children}
    </h3>
  )
}

function CardDescription({ className = '', children, ...props }) {
  return (
    <p className={`text-sm text-zinc-400 ${className}`} {...props}>
      {children}
    </p>
  )
}

function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={`flex items-center p-5 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
