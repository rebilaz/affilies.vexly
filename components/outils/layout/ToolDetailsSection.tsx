import type { ToolPage } from "@/sanity/lib/outils";

type ToolDetailsSectionProps = {
tool: ToolPage;
};

export function ToolDetailsSection({
tool,
}: ToolDetailsSectionProps) {
const formula = tool.formulaSection;
const useCases = tool.useCasesSection;

if (!formula && !useCases) {
return null;
}

return ( <section className="bg-[#071426] px-6 py-20 text-white sm:py-24 lg:px-8 lg:py-28"> <div className="mx-auto max-w-6xl space-y-20">
{formula ? ( <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16"> <div>
{formula.eyebrow ? ( <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8B73FF]">
{formula.eyebrow} </p>
) : null}

          <h2 className="mt-4 max-w-lg text-3xl font-black leading-tight tracking-[-0.045em] text-white sm:text-4xl">
            {formula.title}
          </h2>

          <div className="mt-5 h-1 w-14 rounded-full bg-[#795BFF]" />
        </div>

        <div>
          {formula.intro ? (
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              {formula.intro}
            </p>
          ) : null}

          {formula.formula ? (
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-6">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9C8BFF]">
                Formule
              </p>

              <p className="mt-3 text-xl font-black leading-snug tracking-[-0.025em] text-white sm:text-2xl">
                {formula.formula}
              </p>
            </div>
          ) : null}

          {formula.steps?.length ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {formula.steps.map((step) => (
                <div
                  key={step._key}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-[#795BFF]/50 hover:bg-white/[0.07]"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#6547FF] text-xs font-black text-white">
                    {step.label}
                  </span>

                  <h3 className="mt-4 font-black text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ) : null}

    {formula && useCases?.items?.length ? (
      <div className="h-px bg-white/10" />
    ) : null}

    {useCases?.items?.length ? (
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          {useCases.eyebrow ? (
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8B73FF]">
              {useCases.eyebrow}
            </p>
          ) : null}

          <h2 className="mt-4 max-w-lg text-3xl font-black leading-tight tracking-[-0.045em] text-white sm:text-4xl">
            {useCases.title}
          </h2>

          <div className="mt-5 h-1 w-14 rounded-full bg-[#795BFF]" />
        </div>

        <div className="grid gap-3">
          {useCases.items.map((item, index) => (
            <div
              key={item._key}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-[#795BFF]/50 hover:bg-white/[0.07] sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6547FF]/20 text-xs font-black text-[#A99CFF]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="pt-1 text-sm leading-7 text-slate-300 sm:text-base">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </div>
</section>


);
}
