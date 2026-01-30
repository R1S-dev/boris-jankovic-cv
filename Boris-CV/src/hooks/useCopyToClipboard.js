import { useCallback, useRef, useState } from "react"

export function useCopyToClipboard({ resetMs = 900 } = {}) {
  const [copiedKey, setCopiedKey] = useState("")
  const timerRef = useRef(null)

  const copy = useCallback(
    async (value, key = "copied") => {
      if (!value) return false
      try {
        await navigator.clipboard.writeText(String(value))
        setCopiedKey(key)

        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopiedKey(""), resetMs)

        return true
      } catch {
        return false
      }
    },
    [resetMs]
  )

  return { copiedKey, copy }
}
