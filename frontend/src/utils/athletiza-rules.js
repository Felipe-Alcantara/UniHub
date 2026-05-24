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

export function getSportAccessState(sport, membershipStatus) {
  if (membershipStatus === 'participant') {
    return 'participant'
  }

  if (membershipStatus === 'pending') {
    return 'pending'
  }

  if (membershipStatus === 'rejected') {
    return 'rejected'
  }

  if (sport.hasTryout) {
    return 'tryout_required'
  }

  return 'free_entry'
}

export function getSportEntryActionLabel(accessState) {
  const map = {
    participant: 'Voce participa desta modalidade',
    pending: 'Solicitacao enviada',
    rejected: 'Solicitacao rejeitada',
    tryout_required: 'Solicitar entrada',
    free_entry: 'Entrar na modalidade',
  }

  return map[accessState]
}

export function buildDashboardSummary(sportMemberships) {
  const visibleEvents = events.filter((event) => canViewEvent(event, sportMemberships))
  const upcomingEvents = visibleEvents.slice(0, 4)

  return {
    visibleEvents,
    upcomingEvents,
    participantSports: getUserSportIdsByStatus(sportMemberships).length,
    pendingSports: getUserSportIdsByStatus(sportMemberships, 'pending').length,
  }
}

export function canAccessBoard(profile) {
  return profile === 'board' || profile === 'admin'
}

export function isPresenceConfirmationEnabled(event) {
  return event.isFree && event.requiresConfirmation
}
