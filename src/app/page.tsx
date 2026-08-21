import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { company } from "@/content/company";
import { sectors } from "@/content/sectors";
import { capabilities, differentiators } from "@/content/capabilities";
import { certifications } from "@/content/certifications";
import { caseStudies } from "@/content/caseStudies";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Lede,
  Section,
} from "@/components/ui";

const featured = caseStudies[0];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: asymmetric split with floating gold accent bar. */}
      <section className="border-b border-hairline relative overflow-hidden">
        <Container className="relative grid min-h-[calc(100dvh-68px)] items-center py-16 lg:py-20">
          {/* Floating gold accent bar (hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-1/3 -translate-x-1/2 w-1 h-1/3 bg-gold/60 shadow-lg rounded-full" />

          {/* Main grid: 40/60 split */}
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-center">
            {/* Left column: Text (40%) */}
            <div>
              <Reveal variant="fade" delay={0}>
                <Eyebrow>{company.rc}</Eyebrow>
              </Reveal>
              <Reveal variant="slide" delay={0.1}>
                <Heading level={1} size="xl" className="mt-5">
                  Transforming African business across critical sectors
                </Heading>
              </Reveal>
              <Reveal variant="slide" delay={0.2}>
                <Lede className="mt-6 text-graphite">
                  Integrated consulting, strategic trading, and export facilitation for
                  healthcare, agriculture, mining, and construction.
                </Lede>
              </Reveal>
              <Reveal variant="slide" delay={0.3} className="mt-9">
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="#sectors">Explore your sector</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Speak to our team
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            {/* Right column: Image (60%) - rotated with shadow */}
            <Reveal variant="rotate" delay={0.25}>
              <div className="relative aspect-4/3 overflow-visible">
                {/* Rotated image with shadow depth */}
                <div className="absolute inset-0 rounded-[8px] bg-bone-dim shadow-2xl"
                     style={{ transform: 'perspective(1200px) rotateY(-8deg) rotateX(2deg)' }}>
                  <Image
                    src="/img/hero.webp"
                    alt="Container cranes and stacked freight at a deep-water port terminal"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-[8px]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Regulatory alignment band. Marks only, no captions. */}
      <section className="border-b border-hairline bg-bone-dim py-12">
        <Container>
          <div className="text-center mb-6">
            <Eyebrow className="justify-center text-xs">Regulatory alignment</Eyebrow>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 lg:gap-x-16">
            {certifications.map((c) => (
              <li key={c.abbr}>
                <span className="font-mono text-xs font-semibold tracking-widest text-ink">
                  {c.abbr}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. Sector grid: asymmetric bento, exactly four cells. */}
      <Section id="sectors">
        <Container>
          <Heading>Deep expertise across four critical sectors</Heading>
          {/*
            Flat grid in source order. A staggered two-column flow looked better
            at desktop but reordered the sectors on mobile to healthcare, mining,
            agriculture, construction, which breaks the equal-weight intent.
            Uniform crops keep the row rhythm even without the offset.
          */}
          <div className="mt-12 grid items-start gap-x-8 gap-y-14 md:grid-cols-2">
            {sectors.map((s, i) => (
              <Reveal
                key={s.slug}
                as="article"
                variant="card"
                delay={i * 0.12}
              >
                <Link
                  href={s.slug === "healthcare" ? "/healthcare" : `/sectors/${s.slug}`}
                  className="group block rounded-[4px] overflow-hidden border border-hairline bg-white transition-all duration-300 hover:border-signal/30 hover:shadow-lg"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-bone-dim">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 46vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-ink">{s.headline}</h3>
                    <p className="mt-1 text-sm text-signal font-medium">{s.positioning}</p>
                    <p className="measure mt-3 text-sm leading-relaxed text-graphite">
                      {s.cardCopy}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 border-b-2 border-ink pb-1 text-sm font-medium text-ink transition-all group-hover:gap-2">
                      Explore {s.name.toLowerCase()}
                      <ArrowRight
                        size={15}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Integrated model: inverted band, horizontal progression. */}
      <Section tone="ink">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow onDark>Our integrated model</Eyebrow>
            <Heading className="mt-5">
              Three core capabilities applied across four specialisations
            </Heading>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[4px] bg-hairline-dark md:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal
                as="li"
                key={c.slug}
                variant="scale"
                delay={i * 0.1}
                className="bg-ink p-7 md:p-8"
              >
                <h3 className="border-t-2 border-gold pt-5 text-xl font-semibold text-bone">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{c.brief}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10">
            <ButtonLink href="/capabilities" variant="onDark">
              How the model works
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 5. Featured project: full-bleed image with offset copy. */}
      <Section className="pt-0 md:pt-0">
        <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden md:h-[58vh]">
          <Image
            src={featured.image.src}
            alt={featured.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Container>
          {/* White on the bone ground so the overlap reads as a raised panel
              rather than an abruptly cropped image. */}
          <Reveal
            variant="rotate"
            className="relative z-10 -mt-16 max-w-2xl rounded-[4px] border border-hairline bg-white p-8 md:-mt-28 md:p-12"
          >
            <Eyebrow>Featured project</Eyebrow>
            <Heading level={2} size="md" className="mt-4">
              {featured.title}
            </Heading>
            <p className="mt-2 text-sm text-graphite">{featured.client}</p>
            <p className="measure mt-5 leading-relaxed text-graphite">{featured.scope}</p>
            <p className="measure mt-4 leading-relaxed text-ink">{featured.result}</p>
            <Link
              href="/healthcare#project"
              className="mt-7 inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-sm font-medium text-ink"
            >
              Full project scope
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* 6. Differentiators: two-column with enhanced styling. */}
      <Section tone="dim">
        <Container>
          <Heading>Why Red Planet Global</Heading>
          <dl className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {differentiators.map((d, i) => (
              <Reveal
                key={d.title}
                variant="slide"
                delay={i * 0.08}
                className="border-l-2 border-signal pl-6"
              >
                <dt className="text-base font-semibold text-ink">{d.title}</dt>
                <dd className="measure mt-3 text-sm leading-relaxed text-graphite">
                  {d.copy}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 7. Operating facts. Only figures with a documented basis. */}
      <Section tone="oxblood" className="py-14 md:py-16">
        <Container>
          <dl className="grid gap-10 sm:grid-cols-3">
            {[
              { v: "4 hours", l: "Emergency response within Lagos State" },
              { v: "24 hours", l: "Emergency response nationwide" },
              { v: "6 stages", l: "Turnkey project lifecycle, needs analysis to SLA" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-mono text-3xl text-bone md:text-4xl">{s.v}</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-bone/70">{s.l}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 8. Sector-routed CTA row. */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <Heading>Ready to start a conversation?</Heading>
              <Lede className="mt-5 text-graphite">
                Tell us which sector you operate in and our specialist team will respond within 24 hours.
              </Lede>
              <p className="mt-3 text-xs font-medium text-signal uppercase tracking-wide">{company.responsePromise}</p>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-[4px] bg-hairline sm:grid-cols-2 border border-hairline">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/contact?sector=${s.slug}`}
                    className="group flex items-center justify-between gap-4 bg-white px-6 py-6 transition-all hover:bg-bone-dim hover:border-l-2 hover:border-signal hover:pl-5"
                  >
                    <span className="text-sm font-semibold text-ink">{s.name}</span>
                    <ArrowRight
                      size={16}
                      className="text-signal transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
