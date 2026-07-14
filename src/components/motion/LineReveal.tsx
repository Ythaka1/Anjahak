"use client";

import { createElement } from "react";
import { motion } from "motion/react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type RevealLine = {
  text: string;
  /** Rendered italic in gold — the editorial accent line. */
  accent?: boolean;
};

type LineRevealProps = {
  lines: RevealLine[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  /** Split lines into individually-masked words instead of whole lines. */
  by?: "line" | "word";
  /** Animate on mount instead of on scroll into view (hero). */
  immediate?: boolean;
  id?: string;
};

/**
 * SSR-safe masked text reveal: lines (or words) are wrapped in
 * overflow-hidden spans and slide up from y 110%. No runtime splitter —
 * the line breaks are authored in `lines`.
 */
export default function LineReveal({
  lines,
  as = "h2",
  className,
  style,
  delay = 0,
  stagger = 0.12,
  by = "line",
  immediate = false,
  id,
}: LineRevealProps) {
  const prefersReduced = usePrefersReducedMotion();
  const label = lines.map((l) => l.text).join(" ");

  const accentStyle: React.CSSProperties = {
    fontStyle: "italic",
    color: "var(--gold)",
  };

  if (prefersReduced) {
    return createElement(
      as,
      { className, style, id },
      lines.map((line, i) => (
        <span key={i} className="block" style={line.accent ? accentStyle : undefined}>
          {line.text}
        </span>
      ))
    );
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
  };

  const MotionTag =
    as === "h1"
      ? motion.h1
      : as === "h3"
      ? motion.h3
      : as === "p"
      ? motion.p
      : motion.h2;

  return (
    <MotionTag
      className={className}
      style={style}
      id={id}
      aria-label={label}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : {
            whileInView: "visible",
            viewport: { once: true, margin: "0px 0px -15% 0px" },
          })}
    >
      {lines.map((line, lineIndex) => {
        const lineStyle = line.accent ? accentStyle : undefined;

        if (by === "word") {
          return (
            <span key={lineIndex} className="block" aria-hidden="true">
              {line.text.split(" ").map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="inline-block overflow-hidden align-bottom"
                  style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    style={lineStyle}
                    variants={item}
                  >
                    {word}
                    {" "}
                  </motion.span>
                </span>
              ))}
            </span>
          );
        }

        return (
          <span
            key={lineIndex}
            className="block overflow-hidden"
            style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
            aria-hidden="true"
          >
            <motion.span
              className="block will-change-transform"
              style={lineStyle}
              variants={item}
            >
              {line.text}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
