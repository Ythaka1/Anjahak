"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import ClipImage from "@/components/motion/ClipImage";
import Parallax from "@/components/motion/Parallax";

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

export default function Provenance() {
  return (
    <section
      className="overflow-hidden bg-white py-24 lg:py-36"
      aria-labelledby="provenance-heading"
    >
      <div
        className="mx-auto max-w-[92rem]"
        style={{ padding: "0 clamp(1.25rem, 4vw, 4rem)" }}
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Left — offset image composition */}
          <div className="relative mb-14 lg:col-span-6 lg:mb-0">
            <ClipImage
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
              alt="Fresh organic produce laid out for quality inspection"
              aspectRatio="4 / 3"
              cover="var(--canopy)"
              className="w-[82%]"
              sizes="(max-width: 1024px) 82vw, 40vw"
            />
            <Parallax
              amount={0.08}
              className="absolute -bottom-14 right-0 w-[46%]"
            >
              <div
                className="relative overflow-hidden shadow-card-hover"
                style={{ aspectRatio: "3 / 4" }}
              >
                <Image
                  src="https://i.pinimg.com/1200x/3c/ad/73/3cad733d5686cd8c0a6e3e4f98749c26.jpg"
                  alt="Kenyan farmer in the field with fresh harvest"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 46vw, 22vw"
                />
              </div>
            </Parallax>
          </div>

          {/* Right — quality manifesto */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <span className="section-label">Fresh Products Every Time</span>
            </Reveal>

            <LineReveal
              as="h2"
              id="provenance-heading"
              lines={[
                { text: "We Grow" },
                { text: "Organic Products", accent: true },
              ]}
              className="font-display"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.02,
                color: "var(--forest-deep)",
                fontWeight: 400,
              }}
            />

            <Reveal delay={0.2}>
              <p
                className="mt-6 font-sans text-base font-light leading-relaxed"
                style={{ color: "rgba(26,18,8,0.68)" }}
              >
                At AnjaHak, we take pride in sharing Africa&apos;s agricultural
                excellence with the world, fostering growth and prosperity at
                every step. Our rigorous quality control begins at the farm and
                continues through every stage of processing, packaging, and
                delivery.
              </p>
            </Reveal>

            <Reveal stagger={0.1} delay={0.1} className="mt-10">
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t py-5"
                  style={{ borderColor: "rgba(26,18,8,0.12)" }}
                >
                  <span
                    className="font-label text-[0.65rem]"
                    style={{ color: "var(--gold)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3
                      className="font-sans text-sm font-medium"
                      style={{ color: "var(--earth)", fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {feat.title}
                    </h3>
                    <p
                      className="mt-1 font-sans text-sm font-light leading-relaxed"
                      style={{ color: "rgba(26,18,8,0.6)" }}
                    >
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
