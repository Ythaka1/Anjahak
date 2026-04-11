"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
          key="page-loader"
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
      )}
    </AnimatePresence>
  );
}
