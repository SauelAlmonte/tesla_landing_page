"use client";

import { useSyncExternalStore } from "react";

/** No-op store: the year doesn't change during a session, so we never notify. */
const subscribe = () => () => {};

/**
 * Renders the current calendar year, resolved on the client.
 *
 * @remarks
 * The home page is statically prerendered, so a server-side
 * `new Date().getFullYear()` would freeze the year at build time and go stale
 * after New Year's. `useSyncExternalStore` returns the server snapshot
 * (`fallback`) during SSR/hydration and the live client snapshot afterwards,
 * so the year is always current with no hydration mismatch and no
 * `setState`-in-effect.
 */
export default function CurrentYear({ fallback = 2026 }: { fallback?: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );

  return <>{year}</>;
}
