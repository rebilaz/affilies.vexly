// components/landing/HeroSection

import Link from "next/link";
import SaasPreview from "./SaasPreview";

type HeroSectionProps = {
  eyebrow: string;
  titleline1: string;
  titlehighlight: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function HeroSection({
  eyebrow,
  titleline1,
  titlehighlight,
  description,
  primaryCtaLabel = "Créer ma plateforme",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "Découvrir Vexly",
  secondaryCtaHref = "/#services",
}: HeroSectionProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F8FAFC] px-4 pt-16 pb-10 text-slate-950 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-28 bottom-[-18rem] h-[32rem] w-[32rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-16 bottom-[-14rem] h-[26rem] w-[26rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-bl-[7rem] bg-indigo-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-16 top-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative z-10 min-w-0">
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 shadow-sm backdrop-blur">
              {eyebrow}
            </div>

            <h1 className="mt-6 max-w-[calc(100vw-2rem)] whitespace-normal break-words [overflow-wrap:anywhere] text-[clamp(1.9rem,8.5vw,2.8rem)] font-black leading-[1.08] tracking-[-0.04em] text-slate-950 sm:mt-7 sm:max-w-4xl sm:text-6xl sm:leading-[1.02] sm:tracking-[-0.05em] lg:text-7xl lg:leading-[0.98] lg:tracking-[-0.06em]">
              <span className="block">{titleline1}</span>
              <span className="block">{titlehighlight}</span>
            </h1>

            <div className="mt-7 h-1 w-20 rounded-full bg-indigo-600 sm:mt-8" />

            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-center">
              <Link
                href={primaryCtaHref}
                className="group inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(88,80,236,0.32)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
              >
                {primaryCtaLabel}
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="relative z-0 mt-2 h-[315px] sm:h-[460px] lg:mt-0 lg:h-auto lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[430px] sm:max-w-[620px] lg:max-w-[720px]">
              <div className="pointer-events-none absolute -inset-8 rounded-[32px] bg-gradient-to-tr from-indigo-300/25 via-sky-200/15 to-violet-300/20 blur-2xl transform-gpu will-change-transform sm:-inset-12 sm:rounded-[40px]" />

              <div className="absolute left-1/2 top-0 w-[650px] -translate-x-[43%] transform-gpu rotate-[-5deg] [transform:translateX(-43%)_rotate(-5deg)_rotateY(-6deg)] sm:w-[820px] sm:-translate-x-[40%] sm:[transform:translateX(-40%)_rotate(-6deg)_rotateY(-10deg)] lg:relative lg:left-auto lg:w-auto lg:translate-x-0 lg:rotate-[-6deg] lg:[transform:rotate(-6deg)_rotateY(-10deg)]">
                <div className="relative h-[350px] w-[650px] max-w-none overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-2xl will-change-transform [contain:layout_paint_style] [content-visibility:auto] sm:h-[440px] sm:w-[820px] sm:rounded-[28px] lg:h-[480px] lg:-mr-[260px]">
                  <div className="relative origin-top-left -translate-y-[38px] scale-[0.79] sm:-translate-y-[46px] sm:scale-100 lg:-translate-y-[60px]">
                    <SaasPreview />
                  </div>
                </div>

                <div className="pointer-events-none absolute right-[-90px] top-[60px] h-[320px] w-[180px] rounded-[28px] bg-slate-900/5 blur-2xl sm:right-[-220px] sm:h-[420px] sm:w-[220px]" />
              </div>

              <div className="pointer-events-none absolute left-8 top-8 h-16 w-44 rotate-[-12deg] rounded-full bg-white/45 blur-xl sm:left-10 sm:h-20 sm:w-56" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}