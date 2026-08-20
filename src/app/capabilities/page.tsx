import type { Metadata } from "next";
import Image from "next/image";
import { capabilities } from "@/content/capabilities";
import { sectors } from "@/content/sectors";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Heading, Lede, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Core Capabilities",
  description:
    "Three core capabilities, trading, consulting, and export services, applied across healthcare, agriculture, mining, and construction.",
};

const capabilityImages: Record<string, { src: string; alt: string } | null> = {
  trading: {
    src: "/img/capabilities/trading.webp",
    alt: "Stacked freight containers served by a rubber tyre gantry crane",
  },
  consulting: null,
  export: {
    src: "/img/capabilities/export.webp",
    alt: "Distribution warehouse with racked pallets and handling equipment",
  },
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <Container className="py-14 lg:py-20">
          <div className="max-w-3xl">
            <Heading level={1} size="lg">
              Three core capabilities applied across four sectors
            </Heading>
            <Lede className="mt-6 text-graphite">
              The same procurement, consulting, and trade infrastructure serves every
              vertical. That is what makes the integrated model work rather than dilute.
            </Lede>
          </div>
        </Container>
      </section>

      {capabilities.map((c, i) => {
        const img = capabilityImages[c.slug];
        const inverted = i === 1;
        return (
          <Section key={c.slug} tone={inverted ? "ink" : i === 2 ? "dim" : "bone"}>
            <Container>
              <div
                className={`grid gap-10 lg:gap-16 ${
                  img ? "lg:grid-cols-[1.15fr_0.85fr]" : ""
                }`}
              >
                <div>
                  <Heading
                    className={`border-t-2 pt-6 ${inverted ? "border-gold" : "border-signal"}`}
                  >
                    {c.title}
                  </Heading>
                  <p
                    className={`measure mt-5 leading-relaxed ${
                      inverted ? "text-bone/70" : "text-graphite"
                    }`}
                  >
                    {c.summary}
                  </p>

                  <h3
                    className={`mt-10 text-sm font-medium ${
                      inverted ? "text-bone" : "text-ink"
                    }`}
                  >
                    Applied by sector
                  </h3>
                  <dl
                    className={`mt-4 divide-y ${
                      inverted ? "divide-hairline-dark" : "divide-hairline"
                    } border-t ${inverted ? "border-hairline-dark" : "border-hairline"}`}
                  >
                    {sectors.map((s) => (
                      <div key={s.slug} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]">
                        <dt
                          className={`text-sm font-medium ${
                            inverted ? "text-bone" : "text-ink"
                          }`}
                        >
                          {s.name}
                        </dt>
                        <dd
                          className={`text-sm leading-relaxed ${
                            inverted ? "text-bone/65" : "text-graphite"
                          }`}
                        >
                          {c.application[s.slug]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {img && (
                  <Reveal className="lg:pt-14">
                    <div className="relative aspect-3/4 overflow-hidden rounded-[4px] bg-bone-dim">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 38vw"
                        className="object-cover"
                      />
                    </div>
                    <ul className="mt-6 space-y-2.5">
                      {c.strengths.map((s) => (
                        <li key={s} className="text-sm leading-relaxed text-graphite">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {!img && (
                  <ul className="mt-10 grid gap-px overflow-hidden rounded-[4px] bg-hairline-dark sm:grid-cols-2">
                    {c.strengths.map((s) => (
                      <li key={s} className="bg-ink px-6 py-5 text-sm text-bone/80">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section tone="oxblood">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading>Which capability does your project need?</Heading>
            <ButtonLink href="/contact" variant="onDark">
              Start an inquiry
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
