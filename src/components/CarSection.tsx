"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Section } from "@/lib/sections";
import { revealVariants } from "@/lib/motion";

type CarSectionProps = {
  section: Section;
  /** id of the next section, used by the bouncing scroll-down chevron. */
  nextId?: string;
  /** First panel: animate on mount + eager-load the image. The rest reveal on scroll. */
  isHero?: boolean;
};

export default function CarSection({
  section,
  nextId,
  isHero = false,
}: CarSectionProps) {
  const { id, name, image, tagline, cta } = section;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;

  // Parallax: translate the (over-scaled) image against scroll for depth.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-6%", "6%"],
  );

  const { container, item } = revealVariants(reduce);

  // Hero choreographs on mount; later panels reveal as they enter the viewport.
  const revealProps = isHero
    ? ({ initial: "hidden", animate: "show" } as const)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: { amount: 0.55, once: false },
      } as const);

  return (
    <section
      ref={ref}
      id={id}
      aria-label={name}
      className="relative isolate h-[100svh] w-full snap-start overflow-hidden"
    >
      {/* Hero image — parallax wrapper is over-scaled vertically so edges stay covered while translating. */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -inset-y-[15%] z-0"
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduce ? false : { scale: 1.12 }}
          animate={reduce ? undefined : { scale: 1.04 }}
          transition={
            reduce
              ? undefined
              : { duration: 14, ease: "easeOut" }
          }
        >
          <Image
            src={image}
            alt={`Tesla ${name}`}
            fill
            priority={isHero}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Scrim: deep top gradient guarantees AA contrast for the headline over any image
          (even bright skies), a bottom gradient covers the CTAs, and the middle stays clear
          so the product photo keeps its punch. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[45%] bg-gradient-to-b from-black/85 via-black/55 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
      />

      {/* Content: headline near the top, actions near the bottom. */}
      <motion.div
        variants={container}
        {...revealProps}
        className="absolute inset-0 z-10 flex flex-col items-center justify-between px-4 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center sm:pt-28"
      >
        <div className="max-w-3xl">
          <motion.h2
            variants={item}
            className="text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-semibold tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          >
            {name}
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-2 text-[clamp(0.95rem,2.2vw,1.25rem)] font-light text-white/75"
          >
            {tagline}
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <motion.div
            variants={item}
            className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <button
              type="button"
              className="w-72 max-w-[80vw] rounded-full bg-white/90 px-8 py-3 text-sm font-medium uppercase tracking-wide text-tesla-dark transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {cta.primary}
            </button>
            <button
              type="button"
              className="w-72 max-w-[80vw] rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-medium uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {cta.secondary}
            </button>
          </motion.div>

          {nextId && (
            <motion.a
              href={`#${nextId}`}
              aria-label="Scroll to next section"
              className="text-white/80 transition-colors hover:text-white"
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <svg
                className="h-8 w-8"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="m19.5 12.5-4.5 4-4.5-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
