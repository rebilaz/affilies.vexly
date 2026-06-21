"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const TOOL = {
  slug: "calculateur-mrr-vues-youtube",
  label: "Outil gratuit",
  title: "Calculateur MRR YouTube",
  description:
    "Estimez le revenu mensuel récurrent qu’une audience YouTube peut générer avec un SaaS à abonnement.",
  monthlyPrice: 49,
  conversionRate: 0.2,
};

const quickViews = [10000, 50000, 100000, 250000];

const useCases = [
  "Vous avez une audience YouTube et vous voulez estimer le potentiel d’un SaaS.",
  "Vous comparez un revenu récurrent avec des sponsors, de l’affiliation ou une formation.",
  "Vous préparez une offre à abonnement pour votre communauté.",
  "Vous voulez savoir combien de clients sont nécessaires pour atteindre un objectif de MRR.",
];

const relatedArticles = [
  {
    title: "Comment transformer une audience en SaaS",
    href: "/articles",
    description:
      "Comprendre pourquoi une audience peut devenir un produit récurrent.",
  },
  {
    title: "Créer une plateforme d’abonnement pour créateurs",
    href: "/agence-plateforme-abonnement-createurs",
    description:
      "Voir comment Vexly structure une plateforme propriétaire avec paiement et espace membre.",
  },
  {
    title: "Créer un MVP SaaS pour créateurs",
    href: "/agence-mvp-saas-createurs",
    description:
      "Lancer une première version claire avant d’ajouter des fonctionnalités avancées.",
  },
];

const faq = [
  {
    question: "Qu’est-ce que le MRR ?",
    answer:
      "Le MRR signifie Monthly Recurring Revenue. C’est le revenu mensuel récurrent généré par des abonnements.",
  },
  {
    question: "Le résultat est-il garanti ?",
    answer:
      "Non. Le calcul donne une estimation. Le résultat réel dépend de la qualité de l’audience, de l’offre, du tunnel de vente et de la capacité à convertir.",
  },
  {
    question: "Quel taux de conversion utiliser ?",
    answer:
      "Par défaut, ce calculateur utilise 0,20% des vues converties en clients. C’est une hypothèse simple pour estimer un potentiel, pas une promesse de résultat.",
  },
  {
    question: "Pourquoi créer un SaaS plutôt que vendre des sponsors ?",
    answer:
      "Un sponsor est souvent ponctuel. Un SaaS peut créer un revenu récurrent, propriétaire et améliorable dans le temps.",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateClients(views: number) {
  return Math.round(views * (TOOL.conversionRate / 100));
}

function calculateMrr(views: number) {
  return calculateClients(views) * TOOL.monthlyPrice;
}

export default function ToolPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-slate-950">
      <ToolIntroAndCalculator />
      <FormulaSection />
      <ScenariosSection />
      <UseCasesSection />
      <RelatedContentSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}

function ToolIntroAndCalculator() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-16 pt-8 sm:pb-20 sm:pt-12 lg:px-8">
      <BackgroundDecor />

      <div className="relative mx-auto max-w-7xl">
        <Breadcrumb />

        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div className="pt-2 lg:sticky lg:top-28">
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 shadow-sm">
              {TOOL.label}
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              {TOOL.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {TOOL.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <MiniStatCard
                label="Hypothèse"
                value={`${TOOL.conversionRate}%`}
                description="des vues deviennent clients"
              />
              <MiniStatCard
                label="Prix mensuel"
                value={`${TOOL.monthlyPrice}€`}
                description="par client payant"
              />
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500">
              Utilisez ce calculateur pour estimer rapidement le potentiel d’un
              SaaS lancé auprès d’une audience YouTube.
            </p>
          </div>

          <CalculatorCard />
        </div>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -right-44 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-indigo-200/55 blur-3xl" />
      <div className="pointer-events-none absolute -left-44 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-16 top-32 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />
    </>
  );
}

function Breadcrumb() {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
      <Link href="/" className="transition hover:text-slate-950">
        Accueil
      </Link>
      <span>/</span>
      <Link href="/outils" className="transition hover:text-slate-950">
        Outils
      </Link>
      <span>/</span>
      <span className="text-slate-950">{TOOL.title}</span>
    </nav>
  );
}

function MiniStatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function CalculatorCard() {
  const [views, setViews] = useState(50000);

  const clients = useMemo(() => calculateClients(views), [views]);
  const mrr = useMemo(() => calculateMrr(views), [views]);

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#061A33] p-4 shadow-[0_30px_100px_rgba(15,23,42,0.20)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-bl-[7rem] bg-indigo-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative rounded-[2rem] bg-white p-5 shadow-sm sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600">
              Simulation
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
              Estimez votre MRR potentiel
            </h2>
          </div>

          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
            {formatNumber(views)} vues
          </div>
        </div>

        <div className="grid gap-4 py-7 md:grid-cols-3">
          <ResultCard
            label="Vues YouTube"
            value={formatNumber(views)}
            tone="neutral"
          />
          <ResultCard
            label="Clients estimés"
            value={formatNumber(clients)}
            tone="neutral"
          />
          <ResultCard
            label="MRR estimé"
            value={formatCurrency(mrr)}
            suffix="/ mois"
            tone="primary"
          />
        </div>

        <div className="rounded-[1.75rem] bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-black text-slate-950">
              Nombre de vues mensuelles
            </p>
            <p className="text-sm font-bold text-slate-500">
              {formatNumber(views)}
            </p>
          </div>

          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={views}
            onChange={(event) => setViews(Number(event.target.value))}
            className="mt-5 w-full accent-indigo-600"
            aria-label="Nombre de vues YouTube"
          />

          <div className="mt-3 flex justify-between text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
            <span>1k</span>
            <span>1M</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {quickViews.map((quickView) => (
              <button
                key={quickView}
                type="button"
                onClick={() => setViews(quickView)}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                {formatNumber(quickView)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.75rem] bg-[#061A33] p-5 text-white">
          <p className="text-sm font-bold leading-7 text-slate-300">
            Avec {formatNumber(views)} vues, une conversion de{" "}
            {TOOL.conversionRate}% représente environ{" "}
            <span className="font-black text-white">
              {formatNumber(clients)} clients
            </span>
            . À {TOOL.monthlyPrice}€ / mois, cela donne un MRR estimé de{" "}
            <span className="font-black text-white">
              {formatCurrency(mrr)}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  tone: "neutral" | "primary";
}) {
  const isPrimary = tone === "primary";

  return (
    <div
      className={[
        "rounded-[1.75rem] p-5 text-center",
        isPrimary ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-950",
      ].join(" ")}
    >
      <p
        className={[
          "text-[11px] font-black uppercase tracking-[0.22em]",
          isPrimary ? "text-indigo-100" : "text-slate-400",
        ].join(" ")}
      >
        {label}
      </p>
      <p className="mt-4 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
        {value}
      </p>
      {suffix ? (
        <p className="mt-2 text-sm font-black opacity-80">{suffix}</p>
      ) : null}
    </div>
  );
}

function FormulaSection() {
  return (
    <section className="px-6 py-18 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeader
          eyebrow="Méthode de calcul"
          title="Comment le MRR est-il estimé ?"
        />

        <div className="space-y-6 text-base leading-8 text-slate-600">
          <p>
            Ce calculateur estime le revenu mensuel récurrent potentiel d’un
            SaaS lancé auprès d’une audience YouTube. Il part d’un volume de
            vues, applique un taux de conversion global, puis multiplie le
            nombre de clients estimés par un prix mensuel.
          </p>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Formule
              </p>
              <p className="mt-4 text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">
                MRR = vues × taux de conversion × prix mensuel
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <FormulaStep label="1" title="Vues" text="50 000 vues" />
              <FormulaStep label="2" title="Clients" text="100 clients" />
              <FormulaStep label="3" title="MRR" text="4 900€ / mois" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormulaStep({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 p-5">
      <div className="flex size-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
        {label}
      </div>
      <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-xl font-black tracking-[-0.03em] text-slate-950">
        {text}
      </p>
    </div>
  );
}

function ScenariosSection() {
  const scenarios = [10000, 50000, 100000, 250000];

  return (
    <section className="relative overflow-hidden bg-[#061A33] px-6 py-20 text-white lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-300">
            Exemples
          </p>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl">
            Quelques scénarios de revenus
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Ces exemples utilisent la même hypothèse : {TOOL.conversionRate}%
            des vues deviennent clients à {TOOL.monthlyPrice}€ / mois.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((views) => {
            const clients = calculateClients(views);
            const mrr = calculateMrr(views);

            return (
              <article
                key={views}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
                  {formatNumber(views)} vues
                </p>
                <p className="mt-5 text-3xl font-black tracking-[-0.05em]">
                  {formatCurrency(mrr)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Environ {formatNumber(clients)} clients à {TOOL.monthlyPrice}
                  € / mois.
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeader
          eyebrow="Cas d’usage"
          title="Quand utiliser ce calculateur ?"
        />

        <div className="grid gap-4">
          {useCases.map((item, index) => (
            <div
              key={item}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-black text-indigo-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-semibold leading-8 text-slate-700">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedContentSection() {
  return (
    <section className="bg-[#EEF3FC] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          centered
          eyebrow="À lire ensuite"
          title="Approfondir le potentiel de votre audience"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {relatedArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
                Ressource
              </p>
              <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] text-slate-950">
                {article.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {article.description}
              </p>
              <p className="mt-6 text-sm font-black text-indigo-600">
                Lire la suite →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          centered
          eyebrow="FAQ"
          title="Questions fréquentes"
        />

        <div className="mt-12 space-y-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 open:bg-white hover:border-indigo-200 hover:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                  {item.question}
                </h3>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl font-black text-slate-500 transition group-open:rotate-45 group-open:text-indigo-600">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="px-6 pb-24 pt-4 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#061A33] px-8 py-12 text-center text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)] sm:px-12 sm:py-16">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-300">
          Vexly
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl">
          Vous avez une audience ? Transformez-la en SaaS.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
          Vexly accompagne les créateurs pour transformer leur audience en
          produit SaaS, avec paiement, espace membre et revenus récurrents.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(88,80,236,0.40)] transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
          >
            Créer mon SaaS
          </Link>

          <Link
            href="/articles"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-black text-white transition hover:bg-white/[0.1]"
          >
            Voir les ressources
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-4xl text-center" : ""}>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}