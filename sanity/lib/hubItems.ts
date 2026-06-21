import "server-only";

import { client } from "@/sanity/lib/client";
import type { Article } from "@/sanity/lib/articles";

export type HubItemType = "article";

export type HubItemCard = Article & {
  _id?: string;
  _type: HubItemType;
  _sortDate?: string | null;
};

export type HubItemDetail = {
  type: "article";
  data: Article;
};

function normalizeHubSlug(value: string) {
  return String(value || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

function normalizeChildSlug(slug: string) {
  return String(slug || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

const hubMatchFilter = `
  defined(hubs) &&
  $hubSlug in hubs[]->hubType
`;

const articleDetailFields = `
  _id,
  "slug": slug.current,
  "frontmatter": {
    "title": coalesce(title, ""),
    "subtitle": coalesce(subtitle, ""),
    "description": coalesce(description, ""),
    "date": date,
    "updatedAt": _updatedAt,
    "searchIntent": coalesce(searchIntent, ""),
    "category": category->{
      title,
      "slug": slug.current
    },
    "hubs": hubs[]->{
      _id,
      title,
      hubType
    },
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coalesce(coverImage.alt, "")
  },
  "sections": [],
  content[]{
    ...,
    _type == "toolEmbed" => {
      ...,
      tool->{
        _id,
        title,
        "slug": slug.current,
        height,
        intro,
        outro
      }
    }
  }
`;

function sortHubItems(items: HubItemCard[]) {
  return [...items].sort((a, b) => {
    const da = a._sortDate ? new Date(a._sortDate).getTime() : 0;
    const db = b._sortDate ? new Date(b._sortDate).getTime() : 0;

    return db - da;
  });
}

export async function getHubItemsByHubSlug(
  hubSlug: string
): Promise<HubItemCard[]> {
  const normalizedHubSlug = normalizeHubSlug(hubSlug);

  const articles = await client.withConfig({ useCdn: false }).fetch<
    HubItemCard[]
  >(
    `
    *[
      _type == "article" &&
      defined(slug.current) &&
      ${hubMatchFilter}
    ] | order(coalesce(date, _updatedAt) desc) {
      _id,
      "_type": "article",
      "_sortDate": coalesce(date, _updatedAt),
      "slug": slug.current,
      "frontmatter": {
        "title": coalesce(title, ""),
        "subtitle": coalesce(subtitle, ""),
        "description": coalesce(description, ""),
        "date": date,
        "updatedAt": _updatedAt,
        "searchIntent": coalesce(searchIntent, ""),
        "category": category->{
          title,
          "slug": slug.current
        },
        "hubs": hubs[]->{
          _id,
          title,
          hubType
        },
        "coverImageUrl": coverImage.asset->url,
        "coverImageAlt": coalesce(coverImage.alt, "")
      },
      "sections": [],
      "content": []
    }
    `,
    {
      hubSlug: normalizedHubSlug,
    }
  );

  return sortHubItems(articles ?? []);
}

export async function getHubItemSlugsByHubSlug(
  hubSlug: string
): Promise<string[]> {
  const items = await getHubItemsByHubSlug(hubSlug);

  return Array.from(new Set(items.map((item) => item.slug).filter(Boolean)));
}

export async function getHubItemByHubAndSlug({
  hubSlug,
  slug,
}: {
  hubSlug: string;
  slug: string;
}): Promise<HubItemDetail | null> {
  const normalizedHubSlug = normalizeHubSlug(hubSlug);
  const childSlug = normalizeChildSlug(slug);

  const article = await client.withConfig({ useCdn: false }).fetch<Article | null>(
    `
    *[
      _type == "article" &&
      defined(slug.current) &&
      slug.current == $slug &&
      ${hubMatchFilter}
    ][0] {
      ${articleDetailFields}
    }
    `,
    {
      hubSlug: normalizedHubSlug,
      slug: childSlug,
    }
  );

  if (!article) return null;

  return {
    type: "article",
    data: article,
  };
}