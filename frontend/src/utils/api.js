const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Falha ao buscar ${path}`)
  }

  return response.json()
}
