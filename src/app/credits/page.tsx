import type { Metadata } from "next";
import { imageCredits } from "@/content/imageCredits";
import { Container, Heading, Lede, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Attribution for the freely licensed photography used on this site.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <Heading level={1} size="md">
            Image credits
          </Heading>
          <Lede className="mt-5 text-graphite">
            Photography on this site is freely licensed and reproduced with attribution as
            the licences require.
          </Lede>
        </div>

        <dl className="mt-12 max-w-3xl divide-y divide-hairline border-t border-hairline">
          {imageCredits.map((c) => (
            <div key={c.file} className="py-6">
              <dt className="text-sm font-medium text-ink">{c.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-graphite">
                {c.usedFor}. By {c.creator}, licensed{" "}
                <a
                  href={c.licenseUrl}
                  rel="license noopener noreferrer"
                  target="_blank"
                  className="whitespace-nowrap text-ink underline"
                >
                  {c.license}
                </a>
                .{" "}
                <a
                  href={c.source}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-ink underline"
                >
                  Source
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
