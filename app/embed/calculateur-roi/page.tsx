
"use client";

import { useEffect, useRef, useState } from "react";

const SLUG = "calculateur-mrr-vues-youtube";

const PRIX_MENSUEL = 49;

// Hypothèse globale : 0,20% des vues deviennent clients.
// Exemple : 50 000 vues ≈ 100 clients.
const TAUX_VUES_VERS_CLIENT = 0.2;

export default function CalculateurMrrYoutubeEmbedPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [vues, setVues] = useState(50000);

  const clients = Math.round(vues * (TAUX_VUES_VERS_CLIENT / 100));
  const mrr = clients * PRIX_MENSUEL;

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(value);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const sendHeight = () => {
      const rect = element.getBoundingClientRect();

      window.parent.postMessage(
        {
          type: "vexly-embed-height",
          slug: SLUG,
          height: rect.height,
        },
        window.location.origin
      );
    };

    sendHeight();

    const observer = new ResizeObserver(sendHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full overflow-hidden rounded-[36px] bg-[#061b34] px-5 py-8 sm:px-8 sm:py-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] bg-white px-6 py-8 shadow-sm sm:px-10 lg:px-14">
          <div className="grid items-center gap-8 text-center lg:grid-cols-[1fr_auto_1fr_auto_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">
                Vues YouTube
              </p>
              <p className="mt-4 text-6xl font-black tracking-tight text-[#02071a] sm:text-7xl">
                {formatNumber(vues)}
              </p>
            </div>

            <div className="hidden text-6xl font-black text-slate-300 lg:block">
              →
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">
                Clients estimés
              </p>
              <p className="mt-4 text-6xl font-black tracking-tight text-[#02071a] sm:text-7xl">
                {formatNumber(clients)}
              </p>
            </div>

            <div className="hidden text-6xl font-black text-slate-300 lg:block">
              ×
            </div>

            <div className="rounded-[28px] bg-slate-100 px-6 py-7">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-indigo-600">
                MRR
              </p>
              <p className="mt-4 text-6xl font-black tracking-tight text-[#02071a] sm:text-7xl">
                {formatCurrency(mrr)}
              </p>
              <p className="mt-3 text-lg font-black text-slate-500">
                / mois
              </p>
            </div>
          </div>

          <div className="mt-10">
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={vues}
              onChange={(event) => setVues(Number(event.target.value))}
              className="w-full accent-indigo-600"
            />

            <div className="mt-3 flex justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              <span>1k vues</span>
              <span>1M vues</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-medium leading-relaxed text-slate-400">
            Estimation basée sur {TAUX_VUES_VERS_CLIENT}% de conversion globale
            des vues en clients payants à {PRIX_MENSUEL}€ / mois.
          </p>
        </div>
      </div>
    </div>
  );
}

