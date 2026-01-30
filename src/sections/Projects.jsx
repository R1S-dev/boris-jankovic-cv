import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Card from "../components/Card.jsx"
import Badge from "../components/Badge.jsx"
import DetailsModal from "../components/DetailsModal.jsx"
import ModalBlock from "../components/ModalBlock.jsx"
import { fetchRepos, fetchRepoLanguagesByUrl } from "../utils/github.js"
import { fmtDate } from "../utils/format.js"
import { profile } from "../data/profile.js"
import { t } from "../i18n.js"
import { ui } from "../ui/cls.js"
import { ExternalLink, Info, ChevronDown, ChevronUp } from "lucide-react"

function pickFeatured(repos) {
  const set = new Set((profile.featuredRepos || []).map((s) => s.toLowerCase()))
  if (set.size) {
    return repos.filter((r) => set.has((r.name || "").toLowerCase())).slice(0, 4)
  }
  return repos.slice(0, 4)
}

function getMeta(repoName, lang) {
  const m = profile?.projectMeta?.[repoName]
  if (!m) return null
  return m?.[lang] || m?.en || m?.sr || null
}

function computeLangPercents(langBytes = {}) {
  const entries = Object.entries(langBytes || {}).filter(([, v]) => typeof v === "number" && v > 0)
  if (!entries.length) return []
  const total = entries.reduce((acc, [, v]) => acc + v, 0) || 1
  const list = entries
    .map(([name, bytes]) => ({ name, bytes, pct: (bytes / total) * 100 }))
    .sort((a, b) => b.pct - a.pct)
  return list.map((x) => ({ ...x, pctInt: Math.max(1, Math.round(x.pct)) }))
}

function getInitialVisibleCount() {
  if (typeof window === "undefined") return 6
  const w = window.innerWidth
  if (w >= 1280) return 6
  if (w >= 768) return 4
  return 3
}

export default function Projects({ lang }) {
  const reduce = useReducedMotion()

  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [q, setQ] = useState("")
  const [l, setL] = useState("All")

  const [initialCount, setInitialCount] = useState(() => getInitialVisibleCount())
  const [visibleCount, setVisibleCount] = useState(() => getInitialVisibleCount())

  // Used to animate only newly revealed items
  const [prevVisibleCount, setPrevVisibleCount] = useState(() => getInitialVisibleCount())

  const [openRepo, setOpenRepo] = useState(null)
  const [langsLoading, setLangsLoading] = useState(false)
  const [langBytes, setLangBytes] = useState({})

  useEffect(() => {
    const ac = new AbortController()
    setLoading(true)
    setErr("")
    fetchRepos(profile.handle, { signal: ac.signal })
      .then(setRepos)
      .catch((e) => {
        if (!ac.signal.aborted) setErr(e?.message || "Failed to load repos")
      })
      .finally(() => setLoading(false))
    return () => ac.abort()
  }, [])

  useEffect(() => {
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const next = getInitialVisibleCount()
        setInitialCount(next)
        setVisibleCount((c) => Math.max(next, Math.min(c, next)))
        setPrevVisibleCount((p) => Math.max(next, Math.min(p, next)))
      })
    }

    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  useEffect(() => {
    if (!openRepo?.languages_url) return
    const ac = new AbortController()
    setLangsLoading(true)
    setLangBytes({})

    fetchRepoLanguagesByUrl(openRepo.languages_url, { signal: ac.signal })
      .then((data) => {
        if (!ac.signal.aborted) setLangBytes(data || {})
      })
      .catch(() => {
        if (!ac.signal.aborted) setLangBytes({})
      })
      .finally(() => {
        if (!ac.signal.aborted) setLangsLoading(false)
      })

    return () => ac.abort()
  }, [openRepo?.languages_url])

  const languages = useMemo(() => {
    const s = new Set()
    repos.forEach((r) => r.language && s.add(r.language))
    return ["All", ...Array.from(s).sort((a, b) => a.localeCompare(b))]
  }, [repos])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return repos.filter((r) => {
      const okQ =
        !qq ||
        (r.name || "").toLowerCase().includes(qq) ||
        (r.description || "").toLowerCase().includes(qq)
      const okL = l === "All" || r.language === l
      return okQ && okL
    })
  }, [repos, q, l])

  // Reset to “first rows” when filters change
  useEffect(() => {
    const next = getInitialVisibleCount()
    setInitialCount(next)
    setVisibleCount(next)
    setPrevVisibleCount(next)
  }, [q, l])

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])
  const canShowMore = visibleCount < filtered.length
  const canShowLess = visibleCount > initialCount

  const featured = useMemo(() => pickFeatured(repos), [repos])

  const controls = (
    <div className="w-full min-w-0 flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t(lang, "sections.search_ph")}
        className="w-full sm:w-56 min-w-0 rounded-xl border border-line bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/35"
      />
      <select
        value={l}
        onChange={(e) => setL(e.target.value)}
        className="w-full sm:w-44 min-w-0 rounded-xl border border-line bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/35"
      >
        {languages.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
    </div>
  )

  const open = (repo) => setOpenRepo(repo)
  const close = () => setOpenRepo(null)

  const modalMeta = openRepo ? getMeta(openRepo.name, lang) : null
  const modalLangs = useMemo(() => computeLangPercents(langBytes), [langBytes])

  const unavailableText = lang === "sr" ? "Live demo nije dostupan" : "Live demo unavailable"

  const BottomActions = ({ repo }) => {
    const meta = profile?.projectMeta?.[repo?.name]
    const demo = meta?.liveDemo || null
    const isUn = demo === "unavailable"
    const url = typeof demo === "string" && demo.startsWith("http") ? demo : null

    return (
      <div className="flex flex-wrap gap-2 justify-end">
        {url && (
          <a href={url} target="_blank" rel="noreferrer" className={ui.actionBtn} aria-label="Open live demo">
            <ExternalLink size={16} />
            {t(lang, "sections.btn_live")}
          </a>
        )}

        {isUn && (
          <span
            className={
              "inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-4 py-2 text-sm " +
              "text-muted opacity-80 cursor-not-allowed select-none"
            }
            aria-label={unavailableText}
            title={unavailableText}
          >
            <ExternalLink size={16} />
            {unavailableText}
          </span>
        )}

        <a href={repo?.html_url} target="_blank" rel="noreferrer" className={ui.actionBtn} aria-label="Open repository">
          <ExternalLink size={16} />
          {t(lang, "sections.btn_repo")}
        </a>
      </div>
    )
  }

  const barsKey = `${openRepo?.name || "none"}:${modalLangs.map((x) => `${x.name}-${x.pctInt}`).join("|")}`

  const FeaturedCard = ({ repo }) => {
    const meta = getMeta(repo.name, lang)
    const summary = meta?.summary || repo.description || "—"

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => open(repo)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") open(repo)
        }}
        className={`${ui.cardInteractive} ${ui.focusRing} ${ui.cardPad5}`}
      >
        <div className="flex items-start justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-lg font-semibold break-words">{repo.name}</div>
            <div className="mt-2 text-sm text-muted leading-relaxed break-words">{summary}</div>
          </div>

          <div className={ui.iconBoxSm} aria-hidden="true">
            <Info size={16} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 min-w-0 min-h-[32px]">
          {repo.language && <Badge tone="accent">{repo.language}</Badge>}
          <Badge>
            {t(lang, "sections.updated")} {fmtDate(repo.updated_at)}
          </Badge>
        </div>
      </div>
    )
  }

  const AllGridCardInner = ({ repo }) => (
    <div
      role="button"
      tabIndex={0}
      onClick={() => open(repo)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") open(repo)
      }}
      className={`${ui.cardInteractive} ${ui.focusRing} p-4 flex flex-col min-w-0`}
    >
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <div className="text-sm font-semibold break-words leading-tight">{repo.name}</div>
        </div>

        <div className={ui.iconBoxSm} aria-hidden="true">
          <Info size={16} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 min-h-[32px]">
        {repo.language && <Badge tone="accent">{repo.language}</Badge>}
        <Badge>
          {t(lang, "sections.updated")} {fmtDate(repo.updated_at)}
        </Badge>
      </div>
    </div>
  )

  const modalTitleA = lang === "sr" ? "Pregled" : "Overview"
  const modalTitleB = lang === "sr" ? "Ključne stavke" : "Highlights"
  const modalTitleC = lang === "sr" ? "Jezici (procena po kodu)" : "Languages (by code size)"
  const modalLoadingText = lang === "sr" ? "Učitavanje…" : "Loading…"

  const step = initialCount

  // Only show the down arrow while there is more to reveal.
  // Show the up arrow ONLY when we're fully expanded (at the end).
  const showDown = !loading && !err && filtered.length > 0 && canShowMore
  const showUpAtEnd = !loading && !err && filtered.length > 0 && !canShowMore && canShowLess

  const toggleBtnCls =
    "grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/5 text-muted " +
    "hover:border-accent/20 hover:bg-accent/10 hover:text-ink transition " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent)/.55)]"

  // Slow, minimalist animation: only new items
  const expanding = !reduce && visibleCount > prevVisibleCount
  const newFromIdx = expanding ? prevVisibleCount : Number.POSITIVE_INFINITY

  const onShowMore = () => {
    setPrevVisibleCount(visibleCount)
    setVisibleCount((c) => Math.min(filtered.length, c + step))
  }

  const onCollapseToStart = () => {
    setPrevVisibleCount(visibleCount)
    setVisibleCount(initialCount)
  }

  const labelMore = lang === "sr" ? "Prikaži još" : "Show more"
  const labelCollapse = lang === "sr" ? "Vrati na početno" : "Back to start"

  return (
    <div className="grid gap-5 min-w-0">
      <Card title={t(lang, "sections.projects_featured_title")} subtitle={t(lang, "sections.projects_featured_sub")}>
        {loading && <div className="text-sm text-muted">{t(lang, "sections.loading")}</div>}
        {!loading && err && <div className="text-sm text-accent break-words">{err}</div>}

        {!loading && !err && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            {featured.map((r) => (
              <FeaturedCard key={r.id} repo={r} />
            ))}
          </div>
        )}
      </Card>

      <Card
        title={t(lang, "sections.projects_all_title")}
        subtitle={t(lang, "sections.projects_all_sub")}
        right={controls}
      >
        <div className="grid gap-4 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 min-w-0">
            {visible.map((r, idx) => {
              const isNew = idx >= newFromIdx
              if (!isNew) return <AllGridCardInner key={r.id} repo={r} />

              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(0.16, (idx - newFromIdx) * 0.03),
                  }}
                >
                  <AllGridCardInner repo={r} />
                </motion.div>
              )
            })}
          </div>

          {!loading && !err && filtered.length === 0 && (
            <div className="text-sm text-muted">{t(lang, "sections.no_matches")}</div>
          )}

          {(showDown || showUpAtEnd) && (
            <div className="flex items-center justify-center gap-2 pt-1">
              {showUpAtEnd && (
                <motion.button
                  type="button"
                  onClick={onCollapseToStart}
                  className={toggleBtnCls}
                  aria-label={labelCollapse}
                  title={labelCollapse}
                  whileTap={reduce ? {} : { scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  <ChevronUp size={18} />
                </motion.button>
              )}

              {showDown && (
                <motion.button
                  type="button"
                  onClick={onShowMore}
                  className={toggleBtnCls}
                  aria-label={labelMore}
                  title={labelMore}
                  whileTap={reduce ? {} : { scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  <ChevronDown size={18} />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </Card>

      <DetailsModal
        open={!!openRepo}
        onClose={close}
        title={openRepo?.name}
        footer={openRepo ? <BottomActions repo={openRepo} /> : null}
      >
        {openRepo && (
          <div className="grid gap-5">
            <ModalBlock title={modalTitleA}>
              <div className="text-sm text-muted leading-relaxed break-words">
                {modalMeta?.summary || openRepo.description || "—"}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 min-h-[32px]">
                {openRepo.language && <Badge tone="accent">{openRepo.language}</Badge>}
                <Badge>
                  {t(lang, "sections.updated")} {fmtDate(openRepo.updated_at)}
                </Badge>
              </div>
            </ModalBlock>

            {modalMeta?.highlights?.length > 0 && (
              <ModalBlock title={modalTitleB}>
                <ul className="list-disc pl-5 text-sm text-muted space-y-2">
                  {modalMeta.highlights.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </ModalBlock>
            )}

            <ModalBlock
              title={modalTitleC}
              right={langsLoading ? <div className="text-xs text-muted">{modalLoadingText}</div> : null}
            >
              {!langsLoading && modalLangs.length === 0 && <div className="text-sm text-muted">—</div>}

              {!langsLoading && modalLangs.length > 0 && (
                <div key={barsKey} className="grid gap-3">
                  {modalLangs.map((x) => (
                    <div key={x.name} className="grid gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-medium">{x.name}</div>
                        <div className="text-xs text-muted font-mono">{x.pctInt}%</div>
                      </div>

                      <div className="h-2 w-full rounded-full bg-line/50 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-accent/70"
                          initial={reduce ? false : { width: 0 }}
                          animate={{ width: `${x.pctInt}%` }}
                          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ModalBlock>
          </div>
        )}
      </DetailsModal>
    </div>
  )
}
