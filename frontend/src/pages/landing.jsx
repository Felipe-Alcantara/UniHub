import { Link } from 'react-router-dom'
import {
  CalendarDays,
  Megaphone,
  Swords,
  UserCheck,
} from 'lucide-react'
import { useDemo } from '../context/demo-context'
import { athleticInfo } from '../data/mockAthletic'
import { announcements } from '../data/mockAnnouncements'
import { events, eventTypeLabel } from '../data/mockEvents'
import { buildDashboardSummary, canViewEvent } from '../utils/athletiza-rules'
import { formatDateTime } from '../utils/date-format'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import heroAthletes from '../assets/brand/landing-hero-athletes.jpg'

function LandingPage() {
  const { activeUser, sportMemberships } = useDemo()
  const summary = buildDashboardSummary(sportMemberships)
  const visibleEvents = events.filter((event) => canViewEvent(event, sportMemberships)).slice(0, 3)

  return (
    <div className="space-y-6">
      <section className="relative isolate min-h-[430px] overflow-hidden rounded-lg border border-white/10 sm:min-h-[470px]">
        <img
          src={heroAthletes}
          alt="Atletas universitários reunidos em quadra antes de uma partida"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/55 sm:to-black/20" />
        <div className="relative flex min-h-[430px] max-w-xl flex-col justify-end p-5 sm:min-h-[470px] sm:p-8">
          <p className="text-sm font-semibold text-[#FFB679]">Olá, {activeUser.name.split(' ')[0]}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Tudo da {athleticInfo.name} no seu ritmo
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#E3E6EA] sm:text-base">
            Eventos, modalidades, avisos, produtos e sua carteirinha em uma única entrada da ATLETIZA.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/calendar">
              <Button size="lg">
                <CalendarDays size={16} />
                Ver agenda
              </Button>
            </Link>
            <Link to="/sports">
              <Button size="lg" variant="outline">
                Explorar modalidades
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Resumo da sua atlética" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'Modalidades ativas', value: summary.participantSports, icon: Swords },
          { label: 'Solicitações', value: summary.pendingSports, icon: UserCheck },
          { label: 'Eventos visíveis', value: summary.visibleEvents.length, icon: CalendarDays },
          { label: 'Avisos urgentes', value: announcements.filter((item) => item.priority === 'urgente').length, icon: Megaphone },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <Icon size={17} className="mb-3 text-[#FFB679]" />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-[#8A919E]">{label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>Próximos eventos</CardTitle>
            <Link to="/calendar" className="text-xs font-semibold text-[#FFB679]">Agenda completa</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {visibleEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="block rounded-lg border border-white/10 bg-[#131518] p-3 transition-colors hover:border-[#E86A10]/40">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{event.title}</p>
                  <Badge variant="neutral">{eventTypeLabel[event.type]}</Badge>
                </div>
                <p className="text-xs text-[#8A919E]">{formatDateTime(event.date, event.startTime, event.endTime)}</p>
                <p className="mt-1 text-xs text-[#C8CDD6]">{event.location}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>Mural em destaque</CardTitle>
            <Link to="/bulletin" className="text-xs font-semibold text-[#FFB679]">Ver todos</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.slice(0, 3).map((notice) => (
              <div key={notice.id} className="rounded-lg border border-white/10 bg-[#131518] p-3">
                <Badge variant={notice.priority === 'urgente' ? 'urgent' : 'info'}>
                  {notice.priority === 'urgente' ? 'Urgente' : 'Aviso'}
                </Badge>
                <p className="mt-2 text-sm font-semibold text-white">{notice.title}</p>
                <p className="text-xs text-[#8A919E]">{notice.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default LandingPage
