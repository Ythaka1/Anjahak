"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
  staggerDelay?: number;
  id?: string;
}

export default function SplitText({
  text,
  className,
  style,
  as = "h2",
  once = true,
  staggerDelay = 0.022,
  id,
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const chars = text.split("");

  if (as === "h1") {
    return (
      <h1
        ref={ref}
        id={id}
        className={className}
        style={{ ...style, overflow: "hidden" }}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            initial={{ opacity: 0, y: 20, rotateX: 90 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: 90 }}
            transition={{ duration: 0.4, delay: i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>
    );
  }

  if (as === "h3") {
    return (
      <h3
        ref={ref}
        id={id}
        className={className}
        style={{ ...style, overflow: "hidden" }}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            initial={{ opacity: 0, y: 20, rotateX: 90 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: 90 }}
            transition={{ duration: 0.4, delay: i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h3>
    );
  }

  if (as === "p") {
    return (
      <p
        ref={ref}
        id={id}
        className={className}
        style={{ ...style, overflow: "hidden" }}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            initial={{ opacity: 0, y: 20, rotateX: 90 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: 90 }}
            transition={{ duration: 0.4, delay: i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </p>
    );
  }

  // Default: h2
  return (
    <h2
      ref={ref}
      id={id}
      className={className}
      style={{ ...style, overflow: "hidden" }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: 90 }}
          transition={{ duration: 0.4, delay: i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}
