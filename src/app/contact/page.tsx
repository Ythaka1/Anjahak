"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { staggerContainer, cardItem, slideUp, successReveal, slideInLeft, slideInRight } from "@/lib/animations";

function InfoTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 glass-card rounded-xl px-3 py-1.5 pointer-events-none whitespace-nowrap z-10"
          >
            <p className="font-sans text-xs font-medium" style={{ color: "var(--earth)" }}>{label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;
type FormState = "idle" | "loading" | "success";

const phones = [
  "+254 721 377 422",
  "+254 787 353 676",
  "+254 738 690 998",
  "+254 704 925 908",
];

const socials = [
  { Icon: TwitterIcon, label: "Twitter / X", href: "#" },
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: LinkedInIcon, label: "LinkedIn", href: "#" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="relative pt-36 pb-24 grain-overlay"
        style={{ backgroundColor: "var(--forest)" }}
        aria-label="Contact hero"
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
            REACH OUT
          </motion.span>
          <motion.h1
            className="font-heading font-bold mt-2"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--parchment)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="font-sans text-base mt-4 max-w-lg mx-auto"
            style={{ color: "rgba(250,246,238,0.65)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Ready to source premium African produce? Our team is here to help.
          </motion.p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
          aria-hidden="true"
        />
      </section>

      {/* Contact body */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--parchment)" }}
        aria-label="Contact information and form"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — contact info */}
            <motion.div
              className="space-y-8"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.span className="section-label" style={{ color: "var(--sage)" }} variants={cardItem}>
                  GET IN TOUCH
                </motion.span>
                <motion.h2
                  className="font-heading font-bold mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--earth)" }}
                  variants={slideUp}
                >
                  We&apos;d Love to Hear From You
                </motion.h2>
                <motion.p
                  className="font-sans text-base leading-relaxed"
                  style={{ color: "rgba(26,18,8,0.68)" }}
                  variants={cardItem}
                >
                  Whether you&apos;re looking to source premium produce, build a
                  long-term supply relationship, or simply want more information
                  — reach out and our export team will respond promptly.
                </motion.p>
              </motion.div>

              {/* Info cards */}
              <div className="space-y-4">
                {/* Address */}
                <InfoTooltip label="Open in Maps">
                  <a
                    href="https://maps.google.com/?q=147+Koitobos+Road+Nairobi+Kenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-5 rounded-2xl transition-colors hover:bg-[rgba(27,58,45,0.1)]"
                    style={{ backgroundColor: "rgba(27,58,45,0.06)" }}
                    aria-label="Open AnjaHak address in Google Maps"
                  >
                    <div
                      className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: "var(--forest)" }}
                      aria-hidden="true"
                    >
                      <MapPin size={16} color="var(--gold)" />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-sm mb-1" style={{ color: "var(--earth)" }}>
                        Address
                      </p>
                      <address className="not-italic font-sans text-sm leading-relaxed" style={{ color: "rgba(26,18,8,0.65)" }}>
                        147 Koitobos Road, P.O. Box 15060, 0509<br />
                        Nairobi, Kenya
                      </address>
                    </div>
                  </a>
                </InfoTooltip>

                {/* Phones */}
                <div
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ backgroundColor: "rgba(27,58,45,0.06)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "var(--forest)" }}
                    aria-hidden="true"
                  >
                    <Phone size={16} color="var(--gold)" />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-sm mb-2" style={{ color: "var(--earth)" }}>
                      Phone Numbers
                    </p>
                    <div className="space-y-1">
                      {phones.map((phone) => (
                        <InfoTooltip key={phone} label="Click to call">
                          <a
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="block font-label text-xs tracking-wide transition-colors hover:text-[var(--harvest)]"
                            style={{ color: "rgba(26,18,8,0.65)" }}
                            aria-label={`Call ${phone}`}
                          >
                            {phone}
                          </a>
                        </InfoTooltip>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ backgroundColor: "rgba(27,58,45,0.06)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "var(--forest)" }}
                    aria-hidden="true"
                  >
                    <Mail size={16} color="var(--gold)" />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-sm mb-1" style={{ color: "var(--earth)" }}>
                      Email
                    </p>
                    <InfoTooltip label="Send email">
                      <a
                        href="mailto:info@anjahak.com"
                        className="font-sans text-sm transition-colors hover:text-[var(--harvest)]"
                        style={{ color: "rgba(26,18,8,0.65)" }}
                        aria-label="Email info@anjahak.com"
                      >
                        info@anjahak.com
                      </a>
                    </InfoTooltip>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="font-label text-[0.65rem] tracking-widest uppercase mb-4" style={{ color: "var(--sage)" }}>
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socials.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[var(--forest)] hover:border-[var(--forest)] hover:text-[var(--parchment)]"
                      style={{ borderColor: "rgba(26,18,8,0.2)", color: "var(--earth)" }}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="glass-card rounded-3xl p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {formState === "success" ? (
                    <motion.div
                      key="success"
                      variants={successReveal}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex flex-col items-center text-center py-8 gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(45,89,64,0.1)" }}
                      >
                        <CheckCircle size={40} style={{ color: "var(--canopy)" }} aria-hidden="true" />
                      </motion.div>
                      <h3 className="font-heading font-bold text-2xl" style={{ color: "var(--earth)" }}>
                        Message Sent!
                      </h3>
                      <p className="font-sans text-sm leading-relaxed max-w-sm" style={{ color: "rgba(26,18,8,0.65)" }}>
                        Thank you for reaching out. Our team will get back to you
                        within 24 hours.
                      </p>
                      <button onClick={() => { reset(); setFormState("idle"); }} className="btn-ghost mt-2">
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      aria-label="Contact form"
                    >
                      <h3 className="font-heading font-bold text-xl mb-6" style={{ color: "var(--earth)" }}>
                        Send a Message
                      </h3>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="contact-name" className="form-label">
                            Name <span style={{ color: "var(--harvest)" }}>*</span>
                          </label>
                          <input id="contact-name" type="text" className="form-input" placeholder="Your name" {...register("name")} aria-required="true" aria-invalid={!!errors.name} />
                          {errors.name && <p className="form-error">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="form-label">
                            Email <span style={{ color: "var(--harvest)" }}>*</span>
                          </label>
                          <input id="contact-email" type="email" className="form-input" placeholder="your@email.com" {...register("email")} aria-required="true" aria-invalid={!!errors.email} />
                          {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>
                      </div>

                      {/* Company + Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="contact-company" className="form-label">Company</label>
                          <input id="contact-company" type="text" className="form-input" placeholder="Your company" {...register("company")} />
                        </div>
                        <div>
                          <label htmlFor="contact-subject" className="form-label">
                            Subject <span style={{ color: "var(--harvest)" }}>*</span>
                          </label>
                          <input id="contact-subject" type="text" className="form-input" placeholder="How can we help?" {...register("subject")} aria-required="true" aria-invalid={!!errors.subject} />
                          {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <label htmlFor="contact-message" className="form-label">
                          Message <span style={{ color: "var(--harvest)" }}>*</span>
                        </label>
                        <textarea id="contact-message" rows={5} className="form-input" placeholder="Tell us about your requirements…" {...register("message")} aria-required="true" aria-invalid={!!errors.message} />
                        {errors.message && <p className="form-error">{errors.message.message}</p>}
                      </div>

                      <button type="submit" className="btn-primary w-full justify-center" disabled={formState === "loading"} aria-label="Send your message">
                        {formState === "loading" ? (
                          <><span className="spinner" aria-hidden="true" /> Sending…</>
                        ) : (
                          <>Send Message <Send size={15} aria-hidden="true" /></>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section
        className="py-0"
        style={{ backgroundColor: "#fff" }}
        aria-label="AnjaHak location map"
      >
        <div className="w-full h-80 lg:h-96 overflow-hidden" style={{ filter: "saturate(0.85)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.3588766508!2d36.707046!3d-1.3031934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1680000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AnjaHak Enterprises location in Nairobi, Kenya"
          />
        </div>
      </section>
    </main>
  );
}
