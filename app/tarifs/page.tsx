import type { Metadata } from "next";
import { cache } from "react";
import PricingClient from "@/components/pricing/PricingClient";
import { getPricingPage } from "@/sanity/lib/pricingPage";

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vexly.fr";

const seo = {
  title: "Prix création SaaS pour créateurs | Vexly",
  description:
    "Créez votre SaaS sur-mesure pour monétiser votre audience. Vexly accompagne les créateurs de l’idée au lancement en 21 jours, avec paiement, membres et hébergement inclus.",
  canonical: "/tarifs",
};

type FaqItem = {
  question?: string;
  answer?: string;
};

type PricingPageData = NonNullable<Awaited<ReturnType<typeof getPricingPage>>> & {
  faq?: {
    items?: FaqItem[];
  };
};

function absoluteUrl(url?: string | null) {
  if (!url) return siteUrl;
  if (url.startsWith("http")) return url;

  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function withTimeout<T>(promise: Promise<T>, ms = 1800): Promise<T | null> {
  let timeoutId: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<null>((resolve) => {
    timeoutId = setTimeout(() => resolve(null), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}

const getSafePricingPage = cache(async (): Promise<PricingPageData | null> => {
  try {
    return (await withTimeout(getPricingPage(), 1800)) as PricingPageData | null;
  } catch (error) {
    console.error("Erreur chargement Sanity page tarifs:", error);
    return null;
  }
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: absoluteUrl(seo.canonical),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: absoluteUrl(seo.canonical),
    siteName: "Vexly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default async function PricingPage() {
  const page = await getSafePricingPage();

  const offer = page?.offer;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: offer?.name || "Vexly Launch",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: String(offer?.basePrice || 990),
      priceCurrency: "EUR",
      url: absoluteUrl(seo.canonical),
    },
  };

  const faqItems =
    page?.faq?.items?.filter((item) => item.question && item.answer) ?? [];

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(softwareSchema),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(faqSchema),
          }}
        />
      )}

      <PricingClient page={page ?? {}} />
    </>
  );
}