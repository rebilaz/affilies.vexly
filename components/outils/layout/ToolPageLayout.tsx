import type { ToolPage } from "@/sanity/lib/outils";

import FinalCTASection from "@/components/FinalCTASection";

import { ToolHeroSection } from "./ToolHeroSection";
import { ToolDetailsSection } from "./ToolDetailsSection";
import { ToolScenariosSection } from "./ToolScenariosSection";
import { ToolResourcesSection } from "./ToolResourcesSection";

type ToolPageLayoutProps = {
  tool: ToolPage;
};

export function ToolPageLayout({
  tool,
}: ToolPageLayoutProps) {
  const cta = tool.cta;

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-slate-950">
      <ToolHeroSection tool={tool} />

      <ToolDetailsSection tool={tool} />

      <ToolScenariosSection
        section={tool.scenariosSection}
      />

      <ToolResourcesSection tool={tool} />

      {cta?.title && cta.primaryLabel ? (
        <FinalCTASection
          eyebrow={cta.eyebrow}
          title={cta.title}
          subtitle={cta.description ?? ""}
          primaryCtaLabel={cta.primaryLabel}
          href={cta.primaryHref || "/#formulaire"}
        />
      ) : null}
    </main>
  );
}