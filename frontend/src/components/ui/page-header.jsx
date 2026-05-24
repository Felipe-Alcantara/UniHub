import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function PageHeader({ title, subtitle, back = false, rightSlot }) {
  const navigate = useNavigate()

  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        {back ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-3 inline-flex items-center gap-1 rounded-xl border border-white/15 px-3 py-1.5 text-xs text-[#C8CDD6] hover:bg-white/5"
          >
            <ArrowLeft size={14} />
            Voltar
          </button>
        ) : null}
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-[#8A919E]">{subtitle}</p> : null}
      </div>
      {rightSlot || null}
    </div>
  )
}

export default PageHeader
