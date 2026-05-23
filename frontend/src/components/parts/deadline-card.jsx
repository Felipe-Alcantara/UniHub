import { Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import Badge from '../ui/badge'

function DeadlineCard({ title, subject, dueDate, daysLeft }) {
  const urgency =
    daysLeft <= 1 ? 'urgent' :
    daysLeft <= 3 ? 'warning' :
    'info'

  const urgencyLabel =
    daysLeft <= 0 ? 'Vencido' :
    daysLeft === 1 ? 'Amanhã' :
    `${daysLeft} dias`

  return (
    <Card className="hover:border-white/20">
      <CardContent className="flex items-center gap-4">
        <div className={`
          flex items-center justify-center w-10 h-10 rounded-xl
          ${daysLeft <= 1 ? 'bg-red-500/15 text-red-400' : ''}
          ${daysLeft > 1 && daysLeft <= 3 ? 'bg-yellow-500/15 text-yellow-400' : ''}
          ${daysLeft > 3 ? 'bg-blue-500/15 text-blue-400' : ''}
        `}>
          {daysLeft <= 1 ? <AlertTriangle size={18} /> : <Clock size={18} />}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-zinc-50 truncate">{title}</p>
          <p className="text-xs text-zinc-500">{subject}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Badge variant={urgency}>{urgencyLabel}</Badge>
          <span className="text-xs text-zinc-500">{dueDate}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default DeadlineCard
