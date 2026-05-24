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

  it('opens the authenticated landing after database-backed demo login', async () => {
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'gabriel@atletiza.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByRole('heading', { name: /Tudo da Atlética Godzilla no seu ritmo/ })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Tema de aparência' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Usar tema escuro' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Usar tema branco' }))
    expect(screen.getByRole('button', { name: 'Usar tema branco' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('Início autenticado')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Carteirinha' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Na vitrine' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Links oficiais' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Explore a ATLETIZA' })).not.toBeInTheDocument()
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

  it('uses the participant registration by email when the login response is incomplete', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        profile: 'student',
        email: 'luiz.filipe@atletiza.com',
        name: 'Luiz Filipe Silva Rocha',
        role_label: 'Aluno / Atleta',
      }),
    })
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'luiz.filipe@atletiza.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('Luiz Filipe Silva Rocha')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('link', { name: 'Carteirinha' })[0])
    expect(await screen.findByText('Matrícula: 2025101510')).toBeInTheDocument()
  })

  it('fills a director credential shortcut without selecting the environment locally', async () => {
    renderAppAt('/login')

    expect(screen.queryByRole('button', { name: /gabriel@atletiza.com/ })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /aluno@exemple.com/ })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /diretoria@exemple.com/ }))

    expect(screen.getByLabelText('E-mail')).toHaveValue('diretoria@exemple.com')
    expect(screen.getByLabelText('Senha')).toHaveValue('Atletiza@2026')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('toggles password visibility and shows simulated recovery feedback', async () => {
    renderAppAt('/login')

    const passwordInput = screen.getByLabelText('Senha')
    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }))
    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar senha' }))
    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: 'Esqueci minha senha' }))
    expect(screen.getByRole('status')).toHaveTextContent('Recuperação de senha simulada no MVP')
  })

  it('shows a useful message when the login server returns no JSON', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: async () => {
        throw new SyntaxError('Unexpected end of JSON input')
      },
    })
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'aluno@exemple.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(
      await screen.findByText('Servidor indisponível no momento. Verifique se o backend está ativo.'),
    ).toBeInTheDocument()
  })

  it('shows a useful message when the login server cannot be reached', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    renderAppAt('/login')

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'aluno@exemple.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'Atletiza@2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(
      await screen.findByText('Não foi possível conectar ao servidor. Verifique se o backend está ativo.'),
    ).toBeInTheDocument()
  })
})
