"use client";

import { Star } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";

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
          size={12}
          fill="var(--gold)"
          stroke="var(--gold)"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Voices() {
  return (
    <section
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--parchment)" }}
      aria-labelledby="voices-heading"
    >
      <div
        className="mx-auto max-w-[92rem]"
        style={{ padding: "0 clamp(1.25rem, 4vw, 4rem)" }}
      >
        <Reveal>
          <span className="section-label">What Clients Say</span>
        </Reveal>
        <LineReveal
          as="h2"
          id="voices-heading"
          lines={[{ text: "Trusted" }, { text: "Globally", accent: true }]}
          className="font-display mb-16"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            lineHeight: 0.98,
            color: "var(--forest-deep)",
            fontWeight: 400,
          }}
        />

        <div>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <article
                className="grid grid-cols-1 gap-6 border-t py-10 md:grid-cols-12 md:py-14"
                style={{ borderColor: "rgba(26,18,8,0.14)" }}
              >
                <span
                  className="font-label text-[0.7rem] md:col-span-1"
                  style={{ color: "var(--gold)" }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <blockquote className="md:col-span-7">
                  <p
                    className="font-display italic"
                    style={{
                      fontSize: "clamp(1.35rem, 2.3vw, 1.9rem)",
                      lineHeight: 1.4,
                      color: "var(--earth)",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="space-y-2 md:col-span-3 md:col-start-10">
                  <StarRow />
                  <p
                    className="font-sans text-sm font-medium"
                    style={{ color: "var(--earth)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-label text-[0.6rem] uppercase tracking-[0.2em]"
                    style={{ color: "var(--sage)" }}
                  >
                    {t.country} · {t.role}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <div
            className="border-t"
            style={{ borderColor: "rgba(26,18,8,0.14)" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
