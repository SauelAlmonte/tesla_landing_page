# Tesla Landing Page

A fully responsive, cinematic Tesla landing page built with **Next.js 16** (App Router), **Tailwind CSS v4**, and **Motion** for orchestrated animation.

## Tech Stack

- [Next.js 16.2.9](https://nextjs.org/) — App Router, `src/` directory, Turbopack
- [React 19](https://react.dev/)
- [Tailwind CSS v4.3](https://tailwindcss.com/) — via `@tailwindcss/postcss`
- [Motion 12](https://motion.dev/) (`motion/react`) — parallax, scroll reveals, Ken Burns
- [TypeScript 5](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/) — end-to-end tests
- [pnpm](https://pnpm.io/) — package manager

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind v4 import + theme tokens (cinematic dark)
│   ├── layout.tsx       # Root layout, Montserrat font, metadata
│   └── page.tsx         # Home page — composes the sections + footer
├── components/
│   ├── Navbar.tsx       # Fixed, scroll-aware responsive navigation
│   ├── CarSection.tsx   # Reusable full-screen hero panel (Motion)
│   └── Footer.tsx       # Closing footer with link columns
└── lib/
    ├── sections.ts      # Single source of truth for section content
    └── motion.ts        # Shared easing + reveal variants

e2e/                     # Playwright test packs (see Testing)
public/                  # Hero images (Model S/3/X/Y, Solar Roof/Panels) + tesla.svg

PRODUCT.md               # Strategic design context (register, principles)
DESIGN.md                # Visual system (color, type, motion)
playwright.config.ts     # Test config (port 3001, chromium + mobile)
```

## Responsive Design

The layout adapts across all Tailwind breakpoints (`sm` 640px → `2xl` 1536px):

- Each panel fills the viewport using `h-[100svh]` (handles mobile browser chrome).
- Content uses a flex column with `justify-between`, so headings and CTAs reflow instead of being pixel-pinned.
- CTA buttons stack vertically on mobile and sit side-by-side from `sm` up.
- The full model nav collapses to a `Menu` button below `lg`.
- Scroll-snapping gives a clean one-panel-per-screen experience.

## Motion

Animation is built in with `motion/react`, all behind a `prefers-reduced-motion` fallback:

- Hero load choreography (staggered headline → specs → CTAs)
- Scroll-triggered reveals per panel (`whileInView`)
- Image parallax (`useScroll` + `useTransform`) and a slow Ken Burns settle
- Scroll-aware nav that gains a blurred scrim after the first fold

## Testing

End-to-end tests live in `e2e/` and run against a dedicated server on **port 3001**
(Playwright starts and stops it automatically). Tests run on two projects:
desktop **chromium** and **mobile-chrome** (Pixel 5).

Specs are organized into tagged **packs** so you can run a slice:

| Pack          | Tag           | Covers                                          |
| ------------- | ------------- | ----------------------------------------------- |
| `smoke`       | `@smoke`      | Page loads, nav + Menu present                  |
| `sections`    | `@content`    | Every product panel: heading + two CTAs         |
| `footer`      | `@content`    | Footer columns + demo disclaimer                |
| `navigation`  | `@responsive` | Nav collapses correctly across breakpoints      |
| `quality`     | `@quality`    | No console errors or `next/image` ratio warning |

> Note: this is a demo project and is not affiliated with Tesla, Inc.