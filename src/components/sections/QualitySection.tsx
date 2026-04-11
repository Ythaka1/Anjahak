"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { staggerContainer, cardItem, slideInRight, slideInLeft } from "@/lib/animations";
import SplitText from "@/components/ui/SplitText";

const features = [
  {
    title: "Certified Quality",
    desc: "Every product meets international food safety and phytosanitary standards before export.",
  },
  {
    title: "Eco-Friendly Farming",
    desc: "We partner with farms that practise sustainable, chemical-minimal agriculture.",
  },
  {
    title: "Global Standards",
    desc: "Compliant with EU, GCC, and international import regulations.",
  },
  {
    title: "Direct from Farmers",
    desc: "We source directly from growers, ensuring freshness and fair compensation.",
  },
];

const BLUR_DATA =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8VAAAIAAAEFAQEAAAAAAAAAAAAAAAAFBgcIBAkD/8QAGRAAAMBAAAAAAAAAAAAAAAAAAAABAgME/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKvgA5oAAAAAB//Z";

export default function QualitySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--dusk)" }}
      aria-labelledby="quality-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              className="section-label"
              style={{ color: "var(--sage)" }}
              variants={cardItem}
            >
              FRESH PRODUCTS EVERY TIME
            </motion.span>

            <SplitText
              text="We Grow Organic Products"
              id="quality-heading"
              as="h2"
              className="font-heading font-bold mb-5"
              style={{
                fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)",
                color: "var(--earth)",
              }}
            />

            <motion.p
              className="font-sans text-base leading-relaxed mb-10"
              style={{ color: "rgba(26,18,8,0.68)" }}
              variants={cardItem}
            >
              At AnjaHak, we take pride in sharing Africa&apos;s agricultural
              excellence with the world, fostering growth and prosperity at every
              step. Our rigorous quality control begins at the farm and continues
              through every stage of processing, packaging, and delivery.
            </motion.p>

            <motion.div className="space-y-6" variants={staggerContainer}>
              {features.map((feat) => (
                <motion.div
                  key={feat.title}
                  className="flex gap-4 items-start"
                  variants={cardItem}
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "var(--canopy)" }}
                    aria-hidden="true"
                  >
                    <Check size={14} color="white" strokeWidth={3} />
                  </div>
                  <div>
                    <p
                      className="font-sans font-bold text-sm mb-0.5"
                      style={{ color: "var(--earth)" }}
                    >
                      {feat.title}
                    </p>
                    <p
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: "rgba(26,18,8,0.6)" }}
                    >
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — stacked images */}
          <motion.div
            className="relative h-[480px] lg:h-[560px]"
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Main image */}
            <div
              className="absolute top-0 right-0 rounded-2xl overflow-hidden shadow-card-hover"
              style={{
                width: "80%",
                height: "75%",
                transform: "rotate(1.5deg)",
              }}
            >
              <motion.div className="absolute inset-0 will-change-transform" style={{ y: imgY }}>
                <Image
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
                  alt="Fresh organic produce laid out for quality inspection"
                  fill
                  className="object-cover"
                  sizes="40vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA}
                />
              </motion.div>
            </div>

            {/* Secondary image */}
            <div
              className="absolute bottom-0 left-0 rounded-2xl overflow-hidden shadow-card border-4"
              style={{
                width: "62%",
                height: "55%",
                transform: "rotate(-2.5deg)",
                borderColor: "var(--parchment)",
              }}
            >
              <Image
                src="https://i.pinimg.com/1200x/3c/ad/73/3cad733d5686cd8c0a6e3e4f98749c26.jpg"
                alt="Kenyan farmer in the field with fresh harvest"
                fill
                className="object-cover"
                sizes="30vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA}
              />
            </div>

            {/* Decorative gold dot */}
            <div
              className="absolute top-[30%] left-[15%] w-4 h-4 rounded-full opacity-60"
              style={{ backgroundColor: "var(--gold)" }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
