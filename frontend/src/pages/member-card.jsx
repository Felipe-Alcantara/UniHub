import { CalendarDays, CheckCircle2, Fingerprint, GraduationCap, ShieldCheck } from 'lucide-react'
import { useDemo } from '../context/demo-context'
import { sports } from '../data/mockSports'
import { athleticInfo } from '../data/mockAthletic'
import Badge from '../components/ui/badge'
import AtletizaLogo from '../components/brand/atletiza-logo'
import PageHeader from '../components/ui/page-header'
import godzillaCrest from '../assets/brand/logo-godzilla-crest.png'

const QR_SIZE = 21

function createDemoQrMatrix() {
  const matrix = Array.from({ length: QR_SIZE }, () => Array.from({ length: QR_SIZE }, () => false))

  const paintFinder = (startRow, startCol) => {
    for (let row = 0; row < 7; row += 1) {
      for (let col = 0; col < 7; col += 1) {
        const isBorder = row === 0 || row === 6 || col === 0 || col === 6
        const isCore = row >= 2 && row <= 4 && col >= 2 && col <= 4
        matrix[startRow + row][startCol + col] = isBorder || isCore
      }
    }
  }

  paintFinder(0, 0)
  paintFinder(0, 14)
  paintFinder(14, 0)

  for (let index = 0; index < QR_SIZE; index += 1) {
    matrix[6][index] = index % 2 === 0
    matrix[index][6] = index % 2 === 0
  }

  for (let row = 0; row < QR_SIZE; row += 1) {
    for (let col = 0; col < QR_SIZE; col += 1) {
      const inFinder =
        (row < 7 && col < 7) ||
        (row < 7 && col > 13) ||
        (row > 13 && col < 7)

      if (inFinder || row === 6 || col === 6) {
        continue
      }

      const patterned = (row * 3 + col * 5 + row * col) % 7 === 0 || (row + col) % 5 === 0
      matrix[row][col] = patterned
    }
  }

  for (let row = 9; row <= 11; row += 1) {
    for (let col = 9; col <= 11; col += 1) {
      matrix[row][col] = false
    }
  }

  return matrix
}

function DemoQrCode() {
  const matrix = createDemoQrMatrix()
  const moduleCount = matrix.length
  const moduleSize = 4
  const quietZone = 4
  const size = (moduleCount + quietZone * 2) * moduleSize

  return (
    <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-[#0D1014] p-4">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="QR code de demonstração"
        className="h-40 w-40 rounded-2xl bg-white p-1 sm:h-44 sm:w-44"
      >
        <rect x="0" y="0" width={size} height={size} rx="14" fill="#fff" />
        <g fill="#111111">
          {matrix.map((row, rowIndex) =>
            row.map((filled, colIndex) =>
              filled ? (
                <rect
                  key={`${rowIndex}-${colIndex}`}
                  x={(colIndex + quietZone) * moduleSize}
                  y={(rowIndex + quietZone) * moduleSize}
                  width={moduleSize}
                  height={moduleSize}
                  rx="0.6"
                />
              ) : null,
            ),
          )}
        </g>
        <rect
          x={(quietZone + 8) * moduleSize}
          y={(quietZone + 8) * moduleSize}
          width={moduleSize * 3}
          height={moduleSize * 3}
          rx="4"
          fill="#E86A10"
        />
      </svg>
      <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C8CDD6]">
        QR de demonstração
      </p>
      <p className="mt-1 text-center text-[11px] text-[#8A919E]">Leitura simulada no MVP</p>
    </div>
  )
}

function MemberCardPage() {
  const { activeUser, sportMemberships } = useDemo()

  const activeSports = sports
    .filter((sport) => sportMemberships[sport.id] === 'participant')
    .map((sport) => sport.name)
  const credentialNumber = `GDZ-${activeUser.registration}-26`
  const cardDetails = [
    { label: 'Matrícula', value: activeUser.registration, icon: GraduationCap },
    { label: 'Categoria', value: activeUser.roleLabel, icon: ShieldCheck },
    { label: 'Emissão', value: '24/05/2026', icon: CalendarDays },
    { label: 'Validade', value: activeUser.cardValidUntil || '12/2026', icon: CalendarDays },
  ]

  return (
    <div className="space-y-5">
      <PageHeader title="Carteirinha digital" subtitle="Credencial esportiva do participante" />

      <section className="relative max-w-[1120px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#1A1E24] shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(232,106,16,0.16),transparent_35%),linear-gradient(125deg,rgba(255,255,255,0.035),transparent_38%),radial-gradient(circle_at_100%_90%,rgba(232,106,16,0.08),transparent_36%)]" />
        <div className="relative flex items-center justify-between border-b border-white/[0.08] px-6 py-5 sm:px-8">
          <div className="flex items-center gap-4">
            <img src={godzillaCrest} alt="Brasão da Atlética Godzilla" className="h-14 w-14 rounded-full border border-white/15 object-cover sm:h-16 sm:w-16" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FFB679]">Credencial oficial</p>
              <p className="mt-1 text-lg font-bold text-white sm:text-xl">{athleticInfo.name}</p>
              <p className="text-xs text-[#8A919E]">Associação esportiva universitária</p>
            </div>
          </div>
          <div className="hidden flex-col items-end gap-3 sm:flex">
            <AtletizaLogo surface="onDark" className="h-7 w-auto opacity-90" />
            <Badge variant="brand">Membro verificado</Badge>
          </div>
        </div>

        <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr_230px]">
          <div className="flex flex-col justify-between gap-7">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A919E]">Titular</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">{activeUser.name}</h2>
              <p className="mt-2 text-sm text-[#C8CDD6]">{activeUser.roleLabel} | Campus Volta Redonda</p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A919E]">Modalidades ativas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeSports.map((sport) => (
                  <span key={sport} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#E3E6EA]">
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5 border-white/10 lg:border-l lg:pl-7">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A919E]">Situação cadastral</p>
              <p className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-emerald-300">
                <CheckCircle2 size={17} />
                {activeUser.membershipStatus}
              </p>
              <p className="mt-1 text-xs text-[#C8CDD6]">Apto para eventos e atividades da atlética</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {cardDetails.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/[0.08] bg-[#131518]/75 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#8A919E]">
                    <Icon size={12} />
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">{label === 'Matrícula' ? `Matrícula: ${value}` : value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#131518]/75 px-4 py-3">
              <Fingerprint size={18} className="shrink-0 text-[#FFB679]" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A919E]">Código da credencial</p>
                <p className="mt-1 font-mono text-sm tracking-[0.12em] text-white">{credentialNumber}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <DemoQrCode />
            <div className="rounded-2xl border border-white/[0.08] bg-[#131518]/75 p-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A919E]">Validação institucional</p>
              <p className="mt-2 text-xs text-[#C8CDD6]">{athleticInfo.supportEmail}</p>
              <p className="mt-1 text-xs text-[#C8CDD6]">{athleticInfo.supportPhone}</p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] px-6 py-4 text-[11px] text-[#8A919E] sm:px-8">
          <p>Documento digital de demonstração | Uso acadêmico e esportivo</p>
          <p className="font-mono tracking-[0.16em]">ATLETIZA / GODZILLA / 2026</p>
        </div>
      </section>
    </div>
  )
}

export default MemberCardPage
