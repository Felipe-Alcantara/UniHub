import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import StorePage from '../pages/store'

describe('product showcase', () => {
  afterEach(() => {
    cleanup()
  })

  it('filters products by search and category', async () => {
    render(<StorePage />)

    fireEvent.change(screen.getByLabelText('Buscar produto'), { target: { value: 'camiseta' } })

    expect(screen.getByRole('heading', { name: 'Camiseta oficial 2026' })).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Caneca da torcida' })).not.toBeInTheDocument()
    })

    fireEvent.change(screen.getByLabelText('Buscar produto'), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: 'Filtrar por categoria' }))
    fireEvent.click(screen.getByRole('option', { name: 'Eventos' }))

    expect(screen.getByRole('heading', { name: 'Ingresso Festa Integração' })).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Moletom Godzilla' })).not.toBeInTheDocument()
    })
  })

  it('closes the visual category menu with escape', async () => {
    render(<StorePage />)

    fireEvent.click(screen.getByRole('button', { name: 'Filtrar por categoria' }))
    expect(screen.getByRole('listbox', { name: 'Categorias de produtos' })).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('listbox', { name: 'Categorias de produtos' })).not.toBeInTheDocument()
    })
  })

  it('supports keyboard navigation between category options', () => {
    render(<StorePage />)

    fireEvent.keyDown(screen.getByRole('button', { name: 'Filtrar por categoria' }), { key: 'ArrowDown' })
    const selectedOption = screen.getByRole('option', { name: 'Todas as categorias' })

    expect(selectedOption).toHaveFocus()
    fireEvent.keyDown(selectedOption, { key: 'ArrowDown' })
    expect(screen.getByRole('option', { name: 'Vestuário' })).toHaveFocus()
  })

  it('makes simulated contact explicit to the user', () => {
    render(<StorePage />)

    fireEvent.click(screen.getByRole('button', { name: 'Consultar Camiseta oficial 2026' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Pedido de contato registrado para Camiseta oficial 2026. No MVP, fale com Davi - (24) 98888-2100.',
    )
  })
})
