import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import FinalCTASection from "../FinalCTASection";
import RevenueProjectionSection from "./RevenueProjectionSection";
import ExecutionMethodSection from "./ExecutionMethodSection";
import ProblemsSection from "./ProblemsSection";
import FAQSection from "./FAQSection";
import type { LandingPageContent } from "@/sanity/lib/landing";

type LandingLayoutProps = {
  landingcontent: LandingPageContent;
};

export default function LandingLayout({ landingcontent }: LandingLayoutProps) {
  const {
    eyebrow,
    titleline1,
    titlehighlight,
    description: desc1,
  } = landingcontent.hero;

  const {
    title: title3,
    description: desc3,
    clients,
    price,
  } = landingcontent.projection;

  const mrr = clients * price;

  const {
    title: title4,
    description: desc4,
    items: items2,
  } = landingcontent.problems;

  const {
    title: title5,
    description: desc5,
    steps,
  } = landingcontent.method;

  const {
    title: faqTitle,
    items: faqItems,
  } = landingcontent.faq;

  const {
    title: title6,
    subtitle: subtitle6,
    primaryCtaLabel,
  } = landingcontent.finalCta;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-slate-950">
      <main className="overflow-hidden">
        <HeroSection
          eyebrow={eyebrow}
          titleline1={titleline1}
          titlehighlight={titlehighlight}
          description={desc1}
        />

        <RevenueProjectionSection
          title={title3}
          description={desc3}
          clients={clients}
          pricePerMonth={price}
          mrr={mrr}
        />

        <ProblemsSection
          title={title4}
          description={desc4}
          items={items2}
        />

        <FeaturesSection />

        <div className="mx-auto max-w-7xl px-6 py-16 space-y-16 sm:py-24 sm:space-y-24 lg:px-8 lg:space-y-32">
          <ExecutionMethodSection
            title={title5}
            description={desc5}
            steps={steps}
          />

          <FAQSection
            title={faqTitle}
            items={faqItems}
          />
        </div>

        <FinalCTASection
          title={title6}
          subtitle={subtitle6}
          primaryCtaLabel={primaryCtaLabel}
        />
      </main>
    </div>
  );
}