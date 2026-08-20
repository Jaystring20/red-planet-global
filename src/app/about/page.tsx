import type { Metadata } from "next";
import { company, leadership } from "@/content/company";
import { certifications } from "@/content/certifications";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Heading, Lede, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Red Planet Global Concepts Limited, RC 1503922. A Lagos-based multi-sector infrastructure and business solutions enterprise serving Sub-Saharan Africa.",
};

const partnerships = [
  {
    title: "Global OEM manufacturers",
    copy: "Tier-1 medical equipment and industrial manufacturers across Europe, Asia, and North America.",
  },
  {
    title: "Development agencies",
    copy: "International health, agricultural, and economic development organisations.",
  },
  {
    title: "Tertiary institutions",
    copy: "Teaching hospitals, universities, and research centres.",
  },
  {
    title: "Government entities",
    copy: "Health ministries, agricultural agencies, mining authorities, and infrastructure departments.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <Container className="py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
              {company.rc}
            </p>
            <Heading level={1} size="lg" className="mt-5">
              From market gaps to integrated solutions
            </Heading>
            <Lede className="mt-6 text-graphite">
              A Lagos-based multi-sector infrastructure and business solutions enterprise,
              built to bridge global standards with local execution.
            </Lede>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Heading size="md">Our story</Heading>
            <div className="measure space-y-5 leading-relaxed text-graphite">
              <p>
                Red Planet Global Concepts Limited was founded to address infrastructure and
                business challenges across African markets. The starting point was a gap in
                international trade facilitation and business consulting for agricultural,
                mining, and construction enterprises trying to scale and reach global buyers.
              </p>
              <p>
                As the supply chain and regulatory expertise deepened, a more critical gap
                came into view. Sub-Saharan African healthcare institutions needed premium
                medical equipment, facility planning, and long-term biomedical support, but
                were held back by intermediaries, authenticity concerns, and broken supply
                chains.
              </p>
              <p>
                The response was specialised capability: direct OEM relationships, biomedical
                engineering, 24/7 emergency response, and a zero-defect quality mandate. The
                healthcare division is where the technical standard is set, and that standard
                carries into every other sector the company serves.
              </p>
              <p className="text-ink">
                Today the model is three core business areas applied across four industry
                specialisations. Not a generalist trying to be everything, but a specialist in
                African infrastructure and business transformation across four sectors.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <Heading>Leadership</Heading>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p) => (
              <Reveal key={p.name} className="border-t-2 border-signal pt-5">
                <h3 className="text-lg font-semibold text-bone">{p.name}</h3>
                <p className="mt-1 text-sm text-gold">{p.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{p.bio}</p>
              </Reveal>
            ))}
          </div>
          {/*
            TODO(client): four further leadership profiles are described in the brand
            document with [Name] placeholders. Add them to leadership[] in
            src/content/company.ts and they render here automatically.
          */}
          <p className="measure mt-10 text-sm leading-relaxed text-bone/50">
            Divisional leadership across healthcare, supply chain, biomedical engineering,
            agriculture, mining, and construction is drawn from a multidisciplinary team of
            healthcare architects, biomedical engineers, supply chain strategists, certified
            clinical consultants, and regulatory specialists.
          </p>
        </Container>
      </Section>

      <Section tone="dim">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Heading size="md">Regulatory alignment</Heading>
              <p className="measure mt-5 leading-relaxed text-graphite">
                Compliance frameworks are embedded in how projects are scoped and delivered
                rather than addressed at the point of import.
              </p>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-[4px] bg-hairline">
              {certifications.map((c) => (
                <div
                  key={c.abbr}
                  className="grid gap-1 bg-bone-dim px-6 py-5 sm:grid-cols-[130px_1fr]"
                >
                  <dt className="font-mono text-sm text-ink">{c.abbr}</dt>
                  <dd className="text-sm leading-relaxed text-graphite">
                    {c.full}. {c.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading>Partnerships</Heading>
          <dl className="mt-12 grid gap-x-16 md:grid-cols-2">
            {partnerships.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="border-t border-hairline py-7">
                <dt className="text-lg font-semibold text-ink">{p.title}</dt>
                <dd className="measure mt-2.5 text-sm leading-relaxed text-graphite">
                  {p.copy}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="oxblood">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Heading>Work with us</Heading>
              <p className="measure mt-5 leading-relaxed text-bone/70">
                {company.address.street}, {company.address.area}, {company.address.city},{" "}
                {company.address.state}. {company.hours}
              </p>
            </div>
            <ButtonLink href="/contact" variant="onDark">
              Start an inquiry
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
