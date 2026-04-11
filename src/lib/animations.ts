import type { Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const slideUpFast: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const heroWord: Variants = {
  hidden: { y: 40, opacity: 0, rotateX: 20 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const successReveal: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const mobileMenu: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: EASE },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: EASE },
  },
};

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const shakeX: Variants = {
  hidden: { x: 0 },
  visible: {
    x: [0, 6, -6, 4, -4, 2, -2, 0],
    transition: { duration: 0.45, ease: "easeOut" },
  },
};
