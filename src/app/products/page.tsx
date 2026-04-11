"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, type Category, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/ui/QuickViewModal";
import { staggerContainer, cardItem, slideUp } from "@/lib/animations";

export default function ProductsPage() {
  const [active, setActive] = useState<Category>("All");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <main>
      {/* Hero banner */}
      <section
        className="pt-32 pb-20 relative grain-overlay"
        style={{ backgroundColor: "var(--forest)" }}
        aria-label="Products hero"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            className="section-label section-label--light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            WHAT WE EXPORT
          </motion.span>
          <motion.h1
            className="font-heading font-bold mt-2"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--parchment)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="font-sans text-base mt-4 max-w-lg mx-auto"
            style={{ color: "rgba(250,246,238,0.65)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Premium organic commodities from Africa&apos;s finest farms, delivered to
            global markets.
          </motion.p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
          aria-hidden="true"
        />
      </section>

      {/* Filter + grid */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--parchment)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-14" role="group" aria-label="Filter products by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className="font-label text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300"
                style={{
                  backgroundColor: active === cat ? "var(--forest)" : "transparent",
                  color: active === cat ? "var(--parchment)" : "var(--earth)",
                  borderColor: active === cat ? "var(--forest)" : "rgba(26,18,8,0.2)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {filtered.map((product) => (
                <motion.div key={product.slug} variants={cardItem} layout>
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              className="text-center font-sans py-20"
              style={{ color: "rgba(26,18,8,0.45)" }}
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              No products in this category yet.
            </motion.p>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
}
