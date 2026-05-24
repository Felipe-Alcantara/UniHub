import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginProfiles } from '../data/mockUser'
import { athleticInfo } from '../data/mockAthletic'
import { useDemo } from '../context/demo-context'
import Button from '../components/ui/button'
import Badge from '../components/ui/badge'
import logoHorizontal from '../assets/brand/logo-atletiza-horizontal-white.png'
import logoSymbol from '../assets/brand/logo-atletiza-symbol-white.png'

function LoginPage() {
  const [selectedProfile, setSelectedProfile] = useState('student')
  const { setActiveProfile } = useDemo()
  const navigate = useNavigate()

  const handleLogin = () => {
    setActiveProfile(selectedProfile)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#131518] px-4 py-10 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-[#1E2127] p-6 text-center">
          <img src={logoSymbol} alt="Simbolo Atletiza" className="mx-auto mb-4 h-14 w-14" />
          <img src={logoHorizontal} alt="Logo Atletiza" className="mx-auto h-8 w-auto" />
          <p className="mt-3 text-sm text-[#C8CDD6]">{athleticInfo.name}</p>
          <p className="text-xs text-[#8A919E]">{athleticInfo.slogan}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#1E2127] p-5">
          <div className="mb-4">
            <Badge variant="brand">Login mockado</Badge>
            <h1 className="mt-3 text-xl font-bold">Escolha o perfil de demonstracao</h1>
          </div>

          <div className="space-y-3">
            {loginProfiles.map((profile) => {
              const active = selectedProfile === profile.id

              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                    active
                      ? 'border-[#E86A10]/50 bg-[#E86A10]/15'
                      : 'border-white/10 bg-[#131518] hover:bg-white/5'
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{profile.label}</p>
                  <p className="text-xs text-[#8A919E]">{profile.description}</p>
                </button>
              )
            })}
          </div>

          <Button className="mt-5 w-full" onClick={handleLogin}>
            Entrar na Atletiza
          </Button>
          <p className="mt-2 text-center text-xs text-[#8A919E]">Sem autenticacao real - modo demo para hackathon.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
