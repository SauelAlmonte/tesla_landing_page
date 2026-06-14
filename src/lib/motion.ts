import type { Variants } from "motion/react";

/** Exponential ease-out. No bounce, no elastic — premium and quiet. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Staggered reveal variants for a panel's text + CTA group.
 * `reduce` collapses the motion to an opacity-only fade for
 * prefers-reduced-motion users (content is never hidden by default).
 */
export function revealVariants(reduce: boolean): {
  container: Variants;
  item: Variants;
} {
  return {
    container: {
      hidden: {},
      show: {
        transition: { staggerChildren: reduce ? 0 : 0.09 },
      },
    },
    item: reduce
      ? {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.2 } },
        }
      : {
          hidden: { opacity: 0, y: 28 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE_OUT },
          },
        },
  };
}
