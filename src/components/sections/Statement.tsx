"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import ClipImage from "@/components/motion/ClipImage";
import CountUp from "@/components/motion/CountUp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const commitments = [
  {
    title: "Growing Premium Fruits, Cereals & Vegetables",
    desc: "Export-grade produce sourced directly from certified farms.",
  },
  {
    title: "Premium Quality Halal Lamb & Goat",
    desc: "Free-range, naturally reared and halal certified.",
  },
];

function MetricBar({ label, value }: { label: string; value: number }) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span
          className="font-label text-[0.62rem] uppercase tracking-[0.22em]"
          style={{ color: "var(--earth)" }}
        >
          {label}
        </span>
        <CountUp
          to={value}
          suffix="%"
          className="font-label text-xs"
          style={{ color: "var(--gold)" }}
        />
      </div>
      <div
        className="mt-2 h-px w-full"
        style={{ backgroundColor: "rgba(26,18,8,0.12)" }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className="h-px origin-left"
          style={{ backgroundColor: "var(--gold)" }}
          initial={prefersReduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function Statement() {
  return (
    <section
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--parchment)" }}
      aria-labelledby="statement-heading"
    >
      <div
        className="mx-auto max-w-[92rem]"
        style={{ padding: "0 clamp(1.25rem, 4vw, 4rem)" }}
      >
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — the statement */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="section-label">About AnjaHak Enterprises</span>
            </Reveal>

            <LineReveal
              as="h2"
              id="statement-heading"
              by="word"
              stagger={0.035}
              lines={[
                { text: "AnjaHak is a leading exporter of" },
                { text: "premium agricultural produce from" },
                { text: "Africa, dedicated to connecting" },
                { text: "the continent's rich harvests", accent: true },
                { text: "with global markets.", accent: true },
              ]}
              className="font-display"
              style={{
                fontSize: "clamp(1.7rem, 3.4vw, 2.9rem)",
                lineHeight: 1.18,
                color: "var(--forest-deep)",
                fontWeight: 400,
              }}
            />

            <Reveal delay={0.25}>
              <p
                className="mt-7 max-w-xl font-sans text-base font-light leading-relaxed"
                style={{ color: "rgba(26,18,8,0.72)" }}
              >
                With a commitment to quality, sustainability, and innovation,
                we empower local farmers, promote eco-friendly practices, and
                deliver exceptional products to meet international standards.
              </p>
            </Reveal>

            {/* Commitments */}
            <Reveal stagger={0.12} delay={0.1} className="mt-10">
              {commitments.map((item, i) => (
                <div
                  key={item.title}
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t py-4"
                  style={{ borderColor: "rgba(26,18,8,0.12)" }}
                >
                  <span
                    className="font-label text-[0.65rem]"
                    style={{ color: "var(--gold)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p
                      className="font-sans text-sm font-medium"
                      style={{ color: "var(--earth)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-0.5 font-sans text-xs font-light"
                      style={{ color: "rgba(26,18,8,0.55)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>

            {/* Data band */}
            <div className="mt-12 grid grid-cols-1 items-end gap-10 sm:grid-cols-2">
              <Reveal>
                <div>
                  <CountUp
                    to={12}
                    className="font-display block"
                    style={{
                      fontSize: "clamp(4.5rem, 8vw, 7rem)",
                      lineHeight: 0.9,
                      color: "var(--forest-deep)",
                    }}
                  />
                  <span
                    className="font-label mt-3 block text-[0.62rem] uppercase tracking-[0.25em]"
                    style={{ color: "var(--sage)" }}
                  >
                    Years of export experience
                  </span>
                </div>
              </Reveal>

              <div className="space-y-6">
                <MetricBar label="Freshly Grown Produce" value={99} />
                <MetricBar label="Free Hold Reared Livestock" value={99} />
              </div>
            </div>

            <Reveal delay={0.1}>
              <Link
                href="/about"
                className="btn-ghost mt-10 flex w-fit items-center gap-2"
                aria-label="Read our full story"
              >
                Read Our Story
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          {/* Right — clip-revealed harvest image */}
          <div className="lg:col-span-5 lg:col-start-8">
            <ClipImage
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
              alt="AnjaHak farm — tractor harvesting crops in East Africa"
              aspectRatio="4 / 5"
              cover="var(--forest)"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <Reveal delay={0.5}>
              <p
                className="font-label mt-4 text-[0.6rem] uppercase tracking-[0.25em]"
                style={{ color: "var(--sage)" }}
              >
                Harvest season — East African highlands
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
