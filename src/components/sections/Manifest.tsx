"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import { products } from "@/lib/products";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Per-commodity colour wash for the sticky panel (multiply blend). */
const washes: Record<string, string> = {
  "chick-peas": "var(--forest)",
  "premium-roselle-hibiscus": "var(--hibiscus)",
  "soy-beans": "var(--soy)",
  "cashew-nuts": "var(--roast)",
  "premium-halal-lamb-goat": "var(--pasture)",
  "sunflower-seeds": "var(--gold)",
};

/** Space Mono spec column, distilled from each product's export specs. */
const specLines: Record<string, string> = {
  "chick-peas": "Grade AA · ≤14% moist",
  "premium-roselle-hibiscus": "Sun-dried · ≤12% moist",
  "soy-beans": "≥36% protein · ≥18% oil",
  "cashew-nuts": "W180–W320 · vacuum",
  "premium-halal-lamb-goat": "Halal · free-range",
  "sunflower-seeds": "42–45% oil · ≤9% moist",
};

export default function Manifest() {
  const [active, setActive] = useState(0);
  const prefersReduced = usePrefersReducedMotion();
  const fade = { duration: prefersReduced ? 0 : 0.7, ease: EASE };

  return (
    <section
      className="relative grain-overlay"
      style={{ backgroundColor: "var(--forest-deep)" }}
      aria-labelledby="manifest-heading"
    >
      {/* Header */}
      <div
        className="mx-auto max-w-[92rem] pt-24 lg:pt-32"
        style={{ padding: "clamp(5rem, 10vh, 8rem) clamp(1.25rem, 4vw, 4rem) clamp(2rem, 5vh, 4rem)" }}
      >
        <Reveal>
          <span className="section-label section-label--light">
            The Manifest — Our Premium Exports
          </span>
        </Reveal>
        <LineReveal
          as="h2"
          id="manifest-heading"
          lines={[
            { text: "Six commodities," },
            { text: "one standard.", accent: true },
          ]}
          className="font-display"
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
            lineHeight: 1,
            color: "var(--parchment)",
            fontWeight: 400,
          }}
        />
      </div>

      {/* Desktop: list + sticky image panel */}
      <div className="hidden min-[900px]:grid min-[900px]:grid-cols-2">
        {/* Left — the manifest list */}
        <div
          className="flex flex-col justify-center"
          style={{ padding: "clamp(2rem, 5vh, 4rem) clamp(1.25rem, 4vw, 4rem) clamp(5rem, 10vh, 8rem)" }}
        >
          <ul role="list" className="border-t" style={{ borderColor: "rgba(243,237,224,0.12)" }}>
            {products.map((product, i) => {
              const isActive = i === active;
              return (
                <li key={product.slug}>
                  <Reveal delay={i * 0.05} y={20}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group relative block border-b py-7 outline-offset-[-2px] xl:py-9"
                      style={{ borderColor: "rgba(243,237,224,0.12)" }}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-label={`${product.name} — ${product.category}, ${specLines[product.slug]}. View product.`}
                    >
                      {/* Fill sweep */}
                      <span
                        className="absolute inset-0 origin-left transition-transform duration-700 ease-luxury"
                        style={{
                          backgroundColor: "rgba(198,162,76,0.06)",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        }}
                        aria-hidden="true"
                      />

                      <span
                        className="relative grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 transition-transform duration-500 ease-luxury"
                        style={{
                          transform: isActive ? "translateX(0.75rem)" : "translateX(0)",
                        }}
                      >
                        <span
                          className="font-label text-[0.7rem]"
                          style={{ color: "var(--gold)" }}
                        >
                          0{i + 1}
                        </span>
                        <span>
                          <span
                            className="font-display block transition-colors duration-500"
                            style={{
                              fontSize: "clamp(1.7rem, 2.6vw, 2.6rem)",
                              lineHeight: 1.05,
                              color: isActive ? "var(--gold)" : "var(--parchment)",
                            }}
                          >
                            {product.name}
                          </span>
                          <span
                            className="font-label mt-1.5 block text-[0.58rem] uppercase tracking-[0.25em]"
                            style={{ color: "rgba(243,237,224,0.45)" }}
                          >
                            {product.category} — {product.origin}
                          </span>
                        </span>
                        <span
                          className="font-label hidden text-right text-[0.62rem] uppercase tracking-[0.12em] lg:block"
                          style={{ color: "rgba(243,237,224,0.5)" }}
                        >
                          {specLines[product.slug]}
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center justify-between">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 font-sans text-sm font-medium"
                style={{ color: "var(--gold)" }}
                aria-label="View all AnjaHak products"
              >
                View All Products
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <span
                className="font-label text-[0.6rem] uppercase tracking-[0.25em]"
                style={{ color: "rgba(243,237,224,0.4)" }}
              >
                06 commodities — 04 continents
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right — sticky crossfading panel */}
        <div className="relative" aria-hidden="true">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            {products.map((product, i) => (
              <motion.div
                key={product.slug}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: prefersReduced ? 1 : i === active ? 1 : 1.06,
                }}
                transition={fade}
              >
                <Image
                  src={product.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 899px) 0vw, 50vw"
                />
              </motion.div>
            ))}

            {/* Commodity colour wash */}
            <motion.div
              className="absolute inset-0"
              style={{ mixBlendMode: "multiply", opacity: 0.5 }}
              initial={false}
              animate={{ backgroundColor: washes[products[active].slug] }}
              transition={fade}
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  className="font-label text-[0.62rem] uppercase tracking-[0.25em]"
                  style={{ color: "var(--parchment)" }}
                  initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: prefersReduced ? 0 : 0.4, ease: EASE }}
                >
                  0{active + 1} / 06 — {products[active].name}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div
        className="min-[900px]:hidden"
        style={{ padding: "0 clamp(1.25rem, 4vw, 4rem) clamp(4rem, 8vh, 6rem)" }}
      >
        <div className="space-y-12">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={0.05}>
              <Link
                href={`/products/${product.slug}`}
                className="group block"
                aria-label={`View ${product.name}`}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: washes[product.slug] }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-4">
                  <span
                    className="font-label text-[0.65rem]"
                    style={{ color: "var(--gold)" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                        lineHeight: 1.1,
                        color: "var(--parchment)",
                        fontWeight: 400,
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="font-label mt-1 text-[0.58rem] uppercase tracking-[0.25em]"
                      style={{ color: "rgba(243,237,224,0.45)" }}
                    >
                      {product.category} — {product.origin}
                    </p>
                  </div>
                </div>
                {/* Spec chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {specLines[product.slug].split(" · ").map((chip) => (
                    <span
                      key={chip}
                      className="font-label border px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.12em]"
                      style={{
                        borderColor: "rgba(243,237,224,0.25)",
                        color: "rgba(243,237,224,0.7)",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/products"
            className="group mt-12 inline-flex items-center gap-2 font-sans text-sm font-medium"
            style={{ color: "var(--gold)" }}
            aria-label="View all AnjaHak products"
          >
            View All Products
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
