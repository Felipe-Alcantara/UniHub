import { MessageCircle } from 'lucide-react'
import { products, productStatusLabel } from '../data/mockProducts'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import PageHeader from '../components/ui/page-header'

const statusVariant = {
  disponivel: 'success',
  esgotado: 'urgent',
  em_breve: 'warning',
}

function StorePage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Vitrine de produtos" subtitle="Sem checkout ou pagamento no MVP: apenas exibicao e contato" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="pt-5">
              <div className="mb-3 h-28 rounded-2xl border border-white/10 bg-[#131518]" />
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-white">{product.name}</h2>
                <Badge variant={statusVariant[product.status]}>{productStatusLabel[product.status]}</Badge>
              </div>
              <p className="text-sm text-[#C8CDD6]">{product.price}</p>
              <p className="mt-1 text-xs text-[#8A919E]">{product.description}</p>
              <p className="mt-2 text-xs text-[#C8CDD6]">Responsavel: {product.contact}</p>
              <Button variant="outline" className="mt-3 w-full">
                <MessageCircle size={14} />
                Falar com responsavel
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StorePage
