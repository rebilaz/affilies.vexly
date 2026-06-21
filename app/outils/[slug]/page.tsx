// app/outils/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getToolPageBySlug,
  getToolSlugs,
} from "@/sanity/lib/outils";

import { ToolPageLayout } from "@/components/outils/layout/ToolPageLayout";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.vexly.fr"
).replace(/\/$/, "");

export async function generateStaticParams() {
  const tools = await getToolSlugs();

  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const canonicalUrl = `${SITE_URL}/outils/${encodeURIComponent(slug)}`;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  const tool = await getToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageLayout tool={tool} />;
}
