import { ArrowRight, BellRing, CalendarDays, Clock3 } from 'lucide-react'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import DeadlineCard from '../components/parts/deadline-card'
import EventBanner from '../components/parts/event-banner'
import StatCard from '../components/parts/stat-card'
import { dashboardStats, deadlines, events, notices, todaySchedule } from '../data/unihub-data'

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/60 p-6 sm:p-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="default">Hoje no campus</Badge>
            <div>
              <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">
                Boa noite, Felipe
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Suas aulas, prazos e eventos mais importantes estao reunidos para o dia render sem correria.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>
                Ver agenda <ArrowRight size={16} />
              </Button>
              <Button variant="outline">Abrir avisos</Button>
            </div>
          </div>
        </div>

        <Card glow>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock3 size={18} className="text-amber-300" />
              Proxima aula
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-zinc-50">19:00</p>
              <p className="text-sm text-zinc-400">Projeto Integrador</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-zinc-100">Lab Maker</p>
              <p className="mt-1 text-xs text-zinc-500">Prof. Helena · Bloco M</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-50">Prazos urgentes</h2>
              <p className="text-sm text-zinc-500">Entregas e atividades com maior prioridade.</p>
            </div>
            <Button variant="ghost" size="sm">Todos</Button>
          </div>
          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <DeadlineCard key={deadline.title} {...deadline} />
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing size={18} className="text-indigo-300" />
              Avisos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notices.map((notice) => (
              <article key={notice.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <Badge variant={notice.priority}>{notice.category}</Badge>
                  <span className="text-xs text-zinc-500">{notice.publishedAt}</span>
                </div>
                <h3 className="font-semibold text-zinc-50">{notice.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{notice.body}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays size={18} className="text-emerald-300" />
              Grade de hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((item) => (
              <div key={`${item.time}-${item.subject}`} className="grid grid-cols-[64px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <span className="font-mono text-sm font-bold text-indigo-300">{item.time}</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{item.subject}</p>
                  <p className="text-xs text-zinc-500">{item.room} · {item.teacher}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-50">Eventos em destaque</h2>
            <p className="text-sm text-zinc-500">Movimentacao academica, esportiva e institucional.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <EventBanner key={event.title} {...event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
