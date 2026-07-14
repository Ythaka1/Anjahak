"use client";

import { useRef } from "react";
import {
  motion,
  
  useScroll,
  useTransform,
} from "motion/react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";

type ParallaxProps = {
  children: React.ReactNode;
  /** Total drift as a fraction of the child's height (0.12 = ±12%). */
  amount?: number;
  className?: string;
  innerClassName?: string;
};

/** Translates its child on Y while the wrapper crosses the viewport. */
export default function Parallax({
  children,
  amount = 0.12,
  className,
  innerClassName,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-amount * 100}%`, `${amount * 100}%`]
  );

  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div className={innerClassName} style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
