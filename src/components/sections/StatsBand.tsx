"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Star, Calendar, MapPin } from "lucide-react";
import { staggerContainer, cardItem } from "@/lib/animations";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  {
    end: 6,
    suffix: "+",
    label: "Export Products",
    desc: "Premium organic commodities",
    Icon: Package,
  },
  {
    end: 99,
    suffix: "%",
    label: "Quality Rating",
    desc: "Consistently rated by global buyers",
    Icon: Star,
  },
  {
    end: 10,
    suffix: "+",
    label: "Years Experience",
    desc: "Trusted agricultural exporter",
    Icon: Calendar,
  },
  {
    end: 4,
    suffix: "",
    label: "Continents Served",
    desc: "Africa, Asia, Europe & the Gulf",
    Icon: MapPin,
  },
];

export default function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--forest)" }}
      aria-label="AnjaHak by the numbers"
    >
      {/* Gold line top */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Subtle crosshatch texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.07 }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cross" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="10" y1="0" x2="10" y2="20" stroke="var(--gold)" strokeWidth="0.5" />
              <line x1="0" y1="10" x2="20" y2="10" stroke="var(--gold)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cross)" />
        </svg>
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={cardItem}
            className="group relative flex flex-col items-center justify-center text-center px-6 py-14 transition-all duration-500"
            style={{
              borderRight:
                i < stats.length - 1
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "none",
            }}
          >
            {/* Liquid glass hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "rgba(232,184,75,0.08)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              aria-hidden="true"
            />

            {/* Icon */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-3 relative z-10"
              style={{ backgroundColor: "rgba(232,184,75,0.12)" }}
              aria-hidden="true"
            >
              <stat.Icon size={18} style={{ color: "var(--gold)" }} />
            </div>

            {/* Number */}
            <span
              className="font-display italic font-semibold relative z-10"
              style={{
                fontSize: "clamp(3rem, 5vw, 4.25rem)",
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              <AnimatedCounter end={stat.end} suffix={stat.suffix} />
            </span>

            {/* Label */}
            <p
              className="font-sans font-bold text-sm mt-3 relative z-10"
              style={{ color: "var(--parchment)" }}
            >
              {stat.label}
            </p>

            {/* Description */}
            <p
              className="font-sans text-xs mt-1 relative z-10"
              style={{ color: "rgba(250,246,238,0.45)" }}
            >
              {stat.desc}
            </p>

            {/* Amber bottom accent line */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
              style={{
                width: "40%",
                backgroundColor: "var(--gold)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Gold line bottom */}
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
