import { Languages, Moon, Sun } from "lucide-react"

export default function RightRail({ lang, setLang, theme, setTheme }) {
  const toggleLang = () => setLang(lang === "sr" ? "en" : "sr")
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  const themeText =
    lang === "sr"
      ? (theme === "dark" ? "Tema: Tamna" : "Tema: Svetla")
      : (theme === "dark" ? "Theme: Dark" : "Theme: Light")

  const langText =
    lang === "sr"
      ? `Jezik: ${lang.toUpperCase()}`
      : `Language: ${lang.toUpperCase()}`

  // EXACT layout like SectionNav items + force left text alignment
  const itemBase =
    "w-full text-left group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition min-w-0 " +
    "border-line bg-white/5 hover:border-accent/20 hover:bg-accent/10"

  const iconBox =
    "grid h-9 w-9 place-items-center rounded-lg border transition shrink-0 " +
    "border-line bg-white/5 text-muted group-hover:text-ink"

  return (
    <section className="rounded-xl2 border border-line bg-panel shadow-soft p-4">
      <div className="grid gap-2">
        <button onClick={toggleTheme} className={itemBase}>
          <span className={iconBox}>
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-medium truncate">{themeText}</span>
          </span>
        </button>

        <button onClick={toggleLang} className={itemBase}>
          <span className={iconBox}><Languages size={18} /></span>
          <span className="flex-1 min-w-0">
            <span className="block font-medium truncate">{langText}</span>
          </span>
        </button>
      </div>
    </section>
  )
}
