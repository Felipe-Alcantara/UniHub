import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Fechar modal" />
          <motion.div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/15 bg-[#1E2127] p-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{title}</h2>
              <button type="button" onClick={onClose} className="rounded-xl border border-white/10 p-2 text-zinc-300 hover:bg-white/5" aria-label="Fechar">
                <X size={16} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Modal
