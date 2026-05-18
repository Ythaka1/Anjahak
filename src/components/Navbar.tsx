"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Our Products" },
  { href: "/contact", label: "Contact Us" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 80));
  }, [scrollY]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.nav
        animate={
          scrolled
            ? {
                backgroundColor: "rgba(250,246,238,0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 1px 0 rgba(26,18,8,0.06)",
              }
            : {
                backgroundColor: "rgba(0,0,0,0)",
                backdropFilter: "blur(0px) saturate(100%)",
                boxShadow: "none",
              }
        }
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={
          scrolled
            ? { borderBottomColor: "rgba(255,255,255,0.3)" }
            : { borderBottomColor: "transparent" }
        }
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="AnjaHak Enterprises — Home"
            >
              <Image
                src="/images/logo.png"
                alt="AnjaHak Enterprises"
                width={52}
                height={52}
                priority
                className="object-contain transition-transform duration-500 group-hover:scale-110"
                style={{ mixBlendMode: "multiply" }}
              />
              <div className="flex flex-col leading-tight">
                <span
                  className="font-heading font-bold text-lg leading-none"
                  style={{ color: scrolled ? "var(--forest)" : "var(--parchment)" }}
                >
                  AnjaHak
                </span>
                <span
                  className="font-label text-[0.6rem] tracking-widest uppercase hidden sm:block"
                  style={{ color: scrolled ? "var(--sage)" : "rgba(250,246,238,0.65)" }}
                >
                  Enterprises
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <ul
              className="hidden lg:flex items-center gap-8"
              role="list"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative font-sans text-sm font-medium transition-colors duration-200 group"
                    style={{
                      color: isActive(link.href)
                        ? "var(--forest)"
                        : scrolled
                        ? "var(--earth)"
                        : "var(--parchment)",
                    }}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300"
                      style={{
                        width: isActive(link.href) ? "100%" : "0%",
                        backgroundColor: "var(--harvest)",
                      }}
                    />
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300"
                      style={{
                        width: "0%",
                        backgroundColor: "var(--gold)",
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right side: phone + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+254721377422"
                className="flex items-center gap-1.5 font-label text-[0.7rem] tracking-wide transition-opacity hover:opacity-80"
                style={{
                  color: scrolled ? "var(--sage)" : "rgba(250,246,238,0.75)",
                }}
                aria-label="Call AnjaHak: +254 721 377 422"
              >
                <Phone size={11} />
                +254 721 377 422
              </a>
              <Link
                href="/contact"
                className="btn-primary text-sm px-5 py-2.5"
                aria-label="Get a quote from AnjaHak"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: scrolled ? "var(--earth)" : "var(--parchment)" }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[72px] left-0 right-0 z-40 overflow-hidden glass-mobile-menu lg:hidden"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-3.5 border-b font-sans font-medium text-base"
                    style={{
                      color: isActive(link.href)
                        ? "var(--harvest)"
                        : "var(--earth)",
                      borderBottomColor: "rgba(26,18,8,0.08)",
                    }}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "var(--harvest)" }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+254721377422"
                  className="flex items-center gap-2 font-label text-xs tracking-wide"
                  style={{ color: "var(--sage)" }}
                  aria-label="Call AnjaHak"
                >
                  <Phone size={12} />
                  +254 721 377 422
                </a>
                <Link
                  href="/contact"
                  className="btn-primary text-sm text-center justify-center"
                  aria-label="Get a quote from AnjaHak"
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
