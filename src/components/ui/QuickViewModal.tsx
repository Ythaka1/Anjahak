"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import type { Product } from "@/lib/products";

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
            className="fixed z-50 bg-white rounded-3xl overflow-hidden shadow-card-hover
                       inset-x-4 bottom-4 top-auto
                       md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2
                       md:w-[720px] md:max-h-[88vh]"
            style={{
              // Desktop: center transform
            }}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow transition-colors hover:bg-white"
              aria-label="Close quick view"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 overflow-auto max-h-[82vh]">
              {/* Image */}
              <div className="relative min-h-[240px] md:min-h-[380px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 360px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                />
              </div>

              {/* Details */}
              <div className="p-7 md:p-8 flex flex-col gap-4 overflow-auto">
                <span className="badge w-fit">{product.category}</span>

                <h2
                  className="font-heading font-bold text-2xl"
                  style={{ color: "var(--earth)" }}
                >
                  {product.name}
                </h2>

                <p
                  className="flex items-center gap-1.5 font-label text-xs"
                  style={{ color: "var(--sage)" }}
                >
                  <MapPin size={12} aria-hidden="true" />
                  {product.origin}
                </p>

                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(26,18,8,0.68)" }}
                >
                  {product.longDescription ?? product.description}
                </p>

                <ul className="space-y-2">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2 font-sans text-sm"
                      style={{ color: "var(--earth)" }}
                    >
                      <CheckCircle2
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: "var(--canopy)" }}
                        aria-hidden="true"
                      />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t" style={{ borderColor: "rgba(26,18,8,0.08)" }}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="btn-primary flex items-center gap-2"
                    style={{ fontSize: "0.85rem", padding: "0.7rem 1.5rem" }}
                    aria-label={`View full details for ${product.name}`}
                  >
                    Full Details
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="btn-outline flex items-center gap-2"
                    style={{ fontSize: "0.85rem", padding: "0.7rem 1.5rem" }}
                    aria-label="Request a quote"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
