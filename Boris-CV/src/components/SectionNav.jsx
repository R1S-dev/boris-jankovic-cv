import { t } from '../i18n.js'
import { Home, Layers, FolderGit2, ShieldCheck, Mail } from 'lucide-react'

export default function SectionNav({ activeId, lang, weights = {} }) {
  const items = [
    { id: "overview", label: t(lang, "nav.overview"), icon: Home },
    { id: "capabilities", label: t(lang, "nav.capabilities"), icon: Layers },
    { id: "projects", label: t(lang, "nav.projects"), icon: FolderGit2 },
    { id: "credibility", label: t(lang, "nav.credibility"), icon: ShieldCheck },
    { id: "contact", label: t(lang, "nav.contact"), icon: Mail },
  ]

  // Baseline (same as non-active theme/lang buttons)
  const baseBtn =
    "group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition min-w-0 " +
    "border-line bg-white/5 hover:border-accent/20 hover:bg-accent/10"

  const baseIcon =
    "grid h-9 w-9 place-items-center rounded-lg border transition shrink-0 " +
    "border-line bg-white/5 text-muted group-hover:text-ink"

  return (
    <section className="rounded-xl2 border border-line bg-panel shadow-soft p-4">
      <div className="grid gap-2">
        {items.map(it => {
          const Icon = it.icon
          const w = Math.max(0, Math.min(1, Number(weights[it.id] ?? 0)))
          const isActive = activeId === it.id

          // Subtle effect:
          // - default: exactly baseline look (no red glow)
          // - active: small accent tint + slightly stronger border
          // - neighbors: very small tint (barely noticeable)
          const bgA = isActive ? 0.10 : (w > 0 ? 0.04 : 0.00)
          const borderA = isActive ? 0.32 : (w > 0 ? 0.16 : 0.00)

          const style = (isActive || w > 0)
            ? {
                backgroundColor: `rgb(var(--accent) / ${bgA})`,
                borderColor: `rgb(var(--accent) / ${borderA})`,
                boxShadow: isActive ? `0 0 22px rgb(var(--accent) / 0.10)` : undefined,
              }
            : undefined

          const iconStyle = (isActive || w > 0)
            ? {
                backgroundColor: `rgb(var(--accent) / ${isActive ? 0.10 : 0.04})`,
                borderColor: `rgb(var(--accent) / ${isActive ? 0.22 : 0.12})`,
                color: isActive ? `rgb(var(--accent))` : undefined,
              }
            : undefined

          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={baseBtn}
              style={style}
            >
              <span className={baseIcon} style={iconStyle}>
                <Icon size={18} />
              </span>

              <span className="flex-1 min-w-0">
                <span className="block font-medium truncate">{it.label}</span>
              </span>

              {isActive && (
                <span className="hidden lg:block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              )}
            </a>
          )
        })}
      </div>
    </section>
  )
}
