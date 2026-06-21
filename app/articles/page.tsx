import type { Metadata } from "next";

import HubLayout from "@/components/ressources/articles/HubLayout";
import {
  getHubPageBySlug,
  type HubPageContent,
} from "@/sanity/lib/hubPage";
import { getHubItemsByHubSlug } from "@/sanity/lib/hubItems";

const ARTICLES_HUB_SLUG = "articles";
const ARTICLES_BASE_PATH = "/articles";

export const revalidate = 0;
export const dynamic = "force-dynamic";

function getFallbackArticlesHub(): HubPageContent {
  return {
    _id: "fallback-articles-hub",
    title: "Articles",
    hubType: ARTICLES_HUB_SLUG,
    hero: {
      titleline1: "Articles, ressources et guides",
      titlehighlight: "pour développer votre business",
      description:
        "Découvrez nos articles et ressources pour avancer plus vite.",
      backgroundImageUrl: "/Gemini_Generated_Image_vdi976vdi976vdi9.webp",
      backgroundImageAlt: "",
    },
    seo: {
      title: "Articles",
      description:
        "Découvrez nos articles, guides et ressources pour créateurs, SaaS et business digitaux.",
      canonical: ARTICLES_BASE_PATH,
      ogImageUrl: null,
    },
  };
}

async function getArticlesHub() {
  const hub = await getHubPageBySlug(ARTICLES_HUB_SLUG);
  return hub ?? getFallbackArticlesHub();
}

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getArticlesHub();

  const title = hub.seo?.title ?? "Articles";
  const description = hub.seo?.description ?? "";
  const canonical = hub.seo?.canonical ?? ARTICLES_BASE_PATH;
  const ogImage = hub.seo?.ogImageUrl ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
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

export default async function ArticlesPage() {
  const [hub, items] = await Promise.all([
    getArticlesHub(),
    getHubItemsByHubSlug(ARTICLES_HUB_SLUG),
  ]);

  return (
    <HubLayout
      articles={items}
      content={hub}
      basePath={ARTICLES_BASE_PATH}
    />
  );
}