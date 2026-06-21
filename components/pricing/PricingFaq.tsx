"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PricingPageFaq } from "@/sanity/lib/pricingPage";

type PricingFaqProps = {
  content?: PricingPageFaq;
};

const fallbackFaq = [
  {
    question: "Est-ce que le code source m’appartient ?",
    answer:
      "Oui. Une fois le projet livré et payé, tu récupères le code source du projet. Tu peux l’héberger, le modifier ou le faire évoluer librement.",
  },
  {
    question: "Combien de temps prend la livraison ?",
    answer:
      "L’objectif est de livrer une première version exploitable en moins de 14 jours, selon la complexité du projet et la rapidité des retours.",
  },
  {
    question: "Est-ce que Stripe est inclus ?",
    answer:
      "Oui. L’offre inclut l’intégration Stripe pour permettre à ton SaaS d’encaisser ses premiers paiements.",
  },
  {
    question: "Puis-je demander des fonctionnalités custom ?",
    answer:
      "Oui. L’offre couvre une base SaaS solide. Les besoins très spécifiques peuvent être ajoutés sur devis après cadrage.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PricingFaq({ content }: PricingFaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  const eyebrow = content?.eyebrow ?? "Questions fréquentes";
  const title = content?.title ?? "Avant de lancer ton SaaS";

  const faq =
    content?.items && content.items.length > 0 ? content.items : fallbackFaq;

  return (
    <section className="bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
              {title}
            </h2>
          )}
        </div>

        <div className="mt-10 space-y-4">
          {faq.map((item, idx) => {
            if (!item.question || !item.answer) return null;

            const isOpen = open === idx;

            return (
              <div
                key={`${item.question}-${idx}`}
                className={cx(
                  "rounded-3xl border bg-white transition-all",
                  isOpen
                    ? "border-indigo-200 shadow-xl shadow-indigo-950/5"
                    : "border-slate-200 shadow-sm hover:border-slate-300"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-black text-slate-950">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={cx(
                      "h-4 w-4 shrink-0 text-slate-500 transition-transform",
                      isOpen && "rotate-180 text-indigo-600"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-sm leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}