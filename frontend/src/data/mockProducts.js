export const products = [
  {
    id: 'product-camiseta',
    name: 'Camiseta oficial 2026',
    category: 'vestuario',
    price: 'R$ 69,90',
    description: 'Camiseta dry-fit com escudo da Atlética Godzilla.',
    status: 'disponivel',
    contact: 'Davi - (24) 98888-2100',
  },
  {
    id: 'product-caneca',
    name: 'Caneca da torcida',
    category: 'acessorios',
    price: 'R$ 34,90',
    description: 'Caneca térmica com arte da bateria.',
    status: 'disponivel',
    contact: 'Davi - (24) 98888-2100',
  },
  {
    id: 'product-tirante',
    name: 'Tirante oficial',
    category: 'acessorios',
    price: 'R$ 24,90',
    description: 'Tirante com estampa ATLETIZA para eventos.',
    status: 'esgotado',
    contact: 'Davi - (24) 98888-2100',
  },
  {
    id: 'product-copo',
    name: 'Copo de festa 500 ml',
    category: 'eventos',
    price: 'R$ 18,00',
    description: 'Copo reutilizável para jogos e festas.',
    status: 'disponivel',
    contact: 'Bruna Silva - (24) 93333-2020',
  },
  {
    id: 'product-moletom',
    name: 'Moletom Godzilla',
    category: 'vestuario',
    price: 'R$ 129,90',
    description: 'Moletom premium com forro interno.',
    status: 'em_breve',
    contact: 'Tesouraria - (24) 95500-8899',
  },
  {
    id: 'product-ingresso',
    name: 'Ingresso Festa Integração',
    category: 'eventos',
    price: 'R$ 45,00',
    description: 'Ingresso promocional primeiro lote.',
    status: 'disponivel',
    contact: 'Eventos - (24) 93333-2020',
  },
  {
    id: 'product-pacote-treino',
    name: 'Pacote treino funcional',
    category: 'treino',
    price: 'R$ 99,00',
    description: 'Pacote mensal de treino funcional e recovery.',
    status: 'disponivel',
    contact: 'Esportes - (24) 96666-2233',
  },
]

export const productStatusLabel = {
  disponivel: 'Disponível',
  esgotado: 'Esgotado',
  em_breve: 'Em breve',
}

export const productCategories = [
  { id: 'all', label: 'Todas as categorias' },
  { id: 'vestuario', label: 'Vestuário' },
  { id: 'acessorios', label: 'Acessórios' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'treino', label: 'Treino' },
]

export const productCategoryLabel = {
  vestuario: 'Vestuário',
  acessorios: 'Acessórios',
  eventos: 'Eventos',
  treino: 'Treino',
}
