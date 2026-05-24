import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CalendarDays, Contact, MapPin, Shield, Ticket } from 'lucide-react'
import { events, eventTypeLabel, visibilityLabel } from '../data/mockEvents'
import { sports } from '../data/mockSports'
import { useDemo } from '../context/demo-context'
import { canViewEvent, isPresenceConfirmationEnabled } from '../utils/athletiza-rules'
import { formatDateTime } from '../utils/date-format'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function EventDetailPage() {
  const { eventId } = useParams()
  const { sportMemberships, confirmPresence, presenceConfirmations, activeUser } = useDemo()

  const event = events.find((item) => item.id === eventId)

  const confirmed = useMemo(
    () => presenceConfirmations.some((item) => item.eventId === eventId && item.userId === activeUser.id),
    [activeUser.id, eventId, presenceConfirmations],
  )

  if (!event) {
    return <Navigate to="/calendar" replace />
  }

  if (!canViewEvent(event, sportMemberships)) {
    return <Navigate to="/calendar" replace />
  }

  const sportName = event.sportId ? sports.find((sport) => sport.id === event.sportId)?.name : null
  const needsConfirmation = isPresenceConfirmationEnabled(event)

  return (
    <div className="space-y-5">
      <PageHeader title={event.title} subtitle="Detalhe completo do evento/treino" back />

      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">{eventTypeLabel[event.type]}</Badge>
            <Badge variant="info">{visibilityLabel[event.visibility]}</Badge>
            <Badge variant="neutral">{event.status}</Badge>
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

          <div className="rounded-2xl border border-white/10 bg-[#131518] p-3">
            <p className="mb-1 inline-flex items-center gap-1 text-xs text-[#8A919E]"><Ticket size={14} /> Confirmação de presença</p>
            {!event.isFree ? (
              <p className="text-sm text-[#C8CDD6]">Evento pago: a confirmação ocorre fora da plataforma no MVP.</p>
            ) : event.requiresConfirmation ? (
              <div className="space-y-2">
                <p className="text-sm text-[#C8CDD6]">Evento gratuito com lista de presença habilitada.</p>
                <Button onClick={() => confirmPresence(event.id)} disabled={confirmed}>
                  {confirmed ? 'Presença confirmada' : 'Confirmar presença'}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-[#C8CDD6]">Evento gratuito sem necessidade de confirmação.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Link to="/calendar" className="inline-flex text-sm font-semibold text-[#FFB679]">Voltar para agenda</Link>
      {needsConfirmation && confirmed ? <p className="text-xs text-emerald-300">Seu nome foi adicionado à lista privada de presença.</p> : null}
    </div>
  )
}

export default EventDetailPage
