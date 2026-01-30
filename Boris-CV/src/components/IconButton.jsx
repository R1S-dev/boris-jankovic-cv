export default function IconButton({
  as = "button",
  href,
  onClick,
  title,
  "aria-label": ariaLabel,
  className = "",
  children,
  ...rest
}) {
  const base =
    "grid h-8 w-8 min-h-[32px] min-w-[32px] place-items-center rounded-lg border border-line bg-white/5 " +
    "text-muted hover:border-accent/30 hover:bg-accent/10 hover:text-ink transition shrink-0 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent)/.55)]"

  const cls = `${base} ${className}`

  if (as === "a") {
    return (
      <a
        href={href}
        className={cls}
        title={title}
        aria-label={ariaLabel || title}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      title={title}
      aria-label={ariaLabel || title}
      {...rest}
    >
      {children}
    </button>
  )
}
