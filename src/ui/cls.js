// Centralized UI class tokens (keep UI consistent across sections)

export const ui = {
  // Clickable/interactive card surface (same feel across sections)
  cardInteractive:
    "group w-full text-left rounded-xl border border-line bg-white/5 " +
    "hover:border-accent/20 hover:bg-accent/10 transition",

  // Card padding presets
  cardPad4: "p-4",
  cardPad5: "p-5",

  // Icon containers
  // NOTE: enforce fixed size so it NEVER collapses on narrow screens.
  iconBoxLg:
    "grid h-10 w-10 min-h-[40px] min-w-[40px] place-items-center rounded-xl border border-line bg-white/5 text-muted " +
    "group-hover:border-accent/20 group-hover:bg-accent/10 group-hover:text-ink transition shrink-0",

  iconBoxSm:
    "grid h-9 w-9 min-h-[36px] min-w-[36px] place-items-center rounded-lg border border-line bg-white/5 text-muted " +
    "group-hover:border-accent/20 group-hover:bg-accent/10 group-hover:text-ink transition shrink-0",

  // Action buttons (links)
  actionBtn:
    "inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-4 py-2 text-sm " +
    "hover:border-accent/30 hover:bg-accent/10 transition",

  actionBtnSm:
    "inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-3 py-1.5 text-xs " +
    "hover:border-accent/30 hover:bg-accent/10 transition",

  // Footer links (compact + consistent hover)
  footerLink:
    "inline-flex items-center gap-2 rounded-lg border border-line bg-white/5 px-3 py-2 text-xs " +
    "text-muted hover:text-ink hover:border-accent/20 hover:bg-accent/10 transition",

  // Focus ring helpers
  focusRing:
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-[rgb(var(--accent)/.55)]",
}
