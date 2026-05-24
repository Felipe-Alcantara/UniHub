const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Falha ao buscar ${path}`)
  }

  return response.json()
}

export async function apiPost(path, payload) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está ativo.')
  }

  let data

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const message =
      data?.non_field_errors?.[0] ||
      data?.detail ||
      (response.status >= 500
        ? 'Servidor indisponível no momento. Verifique se o backend está ativo.'
        : 'Não foi possível entrar.')
    throw new Error(message)
  }

  if (!data) {
    throw new Error('Resposta inválida do servidor. Verifique se o backend está ativo.')
  }

  return data
}
