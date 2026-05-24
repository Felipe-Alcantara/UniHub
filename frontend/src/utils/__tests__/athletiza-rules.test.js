import { describe, expect, it } from 'vitest'
import { events } from '../../data/mockEvents'
import { sports } from '../../data/mockSports'
import {
  canAccessBoard,
  canViewEvent,
  filterEvents,
  getSportAccessState,
  isPresenceConfirmationEnabled,
} from '../athletiza-rules'

const studentMemberships = {
  volei: 'participant',
  esports: 'participant',
  basquete: 'pending',
  futsal: 'not_member',
  handebol: 'not_member',
  bateria: 'not_member',
  cheer: 'rejected',
}

describe('athletiza rules', () => {
  it('filters calendar by type and keeps only visible events', () => {
    const trainings = filterEvents(events, 'training', 'all', studentMemberships)

    expect(trainings.length).toBeGreaterThan(0)
    expect(trainings.every((item) => item.type === 'training')).toBe(true)
    expect(trainings.every((item) => canViewEvent(item, studentMemberships))).toBe(true)
  })

  it('hides private sport events for non-participants', () => {
    const basqueteEvent = events.find((item) => item.id === 'training-basquete-1')

    expect(canViewEvent(basqueteEvent, studentMemberships)).toBe(false)
  })

  it('allows direct entry for free sports and pending state for tryout sports', () => {
    const futsal = sports.find((item) => item.id === 'futsal')
    const basquete = sports.find((item) => item.id === 'basquete')

    expect(getSportAccessState(futsal, 'not_member')).toBe('free_entry')
    expect(getSportAccessState(basquete, 'not_member')).toBe('tryout_required')
  })

  it('detects free event confirmation requirement correctly', () => {
    const freeWithPresence = events.find((item) => item.id === 'training-volei-1')
    const paidEvent = events.find((item) => item.id === 'party-1')

    expect(isPresenceConfirmationEnabled(freeWithPresence)).toBe(true)
    expect(isPresenceConfirmationEnabled(paidEvent)).toBe(false)
  })

  it('applies role access difference between student and board/admin', () => {
    expect(canAccessBoard('student')).toBe(false)
    expect(canAccessBoard('board')).toBe(true)
    expect(canAccessBoard('admin')).toBe(true)
  })
})
