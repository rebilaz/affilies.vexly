import {
  BadgeCheck,
  Code2,
  Gauge,
  Handshake,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

type WhyUsItem = {
  title?: string;
  description?: string;
};

type FeatureWhyUsProps = {
  title?: string;
  items?: WhyUsItem[];
};

function getWhyUsIcon(index: number): LucideIcon {
  const icons = [
    BadgeCheck,
    Sparkles,
    Code2,
    TrendingUp,
    Gauge,
    ShieldCheck,
    Handshake,
  ];

  return icons[index % icons.length];
}

const iconBoxStyles = [
  "text-indigo-500",
  "text-violet-500",
  "text-slate-950",
  "text-rose-400",
];

export function FeatureWhyUs({ title, items }: FeatureWhyUsProps) {
  const displayedItems = (items || [])
    .filter((item) => item.title || item.description)
    .slice(0, 4);

  if (!title && !displayedItems.length) return null;

  return (
    <section
      id="pourquoi-nous"
      className="relative isolate overflow-hidden bg-[#EEF3FC] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-16 bottom-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        {title ? (
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          </div>
        ) : null}

        {displayedItems.length ? (
          <div className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {displayedItems.map((item, index) => {
              const Icon = getWhyUsIcon(index);

              return (
                <article
                  key={`${item.title}-${index}`}
                  className="group text-center"
                >
                  <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-white/55 shadow-[0_18px_45px_rgba(15,23,42,0.06)] ring-1 ring-white/70 transition duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
                    <Icon
                      className={`size-7 ${
                        iconBoxStyles[index % iconBoxStyles.length]
                      }`}
                      strokeWidth={1.8}
                    />
                  </div>

                  {item.title ? (
                    <h3 className="mt-7 text-xl font-black leading-snug tracking-[-0.03em] text-slate-950">
                      {item.title}
                    </h3>
                  ) : null}

                  {item.description ? (
                    <p className="mx-auto mt-4 max-w-[280px] text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}