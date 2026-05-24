import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  Home,
  Megaphone,
  Shield,
  ShoppingBag,
  Swords,
  Link2,
} from 'lucide-react'

export const navigationItems = [
  { to: '/', label: 'Início', icon: Home },
  { to: '/calendar', label: 'Agenda', icon: CalendarDays },
  { to: '/sports', label: 'Modalidades', icon: Swords },
  { to: '/links', label: 'Links', icon: Link2 },
  { to: '/store', label: 'Vitrine', icon: ShoppingBag },
  { to: '/card', label: 'Carteirinha', icon: CreditCard },
  { to: '/bulletin', label: 'Mural', icon: Megaphone },
  { to: '/board', label: 'Diretoria', icon: Shield, requiresBoard: true },
]

export const quickActions = [
  { to: '/calendar', label: 'Ver agenda' },
  { to: '/sports', label: 'Explorar modalidades' },
  { to: '/board', label: 'Ir para painel', requiresBoard: true },
]

export const adminSections = [
  { id: 'events', label: 'Eventos' },
  { id: 'trainings', label: 'Treinos' },
  { id: 'sports', label: 'Modalidades' },
  { id: 'links', label: 'Links importantes' },
  { id: 'products', label: 'Produtos' },
  { id: 'approvals', label: 'Aprovações de seletiva' },
  { id: 'presence', label: 'Lista de presença' },
]

export const announcementTypes = {
  geral: 'Geral',
  treino: 'Treino',
  eventos: 'Eventos',
  modalidade: 'Modalidade',
}
