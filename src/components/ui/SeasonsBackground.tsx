"use client";

import { useEffect } from "react";

export default function SeasonsBackground() {
  useEffect(() => {
    const hour = new Date().getHours();
    let tint = "rgba(200, 146, 10, 0)"; // default: no tint

    if (hour >= 6 && hour < 12) {
      tint = "rgba(232, 184, 75, 0.04)"; // morning: warm golden
    } else if (hour >= 12 && hour < 18) {
      tint = "rgba(200, 146, 10, 0)"; // noon: neutral
    } else if (hour >= 18 && hour < 22) {
      tint = "rgba(200, 120, 10, 0.055)"; // golden hour: amber
    } else {
      tint = "rgba(90, 110, 160, 0.04)"; // night: subtle cool
    }

    document.documentElement.style.setProperty("--season-overlay", tint);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "var(--season-overlay)",
        zIndex: 0,
        transition: "background 3s ease",
      }}
    />
  );
}
