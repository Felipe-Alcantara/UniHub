import { useState } from 'react'
import { CalendarDays, ClipboardList, Shield, Trophy } from 'lucide-react'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import StatCard from '../components/parts/stat-card'
import { athleticsData } from '../data/unihub-data'

const tabs = [
  { id: 'athletes', label: 'Atletas' },
  { id: 'board', label: 'Diretoria' },
]

function Athletics() {
  const [activeTab, setActiveTab] = useState('athletes')

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge variant="success">Atletica</Badge>
          <h1 className="mt-3 text-3xl font-bold text-zinc-50">Gestao esportiva</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Treinos, amistosos, torneios e tarefas administrativas da atletica.
          </p>
        </div>

        <div className="flex rounded-2xl border border-white/10 bg-zinc-950/70 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 rounded-xl px-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-400 text-zinc-950'
                  : 'text-zinc-400 hover:text-zinc-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'athletes' ? (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {athleticsData.athleteStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </section>

          <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-emerald-300" />
                  Treinos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {athleticsData.trainings.map((training) => (
                  <article key={training.sport} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-semibold text-zinc-50">{training.sport}</h2>
                      <Badge variant="neutral">{training.time}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">{training.day}</p>
                    <p className="text-xs text-zinc-500">{training.place}</p>
                  </article>
                ))}
              </CardContent>
            </Card>

            <Card glow>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={18} className="text-amber-300" />
                  Amistosos e torneios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {athleticsData.matches.map((match) => (
                  <div key={match.title} className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <h2 className="font-semibold text-zinc-50">{match.title}</h2>
                      <p className="text-xs text-zinc-500">{match.date}</p>
                    </div>
                    <Badge variant={match.status === 'Confirmado' ? 'success' : 'warning'}>{match.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </>
      ) : (
        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card glow>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={18} className="text-emerald-300" />
                Diretoria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Presidencia', 'Tesouraria', 'Diretoria social', 'Coordenacao esportiva'].map((role) => (
                <div key={role} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-zinc-50">{role}</p>
                  <p className="text-xs text-zinc-500">Responsavel definido na assembleia atual</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList size={18} className="text-indigo-300" />
                Backlog administrativo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {athleticsData.boardTasks.map((task) => (
                <article key={task.task} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Badge variant="neutral">{task.area}</Badge>
                      <h2 className="mt-2 font-semibold text-zinc-50">{task.task}</h2>
                      <p className="text-xs text-zinc-500">{task.owner}</p>
                    </div>
                    <Badge variant={task.status === 'Concluido' ? 'success' : task.status === 'Em andamento' ? 'warning' : 'info'}>
                      {task.status}
                    </Badge>
                  </div>
                </article>
              ))}
              <Button variant="success" className="w-full">Nova tarefa</Button>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}

export default Athletics
