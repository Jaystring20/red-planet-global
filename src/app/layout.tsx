import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { company } from "@/content/company";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/*
  Nexa is the brand font, confirmed by the logo package's fonts composition sheet.
  Outfit is the stand-in: the closest open geometric grotesk to Nexa's proportions.
  TODO(client): when the Nexa licence files arrive, drop the .woff2 files into
  src/app/fonts/, swap this for a localFont() call, and keep the --font-brand
  variable name so nothing else changes.
*/
const brand = Outfit({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-brand",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://redplanetglobal.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.legalName} | Integrated Solutions Across Four Sectors`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Healthcare, agriculture, mining, and construction solutions for African institutions. Direct OEM sourcing, business consulting, and export facilitation from Lagos, Nigeria.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: company.legalName,
    url: siteUrl,
    title: `${company.legalName} | Integrated Solutions Across Four Sectors`,
    description:
      "Healthcare, agriculture, mining, and construction solutions for African institutions.",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.shortName,
  url: siteUrl,
  legalName: company.legalName,
  identifier: company.rc,
  telephone: company.phone,
  email: company.emails.general,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.street}, ${company.address.area}`,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    addressCountry: "NG",
  },
  areaServed: ["Nigeria", "West Africa", "Sub-Saharan Africa"],
  knowsAbout: [
    "Healthcare infrastructure",
    "Medical equipment supply",
    "Agricultural export facilitation",
    "Mining operations consulting",
    "Construction materials sourcing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" className={`${brand.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bone text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
