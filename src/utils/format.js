export function fmtDate(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

export function clamp(n, a, b){ return Math.max(a, Math.min(b, n)) }

export function yearsSince(isoBirth) {
  const b = new Date(isoBirth)
  const now = new Date()
  let y = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) y--
  return y
}
