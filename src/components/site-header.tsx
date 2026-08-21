"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { cx } from "./ui";
import { MegaMenu } from "./mega-menu";

const mobileNav = [
  { href: "/healthcare", label: "Healthcare" },
  { href: "/sectors/agriculture", label: "Agriculture" },
  { href: "/sectors/mining", label: "Mining" },
  { href: "/sectors/construction", label: "Construction" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bone/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[68px] w-full max-w-[1320px] items-center justify-between gap-6 px-5 md:px-8 lg:px-12">
        <Link href="/" aria-label="Red Planet Global Concepts, home" className="shrink-0">
          <Image
            src="/brand/logo-color.png"
            alt="Red Planet Global Concepts Limited"
            width={614}
            height={137}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {/* Mega Menu for Sectors */}
          <MegaMenu />

          {/* Static Links */}
          <Link
            href="/capabilities"
            aria-current={pathname === "/capabilities" ? "page" : undefined}
            className={cx(
              "border-b-2 py-1 text-sm transition-colors",
              pathname === "/capabilities"
                ? "border-signal text-ink"
                : "border-transparent text-graphite hover:text-ink",
            )}
          >
            Capabilities
          </Link>

          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={cx(
              "border-b-2 py-1 text-sm transition-colors",
              pathname === "/about"
                ? "border-signal text-ink"
                : "border-transparent text-graphite hover:text-ink",
            )}
          >
            About
          </Link>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="rounded-[2px] bg-signal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-signal-deep active:translate-y-px"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-[2px] border border-hairline p-2 text-ink lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-hairline bg-bone px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="divide-y divide-hairline">
            {mobileNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-base text-ink"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-[2px] bg-signal px-5 py-3 text-center text-sm font-medium text-white"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
