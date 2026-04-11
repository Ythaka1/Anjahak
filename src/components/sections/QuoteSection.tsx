"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { staggerContainer, cardItem } from "@/lib/animations";

const QUOTE =
  "The earth does not belong to us — we belong to the earth. We simply share its harvest.";

const words = QUOTE.split(" ");

export default function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden grain-overlay"
      style={{ backgroundColor: "var(--forest)" }}
      aria-label="Inspirational quote"
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        aria-hidden="true"
      />

      {/* Oversized decorative quotation marks */}
      <span
        className="absolute top-0 left-4 lg:left-10 font-display italic select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 18vw, 13rem)",
          color: "var(--gold)",
          opacity: 0.12,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <span
        className="absolute bottom-0 right-4 lg:right-10 font-display italic select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 18vw, 13rem)",
          color: "var(--gold)",
          opacity: 0.12,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        &rdquo;
      </span>

      {/* Quote content with parallax */}
      <motion.div
        style={{ y }}
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
      >
        <motion.blockquote
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          cite="AnjaHak Enterprises"
          className="font-display italic leading-relaxed"
          style={{
            fontSize: "clamp(1.45rem, 3.2vw, 2.4rem)",
            color: "var(--parchment)",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={cardItem}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.blockquote>

        <motion.p
          variants={cardItem}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-label text-xs tracking-widest mt-8 uppercase"
          style={{ color: "var(--gold)", opacity: 0.7 }}
        >
          — AnjaHak Enterprises
        </motion.p>
      </motion.div>

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
