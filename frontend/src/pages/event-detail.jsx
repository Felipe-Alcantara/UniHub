import { Link, Navigate, useParams } from 'react-router-dom'
import { CalendarDays, Contact, GraduationCap, MapPin, Shield } from 'lucide-react'
import { events, eventTypeLabel } from '../data/mockEvents'
import { sports } from '../data/mockSports'
import { useDemo } from '../context/demo-context'
import { canViewEvent } from '../utils/athletiza-rules'
import { formatDateTime } from '../utils/date-format'
import Badge from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function EventDetailPage() {
  const { eventId } = useParams()
  const { sportMemberships } = useDemo()

  const event = events.find((item) => item.id === eventId)

  if (!event) {
    return <Navigate to="/calendar" replace />
  }

  if (!canViewEvent(event, sportMemberships)) {
    return <Navigate to="/calendar" replace />
  }

  const sportName = event.sportId ? sports.find((sport) => sport.id === event.sportId)?.name : null

  return (
    <div className="space-y-5">
      <PageHeader title={event.title} subtitle="Detalhe do evento" back />

      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">{eventTypeLabel[event.type]}</Badge>
            <Badge variant="success">Ativo</Badge>
          </div>

          <p className="text-sm text-[#C8CDD6]">{event.description}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#131518] p-3">
              <p className="mb-1 inline-flex items-center gap-1 text-xs text-[#8A919E]"><CalendarDays size={14} /> Data e horário</p>
              <p className="text-sm text-white">{formatDateTime(event.date, event.startTime, event.endTime)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#131518] p-3">
              <p className="mb-1 inline-flex items-center gap-1 text-xs text-[#8A919E]"><MapPin size={14} /> Local</p>
              <p className="text-sm text-white">{event.location}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#131518] p-3">
              <p className="mb-1 inline-flex items-center gap-1 text-xs text-[#8A919E]"><Shield size={14} /> Responsável</p>
              <p className="text-sm text-white">{event.coordinatorName}</p>
              <p className="text-xs text-[#C8CDD6]">{event.coordinatorContact}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#131518] p-3">
              <p className="mb-1 inline-flex items-center gap-1 text-xs text-[#8A919E]"><Contact size={14} /> Modalidade</p>
              <p className="text-sm text-white">{sportName || 'Evento geral da atlética'}</p>
            </div>
          </div>

          {event.complementaryHours ? (
            <div className="rounded-2xl border border-[#E86A10]/25 bg-[#131518] p-3">
              <p className="mb-1 inline-flex items-center gap-1 text-xs text-[#8A919E]"><GraduationCap size={14} /> Horas complementares</p>
              <p className="text-lg font-bold text-[#FFB679]">+{event.complementaryHours} horas</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Link to="/calendar" className="inline-flex text-sm font-semibold text-[#FFB679]">Voltar para agenda</Link>
    </div>
  )
}

export default EventDetailPage
