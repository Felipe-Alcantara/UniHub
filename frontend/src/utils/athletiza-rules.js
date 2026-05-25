import { events } from '../data/mockEvents'

export function getUserSportIdsByStatus(sportMemberships, targetStatus = 'participant') {
  return Object.entries(sportMemberships)
    .filter(([, status]) => status === targetStatus)
    .map(([sportId]) => sportId)
}

export function canViewEvent(event, sportMemberships) {
  if (event.visibility === 'public' || event.visibility === 'athletic_private') {
    return true
  }

  if (!event.sportId) {
    return false
  }

  return sportMemberships[event.sportId] === 'participant'
}

export function filterEvents(items, activeFilter, selectedSportId, sportMemberships) {
  return items
    .filter((event) => canViewEvent(event, sportMemberships))
    .filter((event) => {
      if (activeFilter === 'all') {
        return true
      }

      if (activeFilter === 'public' || activeFilter === 'athletic_private' || activeFilter === 'sport_private') {
        return event.visibility === activeFilter
      }

      return event.type === activeFilter
    })
    .filter((event) => {
      if (!selectedSportId || selectedSportId === 'all') {
        return true
      }

      return event.sportId === selectedSportId
    })
}

export function getEventStartDate(event) {
  return new Date(`${event.date}T${event.startTime}:00`)
}

export function getUpcomingParticipantEvents(items, sportMemberships, now = new Date(), limit = 3) {
  return items
    .filter((event) => event.sportId && sportMemberships[event.sportId] === 'participant')
    .filter((event) => getEventStartDate(event) > now)
    .sort((firstEvent, secondEvent) => getEventStartDate(firstEvent) - getEventStartDate(secondEvent))
    .slice(0, limit)
}

export function formatEventCountdown(event, now = new Date()) {
  const millisecondsUntilEvent = Math.max(0, getEventStartDate(event).getTime() - now.getTime())
  const totalSeconds = Math.floor(millisecondsUntilEvent / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
}

export function getSportAccessState(sport, membershipStatus) {
  if (membershipStatus === 'participant') {
    return 'participant'
  }

  if (sport.hasTryout) {
    return 'ready_to_join'
  }

  return 'free_entry'
}

export function getSportEntryActionLabel(accessState) {
  const map = {
    participant: 'Você participa desta modalidade',
    ready_to_join: 'Entrar na modalidade',
    free_entry: 'Entrar na modalidade',
  }

  return map[accessState]
}

export function getSportLeaveLabel() {
  return 'Sair da modalidade'
}

export function buildDashboardSummary(sportMemberships) {
  const visibleEvents = events.filter((event) => canViewEvent(event, sportMemberships))
  const upcomingEvents = visibleEvents.slice(0, 4)

  return {
    visibleEvents,
    upcomingEvents,
    participantSports: getUserSportIdsByStatus(sportMemberships).length,
    openSports: Object.values(sportMemberships).filter((status) => status !== 'participant').length,
  }
}

export function canAccessBoard(profile) {
  return profile === 'board' || profile === 'admin'
}
