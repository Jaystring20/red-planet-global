import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { sectors } from "@/content/sectors";
import { Container } from "./ui";

const year = 2026;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="Red Planet Global Concepts Limited"
              width={614}
              height={137}
              className="h-9 w-auto"
            />
            <p className="measure mt-6 text-sm leading-relaxed text-bone/70">
              Bridging global standards with local execution across healthcare,
              agriculture, mining, and construction.
            </p>
            <p className="mt-6 font-mono text-xs tracking-wide text-gold">{company.rc}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-bone">Sectors</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.slug === "healthcare" ? "/healthcare" : `/sectors/${s.slug}`}
                    className="text-bone/70 transition-colors hover:text-bone"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/capabilities"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  Core capabilities
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-bone/70 transition-colors hover:text-bone">
                  About us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-medium text-bone">Contact</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-bone/70">
              <p>
                {company.address.street}
                <br />
                {company.address.area}
                <br />
                {company.address.city}, {company.address.state}
                <br />
                {company.address.country}
              </p>
              <p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="transition-colors hover:text-bone"
                >
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.emails.general}`}
                  className="transition-colors hover:text-bone"
                >
                  {company.emails.general}
                </a>
              </p>
              <p className="text-bone/50">{company.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline-dark pt-8 text-xs text-bone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/credits"
              className="whitespace-nowrap transition-colors hover:text-bone"
            >
              Image credits
            </Link>
            <span>{company.tagline}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
