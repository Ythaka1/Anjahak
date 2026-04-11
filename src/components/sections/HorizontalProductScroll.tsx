"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";

export default function HorizontalProductScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const onWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;
    // Only hijack if the container can scroll horizontally
    const el = containerRef.current;
    const canScrollH = el.scrollWidth > el.clientWidth;
    if (canScrollH) {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.5;
    }
  };

  return (
    <section
      className="py-20 overflow-hidden"
      style={{ backgroundColor: "var(--forest)" }}
      aria-labelledby="horizontal-scroll-heading"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 flex items-end justify-between">
        <div>
          <span className="section-label section-label--light">PREMIUM SHOWCASE</span>
          <h2
            id="horizontal-scroll-heading"
            className="font-heading font-bold"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "var(--parchment)" }}
          >
            Meet Our Products
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden md:flex items-center gap-2 font-sans font-medium text-sm transition-colors"
          style={{ color: "var(--gold)" }}
          aria-label="View all products"
        >
          View All
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      {/* Scrollable track */}
      <div
        ref={containerRef}
        onWheel={onWheel}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-8 pb-4"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" as "touch" }}
        role="list"
        aria-label="Products horizontal scroll"
      >
        {products.map((p) => (
          <motion.div
            key={p.slug}
            role="listitem"
            className="shrink-0 rounded-3xl overflow-hidden will-change-transform"
            style={{
              width: "clamp(260px, 30vw, 320px)",
              scrollSnapAlign: "start",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ scale: 0.85, opacity: 0.5 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ root: containerRef, once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ borderColor: "rgba(232,184,75,0.5)" }}
          >
            <Link
              href={`/products/${p.slug}`}
              className="block"
              aria-label={`View ${p.name}`}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA}
                  />
                </motion.div>
              </div>
              <div className="p-5">
                <span
                  className="font-label text-[0.6rem] tracking-widest"
                  style={{ color: "var(--gold)" }}
                >
                  {p.category}
                </span>
                <h3
                  className="font-heading font-bold text-lg mt-1"
                  style={{ color: "var(--parchment)" }}
                >
                  {p.name}
                </h3>
                <p
                  className="font-sans text-xs mt-1 leading-relaxed line-clamp-2"
                  style={{ color: "rgba(250,246,238,0.55)" }}
                >
                  {p.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile: View All link */}
      <div className="md:hidden text-center mt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-sans font-medium text-sm"
          style={{ color: "var(--gold)" }}
        >
          View All Products
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
