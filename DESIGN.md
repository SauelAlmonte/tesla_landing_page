# Design

## Theme

Cinematic dark. Full-bleed product photography sits on a near-black canvas, darkened by top-and-bottom gradient scrims so white typography stays legible over any image. The mood is premium and quiet: a showroom at night, lit by the product. Monochrome only; contrast and light do the work that color would in another brand.

## Color

OKLCH, monochrome ramp. No chromatic accent by design.

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#0a0a0c` | Body canvas behind/between sections |
| `--color-tesla-dark` | `#171a20` | Tesla charcoal (CTA glass, logo contexts) |
| `--color-white` | `#ffffff` | Headlines, primary CTA fill |
| `--text-muted` | `rgba(255,255,255,0.72)` | Subheads/specs (meets 4.5:1 over scrim) |
| scrim | `rgba(0,0,0,0.0 → 0.6)` | Top + bottom gradients for legibility |

- **Primary CTA:** `bg-white/92` + `text-tesla-dark`, hover `bg-white`. Maximum contrast, premium.
- **Secondary CTA:** `bg-white/10` + `border-white/25` + `text-white` + `backdrop-blur`. Glass, recedes.

## Typography

- **Family:** Montserrat (geometric sans, Gotham analog — Tesla's identity font is Gotham). One family, weight contrast carries hierarchy. Loaded via `next/font`.
- **Headline (model name):** weight 600, `clamp(2.25rem, 6vw, 4.5rem)`, `text-wrap: balance`, slight negative tracking, soft text-shadow for legibility.
- **Subhead/specs:** weight 400, `clamp(0.95rem, 2.2vw, 1.25rem)`, muted white.
- No all-caps headlines (title case, Tesla-style). Uppercase reserved for CTA labels and nav, tracked.

## Layout

- Stacked full-viewport panels: each `min-h-[100svh]`, `scroll-snap-align: start`. Window-level scroll with `scroll-snap-type: y mandatory` on `html`.
- Per panel: flex column, `justify-between`. Headline + subhead anchor near the top (~18% down), CTA pair + chevron anchor near the bottom. Reflows at every breakpoint; nothing pixel-pinned.
- CTAs: stacked full-width pills on mobile, side-by-side from `sm`.
- Nav: fixed, transparent at top; gains a blurred scrim after scrolling past the first fold.
- Breakpoints: Tailwind defaults (`sm` 640 → `2xl` 1536). Mobile-first.

## Motion (motion/react)

Orchestrated, with a full `useReducedMotion()` fallback (no transforms; opacity-only or instant).

- **Hero (first panel) load choreography:** on mount, scrim → headline → subhead → CTAs rise + fade in sequence (stagger ~80ms). Nav slides down + fades.
- **Per-panel scroll reveal:** `whileInView` (amount 0.55, once: false) — headline/subhead/CTAs stagger up + fade as each panel centers.
- **Ken Burns:** each hero image slow-scales (1.12 → 1.0) over ~12s, looping subtly.
- **Parallax:** `useScroll` + `useTransform` translate the image ±6% against scroll for depth (image over-scaled to keep edges covered).
- **Chevron:** continuous gentle bounce; links to next panel; hidden on the last.
- **Easing:** ease-out (`[0.22, 1, 0.36, 1]`). No bounce, no elastic.
- **Reduced motion:** parallax + Ken Burns disabled; reveals become a 200ms opacity fade; content always visible by default (no visibility gated on JS).

## Components

- `Navbar` (client) — fixed nav, load + scroll-aware motion.
- `CarSection` (client) — reusable full-viewport panel: image (parallax + Ken Burns), scrim, headline/subhead, CTA pair, chevron.
- `lib/sections.ts` — single source of truth (id, name, image, spec subhead, CTA labels).
