import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  CheckCircle2,
  Clock3,
  Filter,
  HandCoins,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  getAffiliatePrograms,
  type AffiliateProgramListItem,
} from "@/sanity/lib/affiliation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vexly.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Programmes d'affiliation SaaS | Vexly",
  description:
    "Comparez les SaaS disponibles en affiliation avec leurs commissions, modèles de rémunération, cookies et conditions de paiement.",
  alternates: {
    canonical: "/affiliation",
  },
  openGraph: {
    title: "Programmes d'affiliation SaaS | Vexly",
    description:
      "Une sélection de SaaS à promouvoir avec commissions récurrentes, CPL ou CPA, pensée pour les créateurs et médias B2B.",
    url: "/affiliation",
    siteName: "Vexly",
    type: "website",
  },
};

const criteria = [
  "Produit utile à une audience professionnelle",
  "Tunnel de conversion clair et tracking disponible",
  "Commission lisible avant promotion",
  "Paiement documenté et conditions transparentes",
];

function ProgramCard({ program }: { program: AffiliateProgramListItem }) {
  return (
    <article
      className={[
        "flex h-full flex-col rounded-[8px] border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl",
        program.featured
          ? "border-indigo-200 ring-2 ring-indigo-100"
          : "border-slate-200",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600">
            {program.category}
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
            {program.name}
          </h2>
        </div>

        {program.featured ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            <Sparkles size={13} />
            Top
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {program.shortDescription}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-[8px] bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <HandCoins size={14} />
            Commission
          </div>
          <p className="mt-2 text-2xl font-black text-slate-950">
            {program.commission}
          </p>
          <p className="mt-1 text-xs text-slate-500">{program.model}</p>
        </div>

        <div className="rounded-[8px] bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <Clock3 size={14} />
            Cookie
          </div>
          <p className="mt-2 text-2xl font-black text-slate-950">
            {program.cookie}
          </p>
          <p className="mt-1 text-xs text-slate-500">{program.payout}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-700">
        <div className="flex gap-3">
          <BadgeEuro className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <span>{program.price}</span>
        </div>
        <div className="flex gap-3">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <span>{program.audience}</span>
        </div>
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <span>{program.highlight}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(program.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <Link
          href={`/affiliation/${program.slug}`}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition duration-200 hover:bg-indigo-600"
        >
          Voir la fiche détail
          <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export default async function AffiliationPage() {
  const saasPrograms = await getAffiliatePrograms();
  const stats = [
    { label: "Programmes listés", value: String(saasPrograms.length) },
    { label: "Commission max.", value: "35%" },
    { label: "Cookies jusqu'à", value: "90 j" },
    { label: "Modèles", value: "CPA + récurrent" },
  ];

  return (
    <main className="bg-[#f7f8fb]">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.16),transparent_58%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-700">
              <Filter size={14} />
              Marketplace affiliation SaaS
            </div>

            <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
              Les SaaS disponibles à l&apos;affiliation.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Retrouvez les produits SaaS que vous pouvez recommander à votre
              audience, avec les commissions, durées de cookie, prix et profils
              de clients les plus adaptés.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#programmes"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(79,70,229,0.22)] transition hover:bg-indigo-700"
              >
                Voir les programmes
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Proposer un SaaS
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-3xl font-black text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programmes" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600">
              Catalogue
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Programmes actifs
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Les montants ci-dessous servent de base de comparaison. Les
            conditions finales peuvent varier selon le volume, le canal de
            promotion et l&apos;accord signé.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {saasPrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600">
              Sélection
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Ce qu&apos;on vérifie avant de lister un SaaS.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              La page privilégie les offres utiles, faciles à expliquer et
              suffisamment transparentes pour être promues sans dégrader la
              confiance de votre audience.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {criteria.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[8px] border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                <p className="text-sm font-semibold leading-6 text-slate-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="rounded-[8px] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-300">
                Devenir partenaire
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Vous avez une audience SaaS, business ou créateurs ?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                Demandez l&apos;accès aux liens affiliés, aux assets de promotion et
                aux conditions détaillées. Nous vous aiderons à identifier les
                offres les plus cohérentes avec votre audience.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-indigo-50"
              >
                Demander l&apos;accès
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Voir l&apos;offre Vexly
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
