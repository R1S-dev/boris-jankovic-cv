import Card from "../components/Card.jsx"
import IconButton from "../components/IconButton.jsx"
import { profile } from "../data/profile.js"
import { t } from "../i18n.js"
import { ui } from "../ui/cls.js"
import { Mail, Github, Instagram, Phone, Copy, Check, ExternalLink } from "lucide-react"
import { useMemo } from "react"
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js"

function safeOpenProps(href) {
  const isExternal = href?.startsWith("http")
  return isExternal ? { href, target: "_blank", rel: "noreferrer" } : { href }
}

export default function Contact({ lang }) {
  const email = profile?.person?.email
  const phone = profile?.person?.phone
  const github = profile?.links?.github
  const igBoris = profile?.links?.instagram_boris

  const { copiedKey, copy } = useCopyToClipboard({ resetMs: 900 })

  const items = useMemo(() => {
    const out = []

    if (email) {
      out.push({
        key: "email",
        label: "Email",
        value: email,
        href: `mailto:${email}`,
        Icon: Mail,
        copyValue: email,
      })
    }

    if (phone) {
      out.push({
        key: "phone",
        label: lang === "sr" ? "Telefon" : "Phone",
        value: phone,
        href: `tel:${phone.replace(/\s+/g, "")}`,
        Icon: Phone,
        copyValue: phone,
      })
    }

    if (github) {
      out.push({
        key: "github",
        label: "GitHub",
        value: "github.com/R1S-dev",
        href: github,
        Icon: Github,
        copyValue: github,
      })
    }

    if (igBoris) {
      out.push({
        key: "ig_boris",
        label: "Instagram",
        value: "@boris.rs",
        href: igBoris,
        Icon: Instagram,
        copyValue: "@boris.rs",
      })
    }

    return out
  }, [email, phone, github, igBoris, lang])

  const itemCls =
    `${ui.cardInteractive} ${ui.focusRing} ` +
    "px-4 py-3.5 flex items-center justify-between gap-3 min-w-0"

  const labelCls = "text-[11px] font-mono tracking-[.22em] text-muted uppercase"
  const valueCls = "mt-1 text-sm font-semibold break-all"

  const leadingIconCls =
    "grid h-9 w-9 min-h-[36px] min-w-[36px] place-items-center rounded-lg border border-line bg-white/5 text-muted " +
    "group-hover:border-accent/20 group-hover:bg-accent/10 group-hover:text-ink transition shrink-0"

  const openLabel = lang === "sr" ? "Otvori" : "Open"
  const copyLabel = lang === "sr" ? "Kopiraj" : "Copy"

  const subtitle =
    lang === "sr"
      ? "Kontakt informacije i javni profili."
      : "Contact details and public profiles."

  return (
    <Card title={t(lang, "sections.contact_title")} subtitle={subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map(({ key, label, value, href, Icon, copyValue }) => {
          const isCopied = copiedKey === key

          return (
            <div key={key} className={itemCls}>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={leadingIconCls} aria-hidden="true">
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <div className={labelCls}>{label}</div>
                  <div className={valueCls}>{value}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <IconButton
                  onClick={() => copy(copyValue || value, key)}
                  title={copyLabel}
                  aria-label={copyLabel}
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                </IconButton>

                <IconButton
                  as="a"
                  {...safeOpenProps(href)}
                  title={openLabel}
                  aria-label={openLabel}
                >
                  <ExternalLink size={16} />
                </IconButton>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
