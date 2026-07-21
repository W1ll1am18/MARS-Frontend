const STORAGE_KEY = 'dev-message-shown'
export const DEV_MESSAGE_EVENT = 'show-dev-message'

export function shouldShowDevMessage(): boolean {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return false
    localStorage.setItem(STORAGE_KEY, 'true')
    return true
  } catch {
    return false
  }
}

export function triggerDevMessage() {
  window.dispatchEvent(new Event(DEV_MESSAGE_EVENT))
}

// Test
// let hasShown = false

// export function shouldShowDevMessage(): boolean {
//   if (hasShown) return false
//   hasShown = true
//   return true
// }