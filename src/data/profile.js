export const profile = {
  handle: "R1S-dev",

  person: {
    name: "Boris Janković",
    birthDate: "2002-11-26",
    location: "Belgrade, Serbia",
    headline:
      "Software Engineering student • Frontend-focused developer • Product-oriented mindset",
    email: "jankoovicbooris@gmail.com",
    phone: "+381601675757",
  },

  education: [
    {
      org: { sr: "Univerzitet Singidunum", en: "Singidunum University" },
      detail: {
        sr: "4. godina — Softversko i informaciono inženjerstvo",
        en: "4th year — Software & Information Engineering",
      },
      description: {
        sr: "Studije usmerene na osnove softverskog inženjerstva, web tehnologije, baze podataka i praktičan rad na projektima.",
        en: "Studies focused on software engineering fundamentals, web technologies, databases, and applied project work.",
      },
      assets: [], // datoteka nije priložena
    },
    {
      org: { sr: "IT Akademija", en: "IT Academy" },
      detail: { sr: "Python programiranje", en: "Python Programming" },
      description: {
        sr: "Završen obrazovni smer fokusiran na Python osnove, strukture podataka i praktično rešavanje problema.",
        en: "Completed educational track focused on Python fundamentals, data structures, and practical problem solving.",
      },
      assets: [], // datoteka nije priložena
    },
    {
      org: { sr: "PTT tehnička škola", en: "PTT Technical School" },
      detail: { sr: "Telekomunikacioni tehničar", en: "Telecommunications Technician" },
      description: {
        sr: "Srednje tehničko obrazovanje iz oblasti telekomunikacija, mreža i elektronskih sistema.",
        en: "Technical secondary education focused on telecommunications, networking basics, and electronic systems.",
      },
      assets: [], // datoteka nije priložena
    },
  ],

  certificates: [
    {
      title: { sr: "Efektivna poslovna komunikacija", en: "Effective Business Communication" },
      org: { sr: "IT Akademija", en: "IT Academy" },
      description: {
        sr: "Kurs usmeren na razvoj profesionalne komunikacije, jasnoće i efikasne saradnje u poslovnom okruženju.",
        en: "Course focused on professional communication skills, clarity, and effective interaction in business environments.",
      },
      assets: [
        {
          kind: "pdf",
          title: "Effective Business Communication — Certificate",
          href: "/assets/docs/ITAcademy_Effective_Business_Communication_2022.pdf",
        },
      ],
    },
    {
      title: { sr: "Efektivno donošenje odluka", en: "Effective Decision Making" },
      org: { sr: "IT Akademija", en: "IT Academy" },
      description: {
        sr: "Kurs fokusiran na analitičko razmišljanje i strukturisano donošenje odluka.",
        en: "Course focused on analytical thinking and structured decision making.",
      },
      assets: [
        {
          kind: "pdf",
          title: "Effective Decision Making — Certificate",
          href: "/assets/docs/ITAcademy_Effective_Decision_Making_2022.pdf",
        },
      ],
    },
    {
      title: { sr: "Osnove softverske arhitekture (IBM)", en: "Essentials of Rational Software Architect" },
      org: { sr: "IBM Academic Initiative", en: "IBM Academic Initiative" },
      description: {
        sr: "Obuka po IBM metodologiji sa fokusom na osnove softverske arhitekture i dizajn sistema.",
        en: "Training based on IBM methodology focused on software architecture fundamentals and system design.",
      },
      assets: [
        {
          kind: "pdf",
          title: "Essentials of Rational Software Architect — IBM Certificate",
          href: "/assets/docs/IBM_Essentials_of_Rational_Software_Architect_2022.pdf",
        },
      ],
    },
  ],

  workExperience: [
    {
      key: "cafe_manager",
      role: { sr: "Poslovođa kafića", en: "Cafe Shift Lead / Manager" },
      org: { sr: "Ugostiteljski objekat", en: "Hospitality venue" },
      period: { sr: "Ranije", en: "Earlier" },
      cardSummary: {
        sr: "Operacije i vođenje smena — organizacija tima i svakodnevni rad.",
        en: "Operations and shift leadership — team coordination and daily work.",
      },
      modalSummary: {
        sr: "Širok opseg odgovornosti — od rada sa gostima do organizacije operacija. Praktično iskustvo u vođenju ljudi i rešavanju problema na licu mesta.",
        en: "Broad responsibilities — from customer-facing work to operations. Practical experience leading people and solving problems on the spot.",
      },
      bullets: {
        sr: [
          "Organizacija smena i koordinacija tima",
          "Unos/obrada faktura i osnovna administracija",
          "Zapošljavanje i uvođenje novih ljudi + rad na svim pozicijama (konobar/šanker)",
        ],
        en: [
          "Shift scheduling and team coordination",
          "Invoice entry/processing and basic administration",
          "Hiring/onboarding + working across roles (service/bar)",
        ],
      },
    },

    {
      key: "marketing_web",
      role: { sr: "Marketing i web", en: "Marketing & Web" },
      org: { sr: "Freelance / projekti", en: "Freelance / projects" },
      period: { sr: "Povremeno", en: "Occasional" },
      cardSummary: {
        sr: "Sajtovi, SEO, sadržaj i rebranding — po potrebi klijenata.",
        en: "Websites, SEO, content, and rebranding — client needs based.",
      },
      modalSummary: {
        sr: "Rad na izradi sajtova i marketing podršci: SEO, struktura sadržaja, rebranding i društvene mreže. Po potrebi uključuje i montažu/obradu sadržaja.",
        en: "Work on websites and marketing support: SEO, content structure, rebranding, and social media. When needed, it also includes basic editing/post-production.",
      },
      bullets: {
        sr: [
          "Izrada sajtova + osnovno održavanje i optimizacija",
          "SEO osnove: tehnički deo + struktura sadržaja",
          "Rebranding i nastup (poruka, vizuelna konzistentnost, društvene mreže)",
          "Montaža/obrada sadržaja po potrebi",
        ],
        en: [
          "Website creation + basic maintenance and optimization",
          "SEO fundamentals: technical + content structure",
          "Rebranding and presence (messaging, visual consistency, social media)",
          "Basic editing/post-production when needed",
        ],
      },
    },

    {
      key: "dev_projects",
      role: { sr: "Programiranje (projekti)", en: "Software development (projects)" },
      org: { sr: "Lični i klijentski projekti", en: "Personal and client projects" },
      period: { sr: "Kontinuirano", en: "Ongoing" },
      cardSummary: {
        sr: "Custom web aplikacije — ovi projekti nisu javni.",
        en: "Custom web applications — these projects are not public.",
      },
      modalSummary: {
        sr: "Razvoj custom web aplikacija po zahtevu klijenata i na ličnim projektima. Fokus je na stabilnom UI-u, jasnim tokovima i održivoj strukturi koda. Ovi projekti nisu javni.",
        en: "Development of custom web applications for clients and personal projects. Focused on stable UI, clear flows, and maintainable structure. These projects are not public.",
      },
      bullets: {
        sr: [
          "Custom web aplikacije po zahtevu klijenata",
          "Frontend fokus: UI, komponentna struktura, UX detalji",
          "Integracije i perzistencija stanja (API + storage) kada je potrebno",
        ],
        en: [
          "Custom web applications based on client requirements",
          "Frontend focus: UI, component structure, UX details",
          "Integrations and state persistence (API + storage) when needed",
        ],
      },
    },
  ],

  strengths: [
    {
      k: "Engineering",
      v: "Clean, maintainable frontend code with focus on structure, clarity and long-term usability.",
    },
    {
      k: "Delivery",
      v: "Iterative work, realistic scope control and steady delivery of working solutions.",
    },
    {
      k: "Product thinking",
      v: "Understanding user needs and translating requirements into practical features.",
    },
    {
      k: "Marketing & sales background",
      v: "Experience in SEO, campaigns and sales that improves communication and outcome-driven development.",
    },
  ],

  links: {
    github: "https://github.com/R1S-dev",
    instagram_boris: "https://instagram.com/boris.rs",
  },

  featuredRepos: ["R1S-POS", "R1S-Radio"],

  projectMeta: {
    "R1S-POS": {
      sr: {
        summary:
          "POS/prodajni sistem – fokus na jasnom UI-u, brzom unosu i stabilnoj strukturi komponenti.",
        highlights: [
          "Jasan UI tok i modularne komponente",
          "Priprema za realni rad (validacije, stanja, edge-case)",
          "Kod organizovan za dalje širenje",
        ],
      },
      en: {
        summary:
          "Point-of-sale app – structured UI, fast workflows, and clean component architecture.",
        highlights: [
          "Clear UI flow and modular components",
          "Prepared for real usage (validation, state, edge cases)",
          "Codebase organized for extension",
        ],
      },
      liveDemo: "https://r1s-pos.vercel.app/",
    },

    "R1S-Radio": {
      sr: {
        summary:
          "Minimalistički online radio plejer: omiljene stanice, tema, favoriti i osnovna statistika.",
        highlights: [
          "Theme switch + UX fokus",
          "Favoriti i perzistencija stanja",
          "Jednostavna, brza navigacija",
        ],
      },
      en: {
        summary:
          "Minimal online radio player: favorites, theme switch, and lightweight stats.",
        highlights: [
          "Theme switch + UX focus",
          "Favorites + persistence",
          "Simple and fast navigation",
        ],
      },
      liveDemo: "https://r1s-radio.vercel.app/",
    },

    "Fast-Food-Jankovic": {
      sr: {
        summary:
          "Web aplikacija za online naručivanje i administraciju (korisnički i admin deo).",
        highlights: [
          "Korisnički tok naručivanja + admin upravljanje",
          "Frontend + backend integracija",
          "Pragmatična struktura i isporuka funkcionalnosti",
        ],
      },
      en: {
        summary:
          "Food ordering web app with admin panel and user flows (frontend + backend integration).",
        highlights: [
          "User ordering flow + admin management",
          "Frontend + backend integration",
          "Pragmatic structure and delivery",
        ],
      },
      liveDemo: "unavailable",
    },

    "RentalTrack": {
      sr: {
        summary:
          "Aplikacija za praćenje/rentiranje opreme – fokus na evidenciju, tokove i preglednost.",
        highlights: [
          "Modelovanje entiteta i tokova",
          "TypeScript za sigurniji razvoj",
          "Priprema za realne scenarije (statusi, rokovi, filteri)",
        ],
      },
      en: {
        summary:
          "Equipment rental tracking app – clear flows, records, and overview-oriented UI.",
        highlights: [
          "Entities + workflow modeling",
          "TypeScript for safer development",
          "Prepared for real scenarios (statuses, deadlines, filters)",
        ],
      },
      liveDemo: "https://rental-track.vercel.app/",
    },
  },
}
