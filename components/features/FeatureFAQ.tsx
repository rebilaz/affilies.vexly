type FeatureFAQProps = {
  data?: {
    title?: string;
    description?: string;
    items?: {
      question?: string;
      answer?: string;
    }[];
  };
};

export function FeatureFAQ({ data }: FeatureFAQProps) {
  const faqs = (data?.items || []).filter((faq) => faq.question || faq.answer);

  if (!data?.title && !data?.description && faqs.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F8FAFC_0%,#EEF2FF_55%,#F8FAFC_100%)] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-16 bottom-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
            FAQ
          </p>

          {data?.title ? (
            <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              {data.title}
            </h2>
          ) : null}

          {data?.description ? (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {data.description}
            </p>
          ) : null}
        </div>

        {faqs.length > 0 ? (
          <div className="mt-14 space-y-4 sm:mt-16">
            {faqs.map((faq, index) => (
              <details
                key={`${faq.question}-${index}`}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 open:bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_26px_80px_rgba(15,23,42,0.10)] sm:p-7"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-indigo-100/70 blur-3xl transition duration-300 group-open:bg-violet-100" />

                <summary className="relative cursor-pointer list-none select-none">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-5">
                      <span className="mt-1 text-xs font-black tracking-[0.22em] text-indigo-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {faq.question ? (
                        <h3 className="text-xl font-black leading-snug tracking-[-0.03em] text-slate-950 sm:text-2xl">
                          {faq.question}
                        </h3>
                      ) : null}
                    </div>

                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-black text-slate-500 transition duration-300 group-open:rotate-45 group-open:border-indigo-200 group-open:text-indigo-600">
                      +
                    </span>
                  </div>
                </summary>

                {faq.answer ? (
                  <p className="relative mt-5 max-w-3xl pl-11 text-base leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                ) : null}
              </details>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}