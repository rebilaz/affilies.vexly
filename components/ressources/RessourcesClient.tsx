"use client";

import RessourcesHero from "./RessourcesHero";
import RessourcesPaths from "./RessourcesPaths";
import RessourcesFAQ from "./RessourcesFAQ";

export default function RessourcesClient() {
  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-900">
      {/* ✅ HERO FULL WIDTH (pas dans le container) */}
      <RessourcesHero />

      {/* ✅ RESTE DE LA PAGE dans un container */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <RessourcesPaths />

        {/* Optionnel: garde seulement si tu veux donner du "poids" à la page */}
        <RessourcesFAQ />
      </div>
    </main>
  );
}
