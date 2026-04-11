"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { heroWord, staggerContainer, slideUp, slideUpFast } from "@/lib/animations";

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";

const TICKER_TEXT =
  "Chick Peas · Premium Roselle · Soy Beans · Cashew Nuts · Halal Lamb · Sunflower Seeds · Natural Organic Produce · Quality Exports · ";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const headline = "Africa's Finest, Delivered to the World";
  const words = headline.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden grain-overlay"
      style={{ height: "100svh" }}
      aria-label="Hero — Africa's Finest, Delivered to the World"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=85"
          alt="Lush African farmland at golden hour"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA}
          className="object-cover ken-burns"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,18,8,0.45) 0%, rgba(26,18,8,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade to parchment */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[3]"
        style={{
          background:
            "linear-gradient(to top, var(--parchment) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">

          {/* Label */}
          <motion.p
            className="section-label section-label--light mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            NATURAL ORGANIC PRODUCE · QUALITY EXPORTS
          </motion.p>

          {/* Headline — word by word */}
          <motion.h1
            className="font-display italic leading-[1.08] mb-6"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              color: "var(--parchment)",
            }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            aria-label={headline}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={heroWord}
                className="inline-block"
                style={{ marginRight: "0.28em" }}
                aria-hidden="true"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            className="font-sans font-light text-lg md:text-xl mb-10 max-w-xl"
            style={{ color: "rgba(250,246,238,0.8)" }}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            Premium agricultural exports from Kenya to global markets.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            variants={slideUpFast}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.85 }}
          >
            <Link
              href="/products"
              className="btn-primary flex items-center gap-2"
              aria-label="Explore our products"
            >
              Explore Products
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="btn-outline btn-outline--light"
              aria-label="Learn our story"
            >
              Learn Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Ticker strip */}
      <div
        className="absolute z-20 left-0 right-0 overflow-hidden glass-dark"
        style={{ bottom: "3.5rem" }}
        aria-hidden="true"
      >
        <div className="py-3 flex overflow-hidden">
          <div className="ticker-track">
            <span
              className="font-label text-xs tracking-widest px-8 whitespace-nowrap"
              style={{ color: "rgba(250,246,238,0.8)" }}
            >
              {TICKER_TEXT}
              {TICKER_TEXT}
            </span>
            <span
              className="font-label text-xs tracking-widest px-8 whitespace-nowrap"
              style={{ color: "rgba(250,246,238,0.8)" }}
            >
              {TICKER_TEXT}
              {TICKER_TEXT}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ bottom: "1rem" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span
          className="font-label text-[0.6rem] tracking-[0.25em] uppercase"
          style={{ color: "rgba(250,246,238,0.5)" }}
        >
          Scroll
        </span>
        <div className="bounce-slow">
          <ChevronDown
            size={16}
            style={{ color: "rgba(250,246,238,0.5)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
