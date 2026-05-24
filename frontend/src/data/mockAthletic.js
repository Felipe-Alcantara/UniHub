export const athleticInfo = {
  id: 'godzilla',
  name: 'Atlética Godzilla',
  productName: 'ATLETIZA',
  slogan: 'Tudo da atlética em um só lugar',
  supportPhone: '(24) 99999-1001',
  supportEmail: 'contato@atletiza.demo',
  quickContact: {
    name: 'Davi',
    role: 'Presidente',
    phone: '(24) 98888-2100',
  },
  boardMembers: [
    { id: 'president', name: 'Davi', role: 'Presidente' },
    { id: 'sports-director', name: 'Ana Souza', role: 'Diretora de Esportes' },
    { id: 'events-director', name: 'Bruna Silva', role: 'Diretora de Eventos' },
    { id: 'treasury', name: 'Carlos Lima', role: 'Tesouraria e Vendas' },
  ],
}

export const boardPermissions = {
  president: ['events', 'trainings', 'sports', 'links', 'products', 'approvals'],
  sports_director: ['trainings', 'sports', 'approvals', 'events'],
  events_director: ['events'],
  treasury_sales: ['products', 'links'],
  sport_coordinator: ['sports'],
  dev_admin: ['events', 'trainings', 'sports', 'links', 'products', 'approvals', 'technical'],
}
