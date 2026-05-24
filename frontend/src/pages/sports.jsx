import { Link } from 'react-router-dom'
import { Lock, ShieldCheck } from 'lucide-react'
import { sports, sportStatusBadge } from '../data/mockSports'
import { useDemo } from '../context/demo-context'
import { getSportAccessState, getSportEntryActionLabel } from '../utils/athletiza-rules'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function SportsPage() {
  const { sportMemberships, joinSport } = useDemo()

  return (
    <div className="space-y-5">
      <PageHeader title="Modalidades" subtitle="Entrada livre e seletiva com estados visuais claros" />

      <div className="grid gap-4 md:grid-cols-2">
        {sports.map((sport) => {
          const accessState = getSportAccessState(sport, sportMemberships[sport.id])
          const isParticipant = accessState === 'participant'
          const isPending = accessState === 'pending'
          const isLocked = !isParticipant
          const initials = sport.name
            .split(/[\s-]+/)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()

          return (
            <Card key={sport.id} className={`group ${isLocked ? 'relative overflow-hidden' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="sport-icon-frame flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5">
                      {sport.icon ? (
                        <img src={sport.icon} alt={`Logo ${sport.name}`} className="sport-icon-image h-10 w-10 object-contain" loading="lazy" />
                      ) : (
                        <span className="text-sm font-black tracking-tight text-[#FFB679]">{initials}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <CardTitle>{sport.name}</CardTitle>
                      <p className="mt-1 text-sm text-[#8A919E]">{sport.shortDescription}</p>
                    </div>
                  </div>
                  <Badge variant={sport.hasTryout ? 'warning' : 'success'}>{sportStatusBadge[sport.status]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-[#C8CDD6]">Coordenador: {sport.coordinator.name}</p>
                <p className="text-xs text-[#C8CDD6]">Contato: {sport.coordinator.contact}</p>

                {isParticipant ? (
                  <>
                    <p className="text-xs text-white">Treinos: {sport.trainingSchedule.join(' | ')}</p>
                    <p className="text-xs text-white">Valor: {sport.monthlyFee}</p>
                    <Badge variant="success">Você participa desta modalidade</Badge>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-[#131518] p-3">
                    <p className="mb-2 inline-flex items-center gap-1 text-xs text-[#8A919E]"><Lock size={12} /> Informações privadas limitadas</p>
                    <p className="text-xs text-[#C8CDD6]">{sport.hasTryout ? 'Seletiva necessária para acesso completo.' : 'Entrada livre para liberar agenda privada.'}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={isPending ? 'surface' : 'primary'}
                    onClick={() => joinSport(sport.id)}
                    disabled={isParticipant || isPending}
                  >
                    {getSportEntryActionLabel(accessState)}
                  </Button>
                  <Link to={`/sports/${sport.id}`}>
                    <Button variant="outline">Ver detalhes</Button>
                  </Link>
                </div>

                {accessState === 'rejected' ? <p className="text-xs text-red-300">Solicitação rejeitada. Fale com o coordenador.</p> : null}
                {isPending ? <p className="text-xs text-amber-200">Aguardando aprovação da diretoria.</p> : null}
              </CardContent>

            </Card>
          )
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1E2127] p-4 text-xs text-[#C8CDD6]">
        <p className="inline-flex items-center gap-1"><ShieldCheck size={14} /> Poliatleta habilitado: sua agenda cruza eventos de todas as modalidades participantes.</p>
      </div>
    </div>
  )
}

export default SportsPage
