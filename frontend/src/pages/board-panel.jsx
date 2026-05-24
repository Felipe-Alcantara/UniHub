import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { boardPermissions } from '../data/mockAthletic'
import { events } from '../data/mockEvents'
import { sports, sportStatusBadge } from '../data/mockSports'
import { importantLinks } from '../data/mockLinks'
import { products } from '../data/mockProducts'
import { useDemo } from '../context/demo-context'
import { canAccessBoard } from '../utils/athletiza-rules'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import Input from '../components/ui/input'
import Modal from '../components/ui/modal'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'
import godzillaCrest from '../assets/brand/logo-godzilla-crest.png'

const permissionLabels = {
  events: 'eventos',
  trainings: 'treinos',
  sports: 'modalidades',
  links: 'links',
  products: 'produtos',
  approvals: 'aprovações',
  technical: 'recursos técnicos',
}

function BoardPanelPage() {
  const { activeUser, joinRequests, updateJoinRequest, presenceConfirmations } = useDemo()
  const [activeForm, setActiveForm] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [formState, setFormState] = useState({ title: '', date: '', owner: '' })

  if (!canAccessBoard(activeUser.profile)) {
    return <Navigate to="/" replace />
  }

  const allowed = boardPermissions[activeUser.boardRole] || boardPermissions.dev_admin

  const presenceByEvent = useMemo(() => {
    const grouped = {}

    presenceConfirmations.forEach((entry) => {
      if (!grouped[entry.eventId]) {
        grouped[entry.eventId] = []
      }
      grouped[entry.eventId].push(entry.userName)
    })

    return grouped
  }, [presenceConfirmations])

  const sections = [
    { key: 'events', label: 'Criar/editar eventos', total: events.length },
    { key: 'trainings', label: 'Criar/editar treinos', total: events.filter((event) => event.type === 'training').length },
    { key: 'sports', label: 'Gerenciar modalidades', total: sports.length },
    { key: 'links', label: 'Gerenciar links', total: importantLinks.length },
    { key: 'products', label: 'Gerenciar produtos', total: products.length },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    setFeedback('Operação simulada salva com sucesso.')
    setFormState({ title: '', date: '', owner: '' })
    setActiveForm(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Painel da diretoria" subtitle="Área administrativa simulada para a apresentação" />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-3 flex items-center gap-3">
            <img src={godzillaCrest} alt="Brasão da Atlética Godzilla" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-white">ATLETIZA Admin</p>
              <p className="text-xs text-[#8A919E]">{activeUser.roleLabel}</p>
            </div>
          </div>
          <p className="text-xs text-[#8A919E]">Permissões: {allowed.map((permission) => permissionLabels[permission]).join(', ')}</p>
          {feedback ? <p className="mt-2 text-xs text-emerald-300">{feedback}</p> : null}
        </CardContent>
      </Card>

      <section className="grid gap-3 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.key}>
            <CardContent className="pt-5">
              <p className="text-sm font-semibold text-white">{section.label}</p>
              <p className="text-xs text-[#8A919E]">Registros: {section.total}</p>
              <Button variant="outline" className="mt-3" onClick={() => setActiveForm(section.key)}>
                Abrir formulário simulado
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aprovações de seletiva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {joinRequests.filter((request) => request.status === 'pending').length === 0 ? (
              <p className="text-sm text-[#C8CDD6]">Sem solicitações pendentes.</p>
            ) : (
              joinRequests
                .filter((request) => request.status === 'pending')
                .map((request) => (
                  <div key={request.id} className="rounded-2xl border border-white/10 bg-[#131518] p-3">
                    <p className="text-sm font-semibold text-white">{request.athleteName}</p>
                    <p className="text-xs text-[#8A919E]">Modalidade: {sports.find((sport) => sport.id === request.sportId)?.name}</p>
                    <div className="mt-2 flex gap-2">
                      <Button variant="success" size="sm" onClick={() => updateJoinRequest(request.id, 'approved')}>Aprovar</Button>
                      <Button variant="danger" size="sm" onClick={() => updateJoinRequest(request.id, 'rejected')}>Rejeitar</Button>
                    </div>
                  </div>
                ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de presença (eventos gratuitos)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.keys(presenceByEvent).length === 0 ? (
              <p className="text-sm text-[#C8CDD6]">Nenhuma confirmação registrada no momento.</p>
            ) : (
              Object.entries(presenceByEvent).map(([eventId, names]) => (
                <div key={eventId} className="rounded-2xl border border-white/10 bg-[#131518] p-3">
                  <p className="text-sm font-semibold text-white">{events.find((event) => event.id === eventId)?.title}</p>
                  <p className="mb-2 text-xs text-[#8A919E]">Confirmados: {names.length}</p>
                  <ul className="space-y-1 text-xs text-[#C8CDD6]">
                    {names.map((name) => <li key={name}>• {name}</li>)}
                  </ul>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Status das modalidades</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((sport) => (
            <div key={sport.id} className="rounded-xl border border-white/10 bg-[#131518] p-3">
              <p className="text-sm font-semibold text-white">{sport.name}</p>
              <Badge variant={sport.hasTryout ? 'warning' : 'success'} className="mt-1">{sportStatusBadge[sport.status]}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Modal isOpen={Boolean(activeForm)} onClose={() => setActiveForm(null)} title="Formulário administrativo simulado">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            label="Título"
            value={formState.title}
            onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
            required
          />
          <Input
            label="Data"
            value={formState.date}
            onChange={(event) => setFormState((current) => ({ ...current, date: event.target.value }))}
            placeholder="Ex: 2026-05-30"
            required
          />
          <Input
            label="Responsável"
            value={formState.owner}
            onChange={(event) => setFormState((current) => ({ ...current, owner: event.target.value }))}
            required
          />
          <Button className="w-full" type="submit">Salvar (simulado)</Button>
        </form>
      </Modal>
    </div>
  )
}

export default BoardPanelPage
