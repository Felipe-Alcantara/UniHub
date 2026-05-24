import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { DemoProvider } from '../context/demo-context'

function renderAppAt(pathname) {
  window.history.pushState({}, '', pathname)

  return render(
    <DemoProvider>
      <App />
    </DemoProvider>,
  )
}

describe('authenticated landing flow', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    window.history.pushState({}, '', '/')
    localStorage.clear()
  })

  it('blocks private routes behind the login endpoint', async () => {
    renderAppAt('/calendar')

    expect(await screen.findByRole('heading', { name: 'Entrar na Atletiza' })).toBeInTheDocument()
    await waitFor(() => expect(window.location.pathname).toBe('/login'))
  })

  it('opens the authenticated landing after demo login', async () => {
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'aluno@atletiza.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByRole('heading', { name: /Tudo da Atlética Godzilla no seu ritmo/ })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Tema de aparência' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Usar tema escuro' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Usar tema branco' }))
    expect(screen.getByRole('button', { name: 'Usar tema branco' })).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.pathname).toBe('/')
  })

  it('shows the authenticated participant identity and registration', async () => {
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'andre@atletiza.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('André Gustavo Melo da Silva')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('link', { name: 'Carteirinha' })[0])
    expect(await screen.findByText('Matrícula: 2023121370')).toBeInTheDocument()
  })

  it('shows complementary hours offered by eligible events', async () => {
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'aluno@atletiza.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    const hourLinks = await screen.findAllByRole('link', { name: 'Horas' })
    fireEvent.click(hourLinks[0])

    expect(await screen.findByRole('heading', { name: 'Horas complementares' })).toBeInTheDocument()
    expect(screen.getByText('45h')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getAllByText('+20h')).toHaveLength(2)
  })

  it('fills a director credential shortcut without changing screens', async () => {
    renderAppAt('/login')

    expect(screen.getByRole('button', { name: /aluno@atletiza.com/ })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /diretoria@exemple.com/ }))

    expect(screen.getByLabelText('E-mail')).toHaveValue('diretoria@exemple.com')
    expect(screen.getByLabelText('Senha')).toHaveValue('Atletiza@2026')
  })

  it('toggles password visibility and shows layout recovery feedback', async () => {
    renderAppAt('/login')

    const passwordInput = screen.getByLabelText('Senha')
    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }))
    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar senha' }))
    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: 'Esqueci minha senha' }))
    expect(screen.getByRole('status')).toHaveTextContent('Recuperação de senha indisponível nesta demonstração.')
  })

  it('shows a useful message for an unknown demo account', async () => {
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'teste@atletiza.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('Conta de acesso não encontrada.')).toBeInTheDocument()
  })
})
