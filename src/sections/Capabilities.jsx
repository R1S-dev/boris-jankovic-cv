import { useMemo, useState } from "react"
import Card from "../components/Card.jsx"
import Badge from "../components/Badge.jsx"
import DetailsModal from "../components/DetailsModal.jsx"
import ModalBlock from "../components/ModalBlock.jsx"
import { t } from "../i18n.js"
import { ui } from "../ui/cls.js"
import { Code2, Server, Database, Wrench, TrendingUp, Handshake, Info } from "lucide-react"

const MATRIX = [
  {
    key: "frontend",
    area: { sr: "Frontend", en: "Frontend" },
    icon: Code2,
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Vite", "PWA"],
    description: {
      sr: "Gradim moderne i responzivne interfejse sa fokusom na čistu komponentnu strukturu, stabilna UI stanja i dosledan UX.",
      en: "I build modern, responsive interfaces with focus on clean component structure, stable UI states, and consistent UX.",
    },
    bullets: {
      sr: [
        "Komponentna arhitektura: reuse, čitljivost, dosledni UI primitivи",
        "UI tokovi i state management: prazna stanja, greške, validacije, edge-case",
        "Responzivnost i “polish”: tipografija, spacing, hover/focus detalji",
      ],
      en: [
        "Component architecture: reuse, readability, consistent UI primitives",
        "State-driven UI flows: empty/error states, validation, edge cases",
        "Responsiveness and polish: typography, spacing, hover/focus details",
      ],
    },
  },
  {
    key: "backend",
    area: { sr: "Backend / Web", en: "Backend / Web" },
    icon: Server,
    items: ["PHP", "Node.js", "REST APIs", "Authentication"],
    description: {
      sr: "Radim sa web backend logikom i API integracijama. Fokus mi je na praktičnoj implementaciji, jasnim endpointima i stabilnoj komunikaciji front-back.",
      en: "I work with web backend logic and API integrations, focusing on practical implementation, clear endpoints, and stable frontend-backend communication.",
    },
    bullets: {
      sr: [
        "REST endpointi i integracija sa frontend aplikacijama",
        "Osnovna autentifikacija i sigurni tokovi (session/token koncepti)",
        "Organizacija koda: čitljivost, proširivost i održavanje",
      ],
      en: [
        "REST endpoints and frontend integration",
        "Baseline authentication and safe flows (session/token concepts)",
        "Code organization: readability, extensibility, maintainability",
      ],
    },
  },
  {
    key: "data",
    area: { sr: "Podaci", en: "Data" },
    icon: Database,
    items: ["MySQL", "MongoDB", "Local storage", "CRUD"],
    description: {
      sr: "Modelujem podatke i pravim realne CRUD tokove. Kada ima smisla, koristim local storage / cache da UI bude brži i stabilniji.",
      en: "I model data and build real CRUD flows. When appropriate, I use local storage / caching patterns for faster, more stable UI.",
    },
    bullets: {
      sr: [
        "Modelovanje entiteta i relacija (SQL/NoSQL) i rad sa realnim podacima",
        "CRUD tokovi + validacija (unos, izmena, brisanje, pregled)",
        "Cache/local storage: perzistencija stanja i manje nepotrebnih refetch-a",
      ],
      en: [
        "Entity and relationship modeling (SQL/NoSQL) with real data flows",
        "CRUD flows + validation (create, update, delete, review)",
        "Cache/local storage: state persistence and fewer unnecessary refetches",
      ],
    },
  },
  {
    key: "tools",
    area: { sr: "Alati", en: "Tools" },
    icon: Wrench,
    items: ["VS Code", "Postman", "Git", "GitHub", "Chrome DevTools"],
    description: {
      sr: "Alati i workflow koje koristim svakodnevno za razvoj, debagovanje i održavanje projekata — od lokalnog rada do GitHub repo rutine.",
      en: "Tools and workflows I use daily for development, debugging, and project maintenance — from local work to a clean GitHub routine.",
    },
    bullets: {
      sr: [
        "DevTools debag: Network/Console/Performance, brzo pronalaženje uzroka problema",
        "Postman: testiranje endpointa, proveravanje status kodova i payload-a",
        "Git rutina: branching, jasni commitovi, pregled promena i rollback kada treba",
      ],
      en: [
        "DevTools debugging: Network/Console/Performance for fast issue isolation",
        "Postman: endpoint testing, status codes and payload verification",
        "Git routine: branching, clean commits, change review, rollback when needed",
      ],
    },
  },
  {
    key: "marketing",
    area: { sr: "Marketing", en: "Marketing" },
    icon: TrendingUp,
    items: ["SEO", "WordPress", "SEMrush", "Analytics"],
    description: {
      sr: "Razumevanje marketinga mi pomaže da razvoj bude “outcome-driven” — da interfejs bude jasan, poruka precizna i da postoji mera uspeha.",
      en: "Marketing understanding helps me build in an outcome-driven way — clear UI, clear value, and measurable impact.",
    },
    bullets: {
      sr: [
        "SEO osnove: tehnički signali, struktura sadržaja i optimizacija stranica",
        "Analytics mindset: šta pratimo i kako iteriramo na osnovu podataka",
        "Jasna komunikacija vrednosti proizvoda (copy i pozicioniranje bez “hype”)",
      ],
      en: [
        "SEO basics: technical signals, content structure, page optimization",
        "Analytics mindset: what to measure and how to iterate based on data",
        "Clear value communication (copy and positioning without hype)",
      ],
    },
  },
  {
    key: "sales",
    area: { sr: "Prodaja", en: "Sales" },
    icon: Handshake,
    items: ["Client communication", "Negotiation", "Sales psychology"],
    description: {
      sr: "Konsultativni pristup radu sa klijentima: postavljam prava pitanja, jasno definišem scope i prevodim zahteve u konkretne funkcionalnosti.",
      en: "Consultative approach: asking the right questions, aligning scope, and translating requirements into concrete features.",
    },
    bullets: {
      sr: [
        "Razjašnjavanje potreba i očekivanja pre implementacije",
        "Dogovor oko scope-a i prioriteta (šta prvo, šta kasnije)",
        "Jasna komunikacija statusa i narednih koraka tokom isporuke",
      ],
      en: [
        "Clarifying needs and expectations before implementation",
        "Aligning scope and priorities (what first, what later)",
        "Clear status updates and next steps during delivery",
      ],
    },
  },
]

function pickText(obj, lang) {
  if (!obj) return ""
  if (typeof obj === "string") return obj
  return obj?.[lang] || obj?.en || obj?.sr || ""
}

function pickList(obj, lang) {
  if (!obj) return []
  return obj?.[lang] || obj?.en || obj?.sr || []
}

export default function Capabilities({ lang }) {
  const [open, setOpen] = useState(null)
  const modalTitle = useMemo(() => (open ? pickText(open.area, lang) : ""), [open, lang])

  const tileCls =
    `${ui.cardInteractive} ${ui.focusRing} ` +
    "p-4 flex flex-col min-w-0"

  const titleRowCls = "flex items-start justify-between gap-3 min-w-0"
  const leftCls = "flex items-center gap-3 min-w-0"
  const titleCls = "text-sm font-semibold break-words leading-tight"

  const badgesWrapCls =
    "mt-3 flex flex-wrap gap-2 content-start min-w-0 " +
    "max-h-[60px] overflow-hidden"

  return (
    <div className="grid gap-5">
      <Card title={t(lang, "cap.matrix_title")} subtitle={t(lang, "cap.matrix_sub")}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MATRIX.map((m) => {
            const Icon = m.icon
            const title = pickText(m.area, lang)

            return (
              <button key={m.key} onClick={() => setOpen(m)} className={tileCls}>
                <div className={titleRowCls}>
                  <div className={leftCls}>
                    <div className={ui.iconBoxLg}>
                      <Icon size={18} />
                    </div>
                    <div className={titleCls}>{title}</div>
                  </div>

                  <div className={ui.iconBoxSm} aria-hidden="true">
                    <Info size={16} />
                  </div>
                </div>

                <div className={badgesWrapCls}>
                  {m.items.map((i) => (
                    <Badge key={i}>{i}</Badge>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </Card>

      <DetailsModal open={!!open} onClose={() => setOpen(null)} title={modalTitle}>
        {open && (
          <div className="grid gap-4">
            <ModalBlock title={lang === "sr" ? "Pregled" : "Overview"}>
              <p className="text-sm text-muted leading-relaxed break-words">
                {pickText(open.description, lang)}
              </p>
            </ModalBlock>

            <ModalBlock title={lang === "sr" ? "Tehnologije" : "Technologies"}>
              <div className="flex flex-wrap gap-2">
                {open.items.map((x) => (
                  <Badge key={x} tone="accent">
                    {x}
                  </Badge>
                ))}
              </div>
            </ModalBlock>

            <ModalBlock title={lang === "sr" ? "Šta konkretno radim" : "What I do"}>
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
