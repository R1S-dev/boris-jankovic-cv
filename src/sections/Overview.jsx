import { useMemo, useState } from "react"
import Card from "../components/Card.jsx"
import DetailsModal from "../components/DetailsModal.jsx"
import { profile } from "../data/profile.js"
import { t } from "../i18n.js"
import { GraduationCap, Award, Info, FileText, Image as ImageIcon, ExternalLink } from "lucide-react"

function pick(obj, lang) {
  if (!obj) return ""
  if (typeof obj === "string") return obj
  return obj[lang] || obj.en || obj.sr || ""
}

function isImageHref(href = "") {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(href)
}

function assetIcon(kind, href) {
  if (kind === "pdf") return FileText
  if (kind === "image" || isImageHref(href)) return ImageIcon
  return ExternalLink
}

export default function Overview({ lang }) {
  const [openItem, setOpenItem] = useState(null)

  const modalTitle = useMemo(() => {
    if (!openItem) return ""
    return openItem.type === "edu"
      ? lang === "sr" ? "Obrazovanje" : "Education"
      : lang === "sr" ? "Sertifikat" : "Certificate"
  }, [openItem, lang])

  const noDocsText =
    lang === "sr"
      ? "Dokument nije priložen."
      : "Document not attached."

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* EDUCATION */}
        <Card title={t(lang, "sections.education_title")} subtitle={t(lang, "sections.education_sub")}>
          <ul className="space-y-3">
            {profile.education.map((e, i) => (
              <button
                key={i}
                onClick={() =>
                  setOpenItem({
                    type: "edu",
                    title: pick(e.org, lang),
                    subtitle: pick(e.detail, lang),
                    description: pick(e.description, lang),
                    assets: e.assets || [],
                    Icon: GraduationCap,
                  })
                }
                className="group w-full text-left flex items-start gap-4 rounded-xl border border-line bg-white/5 p-4
                           hover:border-accent/20 hover:bg-accent/10 transition"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/5 text-muted">
                  <GraduationCap size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{pick(e.org, lang)}</div>
                  <div className="mt-1 text-sm text-muted">{pick(e.detail, lang)}</div>
                </div>
                <Info size={16} className="text-muted" />
              </button>
            ))}
          </ul>
        </Card>

        {/* CERTIFICATES */}
        <Card title={t(lang, "sections.certs_title")} subtitle={t(lang, "sections.certs_sub")}>
          <ul className="space-y-3">
            {profile.certificates.map((c, i) => (
              <button
                key={i}
                onClick={() =>
                  setOpenItem({
                    type: "cert",
                    title: pick(c.title, lang),
                    subtitle: pick(c.org, lang),
                    description: pick(c.description, lang),
                    assets: c.assets || [],
                    Icon: Award,
                  })
                }
                className="group w-full text-left flex items-start gap-4 rounded-xl border border-line bg-white/5 p-4
                           hover:border-accent/20 hover:bg-accent/10 transition"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/5 text-muted">
                  <Award size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{pick(c.title, lang)}</div>
                  <div className="mt-1 text-sm text-muted">{pick(c.org, lang)}</div>
                </div>
                <Info size={16} className="text-muted" />
              </button>
            ))}
          </ul>
        </Card>
      </div>

      <DetailsModal open={!!openItem} onClose={() => setOpenItem(null)} title={modalTitle}>
        {openItem && (
          <div className="grid gap-4">
            <div className="rounded-xl border border-line bg-white/5 p-4">
              <div className="text-base font-semibold">{openItem.title}</div>
              {openItem.subtitle && (
                <div className="mt-1 text-sm text-muted">{openItem.subtitle}</div>
              )}
              <div className="mt-3 text-sm text-muted">
                {openItem.description || noDocsText}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-white/5 p-4">
              <div className="text-sm font-semibold">
                {lang === "sr" ? "Dokumenti" : "Documents"}
              </div>

              {openItem.assets.length === 0 && (
                <div className="mt-3 text-sm text-muted">{noDocsText}</div>
              )}

              {openItem.assets.map((a, idx) => {
                const Icon = assetIcon(a.kind, a.href)
                const title = a.title || (lang === "sr" ? "Dokument" : "Document")
                return (
                  <a
                    key={idx}
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-white/5 p-3
                               hover:border-accent/20 hover:bg-accent/10 transition"
                    aria-label={title}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{title}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  )
}
