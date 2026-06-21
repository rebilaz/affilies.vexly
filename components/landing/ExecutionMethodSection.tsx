type MethodStep = {
  week: string;
  title: string;
  description: string;
};

type ExecutionMethodSectionProps = {
  title: string;
  description: string;
  steps: readonly MethodStep[];
};

export default function ExecutionMethodSection({
  title,
  description,
  steps,
}: ExecutionMethodSectionProps) {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          {description}
        </p>
      </div>

      {/* Divider */}
      <div className="mt-12 h-px w-full bg-slate-200" />

      {/* Timeline */}
      <div className="relative mt-16">
        {/* Line */}
        <div className="absolute left-0 right-0 top-4 hidden h-px bg-slate-200 md:block" />

        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.week} className="space-y-4">
              <div className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {index + 1}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {step.week}
                </div>

                <div className="text-lg font-semibold text-slate-900">
                  {step.title}
                </div>

                <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}