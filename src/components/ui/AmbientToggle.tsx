"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientToggle() {
  const [on, setOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("anjahak-ambient");
    if (stored === "true") setOn(true);
  }, []);

  const toggle = () => {
    setOn((v) => {
      const next = !v;
      localStorage.setItem("anjahak-ambient", String(next));
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title={on ? "Disable ambient sounds" : "Enable ambient sounds"}
      aria-label={on ? "Disable ambient sounds" : "Enable ambient sounds"}
      aria-pressed={on}
      className="fixed bottom-[5.5rem] left-5 z-40 w-11 h-11 rounded-full flex items-center justify-center glass-card shadow-card-hover will-change-transform"
      style={{ color: on ? "var(--harvest)" : "rgba(26,18,8,0.45)" }}
    >
      {on ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
    </motion.button>
  );
}
