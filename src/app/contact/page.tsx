import type { Metadata } from "next";
import { Suspense } from "react";
import { company } from "@/content/company";
import { sectors } from "@/content/sectors";
import { Container, Heading, Lede, Section } from "@/components/ui";
import { InquiryForm } from "./inquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Red Planet Global Concepts Limited in ${company.address.city}, ${company.address.state}. Sector-specific inquiries for healthcare, agriculture, mining, and construction.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <Container className="py-14 lg:py-20">
          <div className="max-w-3xl">
            <Heading level={1} size="lg">
              Ready to transform your business or institution?
            </Heading>
            <Lede className="mt-6 text-graphite">
              Healthcare infrastructure, agricultural scaling, mining optimisation, or
              construction delivery. Contact the specialist team for your sector.
            </Lede>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Suspense
              fallback={
                <div className="min-h-[560px] rounded-[4px] border border-hairline bg-white" />
              }
            >
              <InquiryForm />
            </Suspense>

            <div>
              <h2 className="text-sm font-medium text-ink">Office</h2>
              <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-graphite">
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
                  <a href={`tel:${company.phoneHref}`} className="text-ink hover:underline">
                    {company.phone}
                  </a>
                </p>
                <p>{company.hours}</p>
              </address>

              <h2 className="mt-12 text-sm font-medium text-ink">Direct by sector</h2>
              <dl className="mt-4 divide-y divide-hairline border-t border-hairline">
                {sectors.map((s) => (
                  <div key={s.slug} className="py-4">
                    <dt className="text-sm font-medium text-ink">{s.name}</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${company.emails[s.slug]}`}
                        className="text-sm text-graphite hover:text-ink"
                      >
                        {company.emails[s.slug]}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="py-4">
                  <dt className="text-sm font-medium text-ink">General</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${company.emails.general}`}
                      className="text-sm text-graphite hover:text-ink"
                    >
                      {company.emails.general}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
