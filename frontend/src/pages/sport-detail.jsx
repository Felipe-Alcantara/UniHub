import { Link, Navigate, useParams } from 'react-router-dom'
import { PhoneCall, Users } from 'lucide-react'
import { sports, sportStatusBadge } from '../data/mockSports'
import { events } from '../data/mockEvents'
import { useDemo } from '../context/demo-context'
import { getSportAccessState, getSportEntryActionLabel } from '../utils/athletiza-rules'
import { formatDateTime } from '../utils/date-format'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function SportDetailPage() {
  const { sportId } = useParams()
  const { sportMemberships, joinSport } = useDemo()

  const sport = sports.find((item) => item.id === sportId)
  if (!sport) {
    return <Navigate to="/sports" replace />
  }

  const accessState = getSportAccessState(sport, sportMemberships[sport.id])
  const isParticipant = accessState === 'participant'
  const relatedEvents = events.filter((event) => event.sportId === sport.id)

  return (
    <div className="space-y-5">
      <PageHeader title={sport.name} subtitle="Detalhe de modalidade" back />

      <Card>
        <CardContent className="space-y-3 pt-5">
          <div className="flex items-center gap-3">
            <div className="sport-icon-frame flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
              {sport.icon ? (
                <img src={sport.icon} alt={`Logo ${sport.name}`} className="sport-icon-image h-12 w-12 object-contain" />
              ) : (
                <span className="text-base font-black tracking-tight text-[#FFB679]">{sport.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{sport.name}</p>
              <p className="text-xs text-[#8A919E]">Identidade visual da modalidade</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={sport.hasTryout ? 'warning' : 'success'}>{sportStatusBadge[sport.status]}</Badge>
            <Badge variant="neutral">{sport.hasTryout ? 'Seletiva necessária' : 'Entrada livre'}</Badge>
          </div>
          <p className="text-sm text-[#C8CDD6]">{sport.description}</p>
          <p className="text-xs text-white">Coordenador: {sport.coordinator.name}</p>
          <p className="text-xs text-[#C8CDD6]">Contato: {sport.coordinator.contact}</p>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => joinSport(sport.id)} disabled={isParticipant || accessState === 'pending'}>
              {getSportEntryActionLabel(accessState)}
            </Button>
            <Button variant="outline">
              <PhoneCall size={14} />
              Falar com coordenador
            </Button>
          </div>

          {accessState === 'pending' ? <p className="text-xs text-amber-200">Solicitação enviada. Aguardando aprovação da diretoria.</p> : null}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Treinos e valores</CardTitle>
          </CardHeader>
          <CardContent>
            {isParticipant ? (
              <>
                <p className="mb-2 text-sm text-white">{sport.trainingSchedule.join(' | ')}</p>
                <p className="text-sm text-[#C8CDD6]">Mensalidade: {sport.monthlyFee}</p>
              </>
            ) : (
              <p className="text-sm text-[#C8CDD6]">Acesso completo liberado apenas para participantes aprovados.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users size={16} /> Membros</CardTitle>
          </CardHeader>
          <CardContent>
            {isParticipant ? (
              <ul className="space-y-2 text-sm text-[#C8CDD6]">
                {sport.members.map((member) => <li key={member}>• {member}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-[#C8CDD6]">Lista privada disponível apenas para participantes.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos jogos e eventos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {relatedEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="block rounded-xl border border-white/10 bg-[#131518] p-3 hover:border-[#E86A10]/40">
              <p className="text-sm font-semibold text-white">{event.title}</p>
              <p className="text-xs text-[#8A919E]">{formatDateTime(event.date, event.startTime, event.endTime)}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default SportDetailPage
