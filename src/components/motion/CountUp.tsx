"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

/** Animates 0 → `to` once the element scrolls into view. */
export default function CountUp({
  to,
  suffix = "",
  duration = 1.6,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (prefersReduced) {
      node.textContent = String(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, prefersReduced]);

  return (
    <span className={className} style={style}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
