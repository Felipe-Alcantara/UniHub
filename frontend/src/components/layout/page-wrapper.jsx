import { motion } from 'framer-motion'

function PageWrapper({ children }) {
  return (
    <motion.main
      className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 md:pb-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.main>
  )
}

export default PageWrapper
