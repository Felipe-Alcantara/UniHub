import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { calendarFilters, events, eventTypeLabel, visibilityLabel } from '../data/mockEvents'
import { sports } from '../data/mockSports'
import { useDemo } from '../context/demo-context'
import { filterEvents } from '../utils/athletiza-rules'
import { formatDateTime } from '../utils/date-format'
import Badge from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function CalendarPage() {
  const { sportMemberships } = useDemo()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedSport, setSelectedSport] = useState('all')

  const visibleEvents = useMemo(
    () => filterEvents(events, activeFilter, selectedSport, sportMemberships),
    [activeFilter, selectedSport, sportMemberships],
  )

  const grouped = useMemo(() => {
    const map = {}

    visibleEvents.forEach((event) => {
      if (!map[event.date]) {
        map[event.date] = []
      }

      map[event.date].push(event)
    })

    return Object.entries(map).sort((a, b) => new Date(a[0]) - new Date(b[0]))
  }, [visibleEvents])

  return (
    <div className="space-y-5">
      <PageHeader
        title="Agenda da Atletiza"
        subtitle="Calendário mobile-first com filtros por tipo, visibilidade e modalidade"
      />

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-[#8A919E]" htmlFor="calendar-filter">Tipo e visibilidade</label>
              <select
                id="calendar-filter"
                value={activeFilter}
                onChange={(event) => setActiveFilter(event.target.value)}
                className="ui-select mt-1 h-11 w-full rounded-xl border border-white/10 bg-[#131518] px-3 text-sm font-medium text-white"
              >
                {calendarFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>{filter.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-[#8A919E]" htmlFor="sport-filter">Modalidade</label>
              <select
                id="sport-filter"
                value={selectedSport}
                onChange={(event) => setSelectedSport(event.target.value)}
                className="ui-select mt-1 h-11 w-full rounded-xl border border-white/10 bg-[#131518] px-3 text-sm font-medium text-white"
              >
                <option value="all">Todas as modalidades</option>
                {sports.map((sport) => (
                  <option key={sport.id} value={sport.id}>{sport.name}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {grouped.length === 0 ? (
          <Card>
            <CardContent className="pt-5">
              <p className="text-sm text-[#C8CDD6]">Nenhum evento para os filtros atuais.</p>
            </CardContent>
          </Card>
        ) : (
          grouped.map(([date, dayEvents]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle>{new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dayEvents.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className="block rounded-2xl border border-white/10 bg-[#131518] p-3 hover:border-[#E86A10]/40">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white">{event.title}</p>
                      <Badge variant="neutral">{eventTypeLabel[event.type]}</Badge>
                    </div>
                    <p className="text-xs text-[#8A919E]">{formatDateTime(event.date, event.startTime, event.endTime)}</p>
                    <p className="text-xs text-[#C8CDD6]">{event.location}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="info">{visibilityLabel[event.visibility]}</Badge>
                      {event.sportId ? <Badge variant="brand">{sports.find((sport) => sport.id === event.sportId)?.name}</Badge> : null}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default CalendarPage
