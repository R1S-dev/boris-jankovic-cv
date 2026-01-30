import { useMemo, useState } from "react"
import Card from "../components/Card.jsx"
import DetailsModal from "../components/DetailsModal.jsx"
import ModalBlock from "../components/ModalBlock.jsx"
import Badge from "../components/Badge.jsx"
import { profile } from "../data/profile.js"
import { t } from "../i18n.js"
import { ui } from "../ui/cls.js"
import { Briefcase, Info } from "lucide-react"

function pick(obj, lang) {
  if (!obj) return ""
  if (typeof obj === "string") return obj
  return obj?.[lang] || obj?.en || obj?.sr || ""
}

function pickList(obj, lang) {
  if (!obj) return []
  return obj?.[lang] || obj?.en || obj?.sr || []
}

export default function Credibility({ lang }) {
  const items = profile?.workExperience || []
  const [open, setOpen] = useState(null)

  const modalTitle = useMemo(() => (open ? pick(open.role, lang) : ""), [open, lang])

  const tileCls = `${ui.cardInteractive} ${ui.focusRing} p-4 flex flex-col min-w-0`
  const topRowCls = "flex items-start justify-between gap-3 min-w-0"
  const leftCls = "flex items-center gap-3 min-w-0"
  const titleCls = "text-sm font-semibold break-words leading-tight"
  const subCls = "mt-1 text-sm text-muted break-words"

  return (
    <div className="grid gap-5">
      <Card title={t(lang, "exp.title")} subtitle={t(lang, "exp.sub")}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((x) => (
            <button key={x.key} onClick={() => setOpen(x)} className={tileCls}>
              <div className={topRowCls}>
                <div className={leftCls}>
                  <div className={ui.iconBoxLg}>
                    <Briefcase size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className={titleCls}>{pick(x.role, lang)}</div>
                    <div className={subCls}>{pick(x.org, lang)}</div>
                  </div>
                </div>

                <div className={ui.iconBoxSm} aria-hidden="true">
                  <Info size={16} />
                </div>
              </div>

              <div className="mt-3 text-sm text-muted leading-relaxed break-words">
                {pick(x.cardSummary, lang)}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <Badge>{pick(x.period, lang)}</Badge>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <DetailsModal open={!!open} onClose={() => setOpen(null)} title={modalTitle}>
        {open && (
          <div className="grid gap-4">
            <ModalBlock title={t(lang, "exp.modal.title_overview")}>
              <p className="text-sm text-muted leading-relaxed break-words">
                {pick(open.modalSummary, lang)}
              </p>
            </ModalBlock>

            <ModalBlock title={t(lang, "exp.modal.title_bullets")}>
              <ul className="list-disc pl-5 text-sm text-muted space-y-2">
                {pickList(open.bullets, lang).map((b, idx) => (
                  <li key={idx} className="break-words">
                    {b}
                  </li>
                ))}
              </ul>
            </ModalBlock>
          </div>
        )}
      </DetailsModal>
    </div>
  )
}
