import { FeatureHero } from "./FeatureHero";
import { FeatureAdvantages } from "./FeatureAdvantages";
import FinalCTASection from "@/components/FinalCTASection";
import { FeatureFAQ } from "./FeatureFAQ";
import { FeatureMethod } from "./FeatureMethod";
import { FeatureTechnologies } from "./FeatureTechnologies";
import { FeatureWhyUs } from "./FeatureWhyUs";
import { FeatureService } from "./FeatureService";
import { FeatureRealisations } from "./FeatureRealisations";
import TestimonialsMarquee from "../TestimonialsMarquee";
import type { PricingPageTestimonials } from "@/sanity/lib/pricingPage";
import type { FeatureSectionContent } from "@/sanity/lib/features";

type FeaturesLayoutProps = {
  data: FeatureSectionContent | null;
  testimonials?: PricingPageTestimonials;
};

export function FeaturesLayout({ data, testimonials }: FeaturesLayoutProps) {
  if (!data) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC] text-slate-900">
      <main className="overflow-hidden">
        <FeatureHero data={data} />

        <FeatureAdvantages
          title={data.advantagesIntro?.title}
          description={data.advantagesIntro?.description}
          advantages={data.advantages}
        />

        <FeatureService
          title={data.service?.title}
          items={data.service?.items}
        />

        <FeatureWhyUs title={data.whyUs?.title} items={data.whyUs?.items} />

        <FeatureMethod
          eyebrow={data.method?.eyebrow}
          title={data.method?.title}
          description={data.method?.description}
          steps={data.method?.steps}
        />

        <FeatureTechnologies
          eyebrow={data.technologies?.eyebrow}
          title={data.technologies?.title}
          technologies={data.technologies?.items}
        />

        <FeatureFAQ data={data.faq} />

        <TestimonialsMarquee content={testimonials} />

        <FinalCTASection
          eyebrow={data.finalCta?.eyebrow}
          title={
            data.finalCta?.title ||
            (data.title
              ? `Lancez votre projet : ${data.title}`
              : "Prêt à générer des revenus récurrents ?")
          }
          subtitle={
            data.finalCta?.subtitle ||
            data.description ||
            "Transformez votre idée de SaaS en un actif digital durable et rentable en 21 jours."
          }
          primaryCtaLabel={
            data.finalCta?.ctaLabel || data.ctaLabel || "Créer mon SaaS →"
          }
          href={data.finalCta?.ctaHref || data.ctaHref || "/#formulaire"}
        />
      </main>
    </div>
  );
}