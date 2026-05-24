import { Link } from 'react-router-dom'
import { CalendarDays, Contact2, CreditCard, Megaphone, Swords, Trophy } from 'lucide-react'
import { useDemo } from '../context/demo-context'
import { athleticInfo } from '../data/mockAthletic'
import { announcements } from '../data/mockAnnouncements'
import { events, eventTypeLabel } from '../data/mockEvents'
import { sports } from '../data/mockSports'
import { buildDashboardSummary, canViewEvent } from '../utils/athletiza-rules'
import { formatDateTime } from '../utils/date-format'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'
import AtletizaLogo from '../components/brand/atletiza-logo'

function DashboardPage() {
  const { activeUser, sportMemberships } = useDemo()
  const summary = buildDashboardSummary(sportMemberships)
  const nextTrainings = events
    .filter((event) => event.type === 'training' && canViewEvent(event, sportMemberships))
    .slice(0, 3)

  const quickCards = [
    { label: 'Modalidades ativas', value: summary.participantSports, icon: Swords },
    { label: 'Modalidades abertas', value: summary.openSports, icon: Trophy },
    { label: 'Eventos visíveis', value: summary.visibleEvents.length, icon: CalendarDays },
    { label: 'Avisos urgentes', value: announcements.filter((item) => item.priority === 'urgente').length, icon: Megaphone },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Olá, ${activeUser.name.split(' ')[0]}`}
        subtitle="Resumo do dia da Atlética Godzilla"
        rightSlot={<Badge variant="brand">Layout demo</Badge>}
      />

      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#1E2127] via-[#1E2127] to-[#261D18] p-5">
        <AtletizaLogo surface="onDark" className="mb-3 h-8 w-auto" />
        <h2 className="text-xl font-bold text-white">Tudo da {athleticInfo.name} centralizado</h2>
        <p className="mt-1 text-sm text-[#C8CDD6]">
          Treinos, jogos, festas, avisos, links e status da sua carteirinha em um único fluxo.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/calendar">
            <Button>
              <CalendarDays size={14} />
              Ir para agenda
            </Button>
          </Link>
          <Link to="/sports">
            <Button variant="outline">Modalidades</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickCards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className="mb-3 inline-flex rounded-xl bg-[#131518] p-2 text-[#FFB679]">
                <Icon size={16} />
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-[#8A919E]">{label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Próximos treinos e eventos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.upcomingEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="block rounded-2xl border border-white/10 bg-[#131518] p-3 hover:border-[#E86A10]/40">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{event.title}</p>
                  <Badge variant="neutral">{eventTypeLabel[event.type]}</Badge>
                </div>
                <p className="text-xs text-[#8A919E]">{formatDateTime(event.date, event.startTime, event.endTime)}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mural rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.slice(0, 3).map((notice) => (
              <div key={notice.id} className="rounded-2xl border border-white/10 bg-[#131518] p-3">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant={notice.priority === 'urgente' ? 'urgent' : 'info'}>{notice.priority === 'urgente' ? 'Urgente' : 'Aviso'}</Badge>
                </div>
                <p className="text-sm font-semibold text-white">{notice.title}</p>
                <p className="text-xs text-[#8A919E]">{notice.message}</p>
              </div>
            ))}
            <Link to="/bulletin" className="inline-flex text-xs font-semibold text-[#FFB679]">Ver mural completo</Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard size={16} /> Carteirinha</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#C8CDD6]">Status: {activeUser.membershipStatus}</p>
            <p className="text-xs text-[#8A919E]">Modalidades: {sports.filter((sport) => sportMemberships[sport.id] === 'participant').map((sport) => sport.name).join(', ')}</p>
            <Link to="/card" className="mt-3 inline-flex text-xs font-semibold text-[#FFB679]">Abrir carteirinha</Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Contact2 size={16} /> Contato rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-white">{athleticInfo.quickContact.name}</p>
            <p className="text-xs text-[#8A919E]">{athleticInfo.quickContact.role}</p>
            <p className="mt-2 text-xs text-[#C8CDD6]">{athleticInfo.quickContact.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atalhos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Link to="/links" className="block rounded-xl border border-white/10 bg-[#131518] px-3 py-2 text-[#C8CDD6] hover:text-white">Central de links</Link>
            <Link to="/store" className="block rounded-xl border border-white/10 bg-[#131518] px-3 py-2 text-[#C8CDD6] hover:text-white">Vitrine de produtos</Link>
            <Link to="/sports" className="block rounded-xl border border-white/10 bg-[#131518] px-3 py-2 text-[#C8CDD6] hover:text-white">Ver modalidades</Link>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-white">Próximos treinos</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {nextTrainings.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-5">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-[#8A919E]">{formatDateTime(item.date, item.startTime, item.endTime)}</p>
                <p className="mt-2 text-xs text-[#C8CDD6]">{item.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
