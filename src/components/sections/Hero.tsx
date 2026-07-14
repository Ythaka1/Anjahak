"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";
import LineReveal from "@/components/motion/LineReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden grain-overlay"
      style={{ height: "100svh", backgroundColor: "var(--forest-deep)" }}
      aria-label="Hero — Africa's Finest, Delivered to the World"
    >
      {/* Background image — Ken Burns settle + scroll drift */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? undefined : { y: imageY }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={prefersReduced ? false : { scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 7, ease: EASE }}
        >
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=85"
            alt="Lush African farmland at golden hour"
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* Legibility gradients — top and bottom */}
      <div
        className="absolute inset-x-0 top-0 z-[2] h-48"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,31,22,0.6), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-[55%]"
        style={{
          background:
            "linear-gradient(to top, rgba(14,31,22,0.85) 0%, rgba(14,31,22,0.35) 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Composition */}
      <div
        className="relative z-10 flex h-full flex-col justify-end"
        style={{ padding: "0 clamp(1.25rem, 4vw, 4rem) clamp(1.5rem, 4vh, 3rem)" }}
      >
        {/* Eyebrow — slides up from a mask */}
        <span className="block overflow-hidden">
          <motion.span
            className="font-label block text-[0.62rem] uppercase tracking-[0.3em] sm:text-[0.7rem]"
            style={{ color: "var(--gold-soft)" }}
            initial={prefersReduced ? false : { y: "120%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            Natural Organic Produce · Quality Exports · Nairobi, Kenya
          </motion.span>
        </span>

        {/* Oversized headline */}
        <LineReveal
          as="h1"
          immediate
          delay={0.35}
          stagger={0.14}
          lines={[
            { text: "Africa's Finest," },
            { text: "Delivered", accent: true },
            { text: "to the World" },
          ]}
          className="font-display mt-4"
          style={{
            fontSize: "clamp(3.4rem, 13vw, 11rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.015em",
            color: "var(--parchment)",
            fontWeight: 400,
          }}
        />

        {/* Foot row — intro + links + scroll cue */}
        <motion.div
          className="mt-10 flex flex-col gap-6 border-t pt-6 sm:flex-row sm:items-end sm:justify-between"
          style={{ borderColor: "rgba(243,237,224,0.2)" }}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
        >
          <p
            className="max-w-sm font-sans text-sm font-light leading-relaxed sm:text-base"
            style={{ color: "rgba(243,237,224,0.78)" }}
          >
            Premium agricultural exports from Kenya to global markets.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 font-sans text-sm font-medium"
              style={{ color: "var(--gold)" }}
              aria-label="Explore our products"
            >
              Explore Products
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span className="sr-only">— six premium commodities</span>
            </Link>
            <Link
              href="/about"
              className="border-b border-transparent font-sans text-sm font-medium transition-colors duration-300 hover:border-current"
              style={{ color: "rgba(243,237,224,0.85)" }}
              aria-label="Learn our story"
            >
              Learn Our Story
            </Link>
          </div>

          <div
            className="hidden items-center gap-3 md:flex"
            aria-hidden="true"
          >
            <span
              className="font-label text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: "rgba(243,237,224,0.5)" }}
            >
              Scroll
            </span>
            <span className="bounce-slow block h-8 w-px" style={{ backgroundColor: "var(--gold)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
