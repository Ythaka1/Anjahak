"use client";

import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useTransform, animate, motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, end, { duration, ease: "easeOut" });
    }
  }, [isInView, count, end, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${end}${suffix}`}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
