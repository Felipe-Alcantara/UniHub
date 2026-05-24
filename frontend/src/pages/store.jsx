import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronDown, MessageCircle, Search, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { productCategories, productCategoryLabel, products, productStatusLabel } from '../data/mockProducts'
import Badge from '../components/ui/badge'
import godzillaCrest from '../assets/brand/logo-godzilla-crest.png'

const statusVariant = {
  disponivel: 'success',
  esgotado: 'urgent',
  em_breve: 'warning',
}

function CategoryFilter({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const reduceMotion = useReducedMotion()
  const selectedCategory = productCategories.find((category) => category.id === value) || productCategories[0]

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const selectedIndex = productCategories.findIndex((category) => category.id === value)
      optionRefs.current[selectedIndex]?.focus()
    }
  }, [isOpen, value])

  const selectCategory = (categoryId) => {
    onChange(categoryId)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const focusOption = (currentIndex, nextIndex) => {
    const normalizedIndex = (nextIndex + productCategories.length) % productCategories.length
    optionRefs.current[normalizedIndex]?.focus()
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Filtrar por categoria"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="store-category-options"
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            setIsOpen(true)
          }
        }}
        className={`flex h-11 w-full items-center gap-3 rounded-xl border bg-[#101317]/90 pl-4 pr-3 text-left text-sm font-medium text-white outline-none transition-all duration-200 ${
          isOpen
            ? 'border-[#E86A10]/70 shadow-[0_0_0_3px_rgba(232,106,16,0.14),0_18px_36px_rgba(0,0,0,0.28)]'
            : 'border-[#E86A10]/30 hover:border-[#E86A10]/55'
        } focus-visible:border-[#E86A10]/70 focus-visible:ring-2 focus-visible:ring-[#E86A10]/20`}
      >
        <SlidersHorizontal size={16} className="shrink-0 text-[#FFB679]" />
        <span className="min-w-0 flex-1 truncate">{selectedCategory.label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#A5ADBA] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FFB679]' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#15191F]/98 p-1.5 shadow-[0_20px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#707887]">
              Categoria
            </div>
            <ul id="store-category-options" role="listbox" aria-label="Categorias de produtos" className="space-y-1">
              {productCategories.map((category) => {
                const isSelected = category.id === value

                return (
                  <li key={category.id}>
                    <button
                      ref={(element) => {
                        optionRefs.current[productCategories.indexOf(category)] = element
                      }}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => selectCategory(category.id)}
                      onKeyDown={(event) => {
                        const categoryIndex = productCategories.indexOf(category)

                        if (event.key === 'ArrowDown') {
                          event.preventDefault()
                          focusOption(categoryIndex, categoryIndex + 1)
                        }

                        if (event.key === 'ArrowUp') {
                          event.preventDefault()
                          focusOption(categoryIndex, categoryIndex - 1)
                        }

                        if (event.key === 'Home') {
                          event.preventDefault()
                          focusOption(categoryIndex, 0)
                        }

                        if (event.key === 'End') {
                          event.preventDefault()
                          focusOption(categoryIndex, productCategories.length - 1)
                        }
                      }}
                      className={`relative flex w-full items-center justify-between overflow-hidden rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                        isSelected ? 'text-white' : 'text-[#C8CDD6] hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      {isSelected ? (
                        <motion.span
                          layoutId="active-store-category"
                          transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                          className="absolute inset-0 border border-[#E86A10]/35 bg-[#E86A10]/15"
                        />
                      ) : null}
                      <span className="relative">{category.label}</span>
                      {isSelected ? <Check size={15} className="relative text-[#FFB679]" /> : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function StorePage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [feedback, setFeedback] = useState('')
  const reduceMotion = useReducedMotion()

  const availableCount = products.filter((product) => product.status === 'disponivel').length
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')

    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const searchableText = `${product.name} ${product.description}`.toLocaleLowerCase('pt-BR')
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategory])

  const handleContact = (product) => {
    const action = product.status === 'esgotado'
      ? 'Interesse em reposição'
      : product.status === 'em_breve'
        ? 'Interesse no lançamento'
        : 'Pedido de contato'

    setFeedback(`${action} registrado para ${product.name}. Fale com ${product.contact}.`)
  }

  return (
    <div className="space-y-6">
      <section className="relative z-20 rounded-3xl border border-white/10 bg-[#171B21] px-5 py-5 sm:px-7 sm:py-6">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_18%_0%,rgba(232,106,16,0.14),transparent_42%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(290px,1fr)_minmax(440px,560px)] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFB679]">Produtos oficiais</p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Vista a sua <span className="text-[#FF7B1C]">ATLETIZA.</span>
            </h1>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#A5ADBA]">
              <span className="h-2 w-2 rounded-full bg-[#E86A10]" />
              {availableCount} disponíveis de {products.length} produtos
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="relative">
              <span className="sr-only">Buscar produto</span>
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A919E]" />
              <input
                type="search"
                aria-label="Buscar produto"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar produto..."
                className="h-11 w-full rounded-xl border border-white/10 bg-[#101317]/85 pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#707887] transition-colors focus:border-[#E86A10]/70"
              />
            </label>
            <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {feedback ? (
          <motion.p
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="rounded-2xl border border-[#E86A10]/25 bg-[#E86A10]/10 px-4 py-3 text-sm text-[#FFD0AA]"
          >
            {feedback}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <section aria-label="Produtos disponíveis">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-[#A5ADBA]">{filteredProducts.length} produtos encontrados</p>
          <p className="hidden text-xs uppercase tracking-[0.16em] text-[#707887] sm:block">Coleção oficial</p>
        </div>

        {filteredProducts.length ? (
          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.article
                  layout
                  key={product.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                  className="group flex min-h-[280px] flex-col rounded-2xl border border-white/10 bg-[#1A1E24] p-4 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#E86A10]/35 hover:bg-[#1E232A]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#111419]">
                      <img src={godzillaCrest} alt="" aria-hidden="true" className="h-9 w-9 rounded-full object-cover" />
                    </div>
                    <Badge variant={statusVariant[product.status]}>{productStatusLabel[product.status]}</Badge>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A919E]">{productCategoryLabel[product.category]}</p>
                  <h2 className="mt-1 text-lg font-semibold leading-tight text-white">{product.name}</h2>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-[#A5ADBA]">{product.description}</p>

                  <div className="mt-auto border-t border-white/[0.07] pt-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-lg font-bold text-[#FFB679]">{product.price}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-[#707887]">
                        Oficial <ShoppingBag size={12} />
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleContact(product)}
                      aria-label={`Consultar ${product.name}`}
                      className="inline-flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-[#D7DCE4] transition-colors hover:border-[#E86A10]/35 hover:text-[#FFB679]"
                    >
                      <span className="inline-flex items-center gap-2"><MessageCircle size={14} /> Consultar produto</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-white/15 bg-[#171B21] px-5 py-12 text-center"
          >
            <p className="text-base font-semibold text-white">Nenhum produto encontrado</p>
            <p className="mt-1 text-sm text-[#8A919E]">Tente outro termo ou escolha todas as categorias.</p>
          </motion.div>
        )}
      </section>
    </div>
  )
}

export default StorePage
