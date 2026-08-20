import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectorBySlug, templatedSectorSlugs, type Sector } from "@/content/sectors";
import { SectorPage } from "@/components/sector-page";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templatedSectorSlugs.map((slug) => ({ slug }));
}

function resolve(slug: string): Sector | null {
  if (!templatedSectorSlugs.includes(slug as Sector["slug"])) return null;
  return sectorBySlug[slug as Sector["slug"]] ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const sector = resolve((await params).slug);
  if (!sector) return {};
  return {
    title: sector.headline,
    description: sector.heroCopy,
    openGraph: { title: sector.pageTitle, description: sector.heroCopy },
  };
}

export default async function Page({ params }: Params) {
  const sector = resolve((await params).slug);
  if (!sector) notFound();
  return <SectorPage sector={sector} />;
}
