import { NavLink } from 'react-router-dom'
import { LayoutDashboard, GraduationCap, Trophy, Map } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/aluno', icon: GraduationCap, label: 'Área do Aluno' },
  { to: '/atletica', icon: Trophy, label: 'Atlética' },
  { to: '/mapa', icon: Map, label: 'Mapa do Campus' },
]

function Sidebar() {
  return (
    <>
      <aside className="fixed left-0 top-16 bottom-0 z-30 hidden md:flex w-64 flex-col border-r border-white/10 bg-zinc-950/60 backdrop-blur-md">
        <nav className="flex flex-col gap-1 p-4 pt-6" aria-label="Navegacao principal">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-400 hover:text-zinc-50 hover:bg-white/5'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-white/10 bg-zinc-950/90 backdrop-blur-md md:hidden" aria-label="Navegacao mobile">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex h-16 flex-col items-center justify-center gap-1 text-[0.68rem] font-medium transition-all duration-300 ${
                isActive
                  ? 'text-indigo-300'
                  : 'text-zinc-400 hover:text-zinc-50 hover:bg-white/5'
              }`
            }
          >
            <Icon size={19} />
            <span className="max-w-full truncate px-1">{label.replace('Área do ', '')}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Sidebar
