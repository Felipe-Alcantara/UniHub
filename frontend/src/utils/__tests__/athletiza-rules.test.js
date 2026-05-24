import { describe, expect, it } from 'vitest'
import { events } from '../../data/mockEvents'
import { sports } from '../../data/mockSports'
import {
  canAccessBoard,
  canViewEvent,
  filterEvents,
  formatEventCountdown,
  getUpcomingParticipantEvents,
  getSportAccessState,
} from '../athletiza-rules'

const studentMemberships = {
  volei: 'participant',
  esports: 'participant',
  basquete: 'participant',
  futsal: 'not_member',
  handebol: 'not_member',
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

    expect(canViewEvent(basqueteEvent, { ...studentMemberships, basquete: 'not_member' })).toBe(false)
  })

  it('keeps sports ready for immediate layout entry', () => {
    const futsal = sports.find((item) => item.id === 'futsal')
    const basquete = sports.find((item) => item.id === 'basquete')

    expect(getSportAccessState(futsal, 'not_member')).toBe('free_entry')
    expect(getSportAccessState(basquete, 'not_member')).toBe('ready_to_join')
  })

  it('applies role access difference between student and board/admin', () => {
    expect(canAccessBoard('student')).toBe(false)
    expect(canAccessBoard('board')).toBe(true)
    expect(canAccessBoard('admin')).toBe(true)
  })

  it('lists the next three future events from active sports in chronological order', () => {
    const upcomingEvents = getUpcomingParticipantEvents(events, studentMemberships, new Date('2026-05-24T20:00:00'))

    expect(upcomingEvents.map((event) => event.id)).toEqual([
      'training-volei-1',
      'training-esports-1',
      'championship-1',
    ])
  })

  it('formats a live countdown until an event starts', () => {
    const event = events.find((item) => item.id === 'training-volei-1')

    expect(formatEventCountdown(event, new Date('2026-05-25T19:59:55'))).toBe('1d 00h 00m 05s')
  })
})
