export type PricingPlan = {
  name: string;
  highlight: string;
  basePrice: number;
  oldPrice?: number;
  priceSuffix: string;
  limitedLabel: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
};

export type PricingHeroContent = {
  title: string;
  description: string;
};