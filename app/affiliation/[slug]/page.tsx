import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeEuro,
  CheckCircle2,
  Clock3,
  ExternalLink,
  HandCoins,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  getAffiliateProgramBySlug,
  getAffiliateProgramSlugs,
  type AffiliateProgram,
} from "@/sanity/lib/affiliation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.vexly.fr")
  .replace(/\/$/, "");

function absoluteUrl(path?: string | null) {
  if (!path) return siteUrl;
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function detailUrl(slug: string) {
  return `/affiliation/${encodeURIComponent(slug)}`;
}

function getCtaHref(program: AffiliateProgram) {
  return program.affiliateUrl || "/contact";
}

export async function generateStaticParams() {
  const slugs = await getAffiliateProgramSlugs();

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getAffiliateProgramBySlug(slug);

  if (!program) {
    return {
      title: "Programme affiliation introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = absoluteUrl(program.seo?.canonical || detailUrl(program.slug));
  const title =
    program.seo?.title || `${program.name} affiliation : commissions et détails`;
  const description =
    program.seo?.description ||
    `${program.name} : commission ${program.commission}, cookie ${program.cookie}, modèle ${program.model}. Découvrez les conditions du programme d'affiliation.`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: program.seo?.noIndex ? false : true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Vexly",
      type: "website",
      images: program.logoUrl
        ? [
            {
              url: program.logoUrl,
              alt: program.logoAlt || program.name,
            },
          ]
        : [],
    },
  };
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        {icon}
        {label}
      </div>
      <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

function BulletSection({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) return null;

  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
            <p className="text-sm leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function AffiliateProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getAffiliateProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const ctaHref = getCtaHref(program);
  const isExternalCta = ctaHref.startsWith("http");
  const metrics = program.metrics?.length
    ? program.metrics
    : [
        { label: "Commission", value: program.commission },
        { label: "Cookie", value: program.cookie },
        { label: "Paiement", value: program.payout },
        { label: "Prix", value: program.price },
      ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: program.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: program.shortDescription,
    url: absoluteUrl(program.websiteUrl || detailUrl(program.slug)),
    offers: {
      "@type": "Offer",
      price: program.price,
      priceCurrency: "EUR",
      url: absoluteUrl(ctaHref),
    },
  };

  const faqSchema = program.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: program.faq.map((item) => ({
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
    <main className="bg-[#f7f8fb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
        />
      ) : null}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            href="/affiliation"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Tous les programmes
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
                {program.category}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl">
                {program.name} en affiliation
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {program.description || program.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {(program.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {isExternalCta ? (
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(79,70,229,0.22)] transition hover:bg-indigo-700"
                  >
                    Demander le lien affilié
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <Link
                    href={ctaHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(79,70,229,0.22)] transition hover:bg-indigo-700"
                  >
                    Demander le lien affilié
                    <ArrowRight size={16} />
                  </Link>
                )}
                {program.websiteUrl ? (
                  <a
                    href={program.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Site officiel
                    <ExternalLink size={16} />
                  </a>
                ) : null}
              </div>
            </div>

            <aside className="rounded-[8px] border border-slate-200 bg-slate-50 p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <MetricCard
                  icon={<HandCoins size={14} />}
                  label="Commission"
                  value={program.commission}
                />
                <MetricCard
                  icon={<Clock3 size={14} />}
                  label="Cookie"
                  value={program.cookie}
                />
                <MetricCard
                  icon={<BadgeEuro size={14} />}
                  label="Prix"
                  value={program.price}
                />
                <MetricCard
                  icon={<TrendingUp size={14} />}
                  label="Paiement"
                  value={program.payout}
                />
              </div>

              <div className="mt-5 rounded-[8px] border border-slate-200 bg-white p-5">
                <div className="flex gap-3">
                  <Target className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      Audience idéale
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {program.audience}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600">
              Résumé
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
              Pourquoi le promouvoir ?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {program.highlight}
            </p>
            <div className="mt-6 space-y-3">
              {metrics.map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 text-sm"
                >
                  <span className="font-semibold text-slate-500">
                    {metric.label}
                  </span>
                  <span className="text-right font-black text-slate-950">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:col-span-2">
            <BulletSection title="Points forts" items={program.features} />
            <BulletSection title="À recommander si" items={program.idealFor} />
            <BulletSection
              title="Comment le promouvoir"
              items={program.howItWorks}
            />
          </div>
        </div>
      </section>

      {program.faq?.length ? (
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-16">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Questions fréquentes
            </h2>
            <div className="mt-8 divide-y divide-slate-200 rounded-[8px] border border-slate-200">
              {program.faq.map((item) => (
                <details key={item._key || item.question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-950">
                    {item.question}
                    <span className="text-indigo-600 transition group-open:rotate-90">
                      <ArrowRight size={18} />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="rounded-[8px] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-200">
                <ShieldCheck size={14} />
                Programme partenaire
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                Prêt à recommander {program.name} ?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Demandez les conditions finales, le lien affilié et les assets
                de promotion adaptés à votre audience.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              {isExternalCta ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-indigo-50"
                >
                  Obtenir le lien
                  <ExternalLink size={16} />
                </a>
              ) : (
                <Link
                  href={ctaHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-indigo-50"
                >
                  Obtenir le lien
                  <ArrowRight size={16} />
                </Link>
              )}
              <Link
                href="/affiliation"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Comparer les SaaS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
