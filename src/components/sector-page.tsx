import Image from "next/image";
import type { Sector } from "@/content/sectors";
import { company } from "@/content/company";
import { Reveal } from "./reveal";
import { ButtonLink, Container, Heading, Lede, Section } from "./ui";

/**
 * Shared layout for agriculture, mining, and construction. Structural identity
 * is what keeps the three sectors at equal visual weight without relying on
 * anyone remembering to keep them balanced by hand.
 */
export function SectorPage({ sector }: { sector: Sector }) {
  return (
    <>
      <section className="border-b border-hairline">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
              {sector.name}
            </p>
            <Heading level={1} size="lg" className="mt-5">
              {sector.pageTitle}
            </Heading>
            <p className="mt-4 text-sm text-graphite">{sector.pageSubtitle}</p>
            <Lede className="mt-6 text-graphite">{sector.heroCopy}</Lede>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/contact?sector=${sector.slug}`}>
                {sector.cta.primary}
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-[4px] bg-bone-dim">
            <Image
              src={sector.image.src}
              alt={sector.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section tone="ink">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Heading>{sector.valueHeadline}</Heading>
            <p className="measure text-base leading-relaxed text-bone/70">
              {sector.valueCopy}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading>How we serve {sector.name.toLowerCase()}</Heading>
          <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {sector.services.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.07}>
                <h3 className="border-t-2 border-signal pt-4 text-lg font-semibold text-ink">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-graphite">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Heading size="md">Who we work with</Heading>
            <ul className="grid gap-px overflow-hidden rounded-[4px] bg-hairline sm:grid-cols-2">
              {sector.targetMarkets.map((m) => (
                <li key={m} className="bg-bone-dim px-6 py-5 text-sm text-ink">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="oxblood">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Heading>{sector.cta.primary}</Heading>
              <p className="measure mt-5 leading-relaxed text-bone/70">
                {sector.cta.secondary}. {company.responsePromise}
              </p>
            </div>
            <ButtonLink href={`/contact?sector=${sector.slug}`} variant="onDark">
              Start an inquiry
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
