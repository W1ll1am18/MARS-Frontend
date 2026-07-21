const STORAGE_KEY = 'dev-message-shown'

export function shouldShowDevMessage(): boolean {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return false
    localStorage.setItem(STORAGE_KEY, 'true')
    return true
  } catch {
    return false
  }
}

// let hasShown = false

// export function shouldShowDevMessage(): boolean {
//   if (hasShown) return false
//   hasShown = true
//   return true
// }