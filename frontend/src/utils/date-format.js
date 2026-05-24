export function formatDate(dateString) {
  const value = new Date(`${dateString}T00:00:00`)
  return value.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
}

export function formatDateTime(dateString, startTime, endTime) {
  return `${formatDate(dateString)} - ${startTime}${endTime ? ` às ${endTime}` : ''}`
}
