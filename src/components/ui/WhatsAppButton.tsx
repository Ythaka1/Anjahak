"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -4 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-12 left-0 glass-card rounded-xl px-3 py-2 whitespace-nowrap pointer-events-none"
          >
            <p className="font-sans text-xs font-medium" style={{ color: "var(--earth)" }}>
              Chat on WhatsApp
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full dot-ping"
          style={{ backgroundColor: "#25D366", opacity: 0.4 }}
          aria-hidden="true"
        />
        <motion.a
          href="https://wa.me/254721377422"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
          className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-card-hover will-change-transform"
          style={{ backgroundColor: "#25D366", color: "#fff" }}
          aria-label="Chat with AnjaHak on WhatsApp"
        >
          <MessageCircle size={20} aria-hidden="true" />
        </motion.a>
      </div>
    </div>
  );
}
