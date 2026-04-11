import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  Space_Mono,
} from "next/font/google";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/ui/PageLoader";
import ExportTicker from "@/components/ui/ExportTicker";
import AmbientToggle from "@/components/ui/AmbientToggle";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SeasonsBackground from "@/components/ui/SeasonsBackground";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnjaHak Enterprises | Premium African Agricultural Exports",
  description:
    "AnjaHak is a leading exporter of premium organic agricultural produce from Africa — chick peas, roselle hibiscus, soy beans, cashew nuts, halal lamb, and sunflower seeds — connecting Kenya's finest harvests with global markets.",
  keywords: [
    "African agricultural exports",
    "Kenya organic produce",
    "halal lamb export",
    "chick peas Kenya",
    "roselle hibiscus",
    "cashew nuts Africa",
    "premium food exports",
  ],
  openGraph: {
    title: "AnjaHak Enterprises | Premium African Agricultural Exports",
    description:
      "Premium organic agricultural exports from Kenya to global markets. Quality, sustainability, and excellence in every shipment.",
    siteName: "AnjaHak Enterprises",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnjaHak Enterprises | Premium African Agricultural Exports",
    description:
      "Premium organic agricultural exports from Kenya to global markets.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body>
        <MotionConfig reducedMotion="user">
          <PageLoader />
          <SeasonsBackground />
          <Navbar />
          <ExportTicker />
          {children}
          <Footer />
          <WhatsAppButton />
          <AmbientToggle />
        </MotionConfig>
      </body>
    </html>
  );
}
