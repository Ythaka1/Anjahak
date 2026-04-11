"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, cardItem, slideUp, scaleIn } from "@/lib/animations";
import SplitText from "@/components/ui/SplitText";

const testimonials = [
  {
    quote:
      "AnjaHak delivers exceptional quality every time. Their roselle hibiscus is unmatched in colour and freshness — our customers notice the difference immediately.",
    name: "Mohammed Al-Rashid",
    country: "Dubai, UAE",
    role: "Import Manager",
  },
  {
    quote:
      "Reliable, professional, and their cashew nuts consistently meet our strictest quality requirements. AnjaHak has become our most trusted African supplier.",
    name: "Sarah Chen",
    country: "Singapore",
    role: "Procurement Director",
  },
  {
    quote:
      "We have sourced from AnjaHak for three years now. Consistent quality, on-time delivery, and excellent communication at every step. A true partner.",
    name: "Klaus Weber",
    country: "Hamburg, Germany",
    role: "Food Distributor",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 star rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          fill="var(--gold)"
          stroke="var(--gold)"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="rounded-3xl p-8 bg-white flex flex-col gap-5 shadow-card h-full"
      role="article"
    >
      {/* Quotation mark */}
      <span
        className="font-display italic leading-none select-none"
        style={{ fontSize: "5rem", color: "var(--gold)", lineHeight: 0.8 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <p
        className="font-display italic text-lg leading-relaxed flex-1"
        style={{ color: "var(--earth)" }}
      >
        {t.quote}
      </p>
      <div className="space-y-2">
        <StarRow />
        <p className="font-sans font-bold text-sm" style={{ color: "var(--earth)" }}>
          {t.name}
        </p>
        <p className="font-label text-[0.65rem] tracking-wide" style={{ color: "var(--sage)" }}>
          {t.country} · {t.role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            className="section-label"
            style={{ color: "var(--sage)" }}
            variants={cardItem}
          >
            WHAT CLIENTS SAY
          </motion.span>
          <SplitText
            text="Trusted Globally"
            id="testimonials-heading"
            as="h2"
            className="font-heading font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--earth)" }}
          />
        </motion.div>

        {/* Desktop: all 3 visible */}
        <motion.div
          className="hidden md:grid grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={scaleIn}>
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <TestimonialCard t={testimonials[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "rgba(26,18,8,0.15)", color: "var(--earth)" }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "20px" : "8px",
                    height: "8px",
                    backgroundColor:
                      active === i ? "var(--harvest)" : "rgba(26,18,8,0.2)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: "rgba(26,18,8,0.15)", color: "var(--earth)" }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
