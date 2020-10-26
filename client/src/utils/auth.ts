const AUTH_TOKEN = 'modern-full-stack:auth-token'

export function getTokenFromLocalStorage(): string {
  return localStorage.getItem(AUTH_TOKEN)
}
export function setTokenInLocalStorage(token): void {
  localStorage.setItem(AUTH_TOKEN, token)
}
export function deleteTokenFromLocalStorage(): void {
  localStorage.removeItem(AUTH_TOKEN)
}
