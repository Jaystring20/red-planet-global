import Image from "next/image";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Lede,
} from "@/components/ui";

interface HeroSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lede: string;
  image: {
    src: string;
    alt: string;
  };
  ctas?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
}

/**
 * Reusable hero section with 3D perspective, floating gold accent bar,
 * and staggered animations. Used across all sector pages for visual consistency.
 */
export function HeroSection({
  eyebrow,
  title,
  subtitle,
  lede,
  image,
  ctas = [
    { label: "Start a project", href: "/contact", variant: "primary" },
  ],
}: HeroSectionProps) {
  return (
    <section className="border-b border-hairline relative overflow-hidden">
      <Container className="relative grid min-h-[calc(100dvh-68px)] items-center py-16 lg:py-20">
        {/* Floating gold accent bar (hidden on mobile) */}
        <div className="hidden lg:block absolute left-1/2 top-1/3 -translate-x-1/2 w-1 h-1/3 bg-gold/60 shadow-lg rounded-full" />

        {/* Main grid: 40/60 split */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-center">
          {/* Left column: Text (40%) */}
          <div>
            <Reveal variant="fade" delay={0}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal variant="slide" delay={0.1}>
              <Heading level={1} size="lg" className="mt-5">
                {title}
              </Heading>
            </Reveal>
            {subtitle && (
              <Reveal variant="slide" delay={0.15}>
                <p className="mt-4 text-sm text-graphite">{subtitle}</p>
              </Reveal>
            )}
            <Reveal variant="slide" delay={0.2}>
              <Lede className="mt-6 text-graphite">{lede}</Lede>
            </Reveal>
            <Reveal variant="slide" delay={0.3} className="mt-9">
              <div className="flex flex-wrap gap-3">
                {ctas.map((cta) => (
                  <ButtonLink
                    key={cta.href}
                    href={cta.href}
                    variant={cta.variant}
                  >
                    {cta.label}
                  </ButtonLink>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right column: Image (60%) - 3D rotated */}
          <Reveal variant="rotate" delay={0.25}>
            <div className="relative aspect-4/3 overflow-visible">
              {/* Rotated image with shadow depth */}
              <div
                className="absolute inset-0 rounded-[8px] bg-bone-dim shadow-2xl"
                style={{
                  transform: "perspective(1200px) rotateY(-8deg) rotateX(2deg)",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
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
  );
}
