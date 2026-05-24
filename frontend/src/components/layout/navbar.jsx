import { Link, useLocation } from 'react-router-dom'
import { LogOut, ShieldCheck } from 'lucide-react'
import Button from '../ui/button'
import { useDemo } from '../../context/demo-context'
import logoHorizontal from '../../assets/brand/logo-atletiza-horizontal-white.png'

function Navbar() {
  const { activeUser, setActiveProfile } = useDemo()
  const location = useLocation()

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#131518]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/dashboard" className="flex items-center gap-3" aria-label="Ir para dashboard">
          <img src={logoHorizontal} alt="Logo Atletiza" className="h-7 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">{activeUser?.name}</p>
            <p className="text-xs text-[#8A919E]">{activeUser?.roleLabel}</p>
          </div>

          {location.pathname === '/board' ? (
            <span className="hidden items-center gap-1 rounded-full border border-[#E86A10]/40 bg-[#E86A10]/20 px-3 py-1 text-xs text-[#FFB679] sm:inline-flex">
              <ShieldCheck size={14} />
              Painel demo
            </span>
          ) : null}

          <Button variant="ghost" size="sm" onClick={() => setActiveProfile(null)}>
            <LogOut size={14} />
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
