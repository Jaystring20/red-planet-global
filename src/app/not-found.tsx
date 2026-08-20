import { ButtonLink, Container, Heading, Lede } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">404</p>
      <Heading level={1} size="lg" className="mt-5 max-w-xl">
        We could not find that page
      </Heading>
      <Lede className="mt-5 text-graphite">
        The page may have moved. Start from the homepage or go straight to a sector.
      </Lede>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to homepage</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
