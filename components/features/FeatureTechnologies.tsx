import Image from "next/image";

type Technology = {
  title?: string;
  logoLabel?: string;
  logo?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
};

type FeatureTechnologiesProps = {
  eyebrow?: string;
  title?: string;
  technologies?: Technology[];
};

function getLogoLabel(technology: Technology) {
  if (technology.logoLabel) return technology.logoLabel;

  const normalized = technology.title?.toLowerCase() || "";

  if (normalized.includes("next")) return "Next";
  if (normalized.includes("react")) return "React";
  if (normalized.includes("type")) return "TS";
  if (normalized.includes("tailwind")) return "Tailwind";
  if (normalized.includes("stripe")) return "Stripe";
  if (normalized.includes("auth")) return "Auth";
  if (normalized.includes("database") || normalized.includes("db")) return "DB";

  return technology.title?.slice(0, 2).toUpperCase() || "VX";
}

function getLogoClass(index: number) {
  const classes = [
    "text-white",
    "text-sky-300",
    "text-cyan-300",
    "text-violet-300",
    "text-indigo-300",
  ];

  return classes[index % classes.length];
}

export function FeatureTechnologies({
  eyebrow,
  title,
  technologies,
}: FeatureTechnologiesProps) {
  const displayedTechnologies = (technologies || [])
    .filter((technology) => technology.title)
    .slice(0, 6);

  if (!eyebrow && !title && !displayedTechnologies.length) return null;

  return (
    <section
      id="technologies"
      className="relative isolate overflow-hidden bg-[#061A33] px-6 py-20 text-white sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute left-16 bottom-20 hidden h-32 w-32 bg-[radial-gradient(circle,_rgba(199,210,254,0.45)_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {eyebrow ? (
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-400">
                {eyebrow}
              </p>
            ) : null}

            {title ? (
              <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            ) : null}
          </div>
        </div>

        {displayedTechnologies.length ? (
          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {displayedTechnologies.map((technology, index) => {
              const logoUrl = technology.logo?.asset?.url;

              return (
                <div
                  key={`${technology.title}-${index}`}
                  className="group flex flex-col items-start"
                >
                  {logoUrl ? (
                    <div className="relative h-10 w-28 transition duration-300 group-hover:-translate-y-1">
                      <Image
                        src={logoUrl}
                        alt={technology.logo?.alt || technology.title || ""}
                        fill
                        sizes="112px"
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <div
                      className={`text-3xl font-black tracking-[-0.06em] transition duration-300 group-hover:-translate-y-1 sm:text-4xl ${getLogoClass(
                        index
                      )}`}
                    >
                      {getLogoLabel(technology)}
                    </div>
                  )}

                  <div className="mt-5 h-px w-12 bg-white/15 transition duration-300 group-hover:w-20 group-hover:bg-white/35" />

                  <h3 className="mt-5 max-w-[180px] text-base font-black leading-snug tracking-[-0.03em] text-slate-200">
                    {technology.title}
                  </h3>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}