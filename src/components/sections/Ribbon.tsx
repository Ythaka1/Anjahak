"use client";

import Marquee from "@/components/motion/Marquee";
import { products } from "@/lib/products";

const destinations = [
  "Dubai",
  "Singapore",
  "Hamburg",
  "London",
  "Riyadh",
  "Amsterdam",
  "Nairobi",
];

/**
 * Velocity-reactive marquee band: commodity names in italic Cormorant on
 * top, export destinations in mono running the opposite way underneath.
 */
export default function Ribbon() {
  return (
    <section
      className="relative overflow-hidden border-y"
      style={{
        backgroundColor: "var(--forest-deep)",
        borderColor: "rgba(198,162,76,0.18)",
      }}
      aria-label="Our commodities and export destinations"
    >
      <Marquee baseVelocity={2.2} className="py-5 sm:py-7">
        {products.map((p) => (
          <span key={p.slug} className="flex items-center">
            <span
              className="font-display italic"
              style={{
                fontSize: "clamp(1.6rem, 3.6vw, 3rem)",
                color: "var(--parchment)",
                lineHeight: 1.1,
              }}
            >
              {p.name}
            </span>
            <span
              className="mx-6 sm:mx-10"
              style={{ color: "var(--gold)", fontSize: "1rem" }}
              aria-hidden="true"
            >
              ✦
            </span>
          </span>
        ))}
      </Marquee>

      <div
        className="border-t"
        style={{ borderColor: "rgba(198,162,76,0.14)" }}
      >
        <Marquee baseVelocity={-1.4} className="py-2.5">
          <span
            className="font-label text-[0.6rem] uppercase tracking-[0.3em]"
            style={{ color: "rgba(216,189,126,0.55)" }}
          >
            Currently exporting to{" "}
            {destinations.map((d) => `${d} · `).join("")}
          </span>
        </Marquee>
      </div>
    </section>
  );
}
