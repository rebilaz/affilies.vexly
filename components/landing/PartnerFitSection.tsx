// components/landing/PartnerFitSection.tsx

import { Check, X } from "lucide-react";

type Props = {
  title?: string;
  leftItems: string[];
  rightItems: string[];
};

export default function PartnerFitSection({
  title = "Alignment mutuel.",
  leftItems,
  rightItems,
}: Props) {
  return (
    <section className="mx-auto max-w-5xl">
      {/* Title */}
      <div className="flex justify-center">
        <h2 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h2>
      </div>

      {/* Divider */}
      <div className="mt-12 h-px w-full bg-slate-200" />

      {/* Columns */}
      <div className="mt-16 grid gap-20 sm:grid-cols-2">
        {/* Compatible */}
        <div className="space-y-8">
          <div className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Profil adapté
          </div>

          <ul className="space-y-6">
            {leftItems.map((txt) => (
              <li key={txt} className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-200 text-emerald-600">
                  <Check className="h-3.5 w-3.5" />
                </span>

                <p className="text-[15px] leading-relaxed text-slate-900">
                  {txt}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Incompatible */}
        <div className="space-y-8">
          <div className="text-xs font-semibold tracking-[0.2em] text-slate-300 uppercase">
            Non adapté
          </div>

          <ul className="space-y-6">
            {rightItems.map((txt) => (
              <li key={txt} className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-400">
                  <X className="h-3.5 w-3.5" />
                </span>

                <p className="text-[15px] leading-relaxed text-slate-400">
                  {txt}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
