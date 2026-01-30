export default function Pill({ href, children, className = "", ...rest }) {
  const base =
    "inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1.5 text-xs " +
    "text-muted transition"

  const linkHover = "hover:text-ink hover:border-accent/20 hover:bg-accent/10"

  const cls = `${base} ${href ? linkHover : ""} ${className}`

  if (href) {
    const isExternal = href.startsWith("http")
    return (
      <a
        href={href}
        className={cls}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  )
}
