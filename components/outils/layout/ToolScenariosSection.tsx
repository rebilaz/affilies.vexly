import type { ScenariosSection } from "@/sanity/lib/outils";

type ToolScenariosSectionProps = {
section?: ScenariosSection;
};

type ScenarioIconProps = {
index: number;
};

function ScenarioIcon({ index }: ScenarioIconProps) {
const commonClasses =
"size-6 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]";

if (index === 0) {
return ( <svg
     viewBox="0 0 24 24"
     aria-hidden="true"
     className={commonClasses}
   > <path d="M4 19V9" /> <path d="M10 19V5" /> <path d="M16 19v-7" /> <path d="M22 19V3" /> </svg>
);
}

if (index === 1) {
return ( <svg
     viewBox="0 0 24 24"
     aria-hidden="true"
     className={commonClasses}
   > <path d="M12 3v18" /> <path d="M17 7.5c0-2-2.2-3.5-5-3.5S7 5.5 7 7.5 9.2 11 12 11s5 1.5 5 3.5S14.8 18 12 18s-5-1.5-5-3.5" /> </svg>
);
}

if (index === 2) {
return ( <svg
     viewBox="0 0 24 24"
     aria-hidden="true"
     className={commonClasses}
   > <path d="M5 12h14" /> <path d="m13 6 6 6-6 6" /> <path d="M5 6v12" /> </svg>
);
}

return ( <svg
   viewBox="0 0 24 24"
   aria-hidden="true"
   className={commonClasses}
 > <path d="M4 17 10 11l4 4 6-8" /> <path d="M15 7h5v5" /> </svg>
);
}

export function ToolScenariosSection({
section,
}: ToolScenariosSectionProps) {
if (!section?.cards?.length) {
return null;
}

return ( <section className="relative isolate overflow-hidden bg-[#F1F5FF] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28"> <div
     aria-hidden="true"
     className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_0%,rgba(108,77,255,0.10),transparent_42%)]"
   />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-72 -left-64 -z-10 size-[40rem] rounded-full border border-[#6C4DFF]/10"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-64 -left-56 -z-10 size-[34rem] rounded-full border border-[#6C4DFF]/10"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute bottom-10 right-0 -z-10 hidden h-32 w-32 bg-[radial-gradient(circle,_rgba(101,71,255,0.28)_1px,_transparent_1px)] [background-size:18px_18px] lg:block"
  />

  <div className="mx-auto max-w-7xl">
    <div className="mx-auto max-w-4xl text-center">
      {section.eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6547FF]">
          {section.eyebrow}
        </p>
      ) : null}

      <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-[#020617] sm:text-5xl">
        {section.title}
      </h2>

      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#6547FF]" />

      {section.description ? (
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {section.description}
        </p>
      ) : null}
    </div>

    <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {section.cards.map((card, index) => (
        <article
          key={card._key}
          className="flex flex-col items-center text-center"
        >
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-[#6547FF] shadow-[0_16px_40px_rgba(51,65,85,0.10)]">
            <ScenarioIcon index={index} />
          </div>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            {card.label}
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.035em] text-[#020617]">
            {card.value}
          </h3>

          {card.description ? (
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-600">
              {card.description}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  </div>
</section>

);
}
