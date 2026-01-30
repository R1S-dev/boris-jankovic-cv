import { profile } from "../data/profile.js"
import { MapPin, Mail, Github, Languages, Moon, Sun } from "lucide-react"
import Pill from "./Pill.jsx"

export default function TopHeader({ lang, theme, onToggleTheme, onToggleLang }) {
  const iconCls = "text-muted"

  const mobileBtnCls =
    "grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/5 " +
    "text-muted hover:text-ink hover:border-accent/20 hover:bg-accent/10 transition " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent)/.55)]"

  const themeLabel = lang === "sr"
    ? (theme === "dark" ? "Tema: Tamna" : "Tema: Svetla")
    : (theme === "dark" ? "Theme: Dark" : "Theme: Light")

  const langLabel = lang === "sr" ? "Jezik" : "Language"

  return (
    <header className="w-full min-w-0 rounded-xl2 border border-line bg-panel shadow-soft p-6">
      {/* Top row: name + mobile controls (no overlap with content) */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight break-words">
            {profile.person.name}
          </h1>
        </div>

        {/* Mobile-only: theme/lang controls placed inside header */}
        <div className="flex items-center gap-2 lg:hidden print:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            className={mobileBtnCls}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            type="button"
            onClick={onToggleLang}
            className={mobileBtnCls}
            aria-label={langLabel}
            title={langLabel}
          >
            <Languages size={18} />
          </button>
        </div>
      </div>

      <div className="mt-2 text-sm text-muted break-words">
        {profile.person.headline}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Pill>
          <MapPin size={14} className={iconCls} aria-hidden="true" />
          <span className="break-words">{profile.person.location}</span>
        </Pill>

        {profile.person.email && (
          <Pill href={`mailto:${profile.person.email}`} aria-label="Email">
            <Mail size={14} className={iconCls} aria-hidden="true" />
            <span className="break-all">{profile.person.email}</span>
          </Pill>
        )}

        {profile.links?.github && (
          <Pill href={profile.links.github} aria-label="GitHub">
            <Github size={14} className={iconCls} aria-hidden="true" />
            <span className="break-all">github.com/{profile.handle}</span>
          </Pill>
        )}
      </div>
    </header>
  )
}
