"use client";

import { useMemo, useState } from "react";

import type { ToolCalculatorConfig } from "@/sanity/lib/outils";

type MrrYoutubeToolProps = {
config: ToolCalculatorConfig;
};

export function MrrYoutubeTool({
config,
}: MrrYoutubeToolProps) {
const monthlyPrice = config.monthlyPrice ?? 49;
const conversionRate = config.conversionRate ?? 0.2;

const minValue = config.minValue ?? 1000;
const maxValue = config.maxValue ?? 1_000_000;
const step = config.step ?? 1000;
const defaultValue = config.defaultValue ?? 50_000;

const [views, setViews] = useState(defaultValue);

const clients = useMemo(() => {
return Math.round(views * (conversionRate / 100));
}, [views, conversionRate]);

const mrr = clients * monthlyPrice;

return ( <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7"> <div className="grid gap-3 sm:grid-cols-3">
<ResultCard
label={config.inputResultLabel ?? "Vues YouTube"}
value={formatNumber(views)}
/>

    <ResultCard
      label={config.clientsResultLabel ?? "Clients estimés"}
      value={formatNumber(clients)}
    />

    <ResultCard
      label={config.revenueResultLabel ?? "MRR estimé"}
      value={formatCurrency(mrr)}
      highlighted
    />
  </div>

  <div className="mt-5 rounded-2xl bg-slate-100 p-5 sm:p-6">
    <div className="flex items-center justify-between gap-4">
      <label
        htmlFor="youtube-views"
        className="text-sm font-black text-slate-950"
      >
        {config.inputLabel ?? "Nombre de vues mensuelles"}
      </label>

      <span className="shrink-0 text-sm font-black text-[#6547FF]">
        {formatNumber(views)}
      </span>
    </div>

    <input
      id="youtube-views"
      type="range"
      min={minValue}
      max={maxValue}
      step={step}
      value={views}
      onChange={(event) => {
        setViews(Number(event.target.value));
      }}
      className="mt-5 w-full cursor-pointer accent-[#6547FF]"
    />

    {config.quickValues?.length ? (
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {config.quickValues.map((value) => {
          const isActive = value === views;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setViews(value)}
              className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${
                isActive
                  ? "border-[#6547FF] bg-[#6547FF] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#6547FF]/40 hover:text-[#6547FF]"
              }`}
            >
              {formatNumber(value)}
            </button>
          );
        })}
      </div>
    ) : null}
  </div>
</div>

);
}

function ResultCard({
label,
value,
highlighted = false,
}: {
label: string;
value: string;
highlighted?: boolean;
}) {
return (
<div
className={`rounded-2xl border p-4 text-center sm:p-5 ${
        highlighted
          ? "border-[#6547FF]/20 bg-[#6547FF]/5"
          : "border-slate-200 bg-slate-50"
      }`}
>
<p
className={`text-[11px] font-black uppercase tracking-[0.1em] ${
          highlighted ? "text-[#6547FF]" : "text-slate-400"
        }`}
>
{label} </p>

  <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
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

function formatCurrency(value: number) {
return new Intl.NumberFormat("fr-FR", {
style: "currency",
currency: "EUR",
maximumFractionDigits: 0,
}).format(value);
}
