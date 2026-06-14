# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A cinematic, fully responsive Tesla landing-page clone. **Next.js 16** (App Router, `src/`, Turbopack), **React 19**, **Tailwind CSS v4**, **Motion** (`motion/react`) for animation, **TypeScript**, **pnpm**. Six full-viewport product panels (Model S/3/X/Y, Solar Roof, Solar Panels) plus a footer, all driven from one data file.

## Commands

```bash
pnpm dev                       # dev server on :3000 (Turbopack)
pnpm dev:e2e                   # dev server on :3001 (what Playwright drives)
pnpm build                     # production build (static export of /)
pnpm lint                      # ESLint (flat config, eslint-config-next)

pnpm test:e2e                  # full Playwright suite (boots :3001 itself)
pnpm test:e2e --grep @smoke    # run one tagged pack (@smoke|@content|@responsive|@quality)
pnpm test:e2e e2e/footer.spec.ts                 # one spec file
pnpm test:e2e -g "Solar Roof"                    # one test by title
pnpm test:e2e --project=chromium                 # one project (chromium | mobile-chrome)
pnpm test:e2e:ui               # interactive runner
```

For ad-hoc browser checks/screenshots, use the **`playwright-cli`** (global), not the Playwright MCP — it's cheaper. Drive it against **`http://localhost:3001`**.

## Architecture

- **Data-driven sections.** `src/lib/sections.ts` is the single source of truth for the panels (id, name, image, tagline, CTAs). `page.tsx` maps over it to render `CarSection`s and chains each panel's scroll-chevron to the next (last → `#site-footer`). The e2e tests import this same array, so adding a model updates the page *and* its coverage in one edit.
- **Server vs client split.** `layout.tsx`, `page.tsx`, and `Footer.tsx` are server components. `Navbar.tsx`, `CarSection.tsx`, and `CurrentYear.tsx` are client components (`"use client"`) because they use Motion / browser APIs. Keep client islands small.
- **Scrolling model.** Snapping is on the **window** (`html { scroll-snap-type: y mandatory }` in `globals.css`), not an inner container — this is deliberate so Motion's `useScroll`/`whileInView` work without custom container wiring. Each panel is `h-[100svh]` with `snap-start`.
- **Motion conventions.** Shared easing + reveal variants live in `src/lib/motion.ts`. The hero (first panel) animates on mount; later panels reveal via `whileInView`. Everything has a `prefers-reduced-motion` fallback (parallax/Ken-Burns off, reveals become opacity-only, snap disabled). When adding motion, follow this pattern and keep content visible by default.
- **Design system.** Cinematic-dark monochrome — no color accent by design. `PRODUCT.md` (strategy) and `DESIGN.md` (visual system) are the source of truth; consult them before changing palette, type, or motion. Generated via the `/impeccable` skill.

## Tailwind v4 (no config file)

There is **no `tailwind.config.js`**. Tailwind v4 is CSS-first: design tokens are declared in `src/app/globals.css` under `@theme` (e.g. `--color-ink`, `--color-tesla-dark`), which generates utilities like `bg-ink`. PostCSS uses `@tailwindcss/postcss` (`postcss.config.mjs`). Add/adjust tokens in `globals.css`, not a JS config.

## Gotchas (these will bite you)

- **One dev server per project dir.** `next dev` refuses a second instance even on a different port, so a stale `:3000` server blocks `pnpm dev:e2e` on `:3001`. Kill stragglers first: `pkill -f "next dev"`.
- **`next/image` aspect-ratio warning.** Tailwind Preflight sets `img { height: auto }` globally, which fights `h-x w-auto` and trips Next's "width or height modified" warning. Size logos by **width only** (`w-[150px]`) with `width`/`height` props at the SVG's true `viewBox` ratio (tesla.svg is `342×35`). The `@quality` e2e pack guards this.
- **Full-bleed image stacking.** A `relative` section with `z-index:auto` does not create a stacking context, so a `-z-10` background image escapes behind the opaque body and disappears. `CarSection` uses `isolate` on the section + non-negative z (image `z-0` → scrim `z-0` → content `z-10`).
- **Client-only values on static pages.** The page is statically prerendered, so `new Date()` etc. freeze at build time. Resolve such values on the client with `useSyncExternalStore` (see `CurrentYear.tsx`) — not `setState` in `useEffect`, which the `react-hooks/set-state-in-effect` lint rule rejects.

## Conventions

- Tests are organized into tagged **packs** (`@smoke`, `@content`, `@responsive`, `@quality`) across small spec files in `e2e/`. Document tests, config, and shared modules with **TSDoc**.
- Car images and the logo live at `public/` root (`/ModelS.jpg`, `/tesla.svg`), referenced with root-absolute paths. JPGs were renamed from the originals' `.jfif`.
