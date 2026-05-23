import { ArrowUpRight, BookMarked, CheckCircle2 } from 'lucide-react'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { studentLinks, subjects } from '../data/unihub-data'

function StudentArea() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge variant="info">Area do aluno</Badge>
          <h1 className="mt-3 text-3xl font-bold text-zinc-50">Central academica</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Links do curso, materiais, grupos e informacoes academicas em um so painel.
          </p>
        </div>
        <Button variant="outline">
          Solicitar documento <ArrowUpRight size={16} />
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {studentLinks.map(({ icon: Icon, title, description, color }) => (
          <Card key={title} className="group">
            <CardContent className="space-y-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <h2 className="font-bold text-zinc-50">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{description}</p>
              </div>
              <Button variant="ghost" size="sm" className="px-0 text-indigo-300 group-hover:text-indigo-200">
                Abrir <ArrowUpRight size={15} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked size={18} className="text-emerald-300" />
              Materias em andamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject) => (
              <article key={subject.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-zinc-50">{subject.name}</h3>
                    <p className="text-xs text-zinc-500">{subject.teacher} · {subject.room}</p>
                  </div>
                  <Badge variant="neutral">{subject.progress}% concluido</Badge>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card glow>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-amber-300" />
              Pendencias academicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Validar horas complementares',
              'Confirmar rematricula',
              'Enviar comprovante de estagio',
              'Atualizar dados cadastrais',
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <span className={`h-2.5 w-2.5 rounded-full ${index < 2 ? 'bg-amber-300' : 'bg-zinc-600'}`} />
                <span className="text-sm text-zinc-300">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default StudentArea
