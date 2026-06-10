const GUEST_ID_KEY = 'marketplace_guest_id'

const createGuestId = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID()
  }

  return `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const getGuestId = () => {
  let guestId = localStorage.getItem(GUEST_ID_KEY)

  if (!guestId) {
    guestId = createGuestId()
    localStorage.setItem(GUEST_ID_KEY, guestId)
  }

  return guestId
}