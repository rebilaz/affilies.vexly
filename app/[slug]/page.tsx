import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FeaturesLayout } from "@/components/features/FeaturesLayout";
import {
  getAllFeaturesSlugs,
  getFeaturesSection,
} from "@/sanity/lib/features";
import { getPricingPage } from "@/sanity/lib/pricingPage";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const pages = await getAllFeaturesSlugs();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getFeaturesSection(slug);

  if (!data) {
    return {
      title: "Page introuvable",
    };
  }

  const title = data.seo?.title || `${data.title} | Vexly`;
  const description = data.seo?.description || data.description || "";
  const canonical = data.seo?.canonical || `/${data.slug || slug}`;
  const ogImage = data.seo?.ogImageUrl || undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: data.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
  };
}

export default async function FeaturePage({ params }: PageProps) {
  const { slug } = await params;

  const [data, pricingPage] = await Promise.all([
    getFeaturesSection(slug),
    getPricingPage(),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <FeaturesLayout
      data={data}
      testimonials={pricingPage?.testimonials}
    />
  );
}