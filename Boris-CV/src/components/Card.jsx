export default function Card({ title, subtitle, right, children, className = "" }) {
  return (
    <section className={`w-full min-w-0 rounded-xl2 border border-line bg-panel shadow-soft ${className}`}>
      {(title || subtitle || right) && (
        <header className="flex min-w-0 items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            {title && <div className="min-w-0 text-sm font-semibold break-words">{title}</div>}
            {subtitle && <div className="mt-1 min-w-0 text-xs text-muted break-words">{subtitle}</div>}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </header>
      )}
      <div className="min-w-0 px-5 py-5">{children}</div>
    </section>
  )
}
