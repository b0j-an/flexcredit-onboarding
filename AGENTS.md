# Flex Credit Onboarding Web Platform & Workflow

Ovaj repozitorijum sadrži digitalizovanu, modernizovanu interaktivnu platformu za onboarding novih zaposlenih u **Flex Credit** (dio **MVF Finance** grupacije), kao i originalne radne materijale (PPTX, Canva instrukcije).

---

## 1. Struktura Projekta

- `src/` — React 18 + TypeScript + Tailwind CSS izvorni kod
  - `components/` — Modularne komponente:
    - `Navbar.tsx` — Navigaciona traka sa promjenom pogleda, podešavanjima i personalizacijom
    - `SlideDeck.tsx` — Digitalna 16:9 prezentacija od 18 slajdova sa tastaturnom navigacijom i toggle-om za originalni sken
    - `PortalView.tsx` — Sveobuhvatni interaktivni portal za novog zaposlenog
    - `ColleaguesDirectory.tsx` — Pretraživa baza svih 47 saradnika sa fotografijama i sektorima
    - `SalesMapInteractive.tsx` — Interaktivna prodajna mapa BiH sa 7 regija i 61 filijalom
    - `OrgChartInteractive.tsx` — Interaktivno stablo organizacione strukture i originalni dijagram
    - `KnowledgeQuiz.tsx` — Kviz znanja sa slavljeničkim konfetama i generisanjem certifikata
    - `OnboardingChecklist.tsx` — Interaktivna kontrolna lista integracije (Dan 1 do Mjesec 3)
    - `PersonalizationModal.tsx` — HR alat za podešavanje novog zaposlenog u realnom vremenu
  - `data/onboardingData.ts` — Podaci o kompaniji, 47 kolega, menadžmentu, regijama, ciljevima za 2026. i kvizu
  - `utils/` — Gramatička prilagođavanja roda (vokativ, glagolski oblici) i Web Audio efekti
- `public/assets/` — Ekstraktovani i optimizovani vizuelni resursi:
  - `team/` — Fotografije menadžmenta (Radmila Bjeljac, Nenad Marjanović, Nataša Majstorović, Nevena Ilić, Mirna Đukić Švraka, Aleksandra Antešević, Sanja Knežević)
  - `branding/` — Zvanični logotipi (FlexCredit, MVF Finance, simboli)
  - `office/` — Novo sjedište i grupna fotografija 230 zaposlenih
  - `illustrations/` — Vektorske i grafičke ilustracije iz prezentacije
  - `slides/` — Skener svih 18 originalnih slajdova u punoj rezoluciji
- `Dobrodošlica Svetozar Mišić.pptx` — Originalna PowerPoint prezentacija
- `README.md` — Uputstvo za pokretanje i tehnički pregled

---

## 2. Pokretanje

```bash
# Pokretanje u razvojnom režimu
npm run dev

# Bildovanje za produkciju
npm run build
```

---

## 3. Pravila za Personalizaciju i Gramatiku

Prilikom dodavanja novog zaposlenog:
1. Uskladiti gramatički rod sa zaposlenim:
   - Muški rod: „Dobro nam došao“, „Svetozare“, „spreman“, „tvoj mentor“
   - Ženski rod: „Dobro nam došla“, „Sanja“, „spremna“, „tvoja mentorica“
2. Mentor mora biti izričito definisan (rukovodilac nije nužno mentor).
3. Sve izmjene kroz HR generator u aplikaciji automatski ažuriraju kompletnu prezentaciju i portal.
