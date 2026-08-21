import type { Metadata } from "next";
import Image from "next/image";
import { sectorBySlug } from "@/content/sectors";
import { certifications } from "@/content/certifications";
import { caseStudiesBySector } from "@/content/caseStudies";
import {
  afterSalesSupport,
  equipmentPortfolio,
  projectLifecycle,
  qualityMandate,
} from "@/content/healthcare";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Lede,
  Section,
} from "@/components/ui";

const sector = sectorBySlug.healthcare;
const project = caseStudiesBySector("healthcare")[0];
const healthcareCerts = certifications.filter((c) => c.scope !== "All sectors");

export const metadata: Metadata = {
  title: "Healthcare Infrastructure Solutions",
  description: sector.heroCopy,
  openGraph: { title: sector.pageTitle, description: sector.heroCopy },
};

export default function HealthcarePage() {
  return (
    <>
      <section className="border-b border-hairline">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
          <div>
            <Eyebrow>Healthcare</Eyebrow>
            <Heading level={1} size="lg" className="mt-5">
              {sector.pageTitle}
            </Heading>
            <p className="mt-4 text-sm text-graphite">{sector.pageSubtitle}</p>
            <Lede className="mt-6 text-graphite">{sector.heroCopy}</Lede>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact?sector=healthcare">
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

      {/* Three divisions */}
      <Section>
        <Container>
          <Heading>Three integrated divisions</Heading>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {sector.services.map((group, i) => (
              <Reveal key={group.title} variant="card" delay={i * 0.08}>
                <ServiceCard
                  title={group.title}
                  items={group.items}
                  defaultExpanded={true}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Equipment portfolio: compact collapsible cards */}
      <Section tone="dim">
        <Container>
          <Heading>Equipment portfolio</Heading>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {equipmentPortfolio.map((group, i) => (
              <Reveal key={group.title} variant="card" delay={i * 0.07}>
                <ServiceCard
                  title={group.title}
                  items={group.items}
                  defaultExpanded={false}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Turnkey lifecycle: numbered progression, verb-led names */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Heading>End-to-end project lifecycle</Heading>
            <Lede className="mt-5 text-graphite">
              Complex hospital installations run under a single accountable management
              umbrella, from first site visit to an active service agreement.
            </Lede>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[4px] bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {projectLifecycle.map((stage, i) => (
              <Reveal
                as="li"
                key={stage.name}
                variant="scale"
                delay={i * 0.06}
                className="bg-bone p-7"
              >
                <span className="font-mono text-xs text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{stage.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-graphite">
                  {stage.scope}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* After-sales: hairline two-column, deliberately not cards */}
      <Section tone="ink">
        <Container>
          <Heading>Support after installation</Heading>
          <dl className="mt-12 grid gap-x-16 md:grid-cols-2">
            {afterSalesSupport.map((s, i) => (
              <Reveal
                key={s.title}
                variant="slide"
                delay={i * 0.07}
                className="border-t border-hairline-dark py-7"
              >
                <dt className="text-lg font-semibold text-bone">{s.title}</dt>
                <dd className="measure mt-2.5 text-sm leading-relaxed text-bone/65">
                  {s.copy}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Featured project */}
      <Section id="project" className="pt-0 md:pt-0">
        <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden md:h-[54vh]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Container>
          <Reveal
            variant="rotate"
            className="relative z-10 -mt-16 max-w-3xl rounded-[4px] border border-hairline bg-white p-8 md:-mt-28 md:p-12"
          >
            <Eyebrow>Project record</Eyebrow>
            <Heading level={2} size="md" className="mt-4">
              {project.title}
            </Heading>
            <p className="mt-2 text-sm text-graphite">{project.client}</p>
            <p className="measure mt-5 leading-relaxed text-graphite">{project.scope}</p>
            <ul className="mt-7 space-y-3 border-t border-hairline pt-6">
              {project.deliverables.map((d) => (
                <li key={d} className="text-sm leading-relaxed text-graphite">
                  {d}
                </li>
              ))}
            </ul>
            <p className="measure mt-6 border-t border-hairline pt-6 leading-relaxed text-ink">
              {project.result}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Quality and regulatory */}
      <Section tone="dim">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Heading size="md">Quality and regulatory alignment</Heading>
              <p className="measure mt-5 leading-relaxed text-graphite">{qualityMandate}</p>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-[4px] bg-hairline">
              {healthcareCerts.map((c) => (
                <div key={c.abbr} className="bg-bone-dim px-6 py-5">
                  <dt className="font-mono text-sm text-ink">{c.abbr}</dt>
                  <dd className="mt-1.5 text-sm text-graphite">
                    {c.full}. {c.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section tone="oxblood">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Heading>{sector.cta.primary}</Heading>
              <p className="measure mt-5 leading-relaxed text-bone/70">
                Facility planning, equipment specification, or biomedical support. Tell us
                where the project stands.
              </p>
            </div>
            <ButtonLink href="/contact?sector=healthcare" variant="onDark">
              Start an inquiry
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
