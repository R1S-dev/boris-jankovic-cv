export default function Badge({ children, tone = "neutral" }) {
  const cls =
    tone === "accent"
      ? "border-accent/35 bg-accent/10 text-ink"
      : "border-accent/20 bg-accent/5 text-muted"

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full border
        px-3 py-1 text-xs
        ${cls}
      `}
    >
      {children}
    </span>
  )
}
