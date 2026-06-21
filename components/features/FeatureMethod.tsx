import {
  ClipboardList,
  Code2,
  Rocket,
  Search,
  LucideIcon,
} from "lucide-react";

type MethodStep = {
  title?: string;
  description?: string;
};

type FeatureMethodProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: MethodStep[];
};

function getStepIcon(index: number): LucideIcon {
  const icons = [Search, ClipboardList, Code2, Rocket];
  return icons[index % icons.length];
}

export function FeatureMethod({
  eyebrow,
  title,
  description,
  steps,
}: FeatureMethodProps) {
  const displayedSteps = (steps || [])
    .filter((step) => step.title || step.description)
    .slice(0, 4);

  if (!eyebrow && !title && !description && !displayedSteps.length) {
    return null;
  }

  return (
    <section
      id="notre-methode"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F8FAFC_0%,#EEF2FF_50%,#F8FAFC_100%)] px-6 py-14 text-slate-950 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute -right-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-indigo-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-20 bottom-24 hidden h-36 w-36 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow ? (
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
              {eyebrow}
            </p>
          ) : null}

          {title ? (
            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          ) : null}

          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        {displayedSteps.length ? (
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-indigo-300 via-indigo-200 to-transparent md:block" />

            <div className="space-y-5">
              {displayedSteps.map((step, index) => {
                const Icon = getStepIcon(index);

                return (
                  <article
                    key={`${step.title}-${index}`}
                    className="group relative md:pl-16"
                  >
                    <div className="absolute left-0 top-8 z-10 hidden size-12 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-indigo-600 shadow-[0_12px_35px_rgba(79,70,229,0.12)] md:flex">
                      <Icon className="size-5" />
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#061A33] p-6 text-white shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0B1F3A] hover:shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:p-8">
                      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/45 to-transparent" />
                      <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-indigo-400/15 blur-3xl" />

                      <div className="relative max-w-3xl">
                        {step.title ? (
                          <h3 className="text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
                            {step.title}
                          </h3>
                        ) : null}

                        {step.description ? (
                          <p className="mt-5 text-base leading-8 text-slate-300">
                            {step.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}