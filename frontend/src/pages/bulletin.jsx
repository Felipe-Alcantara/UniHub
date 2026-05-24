import { announcements } from '../data/mockAnnouncements'
import { polls } from '../data/mockPolls'
import Badge from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function BulletinPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Mural e enquetes" subtitle="Avisos gerais, urgentes, por modalidade e votacoes mockadas" />

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mural de avisos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-[#131518] p-3">
                <div className="mb-2 flex flex-wrap gap-2">
                  {item.pinned ? <Badge variant="brand">Fixado</Badge> : null}
                  <Badge variant={item.priority === 'urgente' ? 'urgent' : 'info'}>{item.priority}</Badge>
                  <Badge variant="neutral">{item.type}</Badge>
                </div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-[#C8CDD6]">{item.message}</p>
                <p className="mt-1 text-[11px] text-[#8A919E]">Publico: {item.audience}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enquetes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {polls.map((poll) => (
              <div key={poll.id} className="rounded-2xl border border-white/10 bg-[#131518] p-3">
                <p className="text-sm font-semibold text-white">{poll.title}</p>
                <p className="text-xs text-[#8A919E]">{poll.description}</p>
                <div className="mt-3 space-y-2">
                  {poll.options.map((option) => {
                    const percentage = Math.round((option.votes / poll.totalVotes) * 100)

                    return (
                      <div key={option.id}>
                        <div className="mb-1 flex items-center justify-between text-xs text-[#C8CDD6]">
                          <span>{option.label}</span>
                          <span>{percentage}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#0D0F12]">
                          <div className="h-2 rounded-full bg-[#E86A10]" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default BulletinPage
