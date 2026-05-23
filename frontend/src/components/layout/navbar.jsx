import { Link } from 'react-router-dom'
import { Bell, Search, User } from 'lucide-react'
import Button from '../ui/button'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold unihub-text-glow">UniHub</span>
        </Link>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-zinc-800/50 border border-white/10 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notificacoes">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Perfil">
            <User size={18} />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
