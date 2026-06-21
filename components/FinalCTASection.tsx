import React from "react";
import Link from "next/link";

type FinalCTASectionProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  href?: string;
};

const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel,
  href = "/#formulaire",
}) => {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FF6B35_0%,#FFB703_100%)] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-white/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full border border-slate-950/10" />
      <div className="pointer-events-none absolute -left-40 top-[-16rem] h-[34rem] w-[34rem] rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute right-16 bottom-20 hidden h-32 w-32 bg-[radial-gradient(circle,_rgba(15,23,42,0.35)_1px,_transparent_1px)] [background-size:18px_18px] opacity-25 lg:block" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        {eyebrow ? (
          <p className="rounded-full bg-slate-950/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-7xl">
          {title}
        </h2>

        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-900/80 sm:text-lg">
          {subtitle}
        </p>

        <Link
          href={href}
          className="group mt-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900 active:scale-[0.97]"
        >
          {primaryCtaLabel}
          <span className="transition duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default FinalCTASection;