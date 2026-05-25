import { createContext, useContext, useMemo, useState } from 'react'
import { demoUsers, participantDemoAccounts } from '../data/mockUser'
import { sports } from '../data/mockSports'

const DemoContext = createContext(null)
const participantDemoAccountByEmail = Object.fromEntries(
  participantDemoAccounts.map((account) => [account.email, account]),
)

function DemoProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState(null)
  const [authenticatedIdentity, setAuthenticatedIdentity] = useState(null)
  const [sportMembershipsByProfile, setSportMembershipsByProfile] = useState({
    student: { ...demoUsers.student.sportMemberships },
    board: { ...demoUsers.board.sportMemberships },
    admin: { ...demoUsers.admin.sportMemberships },
  })
  const [joinRequests, setJoinRequests] = useState([
    { id: 'request-1', athleteName: 'Gabriel Fernandes', sportId: 'basquete', status: 'approved' },
  ])

  const identityEmail = authenticatedIdentity?.email?.toLowerCase()
  const participantIdentity = identityEmail ? participantDemoAccountByEmail[identityEmail] : null
  const baseUser = activeProfile ? demoUsers[activeProfile] : null
  const activeUser = baseUser
    ? {
        ...baseUser,
        ...(authenticatedIdentity?.profile === activeProfile
          ? {
              id: `user-${authenticatedIdentity.email}`,
              email: authenticatedIdentity.email,
              name: authenticatedIdentity.name || participantIdentity?.name || baseUser.name,
              registration: authenticatedIdentity.registration || participantIdentity?.registration || baseUser.registration,
              roleLabel: authenticatedIdentity.role_label || baseUser.roleLabel,
            }
          : {}),
        sportMemberships: sportMembershipsByProfile[activeProfile],
      }
    : null

  const value = useMemo(() => {
    const leaveSport = (sportId) => {
      if (!activeProfile) {
        return
      }

      setSportMembershipsByProfile((current) => {
        const next = { ...current }
        const profileMemberships = { ...current[activeProfile] }
        delete profileMemberships[sportId]
        next[activeProfile] = profileMemberships
        return next
      })
    }

    const joinSport = (sportId) => {
      if (!activeProfile) {
        return
      }

      const selectedSport = sports.find((item) => item.id === sportId)
      if (!selectedSport) {
        return
      }

      setSportMembershipsByProfile((current) => {
        const next = { ...current }
        next[activeProfile] = { ...current[activeProfile], [sportId]: 'participant' }
        return next
      })

      if (selectedSport.hasTryout) {
        setJoinRequests((current) => {
          const hasRequest = current.some((request) => request.athleteName === activeUser.name && request.sportId === sportId)
          if (hasRequest) {
            return current
          }

          return [
            ...current,
            {
              id: `request-${current.length + 1}`,
              athleteName: activeUser.name,
              sportId,
              status: 'approved',
            },
          ]
        })
      }
    }

    return {
      activeProfile,
      activeUser,
      sportMemberships: activeUser?.sportMemberships || {},
      joinRequests,
      setActiveProfile,
      setAuthenticatedIdentity,
      joinSport,
      leaveSport,
    }
  }, [activeProfile, activeUser, joinRequests, sportMembershipsByProfile])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

function useDemo() {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error('useDemo must be used within DemoProvider')
  }

  return context
}

export { DemoProvider, useDemo }
