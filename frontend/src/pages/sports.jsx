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

          return (
            <Card key={sport.id} className={isLocked ? 'relative overflow-hidden' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{sport.name}</CardTitle>
                  <Badge variant={sport.hasTryout ? 'warning' : 'success'}>{sportStatusBadge[sport.status]}</Badge>
                </div>
                <p className="text-sm text-[#8A919E]">{sport.shortDescription}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-[#C8CDD6]">Coordenador: {sport.coordinator.name}</p>
                <p className="text-xs text-[#C8CDD6]">Contato: {sport.coordinator.contact}</p>

                {isParticipant ? (
                  <>
                    <p className="text-xs text-white">Treinos: {sport.trainingSchedule.join(' | ')}</p>
                    <p className="text-xs text-white">Valor: {sport.monthlyFee}</p>
                    <Badge variant="success">Voce participa desta modalidade</Badge>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-[#131518] p-3">
                    <p className="mb-2 inline-flex items-center gap-1 text-xs text-[#8A919E]"><Lock size={12} /> Informacoes privadas limitadas</p>
                    <p className="text-xs text-[#C8CDD6]">{sport.hasTryout ? 'Seletiva necessaria para acesso completo.' : 'Entrada livre para liberar agenda privada.'}</p>
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

                {accessState === 'rejected' ? <p className="text-xs text-red-300">Solicitacao rejeitada. Fale com o coordenador.</p> : null}
                {isPending ? <p className="text-xs text-amber-200">Aguardando aprovacao da diretoria.</p> : null}
              </CardContent>

              {isLocked ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#131518] to-transparent" /> : null}
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
