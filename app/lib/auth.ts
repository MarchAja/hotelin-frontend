export const saveAuth = (token: string) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null
}

export const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}

export const decodeJwt = (token: string) => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}
