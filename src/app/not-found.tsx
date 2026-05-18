import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center grain-overlay px-6"
      style={{ backgroundColor: "var(--forest)" }}
    >
      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        aria-hidden="true"
      />

      {/* Large ghost 404 */}
      <p
        className="font-heading font-bold text-center select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 22vw, 16rem)",
          color: "rgba(250,246,238,0.07)",
          lineHeight: 1,
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Content */}
      <div className="relative -mt-10 flex flex-col items-center gap-6 text-center z-10">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="AnjaHak Enterprises"
          width={100}
          height={100}
          className="object-contain brightness-0 invert opacity-60 mb-2"
        />

        <div className="space-y-3">
          <h1
            className="font-heading font-bold text-2xl md:text-3xl"
            style={{ color: "var(--parchment)" }}
          >
            This page wandered off into the fields
          </h1>
          <p
            className="font-sans text-base max-w-sm mx-auto"
            style={{ color: "rgba(250,246,238,0.6)" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="btn-primary flex items-center gap-2"
          aria-label="Return to AnjaHak homepage"
        >
          Return to Harvest
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      {/* Gold bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        aria-hidden="true"
      />
    </main>
  );
}
