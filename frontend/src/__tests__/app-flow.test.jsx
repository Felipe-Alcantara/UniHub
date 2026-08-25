import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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
    vi.unstubAllGlobals()
  })

  beforeEach(() => {
    window.history.pushState({}, '', '/')
    localStorage.clear()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          profile: 'student',
          email: 'gabriel@atletiza.com',
          name: 'Gabriel Fernandes',
          registration: '202612345',
          role_label: 'Aluno / Atleta',
        }),
      }),
    )
  })

  it('blocks private routes behind the login endpoint', async () => {
    renderAppAt('/calendar')

    expect(await screen.findByRole('heading', { name: 'Entrar na Atletiza' })).toBeInTheDocument()
    await waitFor(() => expect(window.location.pathname).toBe('/login'))
  })

  it('opens the authenticated landing only after backend login', async () => {
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'gabriel@atletiza.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByRole('heading', { name: /Tudo da Atlética Godzilla no seu ritmo/ })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Tema de aparência' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Usar tema escuro' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Usar tema branco' }))
    expect(screen.getByRole('button', { name: 'Usar tema branco' })).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.pathname).toBe('/')
    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/auth/login/',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'gabriel@atletiza.com', password: 'Atletiza@2026' }),
      }),
    )
  })

  it('shows the authenticated participant identity and registration', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        profile: 'student',
        email: 'andre@atletiza.com',
        name: 'André Gustavo Melo da Silva',
        registration: '2023121370',
        role_label: 'Aluno / Atleta',
      }),
    })
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

    expect(screen.getByRole('button', { name: /gabriel@atletiza.com/ })).toBeInTheDocument()
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

  it('rejects an incorrect password without authenticating locally', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ non_field_errors: ['E-mail ou senha inválidos.'] }),
    })
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'admin@exemple.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'senha-incorreta' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('E-mail ou senha inválidos.')).toBeInTheDocument()
    expect(window.location.pathname).toBe('/login')
  })
})
