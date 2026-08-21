"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  items: string[];
  icon?: ReactNode;
  defaultExpanded?: boolean;
}

/**
 * Compact service card with collapsible list. Reduces visual clutter while
 * maintaining access to detailed information. Animates open/close smoothly.
 */
export function ServiceCard({
  title,
  items,
  icon,
  defaultExpanded = false,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-[4px] border border-hairline bg-bone overflow-hidden transition-colors hover:bg-bone-dim">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-3 p-5 text-left transition-colors hover:bg-bone-dim"
      >
        <div className="flex items-center gap-3 min-w-0">
          {icon && <div className="flex-shrink-0 text-signal">{icon}</div>}
          <h3 className="text-base font-semibold text-ink leading-tight">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <CaretDown size={16} weight="fill" className="text-graphite" />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline"
          >
            <ul className="space-y-2.5 p-5">
              {items.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-graphite flex gap-3"
                >
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-signal/40 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
