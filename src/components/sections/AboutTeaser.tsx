"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { slideInLeft, slideUp, staggerContainer, cardItem } from "@/lib/animations";
import SplitText from "@/components/ui/SplitText";

const LeafDivider = () => (
  <div className="flex items-center gap-3 my-5">
    <div className="w-10 h-px" style={{ backgroundColor: "var(--gold)", opacity: 0.6 }} />
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21C12 21 5 15 5 9C5 5.69 7.69 3 11 3C12.66 3 14 4.34 14 4.34" stroke="var(--harvest)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21C12 21 19 15 19 9C19 5.69 16.31 3 13 3C11.34 3 10 4.34 10 4.34" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="7" stroke="var(--harvest)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
    <div className="w-10 h-px" style={{ backgroundColor: "var(--gold)", opacity: 0.6 }} />
  </div>
);

function ProgressBar({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(value), 150);
      return () => clearTimeout(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-sans text-sm font-medium" style={{ color: "var(--earth)" }}>
          {label}
        </span>
        <span className="font-label text-xs" style={{ color: "var(--harvest)" }}>
          {inView ? `${value}%` : "0%"}
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-bar"
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={inView ? value : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
    </div>
  );
}

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Parallax on main image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#fff" }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — image collage */}
          <motion.div
            className="relative"
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Main image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-card" style={{ aspectRatio: "4/3" }}>
              <motion.div className="absolute inset-0 will-change-transform" style={{ y: imgY }}>
                <Image
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
                  alt="AnjaHak farm — tractor harvesting crops in East Africa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                />
              </motion.div>
            </div>

            {/* Overlapping secondary image */}
            <div
              className="absolute rounded-2xl overflow-hidden border-4 shadow-card-hover"
              style={{
                bottom: "-2rem",
                right: "-1.5rem",
                width: "58%",
                aspectRatio: "4/3",
                borderColor: "var(--parchment)",
              }}
            >
              <Image
                src="https://i.pinimg.com/1200x/3c/ad/73/3cad733d5686cd8c0a6e3e4f98749c26.jpg"
                alt="Kenyan farmer tending to fresh produce"
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>

            {/* Experience badge */}
            <div
              className="absolute -bottom-3 -left-3 px-4 py-3 rounded-xl shadow-card z-10"
              style={{ backgroundColor: "var(--forest)" }}
            >
              <p className="font-heading font-bold text-xs leading-tight" style={{ color: "var(--gold)" }}>
                MANY YEARS OF
              </p>
              <p className="font-heading font-bold text-xs leading-tight" style={{ color: "var(--gold)" }}>
                EXPERIENCE
              </p>
            </div>
          </motion.div>

          {/* Right — text content */}
          <motion.div
            className="lg:pl-4"
            style={{ paddingTop: "2rem" }}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span className="section-label" style={{ color: "var(--sage)" }} variants={cardItem}>
              ABOUT ANJAHAK ENTERPRISES
            </motion.span>

            <SplitText
              text="For Quality Exports"
              id="about-heading"
              as="h2"
              className="font-heading font-bold mb-0"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--earth)" }}
            />

            <motion.div variants={cardItem}>
              <LeafDivider />
            </motion.div>

            <motion.p
              className="font-sans text-base leading-relaxed mb-6"
              style={{ color: "rgba(26,18,8,0.72)" }}
              variants={cardItem}
            >
              AnjaHak is a leading exporter of premium agricultural produce from
              Africa, dedicated to connecting the continent&apos;s rich harvests
              with global markets. With a commitment to quality, sustainability,
              and innovation, we empower local farmers, promote eco-friendly
              practices, and deliver exceptional products to meet international
              standards.
            </motion.p>

            {/* Feature rows */}
            <motion.div className="space-y-4 mb-8" variants={staggerContainer}>
              {[
                {
                  title: "Growing Premium Fruits, Cereals & Vegetables",
                  desc: "Export-grade produce sourced directly from certified farms.",
                },
                {
                  title: "Premium Quality Halal Lamb & Goat",
                  desc: "Free-range, naturally reared and halal certified.",
                },
              ].map((feat) => (
                <motion.div key={feat.title} className="flex gap-3" variants={cardItem}>
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--canopy)" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-sans font-medium text-sm" style={{ color: "var(--earth)" }}>
                      {feat.title}
                    </p>
                    <p className="font-sans text-xs mt-0.5" style={{ color: "rgba(26,18,8,0.55)" }}>
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress bars */}
            <motion.div className="space-y-5 mb-10" variants={cardItem}>
              <ProgressBar label="Freshly Grown Produce" value={99} />
              <ProgressBar label="Free Hold Reared Livestock" value={99} />
            </motion.div>

            <motion.div variants={cardItem}>
              <Link
                href="/about"
                className="btn-ghost flex items-center gap-2 w-fit"
                aria-label="Read our full story"
              >
                Read Our Story
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
