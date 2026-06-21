// components/landing/RevenueProjectionSection.ts

import Reveal from "./Reveal.client";

type Props = {
  title: string;
  description?: string;
  clients: number;
  pricePerMonth: number;
  mrr: number;
};

export default function RevenueProjectionSection({
  title,
  description,
  clients,
  pricePerMonth,
  mrr,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[#061A33] px-6 py-24 text-white sm:py-28 lg:px-8 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-56 bottom-[-26rem] h-[52rem] w-[52rem] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -left-40 bottom-[-20rem] h-[42rem] w-[42rem] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -right-56 top-[-18rem] h-[46rem] w-[46rem] rounded-full bg-violet-500/10 blur-3xl" />

      <Reveal className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">
            {title}
          </h2>

          {description ? (
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[2.75rem] bg-white px-4 py-5 text-slate-950 shadow-[0_34px_110px_rgba(0,0,0,0.28)] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="grid items-center gap-4 text-center lg:grid-cols-[1fr_auto_1fr_auto_minmax(300px,1.2fr)] lg:gap-6">
            <div className="flex min-h-[220px] flex-col items-center justify-center">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                Clients
              </p>

              <p className="mt-5 whitespace-nowrap text-7xl font-black leading-none tracking-[-0.08em] text-slate-950 tabular-nums sm:text-8xl lg:text-[5.5rem] xl:text-[6rem]">
                {clients}
              </p>
            </div>

            <div className="flex min-h-16 items-center justify-center text-6xl font-black leading-none tracking-[-0.08em] text-slate-300 sm:text-7xl lg:min-h-[220px] lg:text-8xl">
              ×
            </div>

            <div className="flex min-h-[220px] flex-col items-center justify-center">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                Prix
              </p>

              <p className="mt-5 whitespace-nowrap text-7xl font-black leading-none tracking-[-0.08em] text-slate-950 tabular-nums sm:text-8xl lg:text-[5.5rem] xl:text-[6rem]">
                {pricePerMonth}€
              </p>

              <p className="mt-4 text-sm font-black text-slate-500 sm:text-base">
                / mois
              </p>
            </div>

            <div className="flex min-h-16 items-center justify-center text-6xl font-black leading-none tracking-[-0.08em] text-slate-300 sm:text-7xl lg:min-h-[220px] lg:text-8xl">
              =
            </div>

            <div className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-[2.25rem] bg-[#F3F6FC] px-5 py-8 sm:px-6 lg:px-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_48%)]" />

              <div className="relative w-full">
                <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-indigo-600">
                  MRR
                </p>

                <p className="mt-5 whitespace-nowrap text-center text-6xl font-black leading-none tracking-[-0.08em] text-slate-950 tabular-nums sm:text-7xl lg:text-[4.5rem] xl:text-[5rem]">
                  {mrr.toLocaleString("fr-FR")}€
                </p>

                <p className="mt-4 text-center text-sm font-black text-slate-500 sm:text-base">
                  / mois
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}