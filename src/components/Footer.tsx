"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ChevronUp, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const phones = [
  "+254 721 377 422",
  "+254 787 353 676",
  "+254 738 690 998",
  "+254 704 925 908",
];

const socials = [
  { label: "Twitter / X", href: "#", Icon: TwitterIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
];

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Our Products" },
  { href: "/contact", label: "Contact Us" },
];

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="mb-12 pb-12 border-b" style={{ borderBottomColor: "rgba(255,255,255,0.08)" }}>
      <p className="font-heading font-bold text-base mb-4" style={{ color: "var(--parchment)" }}>
        Stay updated on our latest harvests
      </p>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <CheckCircle size={20} style={{ color: "var(--gold)" }} aria-hidden="true" />
          <p className="font-sans text-sm" style={{ color: "rgba(250,246,238,0.72)" }}>
            Thank you for subscribing!
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md" aria-label="Newsletter signup">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 font-sans text-sm px-4 py-2.5 rounded-full border outline-none transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.15)",
              color: "var(--parchment)",
            }}
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-sans font-medium text-sm transition-colors"
            style={{ backgroundColor: "var(--harvest)", color: "var(--parchment)" }}
            aria-label="Subscribe to newsletter"
          >
            Subscribe
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ backgroundColor: "var(--forest)" }} role="contentinfo">
      {/* Animated gold top line */}
      <motion.div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 relative">

        {/* Newsletter row */}
        <NewsletterSignup />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Column 1 — About */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="AnjaHak Enterprises"
                width={56}
                height={56}
                className="object-contain brightness-0 invert"
              />
              <div className="flex flex-col leading-tight">
                <span
                  className="font-heading font-bold text-lg leading-none"
                  style={{ color: "var(--parchment)" }}
                >
                  AnjaHak
                </span>
                <span
                  className="font-label text-[0.65rem] tracking-widest uppercase"
                  style={{ color: "rgba(250,246,238,0.45)" }}
                >
                  Enterprises
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(250,246,238,0.65)" }}>
              A leading exporter of premium organic agricultural produce from
              Africa, dedicated to connecting the continent&apos;s rich harvests
              with global markets. Quality, sustainability, and excellence in
              every shipment.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {socials.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    border: "1px solid rgba(232,184,75,0.3)",
                    color: "rgba(250,246,238,0.7)",
                  }}
                  whileHover={{
                    y: -4,
                    backgroundColor: "var(--gold)",
                    color: "var(--earth)",
                    borderColor: "var(--gold)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="space-y-5">
            <h3 className="font-heading font-bold text-base" style={{ color: "var(--gold)" }}>
              Explore
            </h3>
            <div className="w-8 h-px" style={{ backgroundColor: "rgba(232,184,75,0.4)" }} aria-hidden="true" />
            <ul className="space-y-3" role="list">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm group relative inline-flex items-center gap-0 overflow-hidden"
                    style={{ color: "rgba(250,246,238,0.65)" }}
                  >
                    <span className="relative">
                      {link.label}
                      {/* Underline slides in from left */}
                      <span
                        className="absolute bottom-0 left-0 h-px w-full"
                        style={{
                          background: "var(--gold)",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="space-y-5">
            <h3 className="font-heading font-bold text-base" style={{ color: "var(--gold)" }}>
              Contact
            </h3>
            <div className="w-8 h-px" style={{ backgroundColor: "rgba(232,184,75,0.4)" }} aria-hidden="true" />
            <div className="space-y-4">
              <p className="font-heading font-bold text-sm" style={{ color: "var(--parchment)" }}>
                AnjaHak Enterprises
              </p>

              {/* Address */}
              <address className="not-italic">
                <div className="flex gap-2.5">
                  <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} aria-hidden="true" />
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(250,246,238,0.65)" }}>
                    147 Koitobos Road,<br />
                    P.O. Box 15060, 0509,<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </address>

              {/* Phones */}
              <div className="space-y-1.5">
                {phones.map((phone) => (
                  <div key={phone} className="flex items-center gap-2.5">
                    <Phone size={12} style={{ color: "var(--gold)" }} aria-hidden="true" />
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="font-label text-xs tracking-wide transition-colors duration-200 hover:text-[var(--gold)]"
                      style={{ color: "rgba(250,246,238,0.65)" }}
                      aria-label={`Call ${phone}`}
                    >
                      {phone}
                    </a>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail size={12} style={{ color: "var(--gold)" }} aria-hidden="true" />
                <a
                  href="mailto:info@anjahak.com"
                  className="font-sans text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                  style={{ color: "rgba(250,246,238,0.65)" }}
                  aria-label="Email AnjaHak at info@anjahak.com"
                >
                  info@anjahak.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t"
          style={{ borderTopColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="font-label text-[0.65rem] tracking-wide" style={{ color: "rgba(250,246,238,0.4)" }}>
            © {new Date().getFullYear()} AnjaHak Enterprises. All rights reserved.
          </p>
          <p className="font-label text-[0.65rem] tracking-widest uppercase" style={{ color: "rgba(232,184,75,0.5)" }}>
            Natural Organic Produce · Quality Exports
          </p>
        </div>

        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center glass-card will-change-transform"
          style={{ color: "var(--gold)" }}
          aria-label="Scroll to top of page"
        >
          <ChevronUp size={18} aria-hidden="true" />
        </motion.button>
      </div>
    </footer>
  );
}
