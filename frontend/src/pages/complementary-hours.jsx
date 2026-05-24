import { Link } from 'react-router-dom'
import { CalendarDays, GraduationCap, MapPin } from 'lucide-react'
import { events, eventTypeLabel } from '../data/mockEvents'
import { useDemo } from '../context/demo-context'
import { canViewEvent } from '../utils/athletiza-rules'
import { formatDateTime } from '../utils/date-format'
import Badge from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function ComplementaryHoursPage() {
  const { sportMemberships } = useDemo()
  const eligibleEvents = events.filter(
    (event) => event.complementaryHours && canViewEvent(event, sportMemberships),
  )
  const availableHours = eligibleEvents.reduce((total, event) => total + event.complementaryHours, 0)
  const maximumHours = Math.max(...eligibleEvents.map((event) => event.complementaryHours))

  return (
    <div className="space-y-5">
      <PageHeader title="Horas complementares" />

      <section className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <GraduationCap size={18} className="mb-3 text-[#FFB679]" />
            <p className="text-3xl font-bold text-white">{availableHours}h</p>
            <p className="text-xs text-[#8A919E]">disponíveis</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <CalendarDays size={18} className="mb-3 text-[#FFB679]" />
            <p className="text-3xl font-bold text-white">{eligibleEvents.length}</p>
            <p className="text-xs text-[#8A919E]">eventos elegíveis</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <GraduationCap size={18} className="mb-3 text-[#FFB679]" />
            <p className="text-3xl font-bold text-white">{maximumHours}h</p>
            <p className="text-xs text-[#8A919E]">maior carga</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-2">
        {eligibleEvents.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#1E2127] px-4 py-3 transition-colors hover:border-[#E86A10]/40"
          >
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-semibold text-white">{event.title}</p>
                <Badge variant="neutral">{eventTypeLabel[event.type]}</Badge>
              </div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8A919E]">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays size={12} />
                  {formatDateTime(event.date, event.startTime, event.endTime)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {event.location}
                </span>
              </p>
            </div>
            <span className="shrink-0 rounded-xl border border-[#E86A10]/30 bg-[#E86A10]/10 px-3 py-2 text-sm font-bold text-[#FFB679]">
              +{event.complementaryHours}h
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default ComplementaryHoursPage
