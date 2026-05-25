import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { sports, sportStatusBadge } from '../data/mockSports'
import { useDemo } from '../context/demo-context'
import { getSportAccessState, getSportEntryActionLabel, getSportLeaveLabel } from '../utils/athletiza-rules'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Modal from '../components/ui/modal'
import PageHeader from '../components/ui/page-header'

function SportsPage() {
  const { sportMemberships, joinSport, leaveSport } = useDemo()
  const [leavingSport, setLeavingSport] = useState(null)

  function handleConfirmLeave() {
    if (leavingSport) {
      leaveSport(leavingSport.id)
      setLeavingSport(null)
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Modalidades" subtitle="Times, treinos e contatos em uma visão simples" />

      <div className="grid gap-4 md:grid-cols-2">
        {sports.map((sport) => {
          const accessState = getSportAccessState(sport, sportMemberships[sport.id])
          const isParticipant = accessState === 'participant'
          const initials = sport.name
            .split(/[\s-]+/)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()

          return (
            <Card key={sport.id} className="group">
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
                  <Badge variant={isParticipant ? 'success' : 'brand'}>
                    {isParticipant ? 'Ativa' : sportStatusBadge[sport.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2 text-xs text-[#C8CDD6]">
                  <p>Coordenador: {sport.coordinator.name}</p>
                  <p>Treinos: {sport.trainingSchedule.join(' | ')}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {isParticipant ? (
                    <Button variant="surface" onClick={() => setLeavingSport(sport)}>
                      {getSportLeaveLabel()}
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => joinSport(sport.id)}>
                      {getSportEntryActionLabel(accessState)}
                    </Button>
                  )}
                  <Link to={`/sports/${sport.id}`}>
                    <Button variant="outline">Ver detalhes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1E2127] p-4 text-xs text-[#C8CDD6]">
        <p className="inline-flex items-center gap-1"><ShieldCheck size={14} /> Layout demonstrativo: todas as modalidades exibem informações prontas para navegação.</p>
      </div>

      <Modal isOpen={!!leavingSport} onClose={() => setLeavingSport(null)} title="Sair da modalidade">
        <p className="mb-5 text-sm text-[#C8CDD6]">
          Tem certeza que deseja sair de <span className="font-semibold text-white">{leavingSport?.name}</span>? Você poderá entrar novamente a qualquer momento.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setLeavingSport(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmLeave}>Sair da modalidade</Button>
        </div>
      </Modal>
    </div>
  )
}

export default SportsPage
