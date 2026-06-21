import Link from "next/link";

import type {
  ToolListItem,
  ToolPage,
} from "@/sanity/lib/outils";

type ToolResourcesSectionProps = {
  tool: ToolPage;
};

type ToolMeta = {
  label: string;
  symbol: string;
};

const TOOL_META: Partial<Record<string, ToolMeta>> = {
  "mrr-youtube": {
    label: "Revenus récurrents",
    symbol: "€",
  },

  "mvp-cost": {
    label: "Budget produit",
    symbol: "◇",
  },

  "idea-validator": {
    label: "Validation d’idée",
    symbol: "✓",
  },

  "break-even": {
    label: "Rentabilité",
    symbol: "%",
  },

  "creator-monetization-comparator": {
    label: "Monétisation créateur",
    symbol: "⇄",
  },
};

function getGridClass(toolCount: number): string {
  if (toolCount === 1) {
    return "mx-auto mt-14 grid max-w-xl grid-cols-1 gap-5";
  }

  if (toolCount === 2) {
    return "mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2";
  }

  if (toolCount === 4) {
    return "mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4";
  }

  return "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3";
}

function getToolMeta(
  relatedTool: ToolListItem,
): ToolMeta {
  const toolType = relatedTool.toolType
    ?.trim()
    .toLowerCase();

  return (
    TOOL_META[toolType] ?? {
      label:
        relatedTool.label ||
        "Outil gratuit",
      symbol: "✦",
    }
  );
}

function RelatedToolCard({
  relatedTool,
  index,
}: {
  relatedTool: ToolListItem;
  index: number;
}) {
  const meta = getToolMeta(relatedTool);

  return (
    <Link
      href={`/outils/${relatedTool.slug}`}
      className="group relative flex min-h-72 flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#6547FF]/30 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[#6547FF]/5 transition duration-300 group-hover:bg-[#6547FF]/10" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-[#6547FF] shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          {meta.symbol}
        </div>

        <span className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-slate-700 transition duration-300 group-hover:border-[#6547FF] group-hover:bg-[#6547FF] group-hover:text-white">
          ↗
        </span>
      </div>

      <div className="relative mt-8 flex items-center gap-3">
        <span className="text-xs font-black tracking-[0.16em] text-slate-400">
          {String(index + 1).padStart(
            2,
            "0",
          )}
        </span>

        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6547FF]">
          {relatedTool.label || meta.label}
        </p>
      </div>

      <h3 className="relative mt-3 text-2xl font-black leading-tight tracking-[-0.04em] text-[#020617]">
        {relatedTool.title}
      </h3>

      {relatedTool.description ? (
        <p className="relative mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
          {relatedTool.description}
        </p>
      ) : null}

      <div className="relative mt-auto pt-7 text-sm font-black text-slate-950">
        Utiliser l’outil

        <span className="ml-2 inline-block transition duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

export function ToolResourcesSection({
  tool,
}: ToolResourcesSectionProps) {
  const related = tool.relatedSection;
  const faq = tool.faqSection;

  const relatedTools = (
    tool.relatedTools ?? []
  ).filter((relatedTool) => {
    return (
      relatedTool.slug &&
      relatedTool.slug !== tool.slug
    );
  });

  const hasRelatedTools =
    relatedTools.length > 0;

  const hasFaq = Boolean(
    faq?.items?.length,
  );

  if (!hasRelatedTools && !hasFaq) {
    return null;
  }

  return (
    <>
      {hasRelatedTools ? (
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-violet-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6547FF]">
                {related?.eyebrow ||
                  "Outils complémentaires"}
              </p>

              <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-[#020617] sm:text-5xl">
                {related?.title ||
                  "Découvrez nos autres outils gratuits"}
              </h2>

              <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#6547FF]" />
            </div>

            <div
              className={getGridClass(
                relatedTools.length,
              )}
            >
              {relatedTools.map(
                (relatedTool, index) => (
                  <RelatedToolCard
                    key={relatedTool._id}
                    relatedTool={
                      relatedTool
                    }
                    index={index}
                  />
                ),
              )}
            </div>
          </div>
        </section>
      ) : null}

      {hasFaq && faq?.items ? (
        <section className="relative isolate overflow-hidden bg-[#F1F5FF] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_0%,rgba(108,77,255,0.10),transparent_40%)]" />

          <div className="pointer-events-none absolute -bottom-72 -left-64 -z-10 size-[40rem] rounded-full border border-[#6547FF]/10" />

          <div className="pointer-events-none absolute -bottom-64 -left-56 -z-10 size-[34rem] rounded-full border border-[#6547FF]/10" />

          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-4xl text-center">
              {faq.eyebrow ? (
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6547FF]">
                  {faq.eyebrow}
                </p>
              ) : null}

              <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[#020617] sm:text-5xl lg:text-6xl">
                {faq.title}
              </h2>

              <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-[#6547FF]" />
            </div>

            <div className="mt-14 space-y-4">
              {faq.items.map(
                (item, index) => (
                  <details
                    key={item._key}
                    className="group overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_14px_45px_rgba(51,65,85,0.08)] transition duration-300 open:border-[#6547FF]/20 open:shadow-[0_20px_60px_rgba(101,71,255,0.12)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-5 px-6 py-6 sm:px-8 sm:py-7 [&::-webkit-details-marker]:hidden">
                      <span className="shrink-0 text-xs font-black tracking-[0.16em] text-[#6547FF]">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <h3 className="flex-1 text-left text-base font-black leading-snug tracking-[-0.025em] text-[#020617] sm:text-xl">
                        {item.question}
                      </h3>

                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl font-medium text-slate-500 transition duration-300 group-open:rotate-45 group-open:border-[#6547FF] group-open:bg-[#6547FF] group-open:text-white">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-100 px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
                      <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:pl-11 sm:text-base sm:leading-8">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ),
              )}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
