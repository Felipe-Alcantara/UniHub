import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/button'
import Input from '../components/ui/input'
import AtletizaLogo from '../components/brand/atletiza-logo'
import { useDemo } from '../context/demo-context'
import { apiPost } from '../utils/api'

const demoAccounts = [
  { email: 'aluno@exemple.com', environment: 'Aluno' },
  { email: 'diretoria@exemple.com', environment: 'Diretoria' },
  { email: 'admin@exemple.com', environment: 'Admin' },
]

const cinematicWords = [
  { text: 'Atletiza:', tone: 'brand' },
  { text: 'ambientação', suffix: '&', tone: 'soft' },
  { text: 'conectividade', tone: 'accent' },
]

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setActiveProfile, setAuthenticatedIdentity } = useDemo()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    setInfo('')
    setIsSubmitting(true)

    try {
      const user = await apiPost('/auth/login/', { email, password })
      setAuthenticatedIdentity(user)
      setActiveProfile(user.profile)
      navigate('/')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07090B] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,106,16,0.13),transparent_34%),radial-gradient(circle_at_58%_52%,rgba(232,106,16,0.075),transparent_48%),linear-gradient(115deg,#07090B_0%,#0A0D10_38%,#14100D_68%,#07090B_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_48%,rgba(238,243,247,0.05)_0%,rgba(232,106,16,0.052)_32%,rgba(232,106,16,0.018)_52%,transparent_76%),radial-gradient(ellipse_at_102%_52%,rgba(255,123,28,0.085)_0%,rgba(232,106,16,0.042)_34%,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_50%,rgba(232,106,16,0.10)_0%,rgba(232,106,16,0.045)_32%,transparent_68%),radial-gradient(circle_at_50%_50%,rgba(238,243,247,0.026)_0%,rgba(232,106,16,0.052)_26%,transparent_62%)]" />
      <div className="pointer-events-none absolute left-[calc(-1*clamp(1rem,2.8vw,3.5rem)+150px)] top-1/2 hidden w-[min(42vw,760px)] -translate-y-1/2 lg:block">
        <div className="relative space-y-32 [perspective:900px]">
          {cinematicWords.map((word, index) => (
            <motion.p
              key={word.text}
              className={`login-cinematic-word whitespace-nowrap uppercase ${
                word.tone === 'brand'
                  ? 'mb-16 text-[clamp(3rem,4.9vw,5.9rem)] font-extrabold leading-[0.86] tracking-[-0.055em] text-[#F2F5F8]/[0.34]'
                  : word.tone === 'soft'
                    ? 'text-[clamp(2.35rem,3.75vw,4.45rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[#EEF3F7]/[0.30]'
                    : 'text-[clamp(2.35rem,3.75vw,4.45rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[#FF7417]/[0.48]'
              }`}
              initial={reduceMotion ? false : { opacity: 0, x: -320, filter: 'blur(24px)' }}
              animate={reduceMotion ? { opacity: 0.12 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: reduceMotion ? 0 : 2.55, delay: reduceMotion ? 0 : 0.18 + index * 1.5, ease: [0.1, 0.78, 0.16, 1] }}
            >
              <span className="inline-block [transform:rotateX(3deg)_rotateY(-7deg)_skewX(-1deg)]">{word.text}</span>
              {word.suffix ? (
                <span className="login-cinematic-ampersand ml-5 inline-block align-baseline text-[0.86em] font-normal text-[#EEF3F7]/[0.30]">{word.suffix}</span>
              ) : null}
            </motion.p>
          ))}
        </div>
      </div>
      <motion.div
        className="relative w-full max-w-[420px]"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
      >
        <div className="mb-7 text-center">
          <AtletizaLogo surface="onDark" className="mx-auto h-12 w-auto opacity-95" />
        </div>

        <div className="relative rounded-[2rem]">
          <section className="login-card-panel relative z-10 overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#15181D]/78 px-6 py-9 backdrop-blur-2xl sm:px-7 sm:py-10">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.095),transparent_32%),linear-gradient(320deg,rgba(232,106,16,0.075),transparent_40%)]" />
            <h1 className="sr-only">Entrar na Atletiza</h1>

          <form className="relative space-y-5 pt-1" onSubmit={handleLogin}>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-4 top-[43px] text-[#8A919E]" />
              <Input
                id="login-email"
                label="E-mail"
                type="email"
                autoComplete="username"
                placeholder="Seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="login-field h-12 rounded-2xl border-white/[0.08] bg-[#EEF4FF] pl-11 text-[#071018] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_24px_rgba(0,0,0,0.12)] placeholder:text-[#7D8898]/70 focus:border-[#FF7B1C] focus:bg-white focus:ring-4 focus:ring-[#E86A10]/15"
                required
              />
            </div>

            <div className="relative">
              <LockKeyhole size={16} className="pointer-events-none absolute left-4 top-[43px] text-[#8A919E]" />
              <Input
                id="login-password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="login-field h-12 rounded-2xl border-white/[0.08] bg-[#EEF4FF] pl-11 pr-11 text-[#071018] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_24px_rgba(0,0,0,0.12)] placeholder:text-[#7D8898]/70 focus:border-[#FF7B1C] focus:bg-white focus:ring-4 focus:ring-[#E86A10]/15"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                className="absolute right-4 top-[35px] flex h-8 w-8 items-center justify-center rounded-full text-[#7A8390] transition-colors hover:bg-[#071018]/5 hover:text-[#071018] focus:outline-none focus:ring-2 focus:ring-[#E86A10]/30"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
              <div className="mt-1.5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setInfo('Recuperação de senha simulada no MVP. Use uma conta de demonstração para acessar.')
                    setError('')
                  }}
                  className="rounded-md px-1 py-0.5 text-[0.72rem] font-medium leading-none text-[#FFB679]/68 transition-colors hover:text-[#FFB679] focus:outline-none focus:ring-2 focus:ring-[#E86A10]/30"
                >
                  Esqueci minha senha
                </button>
              </div>
            </div>

            {error ? (
              <p role="alert" className="rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">
                {error}
              </p>
            ) : null}

            {info ? (
              <p role="status" className="rounded-xl border border-[#E86A10]/25 bg-[#E86A10]/10 px-3 py-2.5 text-sm text-[#FFB679]">
                {info}
              </p>
            ) : null}

            <Button type="submit" size="lg" className="group mt-1 h-9 w-full rounded-xl bg-[#E86A10] text-sm font-semibold shadow-[0_9px_18px_rgba(232,106,16,0.14)] hover:bg-[#F47416] hover:shadow-[0_11px_22px_rgba(232,106,16,0.18)]" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
              {!isSubmitting ? <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /> : null}
            </Button>
          </form>

          <div className="relative mt-8 border-t border-white/[0.08] pt-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8A919E]">Contas demo</p>
            <div className="mt-3 space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => {
                    setEmail(account.email)
                    setPassword('Atletiza@2026')
                    setError('')
                    setInfo('')
                  }}
                  className="flex h-10 w-full items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3.5 text-left text-xs transition-all hover:border-[#E86A10]/35 hover:bg-[#E86A10]/[0.07]"
                >
                  <span className="text-[#C8CDD6]">{account.email}</span>
                  <span className="text-[#FFB679]">{account.environment}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#7D8593]">
              Senha demo para todas as contas: <span className="font-medium text-[#C8CDD6]">Atletiza@2026</span>
            </p>
          </div>
        </section>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
