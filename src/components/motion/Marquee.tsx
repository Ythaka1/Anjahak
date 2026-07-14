"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
}

type MarqueeProps = {
  children: React.ReactNode;
  /** Percent of one group per second. Negative reverses direction. */
  baseVelocity?: number;
  className?: string;
};

/**
 * Infinite horizontal track: two duplicated groups translating 0 → -50%.
 * Speed and direction react to scroll velocity.
 */
export default function Marquee({
  children,
  baseVelocity = 2.5,
  className,
}: MarqueeProps) {
  const prefersReduced = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const directionRef = useRef(baseVelocity >= 0 ? 1 : -1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return;

    let moveBy =
      directionRef.current * Math.abs(baseVelocity) * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) {
      directionRef.current = -Math.sign(baseVelocity) || -1;
    } else if (factor > 0) {
      directionRef.current = Math.sign(baseVelocity) || 1;
    }

    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  if (prefersReduced) {
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <div className="flex w-max items-center whitespace-nowrap">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max items-center whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        <div className="flex items-center whitespace-nowrap">{children}</div>
        <div className="flex items-center whitespace-nowrap" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
