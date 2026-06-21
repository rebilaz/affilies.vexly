import type { ToolCalculatorConfig } from "@/sanity/lib/outils";

import { outilRegistry } from "./outil-registry";

type CalculatorRendererProps = {
  config: ToolCalculatorConfig;
};

export function CalculatorRenderer({
  config,
}: CalculatorRendererProps) {
  const Component = outilRegistry[config.toolType];

  if (!Component) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <p className="font-bold text-red-700">
          Le composant « {config.toolType} » n’existe pas encore.
        </p>

        <p className="mt-2 text-sm text-red-600">
          Ajoutez ce type dans components/outils/outil-registry.ts.
        </p>
      </div>
    );
  }

  return <Component config={config} />;
}