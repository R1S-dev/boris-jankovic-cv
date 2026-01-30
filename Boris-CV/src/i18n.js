export const LANGS = ["sr", "en"]

export const STRINGS = {
  sr: {
    nav: {
      overview: "Pregled",
      capabilities: "Veštine",
      projects: "Projekti",
      credibility: "Radno iskustvo",
      contact: "Kontakt",
    },

    top: {
      btn_copy_email: "Kopiraj email",
      copied: "Kopirano",
    },

    overview: {
      summary_title: "Sažetak",
      summary_body:
        "Student softverskog inženjerstva sa snažnim fokusom na razvoj modernih web aplikacija. Najviše iskustva imam u React ekosistemu, izgradnji stabilnih UI komponenti i jasnoj strukturi koda. Razmišljam sistemski, brzo učim i orijentisan sam ka isporuci funkcionalnih, održivih rešenja — od ideje do produkcijski spremnog interfejsa.",
      highlights_title: "Ključne oblasti",
    },

    cap: {
      matrix_title: "Veštine",
      matrix_sub: "Pregled oblasti i tehnologija koje koristim u praksi.",
      pro_title: "Inženjerski signali",
      pro_sub: "Detalji koji pokazuju pristup radu i kvalitet implementacije.",
      level_note: "Fokus na praktičnu primenu i isporuku.",
    },

    sections: {
      education_title: "Obrazovanje",
      education_sub: "Formalno obrazovanje i relevantni programi.",
      certs_title: "Sertifikati",
      certs_sub: "Pregled sertifikata i oblasti koje pokrivaju.",

      projects_featured_title: "Istaknuti projekti",
      projects_featured_sub: "Klikni na projekat za detalje (sažetak, highlights i linkovi).",
      projects_all_title: "Svi projekti",
      projects_all_sub: "Lista repozitorijuma sa pretragom i filterom po jeziku.",
      search_ph: "Pretraga…",
      loading: "Učitavanje…",
      no_matches: "Nema rezultata za zadate filtere.",
      btn_repo: "Repo",
      btn_live: "Live demo",
      updated: "Ažurirano",

      contact_title: "Kontakt",
      contact_sub: "Brzi kanali za kontakt i profili.",
      btn_copy: "Kopiraj",
    },

    exp: {
      title: "Radno iskustvo",
      sub: "Pregled radnog iskustva.",
      modal: {
        title_overview: "Pregled",
        title_bullets: "Ključne odgovornosti",
      },
    },
  },

  en: {
    nav: {
      overview: "Overview",
      capabilities: "Capabilities",
      projects: "Projects",
      credibility: "Work experience",
      contact: "Contact",
    },

    top: {
      btn_copy_email: "Copy email",
      copied: "Copied",
    },

    overview: {
      summary_title: "Summary",
      summary_body:
        "Software Engineering student with a strong focus on building modern web applications. Most experienced in the React ecosystem, clean UI architecture, and maintainable component design. Systematic in approach, fast to learn, and delivery-oriented — from idea to production-ready interface.",
      highlights_title: "Key areas",
    },

    cap: {
      matrix_title: "Capabilities",
      matrix_sub: "A practical overview of areas and technologies I use.",
      pro_title: "Engineering signals",
      pro_sub: "Details that reflect approach, quality, and delivery mindset.",
      level_note: "Focused on practical delivery.",
    },

    sections: {
      education_title: "Education",
      education_sub: "Formal education and relevant programs.",
      certs_title: "Certificates",
      certs_sub: "Certificates and covered areas.",

      projects_featured_title: "Featured projects",
      projects_featured_sub: "Click a project to open details (summary, highlights, and links).",
      projects_all_title: "All projects",
      projects_all_sub: "Repository list with search and language filter.",
      search_ph: "Search…",
      loading: "Loading…",
      no_matches: "No matches for current filters.",
      btn_repo: "Repo",
      btn_live: "Live demo",
      updated: "Updated",

      contact_title: "Contact",
      contact_sub: "Quick contact channels and profiles.",
      btn_copy: "Copy",
    },

    exp: {
      title: "Work experience",
      sub: "Work experience overview.",
      modal: {
        title_overview: "Overview",
        title_bullets: "Key responsibilities",
      },
    },
  },
}

export function t(lang, key) {
  const parts = key.split(".")
  let cur = STRINGS[lang] || STRINGS.en
  for (const p of parts) cur = cur?.[p]
  return cur ?? key
}
