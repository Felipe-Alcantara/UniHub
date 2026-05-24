import { createContext, useContext, useMemo, useState } from 'react'
import { demoUsers } from '../data/mockUser'
import { sports } from '../data/mockSports'

const DemoContext = createContext(null)

function DemoProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState(null)
  const [sportMembershipsByProfile, setSportMembershipsByProfile] = useState({
    student: { ...demoUsers.student.sportMemberships },
    board: { ...demoUsers.board.sportMemberships },
    admin: { ...demoUsers.admin.sportMemberships },
  })
  const [presenceConfirmations, setPresenceConfirmations] = useState([])
  const [joinRequests, setJoinRequests] = useState([
    { id: 'request-1', athleteName: 'Gabriel Fernandes', sportId: 'basquete', status: 'pending' },
    { id: 'request-2', athleteName: 'Larissa Costa', sportId: 'cheer', status: 'pending' },
  ])

  const activeUser = activeProfile ? { ...demoUsers[activeProfile], sportMemberships: sportMembershipsByProfile[activeProfile] } : null

  const value = useMemo(() => {
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
        const nextStatus = selectedSport.hasTryout ? 'pending' : 'participant'
        next[activeProfile] = { ...current[activeProfile], [sportId]: nextStatus }
        return next
      })

      if (selectedSport.hasTryout) {
        setJoinRequests((current) => {
          const hasRequest = current.some((request) => request.athleteName === demoUsers[activeProfile].name && request.sportId === sportId)
          if (hasRequest) {
            return current
          }

          return [
            ...current,
            {
              id: `request-${current.length + 1}`,
              athleteName: demoUsers[activeProfile].name,
              sportId,
              status: 'pending',
            },
          ]
        })
      }
    }

    const confirmPresence = (eventId) => {
      if (!activeUser) {
        return
      }

      setPresenceConfirmations((current) => {
        const exists = current.some((item) => item.eventId === eventId && item.userId === activeUser.id)
        if (exists) {
          return current
        }

        return [...current, { eventId, userId: activeUser.id, userName: activeUser.name }]
      })
    }

    const updateJoinRequest = (requestId, nextStatus) => {
      setJoinRequests((current) =>
        current.map((request) =>
          request.id === requestId ? { ...request, status: nextStatus } : request,
        ),
      )

      const target = joinRequests.find((request) => request.id === requestId)
      if (!target) {
        return
      }

      if (target.athleteName === demoUsers.student.name) {
        setSportMembershipsByProfile((current) => {
          const next = { ...current }
          const mappedStatus = nextStatus === 'approved' ? 'participant' : 'rejected'
          next.student = { ...current.student, [target.sportId]: mappedStatus }
          return next
        })
      }
    }

    return {
      activeProfile,
      activeUser,
      sportMemberships: activeUser?.sportMemberships || {},
      joinRequests,
      presenceConfirmations,
      setActiveProfile,
      joinSport,
      confirmPresence,
      updateJoinRequest,
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
