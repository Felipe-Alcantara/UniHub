import { motion } from 'framer-motion'

function PageWrapper({ children }) {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 pb-24 pt-24 sm:px-6 md:pb-14"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
