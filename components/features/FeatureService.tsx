type ServiceItem = {
  title?: string;
  description?: string;
};

type FeatureServiceProps = {
  title?: string;
  items?: ServiceItem[];
};

const markerStyles = [
  "bg-amber-300",
  "bg-orange-300",
  "bg-slate-950",
  "bg-red-400",
];

function DecorativeMarker({ index }: { index: number }) {
  return (
    <div className="relative mt-1.5 size-4 shrink-0">
      <span
        className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded-full ${
          markerStyles[index % markerStyles.length]
        }`}
      />
      <span
        className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rotate-45 rounded-full ${
          markerStyles[index % markerStyles.length]
        }`}
      />
      <span
        className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rotate-90 rounded-full ${
          markerStyles[index % markerStyles.length]
        }`}
      />
      <span
        className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 -rotate-45 rounded-full ${
          markerStyles[index % markerStyles.length]
        }`}
      />
    </div>
  );
}

export function FeatureService({ title, items }: FeatureServiceProps) {
  const displayedItems = (items || [])
    .filter((item) => item.title || item.description)
    .slice(0, 4);

  if (!title && !displayedItems.length) return null;

  return (
    <section
      id="service"
      className="relative isolate overflow-hidden bg-[#F8FAFC] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-indigo-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-16 bottom-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            {title ? (
              <h2 className="max-w-xl text-4xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            ) : null}
          </div>

          <div className="space-y-14 sm:space-y-16">
            {displayedItems.map((item, index) => (
              <article key={`${item.title}-${index}`} className="group">
                <div className="flex gap-5">
                  <DecorativeMarker index={index} />

                  <div>
                    {item.title ? (
                      <h3 className="text-2xl font-black leading-snug tracking-[-0.035em] text-slate-950 sm:text-3xl">
                        {item.title}
                      </h3>
                    ) : null}

                    {item.description ? (
                      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}