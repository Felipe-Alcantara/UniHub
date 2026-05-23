import { Card, CardContent } from '../ui/card'

function StatCard({ icon: Icon, label, value, trend, className = '' }) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400">
          <Icon size={22} />
        </div>
        <div>
          <p className="text-2xl font-bold text-zinc-50">{value}</p>
          <p className="text-xs text-zinc-500">{label}</p>
        </div>
        {trend && (
          <span className={`ml-auto text-xs font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard
