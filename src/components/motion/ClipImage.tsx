"use client";

import Image from "next/image";
import { motion } from "motion/react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type ClipImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  /** CSS aspect-ratio value, e.g. "4 / 5". Reserved so there is no layout shift. */
  aspectRatio?: string;
  /** Colour of the cover that wipes away. */
  cover?: string;
  priority?: boolean;
  delay?: number;
};

/**
 * next/image behind a solid cover that wipes away (scaleY 1 → 0, origin
 * bottom) while the image settles from scale 1.2 → 1.
 */
export default function ClipImage({
  src,
  alt,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
  aspectRatio = "4 / 5",
  cover = "var(--forest-deep)",
  priority = false,
  delay = 0,
}: ClipImageProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} style={{ position: "relative", aspectRatio, overflow: "hidden" }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={className} style={{ position: "relative", aspectRatio, overflow: "hidden" }}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.4, ease: EASE, delay }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-10 will-change-transform"
        style={{ backgroundColor: cover, transformOrigin: "bottom" }}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        aria-hidden="true"
      />
    </div>
  );
}
