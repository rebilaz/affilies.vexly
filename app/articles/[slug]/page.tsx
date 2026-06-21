import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/ressources/articles/articles/ArticleLayout";
import {
  getHubItemByHubAndSlug,
  getHubItemSlugsByHubSlug,
} from "@/sanity/lib/hubItems";

const SITE_URL = "https://www.vexly.fr";
const HUB_SLUG = "/articles";
const BACK_HREF = "/articles";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Params = {
  slug: string;
};

function buildCanonical(slug: string) {
  return `${SITE_URL}${HUB_SLUG}/${slug}`;
}

function toAbsoluteUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateStaticParams() {
  const slugs = await getHubItemSlugsByHubSlug(HUB_SLUG);

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const item = await getHubItemByHubAndSlug({
    hubSlug: HUB_SLUG,
    slug,
  });

  if (!item || item.type !== "article") {
    return {
      title: "Page introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const fm = item.data.frontmatter;
  const canonical = buildCanonical(item.data.slug);
  const ogImage = toAbsoluteUrl(fm.coverImageUrl);

  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      url: canonical,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: fm.coverImageAlt || fm.title,
            },
          ]
        : [],
    },
  };
}

export default async function ArticlesSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const item = await getHubItemByHubAndSlug({
    hubSlug: HUB_SLUG,
    slug,
  });

  if (!item || item.type !== "article") {
    notFound();
  }

  const fm = item.data.frontmatter;

  return (
    <ArticleLayout
      title={fm.title}
      subtitle={fm.subtitle}
      date={fm.date ?? fm.updatedAt}
      coverImageUrl={fm.coverImageUrl}
      backHref={BACK_HREF}
      content={item.data.content || []}
    />
  );
}