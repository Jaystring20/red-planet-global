"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealVariant = "fade" | "slide" | "scale" | "rotate" | "card" | "list-item";

/**
 * Enhanced scroll-reveal leaf. MOTION_INTENSITY 6-8: entry animations with
 * layered motion (opacity, transform, rotation). Respects prefers-reduced-motion.
 * Communicates hierarchy through stagger and material properties.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
  variant = "slide",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
  className?: string;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  // Motion presets by variant. Each carries semantic meaning, not just aesthetics.
  const presets = {
    fade: {
      initial: { opacity: 0 },
      final: { opacity: 1 },
      duration: 0.45,
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      final: { opacity: 1, y: 0 },
      duration: 0.55,
    },
    scale: {
      initial: { opacity: 0, scale: 0.92 },
      final: { opacity: 1, scale: 1 },
      duration: 0.5,
    },
    rotate: {
      initial: { opacity: 0, y: 16, rotateX: -8 },
      final: { opacity: 1, y: 0, rotateX: 0 },
      duration: 0.6,
    },
    card: {
      // Cards: subtle lift with shadow bloom
      initial: { opacity: 0, y: 24, scale: 0.96 },
      final: { opacity: 1, y: 0, scale: 1 },
      duration: 0.58,
    },
    "list-item": {
      // List items: light slide with tight timing
      initial: { opacity: 0, x: -12 },
      final: { opacity: 1, x: 0 },
      duration: 0.4,
    },
  };

  const preset = presets[variant];

  return (
    <Tag
      className={className}
      initial={reduce ? false : preset.initial}
      whileInView={preset.final}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: preset.duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easing: confident arrival
      }}
    >
      {children}
    </Tag>
  );
}
