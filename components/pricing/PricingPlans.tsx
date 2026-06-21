import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { PricingHeroContent, PricingPlan } from "./pricing.types";

function euro(n: number) {
  return `${n}€`;
}

type PricingPlansProps = {
  hero: PricingHeroContent;
  offer: PricingPlan;
};

export function PricingPlans({ hero, offer }: PricingPlansProps) {
  return (
    <section
      id="offre"
      className="relative isolate overflow-hidden bg-[#F8FAFC] px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-28 bottom-[-18rem] h-[32rem] w-[32rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-16 bottom-[-14rem] h-[26rem] w-[26rem] rounded-full border border-indigo-100" />

      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-bl-[7rem] bg-indigo-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-16 top-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="relative z-10">
            <h2 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              {hero.title}
            </h2>

            <div className="mt-8 h-1 w-20 rounded-full bg-indigo-600" />

            <p className="mt-8 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {hero.description}
            </p>
          </div>

          <div className="relative z-10">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-200/70 via-white to-cyan-200/70 blur-3xl" />

            <article className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8 lg:p-10">
              <div className="absolute right-0 top-0 h-44 w-44 rounded-bl-full bg-indigo-50" />
              <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-white/60 blur-xl" />

              <div className="relative">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">
                      {offer.name}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                      {offer.highlight}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10">
                    {offer.limitedLabel}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-end gap-3">
                  {offer.oldPrice && (
                    <span className="pb-3 text-xl font-bold text-slate-400 line-through sm:text-2xl">
                      {euro(offer.oldPrice)}
                    </span>
                  )}

                  <span className="text-6xl font-black leading-none tracking-[-0.07em] text-slate-950 sm:text-7xl">
                    {euro(offer.basePrice)}
                  </span>

                  <span className="pb-4 text-sm font-bold text-slate-500">
                    {offer.priceSuffix}
                  </span>
                </div>

                <Link
                  href={offer.ctaHref}
                  className="group mt-10 inline-flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 text-sm font-black text-white shadow-2xl shadow-indigo-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-950 hover:shadow-slate-950/20"
                >
                  {offer.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                </Link>

                <div className="mt-10 grid gap-4">
                  {offer.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-4 rounded-2xl border border-transparent px-1 py-1 transition hover:border-slate-100 hover:bg-slate-50"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50">
                        <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                      </span>

                      <span className="text-sm font-semibold leading-6 text-slate-700 sm:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}