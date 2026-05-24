import { CheckCircle2 } from 'lucide-react'
import { useDemo } from '../context/demo-context'
import { sports } from '../data/mockSports'
import { athleticInfo } from '../data/mockAthletic'
import Badge from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'
import logoSymbol from '../assets/brand/logo-atletiza-symbol-white.png'

function MemberCardPage() {
  const { activeUser, sportMemberships } = useDemo()

  const activeSports = sports
    .filter((sport) => sportMemberships[sport.id] === 'participant')
    .map((sport) => sport.name)

  return (
    <div className="space-y-5">
      <PageHeader title="Carteirinha digital" subtitle="Tela preparada para print no pitch" />

      <Card className="max-w-md">
        <CardContent className="space-y-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <img src={logoSymbol} alt="Simbolo Atletiza" className="h-12 w-12" />
            <Badge variant="brand">Selo Atletiza</Badge>
          </div>

          <div>
            <p className="text-lg font-bold text-white">{activeUser.name}</p>
            <p className="text-sm text-[#C8CDD6]">{athleticInfo.name}</p>
            <p className="text-xs text-[#8A919E]">Matricula: {activeUser.registration}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#131518] p-3">
            <p className="text-xs text-[#8A919E]">Status</p>
            <p className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-300"><CheckCircle2 size={14} /> Membro ativo</p>
            <p className="mt-1 text-xs text-[#C8CDD6]">Validade: {activeUser.cardValidUntil}</p>
          </div>

          <div>
            <p className="text-xs text-[#8A919E]">Modalidades</p>
            <p className="text-sm text-white">{activeSports.join(', ') || 'Nenhuma modalidade ativa'}</p>
          </div>

          <div className="h-20 rounded-2xl border border-dashed border-white/20 bg-[#131518] px-3 py-2 text-center">
            <p className="mt-5 text-xs tracking-[0.35em] text-[#C8CDD6]">QR DEMO</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MemberCardPage
