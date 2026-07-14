"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Hydration-safe prefers-reduced-motion. Unlike motion's useReducedMotion,
 * the server snapshot is always `false`, so SSR markup and the first client
 * render agree; useSyncExternalStore then swaps to the real value without
 * a hydration mismatch.
 */
export default function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
