# VÉRTICE — Design System

> **Connecting the Extraordinary**
> Executive corporate event production · Bogotá D.C., Colombia · founded 2021

This is the single source of truth for designing and building with the **VÉRTICE**
brand. It bundles the brand's typography, color, spacing and effect tokens, the
real webfonts, the vertex logo, reusable React UI primitives, a marketing-site UI
kit, and a set of branded slide specimens.

The compiler links `styles.css` (the only fixed entry point) and exposes every
component on `window.VRTICEDesignSystem_7ea98b`.

---

## 1. Company context

**Vértice Collective S.A.S.** is a Colombian executive event-production studio — galas,
conferences and brand experiences for board-level audiences. Born in 2021 during
the pandemic, it now operates across **four continents and eleven countries**
(Colombia, USA, Germany, Spain, Turkey, Peru, Chile, Panama, Barbados, Trinidad &
Tobago). Its positioning is **proven execution, not projection**: every event is
managed directly by its own team, never subcontracted.

**Founder & Executive Producer:** Sebastián Bruno Saavedra *(never "CEO" / "Director")*.

> **Naming:** the legal entity is **Vértice Collective S.A.S.** Use the short form
> **Vértice** (or the wordmark **VÉRTICE**) in all customer-facing copy; reserve the
> full legal name for footers, contracts and fine print.

### Sources provided
- `uploads/vertice_brand_guidelines.md` — the written brand guidelines (primary source).
- `uploads/Brand_Identity_Vertice.pdf` — brand identity deck (binary; not machine-read here).
- Webfonts: Neue Haas Grotesk Text Pro (55/65/75) + the full Inter family.

No production codebase, Figma file, or photography was provided. The logo and
network pattern are reconstructed from the guidelines' precise geometric
description; the UI kit and slides are faithful **recreations built from the
brand rules**, not copies of an existing product.

> ⚠️ **Pending confirmation:** corporate email domain and website
> (`vertice.events` is a placeholder), and legal NIT. Treat as TBD in any output.

---

## 2. Content fundamentals (voice & copy)

**Personality:** sophisticated, trustworthy, international, executive, elegant.
**Tone:** professional, confident, precise, warm — *never casual, never aggressive,
never salesy.*

- **Voice:** institutional first person plural ("our team", "we produce"), speaking
  to a corporate "you". Restrained and declarative — short, certain sentences.
- **Casing:** Brand name **VÉRTICE** is always uppercase with the accented É.
  Headlines are sentence-or-title case in display type; eyebrows, labels and the
  tagline are **UPPERCASE**. The tagline is always *Connecting the Extraordinary*.
- **No emoji. No exclamation marks. No hype words** ("amazing", "world-class").
  Precision over enthusiasm.
- **Numbers carry weight** — "four continents", "eleven countries", "100% direct",
  "2021". Use them sparingly and factually, never as decorative stats.

**Always say:** "executive event production", "international presence", "proven
execution", "Founder & Executive Producer", "connecting the extraordinary".
**Never say:** "event planner / organizer", "Founder & CEO", "local company",
"international projection".

*Example copy (from the UI kit):*
> "Executive corporate event production across four continents — conceived,
> managed and executed directly by our team."
> "Proven execution, not projection."

---

## 3. Visual foundations

**Overall vibe:** dark-first, architectural, quietly luxurious. Deep emerald
fields, ivory type, and gold used like jewelry — a thin line, a single circle, a
3px bar — never as a flood.

### Color
- Base everything on **Selva Profunda `#0D2E1F`**; primary brand fills use
  **Esmeralda `#1B6B45`**. **Dorado `#C9A84C`** is an accent only (labels, rules,
  the apex circle, one hero CTA). **Marfil `#F5F2EB`** is the ivory for type and
  light surfaces. **Never pure `#fff` or `#000`.**
- Surfaces layer in greens: `#0F3D23` (cards), `#122A1C` (alt rows), `#0A2417`
  (footer/deep). Hairlines are `#1B3D2A`. Secondary text is the cool grises
  (`#CCDED7` → `#8AABA0` → `#5E7A70`).
- Hierarchy of attention: **gold (labels/accents) → ivory (primary) → gris (secondary).**

### Type
- **Neue Haas Grotesk Text Pro** for the brand name and all display/headings —
  Medium (500-ish), **tracking `0.05em`**, often uppercase for the wordmark.
- **Inter** for everything else: tagline (Light 300, tracking `0.025em`, gold,
  uppercase), body (Regular 400), labels (Medium, uppercase, tracking `0.14em`).
- Never more than these two families in one layout. Body is never bold except for
  inline emphasis on key terms. Display sizes 36–72px; body 14–18px.

### Space, shape, elevation
- 4px spacing base; **16px minimum padding, 24px preferred**; generous negative
  space. 12-column / 24px-gutter web grid, max width ~1200px.
- **Corner radii are small: 2–8px** (cards 4–8). Nothing is very round except
  pill badges/tags. The aesthetic is rectilinear and precise.
- **Borders are hairlines** — 0.5–1px in emerald `#1B3D2A`, or a 1px gold outline
  for secondary actions and the **3px gold accent bar** on featured cards/quotes.
- **Shadows are subtle and dark** (cool near-black `rgba(7,22,15,…)`), used only
  for raised surfaces; a soft gold glow is reserved for genuinely featured items.
- **Cards:** Verde-card fill, 1px emerald hairline, 8px radius, optional left gold
  bar + uppercase gold eyebrow. They lift 2px and gain a gold border on hover.

### Backgrounds & texture
- Default is a flat or gently radial dark-emerald field. The only decorative motif
  is the **network pattern** (`assets/pattern-network.svg`) — thin gold/emerald
  lines joining small gold square nodes — used at low opacity and *masked/faded*
  behind hero and closing moments, never under reading content.
- Subtle vertical gradients (emerald → selva → deep) add depth on heroes. No
  bluish-purple gradients, no glassmorphism beyond a light header blur on scroll.

### Motion & states
- Restrained, executive motion: 140–420ms, standard/`ease-out` curves. Fades and
  short translateY lifts only — no bounces, no infinite loops.
- **Hover:** lighten emerald / brighten gold, or a 2px lift + gold hairline on cards.
- **Press:** darken the fill + a 1px downward nudge.
- **Focus:** 1px gold border + a soft `rgba(201,168,76,0.16)` ring.
- Transparency/blur is used sparingly — a translucent deep-green header bar
  (`backdrop-filter: blur`) once scrolled; otherwise surfaces are solid.

### Imagery direction (when photography is added)
Warm, low-key, executive: candlelit galas, stage lighting, architectural venues,
people in formalwear. Rich shadows, gold highlights, never bright or casual.
Photography slots are placeholders in the UI kit — replace with real assets.

---

## 4. Iconography

- **Style:** thin line icons, ~1.5px stroke, no fill — matching the brand's
  geometric, hairline aesthetic. Featured icons are **Dorado `#C9A84C`**;
  secondary icons use Gris `#8AABA0`.
- **Source:** no icon set was provided with the brand. The UI kit uses
  **[Lucide](https://lucide.dev)** (pinned `0.460.0`, via CDN) as the closest
  match for the line-weight/feel. **⚠️ This is a substitution** — if VÉRTICE adopts
  an official icon set, swap it in and update this section.
- Icons are colored by setting `color` on a wrapper and letting Lucide's
  `currentColor` stroke inherit (see `Icon` in `ui_kits/website/sections.jsx`).
- **No emoji**, ever. No unicode-glyph icons. The only brand mark is the
  **vertex logo** — a gold apex circle above three tapered emerald blades. The
  official artwork lives in `assets/` (`logo-vertice-full.png`, the ivory reverse,
  and the cropped `logo-mark.png`) and is also exposed through the `<Logo>` component.

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry point (imports only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.
- `assets/` — `fonts/`, `logo-vertice-full.png`, `logo-vertice-full-ivory.png`, `logo-mark.png`, `logo-mark-ivory.png`, `pattern-network.svg`.
- `readme.md` (this file) · `SKILL.md` (Agent-Skill wrapper).

**Components** (`window.VRTICEDesignSystem_7ea98b`)
| Component | Dir | Purpose |
|---|---|---|
| `Button` | `components/buttons/` | Primary / accent / secondary / ghost actions |
| `Input` | `components/forms/` | Labelled text field with hint & error |
| `Badge` | `components/feedback/` | Status pill (tone + dot) |
| `Tag` | `components/feedback/` | Gold-hairline chip; `active` / `onRemove` |
| `Card` | `components/surfaces/` | Content surface, eyebrow / accent bar / lift |
| `Logo` | `components/brand/` | Vertex lockup — primary / reversed / monogram |
| `SectionLabel` | `components/brand/` | Gold uppercase eyebrow with rule |

Each component dir has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and a
`@dsCard` HTML specimen.

**UI kit** — `ui_kits/website/` — full executive marketing site (`index.html`
mounts header, hero, stats, services, presence, portfolio, contact form, footer).
See its `README.md`.

**Slides** — `slides/` — `TitleSlide`, `SectionSlide`, `QuoteSlide`,
`ContentSlide`, `ClosingSlide` (1280×720 specimens following the brand's
gold-rule page rules).

**Foundation cards** — `guidelines/*.card.html` — color, type, spacing and brand
specimens that populate the Design System tab.

---

## 6. Quick start for consumers

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Card, Logo } = window.VRTICEDesignSystem_7ea98b;
</script>
```

Design dark-first on `var(--bg-base)`, type in `var(--text-primary)`, accent with
`var(--text-accent)`, and reach for the semantic aliases in `tokens/colors.css`
(`--surface-card`, `--action-primary`, `--border-hairline`, …) before raw values.
