import { Link2 } from 'lucide-react'
import { importantLinks } from '../data/mockLinks'
import Badge from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

function LinksPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Links importantes" subtitle="Central de contatos e canais da Atletica Godzilla" />

      <div className="grid gap-3 md:grid-cols-2">
        {importantLinks.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2"><Link2 size={16} /> {item.title}</CardTitle>
                <Badge variant="neutral">{item.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#C8CDD6]">{item.description}</p>
              <p className="mt-2 text-xs text-[#8A919E]">Contato: {item.contact}</p>
              <button type="button" className="mt-3 rounded-xl border border-white/10 px-3 py-1.5 text-xs text-[#FFB679] hover:bg-white/5">
                Abrir contato (mock)
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LinksPage
