import { announcements } from '../data/mockAnnouncements'
import { polls } from '../data/mockPolls'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function BulletinPage() {
  const visibleAnnouncements = announcements.slice(0, 3)

  return (
    <div className="space-y-5">
      <PageHeader title="Mural" subtitle="Avisos importantes e decisões rápidas da atlética" />

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3">
            <CardTitle>Avisos</CardTitle>
            <span className="rounded-full bg-[#E86A10]/12 px-3 py-1 text-xs font-semibold text-[#FFB679]">
              {announcements.length} ativos
            </span>
          </CardHeader>
          <CardContent className="space-y-2">
            {visibleAnnouncements.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/10 bg-[#131518] px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#C8CDD6]">{item.message}</p>
                  </div>
                  <span
                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      item.priority === 'urgente' ? 'bg-red-400' : 'bg-[#E86A10]'
                    }`}
                    aria-label={item.priority === 'urgente' ? 'Urgente' : 'Normal'}
                  />
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>Enquetes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {polls.map((poll) => (
              <article key={poll.id} className="rounded-2xl border border-white/10 bg-[#131518] px-4 py-3">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{poll.title}</p>
                    <p className="mt-1 text-xs text-[#8A919E]">{poll.description}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#C8CDD6]">
                    {poll.totalVotes} votos
                  </span>
                </div>

                <div className="space-y-2.5">
                  {poll.options.map((option) => {
                    const percentage = Math.round((option.votes / poll.totalVotes) * 100)

                    return (
                      <div key={option.id}>
                        <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                          <span className="truncate font-medium text-[#C8CDD6]">{option.label}</span>
                          <span className="font-semibold text-white">{percentage}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#0D0F12]">
                          <div className="h-full rounded-full bg-[#E86A10]" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default BulletinPage
