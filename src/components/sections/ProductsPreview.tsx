"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, cardItem, slideUp } from "@/lib/animations";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/ui/QuickViewModal";
import SplitText from "@/components/ui/SplitText";
import { products, type Product } from "@/lib/products";

const LeafDivider = () => (
  <div className="flex items-center justify-center gap-3 my-5">
    <div className="w-12 h-px" style={{ backgroundColor: "var(--gold)", opacity: 0.5 }} />
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21C12 21 5 15 5 9C5 5.69 7.69 3 11 3" stroke="var(--harvest)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21C12 21 19 15 19 9C19 5.69 16.31 3 13 3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="7" stroke="var(--harvest)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
    <div className="w-12 h-px" style={{ backgroundColor: "var(--gold)", opacity: 0.5 }} />
  </div>
);

export default function ProductsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <section
        ref={sectionRef}
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--parchment)" }}
        aria-labelledby="products-heading"
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
              WHAT WE DO
            </motion.span>
            <SplitText
              text="Our Products"
              id="products-heading"
              as="h2"
              className="font-heading font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "var(--earth)",
              }}
            />
            <motion.div variants={cardItem}>
              <LeafDivider />
            </motion.div>
            <motion.p
              className="font-sans text-base max-w-lg mx-auto"
              style={{ color: "rgba(26,18,8,0.6)" }}
              variants={cardItem}
            >
              Six premium commodities, sourced from Africa&apos;s finest farms,
              delivered to markets across four continents.
            </motion.p>
          </motion.div>

          {/* Product grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {products.map((product) => (
              <motion.div key={product.slug} variants={cardItem}>
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* View all link */}
          <motion.div
            className="mt-14 text-center"
            variants={slideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/products"
              className="btn-outline inline-flex items-center gap-2"
              aria-label="View all AnjaHak products"
            >
              View All Products
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick View Modal — mounted at section level */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
