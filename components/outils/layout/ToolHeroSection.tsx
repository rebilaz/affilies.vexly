import type { ToolPage } from "@/sanity/lib/outils";
import { CalculatorRenderer } from "@/components/outils/CalculatorRenderer";

type ToolHeroSectionProps = {
  tool: ToolPage;
};

export function ToolHeroSection({
  tool,
}: ToolHeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8FAFC] px-6 pb-14 pt-12 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_0%,rgba(108,77,255,0.12),transparent_38%)]" />

      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#6C4DFF]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-[#8B5CFF]/10 blur-3xl" />

      <div className="pointer-events-none absolute -left-72 top-[32%] -z-10 h-[42rem] w-[42rem] rounded-full border border-[#6C4DFF]/25" />

      <div className="pointer-events-none absolute -left-64 top-[36%] -z-10 h-[36rem] w-[36rem] rounded-full border border-[#6C4DFF]/25" />

      <div className="pointer-events-none absolute -left-56 top-[40%] -z-10 h-[30rem] w-[30rem] rounded-full border border-[#6C4DFF]/25" />

      <div className="pointer-events-none absolute -right-80 bottom-[-18rem] -z-10 h-[42rem] w-[42rem] rounded-full border border-[#6C4DFF]/20" />

      <div className="pointer-events-none absolute right-10 top-28 -z-10 hidden h-36 w-36 bg-[radial-gradient(circle,_rgba(108,77,255,0.45)_1.5px,_transparent_1.5px)] [background-size:18px_18px] opacity-40 lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.06em] text-[#020617] sm:text-5xl lg:text-6xl">
            {tool.title}
          </h1>

          <div className="mt-5 h-1 w-16 rounded-full bg-[#6547FF]" />

          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
            {tool.description}
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-5xl">
          <div className="pointer-events-none absolute -inset-x-4 -inset-y-5 -z-10 rounded-[3rem] bg-[#6C4DFF]/15 blur-3xl" />

          <CalculatorRenderer config={tool.calculator} />
        </div>
      </div>
    </section>
  );
}