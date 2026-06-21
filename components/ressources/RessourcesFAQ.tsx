"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
    {
        q: "Par où commencer si je ne sais pas quoi faire ?",
        a: "Commence par un Parcours : c’est fait pour éviter de te disperser et avancer par décisions.",
    },
    {
        q: "Quelle différence entre un Parcours et un Article ?",
        a: "Un Article t’aide à comprendre un sujet. Un Parcours t’aide à décider et avancer étape par étape.",
    },
    {
        q: "Les outils sont-ils gratuits ?",
        a: "Certains oui, d’autres non. Chaque outil indique clairement son accès et ce qu’il permet de faire.",
    },
    {
        q: "Puis-je suggérer un sujet ou un outil ?",
        a: "Oui. Tu peux proposer une idée via la page contact ou directement depuis la section Ressources.",
    },
];

export default function RessourcesFAQ() {
    const [open, setOpen] = React.useState<number | null>(0);

    return (
        <section className="mt-16">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center">
                Questions fréquentes
            </h2>
            <p className="mt-2 text-sm text-slate-600 text-center">
                Tout ce que vous devez savoir avant de plonger.
            </p>

            <div className="mx-auto mt-8 max-w-3xl space-y-3">
                {ITEMS.map((it, idx) => {
                    const isOpen = open === idx;
                    return (
                        <button
                            key={it.q}
                            onClick={() => setOpen(isOpen ? null : idx)}
                            className="w-full text-left rounded-2xl border border-slate-200 bg-white px-5 py-4 hover:bg-slate-50 transition"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="font-semibold text-slate-900">{it.q}</span>
                                <ChevronDown
                                    className={`size-5 text-slate-400 transition ${isOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {isOpen && (
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    {it.a}
                                </p>
                            )}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
