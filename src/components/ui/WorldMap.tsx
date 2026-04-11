"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Destination {
  id: string;
  label: string;
  flag: string;
  x: number;
  y: number;
  isOrigin?: boolean;
}

const destinations: Destination[] = [
  { id: "kenya", label: "Kenya", flag: "🇰🇪", x: 570, y: 278, isOrigin: true },
  { id: "uae", label: "United Arab Emirates", flag: "🇦🇪", x: 638, y: 238 },
  { id: "saudi", label: "Saudi Arabia", flag: "🇸🇦", x: 614, y: 225 },
  { id: "singapore", label: "Singapore", flag: "🇸🇬", x: 748, y: 298 },
  { id: "uk", label: "United Kingdom", flag: "🇬🇧", x: 488, y: 148 },
  { id: "germany", label: "Germany", flag: "🇩🇪", x: 511, y: 158 },
  { id: "netherlands", label: "Netherlands", flag: "🇳🇱", x: 504, y: 152 },
];

// Simplified continent outlines (SVG paths at 1000x500 viewBox)
const continents = [
  // Africa
  "M 520 200 L 535 195 L 555 200 L 575 198 L 590 205 L 600 215 L 605 230 L 600 250 L 595 270 L 585 290 L 575 310 L 565 325 L 558 340 L 555 355 L 552 360 L 548 355 L 542 340 L 538 320 L 530 300 L 520 280 L 515 260 L 512 240 L 510 220 Z",
  // Europe
  "M 480 120 L 500 115 L 520 118 L 535 125 L 545 130 L 548 140 L 540 148 L 525 152 L 510 155 L 495 158 L 485 162 L 475 158 L 470 148 L 472 135 Z",
  // Asia (simplified Middle East + South/SE Asia)
  "M 600 160 L 640 155 L 680 160 L 720 165 L 760 170 L 790 178 L 800 190 L 790 205 L 770 215 L 750 222 L 730 228 L 710 235 L 690 242 L 670 248 L 650 250 L 630 248 L 610 242 L 595 235 L 585 225 L 582 210 L 588 195 Z",
  // Americas (simplified)
  "M 220 140 L 250 135 L 270 140 L 280 155 L 278 170 L 265 180 L 248 185 L 230 182 L 218 172 L 215 158 Z M 240 195 L 260 190 L 275 200 L 280 220 L 275 240 L 265 258 L 252 270 L 242 275 L 235 268 L 228 252 L 225 235 L 226 215 Z",
  // Australia
  "M 780 320 L 805 315 L 825 320 L 835 332 L 832 348 L 820 358 L 805 362 L 790 358 L 778 348 L 774 335 Z",
];

interface WorldMapProps {
  compact?: boolean;
}

export default function WorldMap({ compact = false }: WorldMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const origin = destinations.find((d) => d.isOrigin)!;
  const dests = destinations.filter((d) => !d.isOrigin);

  const height = compact ? 220 : 380;

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height }}
      aria-label="AnjaHak global export destinations map"
    >
      <motion.div style={{ y }} className="w-full h-full">
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Ocean background */}
          <rect width="1000" height="500" fill="rgba(27,58,45,0.06)" rx="12" />

          {/* Continent fills */}
          {continents.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="rgba(27,58,45,0.22)"
              stroke="rgba(27,58,45,0.35)"
              strokeWidth="0.8"
            />
          ))}

          {/* Animated lines from Kenya to each destination */}
          {dests.map((dest, i) => {
            const lineLen = Math.sqrt(
              Math.pow(dest.x - origin.x, 2) + Math.pow(dest.y - origin.y, 2)
            );
            return (
              <motion.line
                key={dest.id}
                x1={origin.x}
                y1={origin.y}
                x2={dest.x}
                y2={dest.y}
                stroke="rgba(232,184,75,0.35)"
                strokeWidth="1"
                strokeDasharray={lineLen}
                initial={{ strokeDashoffset: lineLen }}
                animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: lineLen }}
                transition={{ duration: 1.4, delay: i * 0.15 + 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}

          {/* Destination dots */}
          {dests.map((dest) => (
            <g
              key={dest.id}
              onMouseEnter={() => setHoveredDot(dest.id)}
              onMouseLeave={() => setHoveredDot(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Ping ring */}
              <circle
                cx={dest.x}
                cy={dest.y}
                r={compact ? 5 : 7}
                fill="none"
                stroke="var(--canopy)"
                strokeWidth="1.5"
                opacity="0.6"
                className="dot-ping"
                style={{ transformOrigin: `${dest.x}px ${dest.y}px` }}
              />
              {/* Core dot */}
              <circle cx={dest.x} cy={dest.y} r={compact ? 3 : 4} fill="var(--canopy)" />
            </g>
          ))}

          {/* Kenya (origin) dot — amber */}
          <g
            onMouseEnter={() => setHoveredDot("kenya")}
            onMouseLeave={() => setHoveredDot(null)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={origin.x}
              cy={origin.y}
              r={compact ? 7 : 10}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              opacity="0.55"
              className="dot-ping"
              style={{ transformOrigin: `${origin.x}px ${origin.y}px`, animationDelay: "0.5s" }}
            />
            <circle cx={origin.x} cy={origin.y} r={compact ? 4 : 6} fill="var(--gold)" />
          </g>
        </svg>

        {/* Tooltip */}
        {hoveredDot && (() => {
          const d = destinations.find((dd) => dd.id === hoveredDot);
          if (!d) return null;
          return (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute glass-card rounded-xl px-3 py-2 pointer-events-none"
              style={{
                left: `${(d.x / 1000) * 100}%`,
                top: `${(d.y / 500) * 100}%`,
                transform: "translate(-50%, -140%)",
                whiteSpace: "nowrap",
                zIndex: 10,
              }}
            >
              <p className="font-sans font-medium text-xs" style={{ color: "var(--earth)" }}>
                {d.flag} {d.label}
              </p>
              {d.isOrigin && (
                <p className="font-label text-[0.6rem] tracking-wide" style={{ color: "var(--harvest)" }}>
                  Origin
                </p>
              )}
            </motion.div>
          );
        })()}
      </motion.div>

      {/* Legend */}
      {!compact && (
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "var(--gold)" }} />
            <span className="font-label text-[0.6rem] tracking-wide" style={{ color: "var(--earth)" }}>Origin (Kenya)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "var(--canopy)" }} />
            <span className="font-label text-[0.6rem] tracking-wide" style={{ color: "var(--earth)" }}>Export Destinations</span>
          </div>
        </div>
      )}
    </div>
  );
}
