import { ShieldAlert, TrendingDown, Ban, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal.client";

const ICONS = {
  Ban,
  TrendingDown,
  ShieldAlert,
} satisfies Record<string, LucideIcon>;

type ProblemItem = {
  icon: keyof typeof ICONS;
  title: string;
  description: string;
};

type ProblemsSectionProps = {
  title: string;
  description: string;
  items: readonly ProblemItem[];
};

export default function ProblemsSection({
  title,
  description,
  items,
}: ProblemsSectionProps) {
  if (!items?.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#EEF3FC] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-indigo-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-28 bottom-[-18rem] h-[32rem] w-[32rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-16 bottom-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 shadow-sm backdrop-blur">
            Les blocages
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-indigo-600" />

          {description ? (
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon];

            return (
              <Reveal key={item.title} delay={index * 100}>
                <article className="group relative h-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)] sm:p-8">
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                  <div className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-indigo-100/80 blur-3xl transition duration-300 group-hover:bg-violet-100" />

                  <div className="relative">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#061A33] text-white shadow-[0_14px_35px_rgba(15,23,42,0.16)] transition duration-300 group-hover:bg-indigo-600">
                      <Icon className="size-6" strokeWidth={2.2} />
                    </div>

                    <p className="mt-8 text-xs font-black tracking-[0.22em] text-indigo-500">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em] text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}