"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const TICKER_TEXT =
  "🌍 Currently exporting to: Dubai · Singapore · Hamburg · London · Riyadh · Amsterdam · Nairobi · ";

export default function ExportTicker() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("export-ticker-dismissed");
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("export-ticker-dismissed", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -32 }}
          animate={{ y: 0 }}
          exit={{ y: -32 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden flex items-center"
          style={{ backgroundColor: "var(--canopy)", height: "32px", zIndex: 60 }}
          aria-label="Export destinations ticker"
          role="marquee"
        >
          <div
            className="ticker-track flex whitespace-nowrap"
            style={{ animationDuration: "40s" }}
            aria-hidden="true"
          >
            <span className="font-label text-[0.62rem] text-white tracking-wide px-8">
              {TICKER_TEXT}
            </span>
            <span className="font-label text-[0.62rem] text-white tracking-wide px-8">
              {TICKER_TEXT}
            </span>
          </div>
          <button
            onClick={dismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            aria-label="Dismiss ticker"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
