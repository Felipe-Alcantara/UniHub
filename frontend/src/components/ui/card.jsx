function Card({ className = '', children, ...props }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-[#1E2127] ${className}`} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className = '', children, ...props }) {
  return (
    <h3 className={`text-base font-bold text-white ${className}`} {...props}>
      {children}
    </h3>
  )
}

function CardDescription({ className = '', children, ...props }) {
  return (
    <p className={`text-sm text-[#8A919E] ${className}`} {...props}>
      {children}
    </p>
  )
}

function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`px-5 pb-5 ${className}`} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={`px-5 pb-5 ${className}`} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
