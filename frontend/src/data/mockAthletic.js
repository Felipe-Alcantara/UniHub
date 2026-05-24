export const athleticInfo = {
  id: 'godzilla',
  name: 'Atletica Godzilla',
  productName: 'ATLETIZA',
  slogan: 'Tudo da atletica em um lugar so',
  supportPhone: '(11) 99999-1001',
  supportEmail: 'contato@atletiza.demo',
  quickContact: {
    name: 'Lucas Martins',
    role: 'Presidente',
    phone: '(11) 98888-2100',
  },
  boardMembers: [
    { id: 'president', name: 'Lucas Martins', role: 'Presidente' },
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
