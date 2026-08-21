"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CaretDown,
  Syringe,
  Leaf,
  Shovel,
  Hammer,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";

const sectors = [
  {
    name: "Healthcare",
    slug: "/healthcare",
    icon: Syringe,
    description: "Medical equipment, installation, and support",
  },
  {
    name: "Agriculture",
    slug: "/sectors/agriculture",
    icon: Leaf,
    description: "Farming equipment and agribusiness solutions",
  },
  {
    name: "Mining",
    slug: "/sectors/mining",
    icon: Shovel,
    description: "Mining equipment and extraction services",
  },
  {
    name: "Construction",
    slug: "/sectors/construction",
    icon: Hammer,
    description: "Construction equipment and project support",
  },
];

const pages = [
  { name: "Capabilities", href: "/capabilities" },
  { name: "About", href: "/about" },
];

/**
 * Mega menu dropdown. Organizes sectors and pages hierarchically with icons
 * and descriptions for better scannability and fast access.
 */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on escape or outside click
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(!open);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 border-b-2 py-1 text-sm transition-colors border-transparent text-graphite hover:text-ink"
      >
        Sectors
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <CaretDown size={14} weight="fill" />
        </motion.div>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 top-full z-50 mt-2 w-max min-w-[520px] max-w-[calc(100vw-32px)] rounded-[4px] border border-hairline bg-white shadow-lg"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-6">
            {/* Sectors Grid */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-graphite mb-4">
                Four sectors
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {sectors.map((sector) => {
                  const Icon = sector.icon;
                  return (
                    <Link
                      key={sector.slug}
                      href={sector.slug}
                      onClick={() => setOpen(false)}
                      className="group flex gap-3 rounded-[4px] p-3 transition-colors hover:bg-bone-dim"
                      role="menuitem"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <Icon
                          size={20}
                          weight="duotone"
                          className="text-signal transition-colors group-hover:text-signal"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-ink group-hover:text-signal transition-colors">
                          {sector.name}
                        </div>
                        <div className="text-xs text-graphite mt-0.5">
                          {sector.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-hairline" />

            {/* Other Pages */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-graphite mb-3">
                Resources
              </h3>
              <div className="flex flex-col gap-2">
                {pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-[4px] px-3 py-2 text-sm text-ink transition-colors hover:bg-bone-dim hover:text-signal"
                    role="menuitem"
                  >
                    {page.name}
                    <ArrowRight
                      size={14}
                      className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
