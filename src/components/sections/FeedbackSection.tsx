"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send, CheckCircle } from "lucide-react";
import { staggerContainer, cardItem, successReveal, slideUp } from "@/lib/animations";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  rating: z.number().min(1, "Please select a rating").max(5),
  source: z.string().min(1, "Please tell us how you found us"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const countries = [
  "Kenya", "USA", "UK", "UAE", "Saudi Arabia", "Qatar",
  "Germany", "Netherlands", "China", "India", "Other",
];

const sources = [
  "Google", "LinkedIn", "Trade Show", "Referral", "Social Media", "Other",
];

type FormState = "idle" | "loading" | "success";

function StarRating({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (v: number) => void;
  error?: string;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div>
      <p className="form-label mb-2">
        Rating <span style={{ color: "var(--harvest)" }}>*</span>
      </p>
      <div className="flex gap-1" role="group" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            whileTap={{ scale: 1.35 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Rate ${n} out of 5 stars`}
            aria-pressed={value === n}
            className="focus:outline-none focus-visible:ring-2 rounded"
            style={{ color: n <= (hovered || value) ? "var(--gold)" : "rgba(26,18,8,0.2)" }}
          >
            <Star
              size={28}
              fill={n <= (hovered || value) ? "var(--gold)" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </motion.button>
        ))}
      </div>
      {error && <p className="form-error mt-1">{error}</p>}
    </div>
  );
}

export default function FeedbackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 0 },
  });

  const rating = watch("rating");

  const onSubmit = async (_data: FormData) => {
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("success");
  };

  const handleReset = () => {
    reset();
    setFormState("idle");
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--dusk)" }}
      aria-labelledby="feedback-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-start">

          {/* Left column */}
          <motion.div
            className="lg:sticky lg:top-28"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              className="section-label"
              style={{ color: "var(--sage)" }}
              variants={cardItem}
            >
              YOUR VOICE MATTERS
            </motion.span>

            <motion.h2
              id="feedback-heading"
              className="font-heading font-bold mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--earth)" }}
              variants={cardItem}
            >
              Share Your{" "}
              <span
                className="font-display italic"
                style={{ color: "var(--harvest)" }}
              >
                Experience
              </span>
            </motion.h2>

            <motion.p
              className="font-sans text-base leading-relaxed mb-10"
              style={{ color: "rgba(26,18,8,0.68)" }}
              variants={cardItem}
            >
              We are committed to delivering excellence at every step. Your
              feedback helps us grow and serve our global partners better.
            </motion.p>

            <motion.div className="space-y-5" variants={staggerContainer}>
              {[
                { emoji: "🌍", text: "Trusted by buyers across 4 continents" },
                { emoji: "✅", text: "99% client satisfaction rating" },
                { emoji: "🤝", text: "Long-term partnerships built on quality" },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4 rounded-2xl p-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.7)",
                  }}
                  variants={cardItem}
                >
                  <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                  <p className="font-sans font-medium text-sm" style={{ color: "var(--earth)" }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — form card */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  /* Success state */
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
                      Thank You!
                    </h3>
                    <p className="font-sans text-sm leading-relaxed max-w-sm" style={{ color: "rgba(26,18,8,0.65)" }}>
                      Your feedback has been received. We appreciate you taking the
                      time to share your experience with AnjaHak Enterprises.
                    </p>
                    <button onClick={handleReset} className="btn-ghost mt-2" aria-label="Submit another response">
                      Submit another response
                    </button>
                  </motion.div>
                ) : (
                  /* Form state */
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    aria-label="Feedback form"
                  >
                    <h3
                      className="font-heading font-bold text-xl mb-6"
                      style={{ color: "var(--earth)" }}
                    >
                      Leave a Review
                    </h3>

                    {/* Star rating */}
                    <div className="mb-6">
                      <StarRating
                        value={rating}
                        onChange={(v) => setValue("rating", v, { shouldValidate: true })}
                        error={errors.rating?.message}
                      />
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Name <span style={{ color: "var(--harvest)" }}>*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-input"
                          placeholder="Your full name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          {...register("name")}
                        />
                        {errors.name && (
                          <p id="name-error" className="form-error">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="form-label">
                          Email <span style={{ color: "var(--harvest)" }}>*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-input"
                          placeholder="your@email.com"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p id="email-error" className="form-error">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Company + Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="company" className="form-label">Company</label>
                        <input
                          id="company"
                          type="text"
                          className="form-input"
                          placeholder="Your company (optional)"
                          {...register("company")}
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="form-label">
                          Country <span style={{ color: "var(--harvest)" }}>*</span>
                        </label>
                        <select
                          id="country"
                          className="form-input"
                          aria-required="true"
                          aria-invalid={!!errors.country}
                          aria-describedby={errors.country ? "country-error" : undefined}
                          {...register("country")}
                        >
                          <option value="">Select country</option>
                          {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {errors.country && (
                          <p id="country-error" className="form-error">{errors.country.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Source */}
                    <div className="mb-4">
                      <label htmlFor="source" className="form-label">
                        How did you hear about us?{" "}
                        <span style={{ color: "var(--harvest)" }}>*</span>
                      </label>
                      <select
                        id="source"
                        className="form-input"
                        aria-required="true"
                        aria-invalid={!!errors.source}
                        aria-describedby={errors.source ? "source-error" : undefined}
                        {...register("source")}
                      >
                        <option value="">Select source</option>
                        {sources.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.source && (
                        <p id="source-error" className="form-error">{errors.source.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label htmlFor="message" className="form-label">
                        Message <span style={{ color: "var(--harvest)" }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="form-input"
                        placeholder="Share your experience with AnjaHak…"
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p id="message-error" className="form-error">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-primary w-full justify-center"
                      disabled={formState === "loading"}
                      aria-label="Submit your feedback"
                    >
                      {formState === "loading" ? (
                        <>
                          <span className="spinner" aria-hidden="true" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Feedback
                          <Send size={15} aria-hidden="true" />
                        </>
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
  );
}
