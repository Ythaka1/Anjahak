import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CTABanner from "@/components/sections/CTABanner";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | AnjaHak Enterprises`,
    description: product.description,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 3);

  return (
    <main>
      {/* Hero image */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "50vh", minHeight: "320px" }}
        aria-label={`${product.name} hero image`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA}
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,18,8,0.3) 0%, rgba(26,18,8,0.65) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 lg:px-8 max-w-7xl mx-auto left-0 right-0">
          <Link
            href="/products"
            className="flex items-center gap-1.5 font-label text-xs tracking-wide mb-4 w-fit transition-opacity hover:opacity-80"
            style={{ color: "rgba(250,246,238,0.7)" }}
            aria-label="Back to all products"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All Products
          </Link>
          <span className="badge badge--harvest mb-3 w-fit">{product.category}</span>
          <h1
            className="font-heading font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--parchment)",
            }}
          >
            {product.name}
          </h1>
          <p
            className="font-label text-xs tracking-widest mt-2"
            style={{ color: "rgba(250,246,238,0.65)" }}
          >
            Origin: {product.origin}
          </p>
        </div>
      </section>

      {/* Product detail body */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--parchment)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2
                  className="font-heading font-bold text-2xl mb-4"
                  style={{ color: "var(--earth)" }}
                >
                  About This Product
                </h2>
                <p
                  className="font-sans text-base leading-relaxed"
                  style={{ color: "rgba(26,18,8,0.72)" }}
                >
                  {product.longDescription}
                </p>
              </div>

              <div>
                <h3
                  className="font-heading font-bold text-xl mb-5"
                  style={{ color: "var(--earth)" }}
                >
                  Specifications
                </h3>
                <ul className="space-y-3">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--canopy)" }}
                        aria-hidden="true"
                      />
                      <span
                        className="font-sans text-sm"
                        style={{ color: "var(--earth)" }}
                      >
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div>
              <div
                className="rounded-2xl p-7 sticky top-28"
                style={{
                  background: "rgba(245,237,216,0.7)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <h3
                  className="font-heading font-bold text-xl mb-3"
                  style={{ color: "var(--earth)" }}
                >
                  Interested in this product?
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed mb-6"
                  style={{ color: "rgba(26,18,8,0.65)" }}
                >
                  Contact our export team for pricing, availability, and shipping
                  details.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center"
                  aria-label={`Enquire about ${product.name}`}
                >
                  Get in Touch
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(26,18,8,0.1)" }}>
                  <p
                    className="font-label text-[0.65rem] tracking-wide text-center"
                    style={{ color: "var(--sage)" }}
                  >
                    Export grade · Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section
        className="py-16 lg:py-20"
        style={{ backgroundColor: "#fff" }}
        aria-label="Related products"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2
            className="font-heading font-bold text-2xl mb-10"
            style={{ color: "var(--earth)" }}
          >
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
