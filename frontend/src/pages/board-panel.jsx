import { useState } from 'react'
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
  approvals: 'entradas',
  technical: 'recursos técnicos',
}

function BoardPanelPage() {
  const { activeUser, joinRequests } = useDemo()
  const [activeForm, setActiveForm] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [formState, setFormState] = useState({ title: '', date: '', owner: '' })

  if (!canAccessBoard(activeUser.profile)) {
    return <Navigate to="/" replace />
  }

  const allowed = boardPermissions[activeUser.boardRole] || boardPermissions.dev_admin
  const sections = [
    { key: 'events', label: 'Eventos', total: events.length },
    { key: 'trainings', label: 'Treinos', total: events.filter((event) => event.type === 'training').length },
    { key: 'sports', label: 'Modalidades', total: sports.length },
    { key: 'links', label: 'Links', total: importantLinks.length },
    { key: 'products', label: 'Produtos', total: products.length },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    setFeedback('Layout atualizado para a demonstração.')
    setFormState({ title: '', date: '', owner: '' })
    setActiveForm(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Painel da diretoria" subtitle="Visão administrativa do layout" />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-3 flex items-center gap-3">
            <img src={godzillaCrest} alt="Brasão da Atlética Godzilla" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-white">ATLETIZA Admin</p>
              <p className="text-xs text-[#8A919E]">{activeUser.roleLabel}</p>
            </div>
          </div>
          <p className="text-xs text-[#8A919E]">Áreas: {allowed.map((permission) => permissionLabels[permission]).join(', ')}</p>
          {feedback ? <p className="mt-2 text-xs text-emerald-300">{feedback}</p> : null}
        </CardContent>
      </Card>

      <section className="grid gap-3 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.key}>
            <CardContent className="pt-5">
              <p className="text-sm font-semibold text-white">{section.label}</p>
              <p className="text-xs text-[#8A919E]">{section.total} itens no layout</p>
              <Button variant="outline" className="mt-3" onClick={() => setActiveForm(section.key)}>
                Editar visual
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Entradas registradas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {joinRequests.map((request) => (
              <div key={request.id} className="rounded-2xl border border-white/10 bg-[#131518] p-3">
                <p className="text-sm font-semibold text-white">{request.athleteName}</p>
                <p className="text-xs text-[#8A919E]">Modalidade: {sports.find((sport) => sport.id === request.sportId)?.name}</p>
                <Badge variant="success" className="mt-2">Aprovado</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eventos em destaque</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="rounded-2xl border border-white/10 bg-[#131518] p-3">
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <p className="text-xs text-[#8A919E]">{event.location}</p>
                <Badge variant="neutral" className="mt-2">{event.status}</Badge>
              </div>
            ))}
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

      <Modal isOpen={Boolean(activeForm)} onClose={() => setActiveForm(null)} title="Edição visual">
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
          <Button className="w-full" type="submit">Aplicar no layout</Button>
        </form>
      </Modal>
    </div>
  )
}

export default BoardPanelPage
