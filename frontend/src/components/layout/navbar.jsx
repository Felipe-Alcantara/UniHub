import { Link, useLocation } from 'react-router-dom'
import { LogOut, ShieldCheck } from 'lucide-react'
import Button from '../ui/button'
import { useDemo } from '../../context/demo-context'
import AtletizaLogo from '../brand/atletiza-logo'

function Navbar() {
  const { activeUser, setActiveProfile } = useDemo()
  const location = useLocation()

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/[0.06] bg-[#0D1014]/38 shadow-[0_1px_0_rgba(255,255,255,0.02),0_12px_34px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80" aria-label="Ir para início">
          <AtletizaLogo surface="adaptive" className="h-7 w-auto" />
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold tracking-tight text-white">{activeUser?.name}</p>
            <p className="text-xs text-[#89929F]">{activeUser?.roleLabel}</p>
          </div>

          {location.pathname === '/board' ? (
            <span className="hidden items-center gap-1 rounded-full border border-[#E86A10]/30 bg-[#E86A10]/10 px-3 py-1 text-xs text-[#FFB679] sm:inline-flex">
              <ShieldCheck size={14} />
              Painel de demonstração
            </span>
          ) : null}

          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl px-2.5 text-[#D5DAE1] hover:bg-white/[0.06] hover:text-white sm:px-3"
            onClick={() => setActiveProfile(null)}
          >
            <LogOut size={14} />
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
