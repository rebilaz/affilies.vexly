"use client";

import { useMemo, useState } from "react";

type EngagementLevel = "low" | "medium" | "high";

type MonetizationModel = {
id: string;
name: string;
symbol: string;
revenue: number;
stability: string;
effort: string;
description: string;
};

const QUICK_VALUES = [
10_000,
25_000,
50_000,
100_000,
250_000,
500_000,
];

const ENGAGEMENT_LEVELS: Array<{
value: EngagementLevel;
label: string;
}> = [
{
value: "low",
label: "Faible",
},
{
value: "medium",
label: "Moyen",
},
{
value: "high",
label: "Fort",
},
];

export function CreatorMonetizationComparator() {
const [audience, setAudience] = useState(100_000);
const [engagement, setEngagement] =
useState<EngagementLevel>("medium");

const models = useMemo<MonetizationModel[]>(() => {
const multiplier = {
low: 0.65,
medium: 1,
high: 1.55,
}[engagement];


const advertising =
  (audience / 1_000) * 3.5 * multiplier;

const affiliateRate = {
  low: 0.008,
  medium: 0.018,
  high: 0.035,
}[engagement];

const affiliation =
  audience * affiliateRate * 0.025 * 25;

const sponsoring =
  (250 + (audience / 1_000) * 12) *
  multiplier;

const subscriptionRate = {
  low: 0.001,
  medium: 0.0025,
  high: 0.006,
}[engagement];

const subscription =
  audience * subscriptionRate * 9.9;

return [
  {
    id: "advertising",
    name: "Publicité",
    symbol: "A",
    revenue: advertising,
    stability: "Variable",
    effort: "Faible",
    description:
      "Facile à activer, mais fortement dépendante du volume de vues.",
  },
  {
    id: "affiliation",
    name: "Affiliation",
    symbol: "%",
    revenue: affiliation,
    stability: "Moyenne",
    effort: "Moyen",
    description:
      "Pertinente lorsque votre audience recherche déjà des solutions.",
  },
  {
    id: "sponsoring",
    name: "Sponsoring",
    symbol: "S",
    revenue: sponsoring,
    stability: "Ponctuelle",
    effort: "Élevé",
    description:
      "Un fort potentiel avec une audience ciblée et une image crédible.",
  },
  {
    id: "subscription",
    name: "Abonnement",
    symbol: "€",
    revenue: subscription,
    stability: "Récurrente",
    effort: "Élevé",
    description:
      "Le modèle le plus prévisible pour une communauté engagée.",
  },
].sort(
  (first, second) =>
    second.revenue - first.revenue,
);

}, [audience, engagement]);

const recommendedModel = models[0];

const maximumRevenue = Math.max(
...models.map((model) => model.revenue),
1,
);

return ( <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]"> <div className="border-b border-slate-200 p-5 sm:p-7"> <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end"> <div> <div className="flex items-center justify-between gap-4"> <label
             htmlFor="creator-audience"
             className="text-sm font-black text-slate-950"
           >
Audience mensuelle </label>

          <span className="text-lg font-black text-[#6547FF]">
            {formatNumber(audience)}
          </span>
        </div>

        <input
          id="creator-audience"
          type="range"
          min={1_000}
          max={1_000_000}
          step={1_000}
          value={audience}
          onChange={(event) => {
            setAudience(
              Number(event.target.value),
            );
          }}
          className="mt-5 w-full cursor-pointer accent-[#6547FF]"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_VALUES.map((value) => {
            const isActive = value === audience;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setAudience(value)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                  isActive
                    ? "border-[#6547FF] bg-[#6547FF] text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#6547FF]/40 hover:text-[#6547FF]"
                }`}
              >
                {formatCompactNumber(value)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-black text-slate-950">
          Engagement
        </p>

        <div className="grid grid-cols-3 gap-2">
          {ENGAGEMENT_LEVELS.map((level) => {
            const isActive =
              level.value === engagement;

            return (
              <button
                key={level.value}
                type="button"
                onClick={() =>
                  setEngagement(level.value)
                }
                className={`rounded-xl border px-5 py-3 text-xs font-black transition ${
                  isActive
                    ? "border-[#6547FF] bg-[#6547FF]/5 text-[#6547FF]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#6547FF]/30"
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </div>

  <div className="grid gap-5 bg-slate-50 p-5 sm:p-7 lg:grid-cols-[0.75fr_1.25fr]">
    <div className="relative overflow-hidden rounded-[1.75rem] bg-[#071426] p-6 text-white">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#6547FF]/25 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#A99CFF]">
          Meilleur potentiel
        </p>

        <div className="mt-6 flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-[#6547FF] text-xl font-black">
            {recommendedModel.symbol}
          </span>

          <div>
            <h3 className="text-2xl font-black tracking-[-0.04em]">
              {recommendedModel.name}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Selon vos paramètres
            </p>
          </div>
        </div>

        <p className="mt-8 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
          {formatCurrency(
            recommendedModel.revenue,
          )}
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Potentiel mensuel estimé
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Metric
            label="Stabilité"
            value={recommendedModel.stability}
          />

          <Metric
            label="Implication"
            value={recommendedModel.effort}
          />
        </div>

        <p className="mt-6 text-sm leading-7 text-slate-300">
          {recommendedModel.description}
        </p>
      </div>
    </div>

    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6547FF]">
            Comparaison
          </p>

          <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-slate-950">
            Revenus mensuels estimés
          </h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500">
          {formatCompactNumber(audience)}
        </span>
      </div>

      <div className="mt-7 space-y-6">
        {models.map((model, index) => {
          const percentage =
            (model.revenue /
              maximumRevenue) *
            100;

          return (
            <div key={model.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                      index === 0
                        ? "bg-[#6547FF] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {model.symbol}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-slate-950">
                      {model.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {model.stability}
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-black text-slate-950">
                  {formatCurrency(
                    model.revenue,
                  )}
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0
                      ? "bg-[#6547FF]"
                      : "bg-slate-300"
                  }`}
                  style={{
                    width: `${Math.max(
                      percentage,
                      4,
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-7 border-t border-slate-100 pt-5 text-xs leading-6 text-slate-500">
        Les résultats sont des estimations. Les
        revenus réels dépendent de votre niche, de
        votre plateforme, de votre offre et de la
        qualité de votre audience.
      </p>
    </div>
  </div>
</div>

);
}

function Metric({
label,
value,
}: {
label: string;
value: string;
}) {
return ( <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"> <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
{label} </p>

  <p className="mt-2 text-sm font-black text-white">
    {value}
  </p>
</div>

);
}

function formatNumber(value: number) {
return new Intl.NumberFormat("fr-FR", {
maximumFractionDigits: 0,
}).format(value);
}

function formatCompactNumber(value: number) {
return new Intl.NumberFormat("fr-FR", {
notation: "compact",
maximumFractionDigits: 1,
}).format(value);
}

function formatCurrency(value: number) {
return new Intl.NumberFormat("fr-FR", {
style: "currency",
currency: "EUR",
maximumFractionDigits: 0,
}).format(value);
}
