import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, ChevronDown, Clock3, MapPin, SlidersHorizontal, Swords } from 'lucide-react'
import { calendarFilters, events, eventTypeLabel } from '../data/mockEvents'
import { sports } from '../data/mockSports'
import { useDemo } from '../context/demo-context'
import { filterEvents } from '../utils/athletiza-rules'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function FilterDropdown({ id, icon: Icon, label, value, options, onChange, isOpen, onToggle, onClose }) {
  const selectedOption = options.find((option) => option.value === value) || options[0]

  return (
    <div
      className={`relative rounded-2xl border bg-[#131518] px-4 py-3 transition-all ${
        isOpen ? 'border-[#E86A10]/55 shadow-[0_0_0_3px_rgba(232,106,16,0.08)]' : 'border-white/10 hover:border-white/15'
      }`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onClose()
        }
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-[#FFB679]" />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#8A919E]" id={`${id}-label`}>
          {label}
        </span>
      </div>
      <button
        type="button"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="mt-2 flex h-7 w-full items-center justify-between gap-3 text-left text-sm font-semibold text-white outline-none"
      >
        <span id={`${id}-value`} className="truncate">{selectedOption.label}</span>
        <ChevronDown className={`shrink-0 text-[#8A919E] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FFB679]' : ''}`} size={16} />
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-white/10 bg-[#111419] p-1.5 shadow-[0_22px_48px_rgba(0,0,0,0.45)]">
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  onClose()
                }}
                className={`flex h-10 w-full items-center rounded-xl px-3 text-left text-sm font-medium transition-colors ${
                  isSelected
                    ? 'theme-preserve-dark bg-[#E86A10] text-white'
                    : 'text-[#C8CDD6] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function EventDayCard({ date, dayEvents }) {
  const calendarDate = new Date(`${date}T00:00:00`)
  const weekday = calendarDate.toLocaleDateString('pt-BR', { weekday: 'long' })
  const day = calendarDate.toLocaleDateString('pt-BR', { day: '2-digit' })
  const month = calendarDate.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')

  return (
    <Card className="overflow-hidden border-white/[0.08] shadow-[0_16px_34px_rgba(0,0,0,0.12)]">
      <CardHeader className="flex flex-row items-center gap-4 border-b border-white/[0.06] p-4 sm:p-5">
        <div className="theme-preserve-dark flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#E86A10]/35 bg-[#E86A10]/10">
          <span className="text-xl font-bold leading-none text-white">{day}</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFB679]">{month}</span>
        </div>
        <div>
          <CardTitle className="capitalize">{weekday}</CardTitle>
          <p className="mt-1 text-xs text-[#8A919E]">
            {dayEvents.length} {dayEvents.length === 1 ? 'compromisso programado' : 'compromissos programados'}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2.5 p-3 sm:p-4">
        {dayEvents.map((event) => {
          const sportName = event.sportId ? sports.find((sport) => sport.id === event.sportId)?.name : null

          return (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131518] px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E86A10]/35 hover:bg-[#171B21]"
            >
              <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#E86A10]/70 transition-colors group-hover:bg-[#FF7B1C]" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFB679]">{eventTypeLabel[event.type]}</span>
                    {event.complementaryHours ? (
                      <span className="rounded-full bg-[#E86A10]/10 px-2 py-0.5 text-[10px] font-semibold text-[#FFB679]">+{event.complementaryHours}h</span>
                    ) : null}
                  </div>
                  <p className="truncate text-sm font-semibold text-white">{event.title}</p>
                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#8A919E]">
                    <p className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} className="text-[#FFB679]" />
                      {event.startTime} - {event.endTime}
                    </p>
                    <p className="inline-flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#FFB679]" />
                      {event.location}
                    </p>
                  </div>
                </div>
                {sportName ? (
                  <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[11px] font-medium text-[#C8CDD6]">
                    {sportName}
                  </span>
                ) : null}
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}

function CalendarPage() {
  const { sportMemberships } = useDemo()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedSport, setSelectedSport] = useState('all')
  const [openFilter, setOpenFilter] = useState(null)

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

  const typeOptions = calendarFilters.map((filter) => ({
    value: filter.id,
    label: filter.label,
  }))
  const sportOptions = [
    { value: 'all', label: 'Todas as modalidades' },
    ...sports.map((sport) => ({ value: sport.id, label: sport.name })),
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Agenda da Atletiza" subtitle="Acompanhe treinos, jogos e eventos da sua atlética." />

      <section className="relative rounded-3xl border border-white/10 bg-[#1E2127] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.15)] sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="theme-preserve-dark flex h-10 w-10 items-center justify-center rounded-xl bg-[#E86A10]/15 text-[#FFB679]">
            <SlidersHorizontal size={17} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Filtros da agenda</p>
            <p className="text-xs text-[#8A919E]">Refine a programação por categoria ou modalidade</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <FilterDropdown
            id="calendar-filter"
            icon={CalendarDays}
            label="Tipo e acesso"
            value={activeFilter}
            options={typeOptions}
            onChange={setActiveFilter}
            isOpen={openFilter === 'type'}
            onToggle={() => setOpenFilter(openFilter === 'type' ? null : 'type')}
            onClose={() => setOpenFilter(null)}
          />

          <FilterDropdown
            id="sport-filter"
            icon={Swords}
            label="Modalidade"
            value={selectedSport}
            options={sportOptions}
            onChange={setSelectedSport}
            isOpen={openFilter === 'sport'}
            onToggle={() => setOpenFilter(openFilter === 'sport' ? null : 'sport')}
            onClose={() => setOpenFilter(null)}
          />
        </div>
      </section>

      <div className="grid items-start gap-4 xl:grid-cols-2">
        {grouped.length === 0 ? (
          <Card className="xl:col-span-2">
            <CardContent className="pt-5">
              <p className="text-sm text-[#C8CDD6]">Nenhum evento para os filtros atuais.</p>
            </CardContent>
          </Card>
        ) : (
          grouped.map(([date, dayEvents]) => <EventDayCard key={date} date={date} dayEvents={dayEvents} />)
        )}
      </div>
    </div>
  )
}

export default CalendarPage
