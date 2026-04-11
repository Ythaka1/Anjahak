"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import type { Product } from "@/lib/products";

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  // 3D tilt via spring motion values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 280, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 280, damping: 24 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0–1
    const py = (e.clientY - rect.top) / rect.height; // 0–1
    rawRotateY.set((px - 0.5) * 16); // max ±8 deg
    rawRotateX.set((0.5 - py) * 16); // max ±8 deg (inverted)
    setShinePos({ x: px * 100, y: py * 100 });
  };

  const onMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    setIsHovered(false);
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onMouseLeave}
        className="rounded-3xl overflow-hidden bg-white shadow-card will-change-transform relative"
      >
        {/* Shine overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.25s",
          }}
          aria-hidden="true"
        />

        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name} details`}
          className="block"
        >
          {/* Card header */}
          <div className="p-6 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge mb-3 block w-fit">{product.category}</span>
              <h3
                className="font-heading font-bold text-lg leading-tight"
                style={{ color: "var(--earth)" }}
              >
                {product.name}
              </h3>
              <p
                className="font-label text-[0.65rem] tracking-wide mt-1"
                style={{ color: "var(--sage)" }}
              >
                {product.origin}
              </p>
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center will-change-transform"
              style={{ backgroundColor: "var(--harvest)" }}
              aria-hidden="true"
            >
              <ArrowRight size={16} color="white" />
            </motion.div>
          </div>

          {/* Card image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <motion.div
              className="w-full h-full will-change-transform"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA}
              />
            </motion.div>
          </div>
        </Link>

        {/* Quick View button — slides up on hover */}
        {onQuickView && (
          <motion.div
            className="absolute left-0 right-0 flex justify-center"
            style={{ bottom: "16px", zIndex: 20 }}
            initial={{ y: 16, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={!isHovered}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-medium text-xs shadow-card-hover"
              style={{
                backgroundColor: "var(--earth)",
                color: "var(--parchment)",
              }}
              aria-label={`Quick view ${product.name}`}
            >
              <Eye size={13} aria-hidden="true" />
              Quick View
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
