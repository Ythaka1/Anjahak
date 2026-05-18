"use client";

import Image from "next/image";

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Globe, ShieldCheck, Sprout, ArrowRight } from "lucide-react";
import { staggerContainer, cardItem, slideUp, slideInLeft, slideInRight, scaleIn } from "@/lib/animations";
import CTABanner from "@/components/sections/CTABanner";
import QuoteSection from "@/components/sections/QuoteSection";
import WorldMap from "@/components/ui/WorldMap";

const values = [
  {
    Icon: ShieldCheck,
    title: "Quality First",
    desc: "Every product is rigorously inspected and tested to meet international food safety standards.",
  },
  {
    Icon: Leaf,
    title: "Sustainability",
    desc: "We promote eco-friendly farming practices that protect Africa's soils for future generations.",
  },
  {
    Icon: Sprout,
    title: "Farmer Empowerment",
    desc: "By sourcing directly from local farmers, we ensure fair compensation and community growth.",
  },
  {
    Icon: Globe,
    title: "Global Reach",
    desc: "From our base in Nairobi, we connect Africa's finest harvests with buyers across four continents.",
  },
];

const whyUs = [
  {
    title: "Direct Farm Sourcing",
    desc: "We eliminate middlemen and source directly from certified farms, ensuring traceability and freshness in every consignment.",
  },
  {
    title: "Export Expertise",
    desc: "With years of export experience, we handle all logistics, documentation, and compliance to make your import seamless.",
  },
  {
    title: "Certified & Compliant",
    desc: "Our products carry the certifications you need — halal, phytosanitary, and food safety compliance for EU, GCC, and Asian markets.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative pt-36 pb-24 grain-overlay overflow-hidden"
        style={{ backgroundColor: "var(--forest)" }}
        aria-label="About AnjaHak hero"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
          aria-hidden="true"
        />
        {/* Watermark logo — decorative */}
        <div
          style={{
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.06,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={400}
            height={400}
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.span
            className="section-label section-label--light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OUR STORY
          </motion.span>
          <motion.h1
            className="font-heading font-bold mt-2"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--parchment)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            About AnjaHak
          </motion.h1>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
          aria-hidden="true"
        />
      </section>

      {/* Editorial story section */}
      <section
        className="py-24 lg:py-32 bg-white"
        aria-label="Company story"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — image */}
            <motion.div
              className="relative"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-card-hover" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
                  alt="AnjaHak premium produce — fresh organic vegetables from East Africa"
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Pull quote badge */}
              <div
                className="absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl p-5 shadow-glass"
                style={{ backgroundColor: "var(--forest)" }}
              >
                <p
                  className="font-display italic text-sm leading-relaxed"
                  style={{ color: "var(--gold)" }}
                >
                  &ldquo;Africa&apos;s Finest, Delivered to the World&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Right — text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.span className="section-label" style={{ color: "var(--sage)" }} variants={cardItem}>
                WHO WE ARE
              </motion.span>
              <motion.h2
                className="font-heading font-bold mb-6"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", color: "var(--earth)" }}
                variants={cardItem}
              >
                From Africa&apos;s Soil To Your Table
              </motion.h2>

              <motion.blockquote
                className="font-display italic text-xl leading-relaxed mb-6 pl-5"
                style={{
                  color: "var(--harvest)",
                  borderLeft: "3px solid var(--gold)",
                }}
                variants={cardItem}
              >
                &ldquo;AnjaHak is a leading exporter of premium agricultural produce
                from Africa, dedicated to connecting the continent&apos;s rich harvests
                with global markets.&rdquo;
              </motion.blockquote>

              <motion.p
                className="font-sans text-base leading-relaxed mb-4"
                style={{ color: "rgba(26,18,8,0.7)" }}
                variants={cardItem}
              >
                With a commitment to quality, sustainability, and innovation, we
                empower local farmers, promote eco-friendly practices, and deliver
                exceptional products to meet international standards. Our team
                combines deep agricultural knowledge with global trade expertise.
              </motion.p>
              <motion.p
                className="font-sans text-base leading-relaxed mb-8"
                style={{ color: "rgba(26,18,8,0.7)" }}
                variants={cardItem}
              >
                At AnjaHak, we take pride in sharing Africa&apos;s agricultural
                excellence with the world, fostering growth and prosperity at every
                step of the journey — from farm to final destination.
              </motion.p>
              <motion.div variants={cardItem}>
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2" aria-label="Contact AnjaHak">
                  Partner With Us
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 lg:py-28"
        style={{ backgroundColor: "var(--dusk)" }}
        aria-label="Our values"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.span className="section-label" style={{ color: "var(--sage)" }} variants={cardItem}>
              WHAT DRIVES US
            </motion.span>
            <motion.h2
              className="font-heading font-bold"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)", color: "var(--earth)" }}
              variants={slideUp}
            >
              Our Core Values
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {values.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                className="bg-white rounded-3xl p-8 text-center shadow-card"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "rgba(27,58,45,0.08)" }}
                  aria-hidden="true"
                >
                  <Icon size={24} style={{ color: "var(--forest)" }} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: "var(--earth)" }}>
                  {title}
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(26,18,8,0.62)" }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24 lg:py-28 bg-white" aria-label="Why choose AnjaHak">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span className="section-label" style={{ color: "var(--sage)" }} variants={cardItem}>
              WHY PARTNER WITH US
            </motion.span>
            <motion.h2
              className="font-heading font-bold"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)", color: "var(--earth)" }}
              variants={slideUp}
            >
              The AnjaHak Advantage
            </motion.h2>
          </motion.div>

          <div className="space-y-12">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                variants={i % 2 === 0 ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span
                    className="font-label text-[0.65rem] tracking-widest uppercase"
                    style={{ color: "var(--harvest)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="font-heading font-bold text-2xl mt-2 mb-4"
                    style={{ color: "var(--earth)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans text-base leading-relaxed"
                    style={{ color: "rgba(26,18,8,0.68)" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`rounded-2xl overflow-hidden shadow-card ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={
                      i === 0
                        ? "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
                        : i === 1
                        ? "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
                        : "https://i.pinimg.com/1200x/3c/ad/73/3cad733d5686cd8c0a6e3e4f98749c26.jpg"
                    }
                    alt={item.title}
                    width={800}
                    height={450}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational quote section */}
      <QuoteSection />

      {/* World export map */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--dusk)" }}
        aria-labelledby="world-map-heading"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label" style={{ color: "var(--sage)" }}>
              GLOBAL REACH
            </span>
            <h2
              id="world-map-heading"
              className="font-heading font-bold"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)", color: "var(--earth)" }}
            >
              Our Export Destinations
            </h2>
          </div>
          <WorldMap />
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
