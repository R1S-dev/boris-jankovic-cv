import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import TopHeader from './components/TopHeader.jsx'
import SectionNav from './components/SectionNav.jsx'
import RightRail from './components/RightRail.jsx'
import PrintRail from './components/PrintRail.jsx'

import Overview from './sections/Overview.jsx'
import Capabilities from './sections/Capabilities.jsx'
import Projects from './sections/Projects.jsx'
import Credibility from './sections/Credibility.jsx'
import Contact from './sections/Contact.jsx'

const SECTION_IDS = ['overview','capabilities','projects','credibility','contact']

export default function App() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState('overview')
  const [weights, setWeights] = useState(() =>
    Object.fromEntries(SECTION_IDS.map(id => [id, 0]))
  )

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'sr')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  // Subtle “neighbor” shading
  useEffect(() => {
    const els = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean)
    const ratioMap = new Map()
    SECTION_IDS.forEach(id => ratioMap.set(id, 0))

    const thresholds = []
    for (let i = 0; i <= 20; i++) thresholds.push(i / 20)

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const id = e?.target?.id
        if (!id) continue
        ratioMap.set(id, e.isIntersecting ? (e.intersectionRatio || 0) : 0)
      }

      const raw = SECTION_IDS.map(id => ratioMap.get(id) || 0)
      const max = Math.max(0.0001, ...raw)

      const norm = {}
      for (const id of SECTION_IDS) {
        const r = ratioMap.get(id) || 0
        const n = Math.min(1, r / max)
        norm[id] = Math.pow(n, 0.75)
      }

      const top = SECTION_IDS
        .map(id => ({ id, w: norm[id] || 0 }))
        .sort((a,b) => b.w - a.w)[0]
      if (top?.id) setActiveId(top.id)

      const idx = SECTION_IDS.indexOf(top?.id || 'overview')
      const next = Object.fromEntries(SECTION_IDS.map(id => [id, 0]))

      if (idx >= 0) {
        next[SECTION_IDS[idx]] = 1
        const prevId = SECTION_IDS[idx - 1]
        const nextId = SECTION_IDS[idx + 1]
        if (prevId) next[prevId] = Math.min(0.28, norm[prevId] * 0.45)
        if (nextId) next[nextId] = Math.min(0.28, norm[nextId] * 0.45)
      }

      setWeights(next)
    }, { root: null, threshold: thresholds })

    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const toggleLang = () => setLang(lang === 'sr' ? 'en' : 'sr')

  const footerText =
    lang === "sr"
      ? "Boris Janković • CV sajt • React + Tailwind • GitHub podaci preko public API-ja."
      : "Boris Janković • CV site • React + Tailwind • GitHub data via public API."

  return (
    <div className="relative min-h-screen bg-bg">
      <div className="absolute inset-0 bg-noise" />

      <main className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-6 py-6 print:max-w-none print:px-0 print:py-0">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] lg:items-start print:block">
          {/* Desktop-only rail; hidden on print */}
          <aside className="hidden lg:block lg:sticky lg:top-6 print:hidden no-print">
            <div className="grid gap-4">
              <SectionNav activeId={activeId} lang={lang} weights={weights} />
              <RightRail lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
              <PrintRail />
            </div>
          </aside>

          <div className="grid gap-6 min-w-0 print:gap-4">
            <TopHeader
              lang={lang}
              theme={theme}
              onToggleTheme={toggleTheme}
              onToggleLang={toggleLang}
            />

            <AnimatedSection id="overview" reduce={reduce}>
              <Overview lang={lang} />
            </AnimatedSection>

            <AnimatedSection id="capabilities" reduce={reduce}>
              <Capabilities lang={lang} />
            </AnimatedSection>

            {/* Hide Projects in print (clean CV PDF) */}
            <div className="print:hidden">
              <AnimatedSection id="projects" reduce={reduce}>
                <Projects lang={lang} />
              </AnimatedSection>
            </div>

            <AnimatedSection id="credibility" reduce={reduce}>
              <Credibility lang={lang} />
            </AnimatedSection>

            <AnimatedSection id="contact" reduce={reduce}>
              <Contact lang={lang} />
            </AnimatedSection>

            <footer className="py-6 text-xs text-muted print:hidden no-print">
              {footerText}
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}

function AnimatedSection({ id, children, reduce }) {
  return (
    <section id={id} className="scroll-mt-6 print:scroll-mt-0">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </section>
  )
}
