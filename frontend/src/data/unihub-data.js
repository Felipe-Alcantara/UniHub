import {
  BellRing,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Dumbbell,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Trophy,
  Users,
} from 'lucide-react'

export const dashboardStats = [
  { icon: ClipboardCheck, label: 'Prazos ativos', value: '6', trend: 12 },
  { icon: CalendarDays, label: 'Eventos da semana', value: '4', trend: 8 },
  { icon: BellRing, label: 'Avisos novos', value: '9', trend: 18 },
  { icon: GraduationCap, label: 'Aulas hoje', value: '3' },
]

export const notices = [
  {
    id: 1,
    title: 'Rematricula aberta',
    body: 'Prazo para confirmacao das disciplinas do semestre encerra nesta sexta.',
    category: 'Academico',
    priority: 'urgent',
    publishedAt: 'Hoje, 08:20',
  },
  {
    id: 2,
    title: 'Laboratorio B reservado',
    body: 'A sala B-204 sera usada para manutencao preventiva no periodo da tarde.',
    category: 'Campus',
    priority: 'warning',
    publishedAt: 'Hoje, 10:05',
  },
  {
    id: 3,
    title: 'Edital de monitoria',
    body: 'Inscricoes para monitoria de Algoritmos e Calculo I seguem ate quarta.',
    category: 'Oportunidade',
    priority: 'info',
    publishedAt: 'Ontem, 17:40',
  },
]

export const deadlines = [
  { title: 'Entrega do projeto integrador', subject: 'Engenharia de Software', dueDate: '24 mai', daysLeft: 1 },
  { title: 'Lista 3 de Calculo', subject: 'Calculo I', dueDate: '26 mai', daysLeft: 3 },
  { title: 'Questionario AVA', subject: 'Banco de Dados', dueDate: '28 mai', daysLeft: 5 },
  { title: 'Relatorio de laboratorio', subject: 'Fisica Experimental', dueDate: '31 mai', daysLeft: 8 },
]

export const events = [
  {
    title: 'Hackathon UniHub',
    description: 'Maratona de criacao para solucoes que simplificam a vida academica.',
    date: '23 mai, 14:00',
    location: 'Auditorio Central',
    type: 'activity',
    featured: true,
  },
  {
    title: 'Palestra: Carreira em Dados',
    description: 'Conversa com ex-alunos sobre analise, engenharia e ciencia de dados.',
    date: '25 mai, 19:00',
    location: 'Bloco C',
    type: 'lecture',
  },
  {
    title: 'Intercurso de Futsal',
    description: 'Rodada classificatoria organizada pela atletica.',
    date: '29 mai, 18:30',
    location: 'Ginasio',
    type: 'championship',
  },
]

export const todaySchedule = [
  { time: '08:00', subject: 'Banco de Dados', room: 'B-203', teacher: 'Prof. Marina' },
  { time: '10:00', subject: 'Calculo I', room: 'A-112', teacher: 'Prof. Renato' },
  { time: '19:00', subject: 'Projeto Integrador', room: 'Lab Maker', teacher: 'Prof. Helena' },
]

export const studentLinks = [
  {
    title: 'Ambiente Virtual',
    description: 'Materiais, atividades e notas publicadas pelos professores.',
    icon: BookOpen,
    color: 'text-sky-300 bg-sky-500/10',
    href: '#',
  },
  {
    title: 'Grupo da Turma',
    description: 'Canal principal para combinados, avisos rapidos e duvidas.',
    icon: MessageCircle,
    color: 'text-emerald-300 bg-emerald-500/10',
    href: '#',
  },
  {
    title: 'Calendario Academico',
    description: 'Feriados, provas, rematricula e datas institucionais.',
    icon: CalendarDays,
    color: 'text-amber-300 bg-amber-500/10',
    href: '#',
  },
  {
    title: 'Documentos do Curso',
    description: 'Matriz curricular, PPC, estagios e horas complementares.',
    icon: FileText,
    color: 'text-indigo-300 bg-indigo-500/10',
    href: '#',
  },
]

export const subjects = [
  { name: 'Engenharia de Software', teacher: 'Prof. Helena', room: 'Lab Maker', progress: 72 },
  { name: 'Banco de Dados', teacher: 'Prof. Marina', room: 'B-203', progress: 58 },
  { name: 'Calculo I', teacher: 'Prof. Renato', room: 'A-112', progress: 44 },
  { name: 'Fisica Experimental', teacher: 'Prof. Caio', room: 'Lab Fisica', progress: 63 },
]

export const campusBlocks = [
  {
    id: 'A',
    name: 'Bloco A',
    type: 'Salas teoricas',
    position: 'left-[8%] top-[18%] w-[26%] h-[28%]',
    color: 'border-sky-400/50 bg-sky-500/15 text-sky-100',
    rooms: ['A-101', 'A-112', 'A-205', 'A-306'],
    floorInfo: '3 andares',
  },
  {
    id: 'B',
    name: 'Bloco B',
    type: 'Laboratorios',
    position: 'left-[40%] top-[12%] w-[24%] h-[34%]',
    color: 'border-emerald-400/50 bg-emerald-500/15 text-emerald-100',
    rooms: ['B-101', 'B-203', 'B-204', 'Lab Redes'],
    floorInfo: '4 andares',
  },
  {
    id: 'C',
    name: 'Bloco C',
    type: 'Eventos e auditórios',
    position: 'left-[68%] top-[22%] w-[23%] h-[24%]',
    color: 'border-violet-400/50 bg-violet-500/15 text-violet-100',
    rooms: ['C-010', 'C-102', 'Auditorio 1', 'Auditorio 2'],
    floorInfo: '2 andares',
  },
  {
    id: 'G',
    name: 'Ginasio',
    type: 'Esportes',
    position: 'left-[12%] top-[58%] w-[31%] h-[28%]',
    color: 'border-amber-400/50 bg-amber-500/15 text-amber-100',
    rooms: ['Quadra', 'Sala tatame', 'Vestiario', 'Arquibancada'],
    floorInfo: 'terreo',
  },
  {
    id: 'M',
    name: 'Lab Maker',
    type: 'Projetos e prototipagem',
    position: 'left-[52%] top-[58%] w-[35%] h-[25%]',
    color: 'border-rose-400/50 bg-rose-500/15 text-rose-100',
    rooms: ['Impressao 3D', 'Eletronica', 'Coworking', 'Bancada'],
    floorInfo: 'terreo',
  },
]

export const athleticsData = {
  athleteStats: [
    { icon: Dumbbell, label: 'Treinos na semana', value: '8' },
    { icon: Trophy, label: 'Torneios ativos', value: '2' },
    { icon: Users, label: 'Atletas inscritos', value: '64', trend: 6 },
  ],
  trainings: [
    { sport: 'Futsal', day: 'Segunda e quarta', time: '18:30', place: 'Ginasio' },
    { sport: 'Volei', day: 'Terca e quinta', time: '19:00', place: 'Quadra externa' },
    { sport: 'Basquete', day: 'Sexta', time: '17:30', place: 'Ginasio' },
  ],
  matches: [
    { title: 'Amistoso Futsal x Direito', date: '27 mai', status: 'Confirmado' },
    { title: 'Seletiva Volei Feminino', date: '30 mai', status: 'Inscricoes' },
    { title: 'Copa Intercursos', date: '07 jun', status: 'Chaveamento' },
  ],
  boardTasks: [
    { area: 'Financeiro', task: 'Fechar orcamento dos uniformes', owner: 'Tesouraria', status: 'Pendente' },
    { area: 'Eventos', task: 'Reservar som para recepcao', owner: 'Diretoria social', status: 'Em andamento' },
    { area: 'Esportes', task: 'Atualizar lista de atletas federados', owner: 'Coordenacao', status: 'Concluido' },
  ],
}
