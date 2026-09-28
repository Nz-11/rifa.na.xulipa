import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, Manrope } from "next/font/google";
import Providers from "@/components/Providers";
import { site, fullAddress } from "@/data/site";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const title = "Ripa na Xulipa | Assado na Rua em São Paulo";
const description =
  "Conheça o Ripa na Xulipa: assado na rua, comida de verdade e o clima de boteco em São Paulo.";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  title,
  description,
  applicationName: site.name,
  keywords: ["Ripa na Xulipa", "churrasco", "espetinho", "boteco", "Sumarezinho", "São Paulo", "laje", "assado na rua"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title,
    description,
    images: [{ url: site.media.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [site.media.ogImage],
  },
  other: { "geo.placename": fullAddress },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: site.name,
  slogan: site.tagline,
  servesCuisine: "Churrasco",
  telephone: "+55 11 3815-9555",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: "BR",
  },
  sameAs: [site.links.instagram, site.links.linktree],
  ...(site.url ? { url: site.url } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${anton.variable} ${instrument.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cyan focus:px-4 focus:py-3 focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
