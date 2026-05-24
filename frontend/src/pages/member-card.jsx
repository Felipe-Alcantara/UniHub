import { CheckCircle2 } from 'lucide-react'
import { useDemo } from '../context/demo-context'
import { sports } from '../data/mockSports'
import { athleticInfo } from '../data/mockAthletic'
import Badge from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
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
    <div className="rounded-2xl border border-white/10 bg-[#0F1216] p-3">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="QR code de demonstração"
        className="h-32 w-32 rounded-xl bg-white p-1"
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
      <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8CDD6]">
        QR de demonstração
      </p>
    </div>
  )
}

function MemberCardPage() {
  const { activeUser, sportMemberships } = useDemo()

  const activeSports = sports
    .filter((sport) => sportMemberships[sport.id] === 'participant')
    .map((sport) => sport.name)

  return (
    <div className="space-y-5">
      <PageHeader title="Carteirinha digital" subtitle="Tela preparada para captura na apresentação" />

      <Card className="max-w-md">
        <CardContent className="space-y-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <img src={godzillaCrest} alt="Brasão da Atlética Godzilla" className="h-12 w-12 rounded-full object-cover" />
            <Badge variant="brand">Selo Atletiza</Badge>
          </div>

          <div>
            <p className="text-lg font-bold text-white">{activeUser.name}</p>
            <p className="text-sm text-[#C8CDD6]">{athleticInfo.name}</p>
            <p className="text-xs text-[#8A919E]">Matrícula: {activeUser.registration}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#131518] p-3">
            <p className="text-xs text-[#8A919E]">Status</p>
            <p className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-300"><CheckCircle2 size={14} /> Membro ativo</p>
            <p className="mt-1 text-xs text-[#C8CDD6]">Validade: {activeUser.cardValidUntil}</p>
          </div>

          <div>
            <p className="text-xs text-[#8A919E]">Modalidades</p>
            <p className="text-sm text-white">{activeSports.join(', ') || 'Nenhuma modalidade ativa'}</p>
          </div>

          <DemoQrCode />
        </CardContent>
      </Card>
    </div>
  )
}

export default MemberCardPage
