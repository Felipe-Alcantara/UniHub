import { cleanup, render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { DemoProvider, useDemo } from '../context/demo-context'
import MemberCardPage from '../pages/member-card'

function ActivateStudentProfile() {
  const { activeUser, setActiveProfile } = useDemo()

  useEffect(() => {
    setActiveProfile('student')
  }, [setActiveProfile])

  return activeUser ? <MemberCardPage /> : null
}

describe('member card page', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the detailed member credential and its demo validation block', () => {
    render(
      <MemoryRouter>
        <DemoProvider>
          <ActivateStudentProfile />
        </DemoProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: 'QR code de demonstração' })).toBeInTheDocument()
    expect(screen.getByText('QR de demonstração')).toBeInTheDocument()
    expect(screen.getByText('Credencial oficial')).toBeInTheDocument()
    expect(screen.getByText('GDZ-202612345-26')).toBeInTheDocument()
    expect(screen.getByText('Campus Volta Redonda', { exact: false })).toBeInTheDocument()
  })
})
