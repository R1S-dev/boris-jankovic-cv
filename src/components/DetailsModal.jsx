import { useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"

function isScrollable(el) {
  if (!el || el === document.body || el === document.documentElement) return false
  const style = window.getComputedStyle(el)
  const oy = style.overflowY
  return (oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight
}

function getScrollableAncestor(start, stopAt) {
  let el = start
  while (el && el !== stopAt && el !== document.body) {
    if (isScrollable(el)) return el
    el = el.parentElement
  }
  return null
}

// Allow scroll only inside modal scroll containers; block page scroll without hiding scrollbar.
function shouldAllowScroll(e, panelEl) {
  const t = e.target
  if (!panelEl || !(t instanceof Element)) return false
  if (!panelEl.contains(t)) return false

  const scroller = getScrollableAncestor(t, panelEl)
  if (!scroller) return false

  const dy = "deltaY" in e ? Number(e.deltaY || 0) : 0
  if (!dy) return true

  const atTop = scroller.scrollTop <= 0
  const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1

  if (dy < 0 && !atTop) return true
  if (dy > 0 && !atBottom) return true

  return false
}

export default function DetailsModal({ open, onClose, title, children, footer }) {
  const reduce = useReducedMotion()
  const panelRef = useRef(null)
  const lastFocusRef = useRef(null)

  // Keep scrollbar visible; block background scroll via event prevention.
  useEffect(() => {
    if (!open) return

    lastFocusRef.current = document.activeElement
    document.body.classList.add("modal-open")

    setTimeout(() => {
      panelRef.current?.focus?.()
    }, 0)

    const onWheel = (e) => {
      if (shouldAllowScroll(e, panelRef.current)) return
      e.preventDefault()
    }

    const onTouchMove = (e) => {
      if (shouldAllowScroll(e, panelRef.current)) return
      e.preventDefault()
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }

      const tag = (e.target?.tagName || "").toLowerCase()
      const isTyping =
        tag === "input" || tag === "textarea" || tag === "select" || e.target?.isContentEditable
      if (isTyping) return

      const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]
      if (scrollKeys.includes(e.key)) {
        const panel = panelRef.current
        if (panel && e.target instanceof Element && panel.contains(e.target)) return
        e.preventDefault()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("keydown", onKeyDown)

      const el = lastFocusRef.current
      if (el && typeof el.focus === "function") el.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center px-4 py-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? {} : { opacity: 1 }}
          exit={reduce ? {} : { opacity: 0 }}
        >
          <button onClick={onClose} className="absolute inset-0 bg-black/55" aria-label="Close" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className="relative w-full max-w-2xl rounded-xl2 border border-line bg-panel shadow-soft outline-none
                       max-h-[82vh] flex flex-col"
            initial={reduce ? false : { y: 12, scale: 0.98, opacity: 0 }}
            animate={reduce ? {} : { y: 0, scale: 1, opacity: 1 }}
            exit={reduce ? {} : { y: 10, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Fixed header */}
            <header className="shrink-0 flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/5
                           hover:border-accent/20 hover:bg-accent/10 transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </header>

            {/* Scroll only the middle content */}
            <div className="flex-1 min-h-0 overflow-auto px-5 py-5 pr-2">
              {children}
            </div>

            {/* Fixed footer (optional) */}
            {footer && (
              <footer className="shrink-0 border-t border-line px-5 py-4">
                {footer}
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
