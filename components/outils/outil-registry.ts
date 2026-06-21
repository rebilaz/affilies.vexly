import type { ComponentType } from "react";

import type { ToolCalculatorConfig } from "@/sanity/lib/outils";

import { CreatorMonetizationComparator } from "./CreatorMonetizationComparator";
import { MrrYoutubeTool } from "./MrrYoutubeTool";

export type OutilComponentProps = {
config: ToolCalculatorConfig;
};

export const outilRegistry: Record<
string,
ComponentType<OutilComponentProps>

> = {
 "mrr-youtube": MrrYoutubeTool,
 "creator-monetization-comparator":
 CreatorMonetizationComparator,
 };
