export default function PrintRail() {
  const onPrint = () => {
    const root = document.documentElement
    const prevTheme = root.dataset.theme || "dark"

    root.dataset.theme = "light"
    root.classList.add("printing")

    setTimeout(() => {
      window.print()
      setTimeout(() => {
        root.dataset.theme = prevTheme
        root.classList.remove("printing")
      }, 300)
    }, 60)
  }

  const btn =
    "w-full rounded-xl2 border border-line bg-panel shadow-soft px-4 py-3 text-sm font-medium " +
    "hover:border-accent/20 hover:bg-accent/10 transition " +
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent)/.55)]"

  return (
    <button onClick={onPrint} className={btn}>
      Print / Save as PDF
    </button>
  )
}
