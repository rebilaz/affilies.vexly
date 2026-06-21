"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { Article } from "@/sanity/lib/articles";

export type EnrichedArticle = Article & {
  _categoryId: string;
  _categoryLabel: string;
};

function resolveCover(article: EnrichedArticle): string | null {
  const fm = article.frontmatter as any;

  const raw =
    fm?.coverImageUrl ||
    fm?.coverImage?.asset?.url ||
    fm?.coverImage?.url ||
    null;

  if (!raw) return null;

  const value = String(raw).trim();
  if (!value) return null;

  if (value.startsWith("public/")) return value.replace(/^public\//, "/");
  if (!value.startsWith("/") && !value.startsWith("http")) return `/${value}`;

  return value;
}

function resolveCoverAlt(article: EnrichedArticle): string {
  const fm = article.frontmatter as any;

  return (
    fm?.coverImageAlt ||
    fm?.coverImage?.alt ||
    fm?.title ||
    "Illustration de l’article"
  );
}

function formatDateFr(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function normalizeBasePath(basePath: string) {
  if (!basePath || basePath === "/") return "";
  return basePath.replace(/\/$/, "");
}

function buildHref(basePath: string, slug: string) {
  const path = normalizeBasePath(basePath);
  const cleanSlug = String(slug || "").replace(/^\/+/, "");

  return `${path}/${cleanSlug}`;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 ring-1 ring-slate-200/70">
      {children}
    </span>
  );
}

function ArticleCard({
  article,
  basePath,
}: {
  article: EnrichedArticle;
  basePath: string;
}) {
  const fm = article.frontmatter as any;

  const title = fm?.title ?? article.slug;
  const subtitle = fm?.subtitle ?? "";
  const description = fm?.description ?? "";
  const date = fm?.date ? formatDateFr(fm.date) : null;
  const cover = resolveCover(article);
  const alt = resolveCoverAlt(article);

  return (
    <Link
      href={buildHref(basePath, article.slug)}
      className="group block h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:ring-slate-300"
    >
      <div className="relative h-[200px] overflow-hidden rounded-t-3xl bg-slate-100">
        {cover ? (
          <img
            src={cover}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200" />
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{article._categoryLabel}</Badge>
          {date ? <Badge>{date}</Badge> : null}
        </div>

        <h2 className="mt-4 text-xl font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-2 text-sm font-medium text-slate-700">{subtitle}</p>
        ) : null}

        {description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        ) : null}

        <div className="mt-6 flex items-center">
          <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition group-hover:bg-indigo-700">
            Lire <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HubGrid({
  articles,
  query = "",
  onClearQuery,
  basePath = "/articles",
}: {
  articles: EnrichedArticle[];
  query?: string;
  onClearQuery?: () => void;
  basePath?: string;
}) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 rounded-full bg-slate-50 p-4">
          <Search className="h-8 w-8 text-slate-300" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          Aucun résultat
        </h3>

        <p className="text-slate-500">
          Essayez de reformuler votre recherche.
        </p>

        {!!query && onClearQuery && (
          <button
            onClick={onClearQuery}
            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Effacer la recherche
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <div key={`${article._id ?? article.slug}-${article.slug}`}>
          <ArticleCard article={article} basePath={basePath} />
        </div>
      ))}
    </section>
  );
}