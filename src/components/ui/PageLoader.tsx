"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <>
          {/* Progress bar */}
          <motion.div
            key="page-loader-bar"
            className="fixed top-0 left-0 right-0 z-[9999]"
            style={{
              height: "3px",
              backgroundColor: "var(--gold)",
              transformOrigin: "left center",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Logo overlay flash */}
          <motion.div
            key="page-transition-overlay"
            className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
            style={{ backgroundColor: "#1B3A2D" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.3, 0.7, 1] }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              style={{
                backgroundColor: "rgba(250,246,238,0.92)",
                borderRadius: "16px",
                padding: "10px",
                display: "inline-flex",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="AnjaHak"
                width={80}
                height={80}
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
