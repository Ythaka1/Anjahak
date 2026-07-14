"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTA() {
  const prefersReduced = usePrefersReducedMotion();

  const primary = (
    <Link
      href="/contact"
      className="btn-primary flex items-center gap-2"
      aria-label="Get in touch with AnjaHak"
    >
      <Mail size={16} aria-hidden="true" />
      Get in Touch
    </Link>
  );

  return (
    <section
      className="py-28 lg:py-44"
      style={{ backgroundColor: "var(--parchment)" }}
      aria-labelledby="cta-heading"
    >
      <div
        className="mx-auto max-w-6xl text-center"
        style={{ padding: "0 clamp(1.25rem, 4vw, 4rem)" }}
      >
        <Reveal>
          <span className="section-label">Partner With Us</span>
        </Reveal>

        <LineReveal
          as="h2"
          id="cta-heading"
          lines={[
            { text: "Ready to source" },
            { text: "premium African", accent: true },
            { text: "produce?" },
          ]}
          className="font-display mx-auto"
          style={{
            fontSize: "clamp(2.8rem, 8.5vw, 7rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.01em",
            color: "var(--forest-deep)",
            fontWeight: 400,
          }}
        />

        <Reveal delay={0.3}>
          <p
            className="mx-auto mt-8 max-w-2xl font-sans text-base font-light leading-relaxed"
            style={{ color: "rgba(26,18,8,0.68)" }}
          >
            At AnjaHak, we take pride in sharing Africa&apos;s agricultural
            excellence with the world, fostering growth and prosperity at every
            step of the journey.
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {/* Magnetic on desktop pointers; plain under reduced motion / touch */}
            {prefersReduced ? primary : <MagneticButton>{primary}</MagneticButton>}
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 border-b border-transparent font-sans text-sm font-medium transition-colors duration-300 hover:border-current"
              style={{ color: "var(--forest)" }}
              aria-label="View all AnjaHak products"
            >
              View Products
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
