const API = "https://api.github.com"
import { cacheGet, cacheSet } from "./storageCache.js"

const TTL_REPOS = 45 * 60 * 1000 // 45 min
const TTL_LANGS = 60 * 60 * 1000 // 60 min

export async function fetchRepos(handle, { signal } = {}) {
  const cacheKey = `repos:${handle}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  const url = `${API}/users/${handle}/repos?per_page=100&sort=updated`
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  })
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const repos = (await res.json())
    .filter((r) => !r.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

  cacheSet(cacheKey, repos, { ttl: TTL_REPOS })
  return repos
}

// Fetch per-repo language breakdown (bytes per language) -> percentages computed in UI
export async function fetchRepoLanguagesByUrl(languagesUrl, { signal } = {}) {
  if (!languagesUrl) return {}

  const cacheKey = `repo_langs:${languagesUrl}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  const res = await fetch(languagesUrl, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  })

  // If rate-limited or forbidden, fail softly (UI can show “—”)
  if (!res.ok) {
    if (res.status === 403) return {}
    throw new Error(`GitHub API error (languages): ${res.status}`)
  }

  const data = (await res.json()) || {}
  cacheSet(cacheKey, data, { ttl: TTL_LANGS })
  return data
}
