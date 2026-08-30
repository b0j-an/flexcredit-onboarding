# Flex Credit Onboarding Web Platform & Workflow

Ovaj repozitorijum sadrži digitalizovanu, modernizovanu interaktivnu platformu za onboarding novih zaposlenih u **Flex Credit** (dio **MVF Finance** grupacije), kao i originalne radne materijale (PPTX, Canva instrukcije).

---

## 1. Struktura Projekta

- `src/` — React 18 + TypeScript + Tailwind CSS izvorni kod
  - `components/` — Modularne komponente:
    - `SlideDeck.tsx` — Digitalna 16:9 prezentacija od 18 slajdova sa tastaturnom navigacijom, plutajućim strelicama i integrisanim PDF downloadom
    - `BihSalesMap.tsx` — Vektorska interaktivna prodajna mapa BiH sa 7 regija i proporcionalnim krugovima filijala
  - `data/onboardingData.ts` — Podaci o kompaniji, sektorima, menadžmentu, 7 regija i strateškim ciljevima za 2026.
  - `utils/` — Web Audio zvučni efekti i pomoćne funkcije
- `public/` — Statički resursi i `FlexCredit-Dobrodoslica.pdf` (visoka rezolucija)
  - `assets/` — Ekstraktovani i optimizovani vizuelni resursi (branding, team, illustrations)
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
