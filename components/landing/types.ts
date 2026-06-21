import type { LucideIcon } from "lucide-react";

export type LandingSection = {
  id?: string;
  title: string;
  text?: string;
  bullets?: string[];
};

export type ProcessStep = {
  step: string;
  text: string;
  time: string;
};

export type HeroConfig = {
  badgeLabel: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  trustIndicators: string[];
  processTitle: string;
  processSteps: ProcessStep[];
};

export type FeatureConfig = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type FinalCtaConfig = {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
};

export type LandingConfig = {
  niche: string;
  hero: HeroConfig;
  features: FeatureConfig[];
  sections: LandingSection[];
  finalCta: FinalCtaConfig;
};
