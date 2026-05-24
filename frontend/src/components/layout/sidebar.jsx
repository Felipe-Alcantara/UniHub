import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { useDemo } from '../../context/demo-context'
import { canAccessBoard } from '../../utils/athletiza-rules'
import godzillaCrest from '../../assets/brand/logo-godzilla-crest.png'

function Sidebar() {
  const { activeUser } = useDemo()
  const allowBoard = canAccessBoard(activeUser?.profile)

  const visibleItems = navigationItems.filter((item) => !item.requiresBoard || allowBoard)

  return (
    <>
      <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 border-r border-white/10 bg-[#131518]/80 p-4 md:block">
        <div className="mb-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#1E2127] p-3">
          <img src={godzillaCrest} alt="" aria-hidden="true" className="h-10 w-10 rounded-full object-cover" />
          <p className="text-sm font-bold text-white">Atlética Godzilla</p>
        </div>

        <nav className="space-y-1" aria-label="Navegação principal">
          {visibleItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border border-[#E86A10]/40 bg-[#E86A10]/20 text-[#FFB679]'
                    : 'text-[#C8CDD6] hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-white/10 bg-[#131518]/95 p-1 md:hidden" aria-label="Navegação mobile">
        {visibleItems.slice(0, 5).map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] ${
                isActive ? 'text-[#FFB679]' : 'text-[#8A919E]'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Sidebar
