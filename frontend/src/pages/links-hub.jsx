import { ArrowUpRight, Instagram, MessageCircle, Users } from 'lucide-react'
import { importantLinks } from '../data/mockLinks'
import Button from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function ChannelIcon({ platform }) {
  if (platform === 'instagram') {
    return <Instagram size={22} />
  }

  return <MessageCircle size={22} />
}

function LinksPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Canais da atlética" />

      <div className="grid gap-3 md:grid-cols-2">
        {importantLinks.map((item) => (
          <Card key={item.id} className={item.platform === 'instagram' ? 'md:col-span-2' : ''}>
            <CardContent className="flex h-full flex-col pt-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className={`theme-preserve-dark flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${
                      item.platform === 'instagram'
                        ? 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4]'
                        : 'bg-[#25D366]'
                    }`}
                  >
                    <ChannelIcon platform={item.platform} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#C8CDD6]">{item.description}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#8A919E]">
                  {item.category}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                <p className="inline-flex items-center gap-1.5 text-xs text-[#8A919E]">
                  {item.platform === 'instagram' ? <Instagram size={13} /> : <Users size={13} />}
                  {item.contact}
                </p>
                <Button size="sm" className="rounded-xl">
                  {item.action}
                  <ArrowUpRight size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LinksPage
