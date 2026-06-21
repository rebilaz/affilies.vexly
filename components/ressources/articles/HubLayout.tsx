"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Article } from "@/sanity/lib/articles";
import type { HubPageContent } from "@/sanity/lib/hubPage";
import HubHero from "@/components/ressources/articles/HubHero";
import HubGrid, {
  type EnrichedArticle,
} from "@/components/ressources/articles/HubGrid";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value: string) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getTypeLabel(type?: string) {
  if (type === "comparisonPage") return "Comparaison";
  if (type === "featuresSection") return "Expertise";
  return "Article";
}

function getArticleCategory(article: Article) {
  const fm = article.frontmatter as any;
  const type = (article as any)._type as string | undefined;

  if (typeof fm?.category === "string" && fm.category.trim()) {
    return {
      id: slugify(fm.category),
      label: fm.category,
    };
  }

  if (fm?.category?.title) {
    return {
      id: fm.category.slug || slugify(fm.category.title),
      label: fm.category.title,
    };
  }

  const hubTitle = fm?.hubs?.[0]?.title;

  if (hubTitle) {
    return {
      id: slugify(hubTitle),
      label: hubTitle,
    };
  }

  const label = getTypeLabel(type);

  return {
    id: slugify(label),
    label,
  };
}

function enrichArticle(article: Article): EnrichedArticle {
  const category = getArticleCategory(article);

  return {
    ...article,
    _categoryId: category.id,
    _categoryLabel: category.label,
  };
}

function articleMatchesQuery(article: EnrichedArticle, query: string) {
  if (!query.trim()) return true;

  const fm = article.frontmatter as any;
  const q = normalize(query);

  const haystack = normalize(
    [
      article.slug,
      fm?.title,
      fm?.subtitle,
      fm?.description,
      fm?.searchIntent,
      article._categoryLabel,
      (article as any)._type,
    ]
      .filter(Boolean)
      .join(" ")
  );

  return haystack.includes(q);
}

export default function HubLayout({
  articles,
  content,
  basePath = "/articles",
}: {
  articles: Article[];
  content: HubPageContent;
  basePath?: string;
}) {
  const [query, setQuery] = useState("");

  const enrichedArticles = useMemo(
    () => articles.map(enrichArticle),
    [articles]
  );

  const filteredArticles = useMemo(
    () =>
      enrichedArticles.filter((article) => articleMatchesQuery(article, query)),
    [enrichedArticles, query]
  );

  return (
    <main className="min-h-screen bg-white">
      <HubHero content={content} />

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Tous les contenus
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Explorer le hub
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Articles, comparaisons et expertises associés à ce hub.
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un contenu..."
              className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />

            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <HubGrid
          articles={filteredArticles}
          query={query}
          onClearQuery={() => setQuery("")}
          basePath={basePath}
        />
      </section>
    </main>
  );
}