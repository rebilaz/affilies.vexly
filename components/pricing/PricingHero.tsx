import type { PricingHeroContent } from "./pricing.types";

type PricingHeroProps = {
  hero: PricingHeroContent;
};

export function PricingHero({ hero }: PricingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
          {hero.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          {hero.description}
        </p>
      </div>
    </section>
  );
}