"use client";

import { useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read once on the client; Lenis smoothing is skipped entirely for
  // reduced-motion users so native scroll behaviour is preserved.
  const [prefersReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  if (prefersReduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.9 }}>
      {children}
    </ReactLenis>
  );
}
