import type { Sector } from "@/content/sectors";
import { company } from "@/content/company";
import { HeroSection } from "./hero-section";
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
      <HeroSection
        eyebrow={sector.name}
        title={sector.pageTitle}
        subtitle={sector.pageSubtitle}
        lede={sector.heroCopy}
        image={sector.image}
        ctas={[
          {
            label: sector.cta.primary,
            href: `/contact?sector=${sector.slug}`,
            variant: "primary",
          },
        ]}
      />

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
