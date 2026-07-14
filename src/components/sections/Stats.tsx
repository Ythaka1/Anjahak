"use client";

import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";

const stats = [
  {
    value: 6,
    suffix: "+",
    label: "Export Products",
    desc: "Premium organic commodities",
  },
  {
    value: 99,
    suffix: "%",
    label: "Quality Rating",
    desc: "Consistently rated by global buyers",
  },
  {
    value: 12,
    suffix: "+",
    label: "Years Experience",
    desc: "Trusted agricultural exporter",
  },
  {
    value: 4,
    suffix: "",
    label: "Continents Served",
    desc: "Africa, Asia, Europe & the Gulf",
  },
];

export default function Stats() {
  return (
    <section
      className="relative"
      style={{ backgroundColor: "var(--dusk)" }}
      aria-label="AnjaHak by the numbers"
    >
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="mx-auto max-w-[92rem] py-20 lg:py-28"
        style={{ padding: "clamp(4rem, 8vh, 7rem) clamp(1.25rem, 4vw, 4rem)" }}
      >
        <Reveal stagger={0.12} className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-t pt-6"
              style={{ borderColor: "rgba(26,18,8,0.15)" }}
            >
              <CountUp
                to={stat.value}
                suffix={stat.suffix}
                className="font-display block"
                style={{
                  fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)",
                  lineHeight: 0.95,
                  color: "var(--forest-deep)",
                }}
              />
              <p
                className="font-label mt-4 text-[0.62rem] uppercase tracking-[0.25em]"
                style={{ color: "var(--earth)" }}
              >
                {stat.label}
              </p>
              <p
                className="mt-1.5 font-sans text-xs font-light"
                style={{ color: "rgba(26,18,8,0.55)" }}
              >
                {stat.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </div>

      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
