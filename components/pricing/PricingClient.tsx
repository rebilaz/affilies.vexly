import { PricingHero } from "./PricingHero";
import { PricingPlans } from "./PricingPlans";
import { PricingFaq } from "./PricingFaq";
import TestimonialsMarquee from "../TestimonialsMarquee";
import SeoContent from "./SeoContent";
import type {
  PricingPageData,
} from "@/sanity/lib/pricingPage";
import type { PricingHeroContent, PricingPlan } from "./pricing.types";

type PricingClientProps = {
  page?: PricingPageData | null;
};

export default function PricingClient({ page }: PricingClientProps) {
  const hero: PricingHeroContent = {
    title: page?.hero?.title ?? "Un MVP SaaS clair, sans choix compliqué.",
    description:
      page?.hero?.description ??
      "Une offre claire pour transformer ton idée en SaaS moderne, propre et prêt à encaisser ses premiers clients.",
  };

  const offer: PricingPlan = {
    name: page?.offer?.name ?? "Vexly Launch",
    highlight:
      page?.offer?.highlight ?? "Ton SaaS prêt à vendre en moins de 14 jours.",
    basePrice: page?.offer?.basePrice ?? 990,
    oldPrice: page?.offer?.oldPrice ?? 1490,
    priceSuffix: page?.offer?.priceSuffix ?? "/ projet",
    limitedLabel: page?.offer?.limitedLabel ?? "Places limitées",
    ctaLabel: page?.offer?.ctaLabel ?? "Lancer mon SaaS",
    ctaHref: page?.offer?.ctaHref ?? "/contact",
    features: page?.offer?.features ?? [
      "Landing page premium responsive",
      "Page tarifs optimisée conversion",
      "Authentification utilisateur",
      "Intégration Stripe",
      "Dashboard SaaS de base",
      "Design system Vexly",
      "Code source livré",
      "Mise en ligne incluse",
    ],
  };

  const testimonials = page?.testimonials;

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8FAFC] text-slate-950">
      <main className="relative">
        <PricingHero hero={hero} />
        <PricingPlans hero={hero} offer={offer} />
        <TestimonialsMarquee content={testimonials} />
        <PricingFaq content={page?.faq} />
        <SeoContent content={page?.seoContent} />
      </main>
    </div>
  );
}