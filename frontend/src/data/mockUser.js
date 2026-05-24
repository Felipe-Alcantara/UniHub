export const demoUsers = {
  student: {
    id: 'user-gabriel',
    profile: 'student',
    name: 'Gabriel Fernandes',
    registration: '202612345',
    membershipStatus: 'Membro ativo',
    athleticName: 'Atlética Godzilla',
    roleLabel: 'Aluno / Atleta',
    cardValidUntil: '12/2026',
    sportMemberships: {
      volei: 'participant',
      esports: 'participant',
      basquete: 'pending',
      futsal: 'not_member',
      handebol: 'not_member',
      bateria: 'not_member',
      cheer: 'rejected',
    },
  },
  board: {
    id: 'user-ana',
    profile: 'board',
    name: 'Ana Souza',
    registration: 'DIR-002',
    membershipStatus: 'Diretoria ativa',
    athleticName: 'Atlética Godzilla',
    roleLabel: 'Diretora de Esportes',
    boardRole: 'sports_director',
    sportMemberships: {
      volei: 'participant',
      futsal: 'participant',
      basquete: 'participant',
      esports: 'participant',
      handebol: 'participant',
      bateria: 'participant',
      cheer: 'participant',
    },
  },
  admin: {
    id: 'user-dev',
    profile: 'admin',
    name: 'Felipe Admin',
    registration: 'DEV-001',
    membershipStatus: 'Acesso técnico',
    athleticName: 'Atlética Godzilla',
    roleLabel: 'Dev/Admin',
    boardRole: 'dev_admin',
    sportMemberships: {
      volei: 'participant',
      esports: 'participant',
      futsal: 'participant',
      basquete: 'participant',
      handebol: 'participant',
      bateria: 'participant',
      cheer: 'participant',
    },
  },
}

export const participantDemoAccounts = [
  {
    email: 'gabriel@atletiza.com',
    name: 'Gabriel Fernandes',
    registration: '202612345',
  },
  {
    email: 'julia@atletiza.com',
    name: 'Júlia de Oliveira Martins',
    registration: '2025101351',
  },
  {
    email: 'andre@atletiza.com',
    name: 'André Gustavo Melo da Silva',
    registration: '2023121370',
  },
  {
    email: 'luiz.filipe@atletiza.com',
    name: 'Luiz Filipe Silva Rocha',
    registration: '2025101510',
  },
]

export const loginProfiles = [
  { id: 'student', label: 'Aluno', description: 'Consulta treinos, eventos, modalidades e carteirinha.' },
  { id: 'board', label: 'Diretoria', description: 'Gerencia modalidades, eventos e aprovações.' },
  { id: 'admin', label: 'Dev/Admin', description: 'Acesso geral de demonstração técnica.' },
]
