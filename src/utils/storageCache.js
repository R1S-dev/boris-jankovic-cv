// Tiny sessionStorage cache with TTL (ms)
export function cacheGet(key, { storage = sessionStorage } = {}) {
  try {
    const raw = storage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return null

    const { t, ttl, data } = parsed
    if (typeof t !== "number") return null
    if (typeof ttl === "number" && ttl > 0) {
      if (Date.now() - t > ttl) {
        storage.removeItem(key)
        return null
      }
    }
    return data ?? null
  } catch {
    return null
  }
}

export function cacheSet(key, data, { ttl = 0, storage = sessionStorage } = {}) {
  try {
    storage.setItem(key, JSON.stringify({ t: Date.now(), ttl, data }))
  } catch {
    // ignore quota / JSON errors
  }
}
