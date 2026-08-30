# TASKS.md — FlexCredit Onboarding: QA nalazi i status popravki

> Izvor: ručni pregled uživo sajta (https://flexcredit-onboarding.vercel.app/) + pregled koda.
> Status: **Sve identifikovane stavke su riješene i provjerene.**

---

## 🟢 Riješeno i Implementirano (Completed)

- [x] **Čišćenje mrtvog koda i usklađivanje arhitekture**:
  - Uklonjen sav mrtav/nekorišten kod (`PortalView.tsx`, `Navbar.tsx`, `PersonalizationModal.tsx`, `KnowledgeQuiz.tsx`, `OnboardingChecklist.tsx`, `OrgChartInteractive.tsx`, `ColleaguesDirectory.tsx`, `SalesMapInteractive.tsx`, `orgChartData.ts`).
  - Ažurirana dokumentacija (`README.md`, `AGENTS.md`) tako da precizno opisuje trenutnu čistu prezentaciju.
- [x] **Fix odsječenog teksta na Slajdu 10** ("Strateški ciljevi za 2026", cilj 01 "Geografsko širenje"):
  - Uklonjen restriktivni `line-clamp-3` i zamijenjen fluidnim `leading-snug` stilom. Sav tekst se prikazuje u cjelosti.
- [x] **Fix providne pozadine u "Pregled svih slajdova" (grid view, dugme 🔲 / prečica `G`)**:
  - Postavljena 100% neprozirna podloga (`bg-[#001420]`) i `z-50` overlay tako da pozadinski slajd i animacije ne probijaju.
- [x] **Fix plutajućih strelica na mobilnim uređajima**:
  - Plutajuće bočne strelice premještene na `hidden md:flex` (aktivne na desktopu/tabletu gdje ima dovoljno margine).
  - Na mobilnim uređajima dodata kompaktna navigaciona dugmad u gornjoj traci + implementiran prirodan **Touch Swipe** gest (prevlačenje prstom lijevo/desno).
- [x] **Open Graph i Twitter meta tagovi**:
  - Dodati u `index.html` (`og:title`, `og:image`, `og:description`, `twitter:card`, `theme-color`).
- [x] **Vektorska interaktivna mapa BiH na Slajdu 9**:
  - Integrisana stilizovana SVG mapa sa proporcionalnim krugovima za 7 regionalnih centara i brojem filijala u svakom krugu.
- [x] **Uklonjene sve lične/personalizovane stavke**:
  - Slajdovi su u potpunosti prilagođeni opštem kompanijskom onboarding vodiču.
- [x] **Potpuno uklonjen footer**:
  - Donja traka je uklonjena radi maksimalnog iskorišćenja ekrana.

---

## 🚀 Status Aplikacije

- **Build**: `tsc -b && vite build` prolazi sa **0 grešaka**.
- **Deploy**: Automatski CI/CD deploy na Vercel preko `main` grane.

