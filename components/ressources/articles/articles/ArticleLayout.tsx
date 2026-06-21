import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";

import FinalCTASection from "@/components/FinalCTASection";
import { ArticleIntro } from "./ArticleIntro";
import { ArticlePortableContent } from "./ArticlePortableContent";

type PillarNav = {
  title: string;
  slug: string;
  href: string;
  breadcrumbBase?: string;
};

type FinalCta = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  href?: string;
};

type ArticleLayoutProps = {
  title: string;
  subtitle?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
  content: any[];
  backHref?: string;
  pillar?: PillarNav;
  finalCta?: FinalCta | false;
};

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  title,
  subtitle,
  tags = [],
  niche,
  coverImageUrl,
  content,
  backHref = "/",
  pillar,
  finalCta,
}) => {
  const shouldShowFinalCta = finalCta !== false;
  const finalCtaConfig = finalCta === false ? undefined : finalCta;

  const cta = {
    eyebrow: finalCtaConfig?.eyebrow ?? "Prêt à lancer ton SaaS ?",
    title:
      finalCtaConfig?.title ??
      "Transforme ton audience en revenu récurrent.",
    subtitle:
      finalCtaConfig?.subtitle ??
      "Vexly t’aide à créer un SaaS clair, vendable et adapté à ton audience : idée, MVP, paiement, onboarding et lancement.",
    primaryCtaLabel:
      finalCtaConfig?.primaryCtaLabel ?? "Discuter de mon projet",
    href: finalCtaConfig?.href ?? "/contact",
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <header className="mt-2 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
            >
              <ArrowLeft className="size-4" />
              Retour
            </Link>

            {pillar?.href ? (
              <nav className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
                <span className="h-4 w-px bg-slate-200" />
                <Link
                  href={pillar.breadcrumbBase ?? "/articles"}
                  className="hover:text-indigo-600"
                >
                  articles
                </Link>
                <ChevronRight className="size-3" />
                <Link href={pillar.href} className="hover:text-indigo-600">
                  {pillar.slug}
                </Link>
                <ChevronRight className="size-3" />
                <span className="line-clamp-1 max-w-[220px] font-medium text-slate-700">
                  {title}
                </span>
              </nav>
            ) : null}
          </div>

          {niche ? (
            <span className="rounded-full border border-slate-200/70 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              {niche}
            </span>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-8 pt-10 md:pl-28 lg:px-16 lg:pt-14">
        {pillar?.href ? (
          <div className="mb-6 max-w-3xl">
            <Link
              href={pillar.href}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
            >
              <BookOpen className="size-4" />
              Ce guide fait partie du hub :{" "}
              <span className="font-semibold">{pillar.title}</span>
              <span className="text-slate-400">→</span>
            </Link>
          </div>
        ) : null}

        <ArticleIntro
          title={title}
          subtitle={subtitle}
          tags={tags}
          coverImageUrl={coverImageUrl}
        />

        <ArticlePortableContent content={content} />

        {pillar?.href ? (
          <section className="mt-14 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Retour au guide central
            </h3>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Si tu veux la vue d’ensemble, reviens sur le hub :
            </p>
            <div className="mt-4">
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <BookOpen className="size-4" />
                {pillar.title}
              </Link>
            </div>
          </section>
        ) : null}
      </main>

      {shouldShowFinalCta ? (
        <div className="mt-16">
          <FinalCTASection
            eyebrow={cta.eyebrow}
            title={cta.title}
            subtitle={cta.subtitle}
            primaryCtaLabel={cta.primaryCtaLabel}
            href={cta.href}
          />
        </div>
      ) : null}
    </div>
  );
};