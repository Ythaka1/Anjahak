"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { staggerContainer, cardItem, slideUp } from "@/lib/animations";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden grain-overlay"
      style={{ backgroundColor: "var(--forest)" }}
      aria-labelledby="cta-heading"
    >
      {/* CTA glass overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(27,58,45,0.45)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
        aria-hidden="true"
      />

      {/* Gold lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            className="section-label section-label--light mb-6"
            variants={cardItem}
          >
            PARTNER WITH US
          </motion.span>

          <SplitText
            text="Provide You The Highest Quality Products That Meets Your Expectation"
            id="cta-heading"
            as="h2"
            className="font-heading font-bold mb-6"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
              color: "var(--parchment)",
              lineHeight: 1.2,
            }}
          />

          <motion.p
            className="font-sans text-base leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(250,246,238,0.72)" }}
            variants={cardItem}
          >
            At AnjaHak, we take pride in sharing Africa&apos;s agricultural
            excellence with the world, fostering growth and prosperity at every
            step of the journey.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={cardItem}
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="btn-primary flex items-center gap-2"
                aria-label="Get in touch with AnjaHak"
              >
                <Mail size={16} aria-hidden="true" />
                Get in Touch
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/products"
                className="btn-outline btn-outline--light flex items-center gap-2"
                aria-label="View all AnjaHak products"
              >
                View Products
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Gold line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
