import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import Badge from '../ui/badge'

function EventBanner({ title, description, date, location, type, featured = false }) {
  const typeLabels = {
    lecture: 'Palestra',
    championship: 'Campeonato',
    activity: 'Atividade',
    party: 'Festa',
  }

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-3xl border p-6
        transition-all duration-300
        ${featured
          ? 'border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 to-violet-950/50 unihub-card-glow'
          : 'border-white/10 bg-zinc-950/50 hover:border-white/20'
        }
      `}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge variant={featured ? 'default' : 'neutral'}>
            {typeLabels[type] || type}
          </Badge>
          {featured && <Badge variant="warning">Destaque</Badge>}
        </div>

        <h3 className="text-lg font-bold text-zinc-50">{title}</h3>
        {description && (
          <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
        )}

        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {date}
          </span>
          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default EventBanner
