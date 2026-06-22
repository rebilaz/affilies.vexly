"use client";

import { useMemo, useState } from "react";

type SaaS = {
  id: number;
  name: string;
  initials: string;
  category: string;
  description: string;
  commission: number;
  popularity: number;
  accent: string;
  textColor: string;
  url: string;
};

const saasList: SaaS[] = [
  {
    id: 1,
    name: "ChatGPT Plus",
    initials: "AI",
    category: "Intelligence artificielle",
    description:
      "Un assistant intelligent pour créer, analyser et automatiser votre travail.",
    commission: 20,
    popularity: 98,
    accent: "bg-emerald-100",
    textColor: "text-emerald-700",
    url: "#",
  },
  {
    id: 2,
    name: "Notion",
    initials: "N",
    category: "Productivité",
    description:
      "Centralisez vos notes, projets, documents et bases de données.",
    commission: 30,
    popularity: 95,
    accent: "bg-neutral-100",
    textColor: "text-neutral-950",
    url: "#",
  },
  {
    id: 3,
    name: "Canva Pro",
    initials: "C",
    category: "Design",
    description:
      "Créez rapidement des visuels professionnels pour tous vos contenus.",
    commission: 30,
    popularity: 92,
    accent: "bg-violet-100",
    textColor: "text-violet-700",
    url: "#",
  },
  {
    id: 4,
    name: "Semrush",
    initials: "S",
    category: "SEO",
    description:
      "Analysez votre référencement et développez votre visibilité en ligne.",
    commission: 40,
    popularity: 89,
    accent: "bg-orange-100",
    textColor: "text-orange-700",
    url: "#",
  },
  {
    id: 5,
    name: "Stripe",
    initials: "S",
    category: "Paiement",
    description:
      "Acceptez et gérez facilement les paiements de votre activité.",
    commission: 20,
    popularity: 87,
    accent: "bg-indigo-100",
    textColor: "text-indigo-700",
    url: "#",
  },
  {
    id: 6,
    name: "Webflow",
    initials: "W",
    category: "No-code",
    description:
      "Concevez et publiez des sites professionnels sans écrire de code.",
    commission: 30,
    popularity: 85,
    accent: "bg-blue-100",
    textColor: "text-blue-700",
    url: "#",
  },
  {
    id: 7,
    name: "Framer",
    initials: "F",
    category: "Web design",
    description:
      "Créez des sites modernes, interactifs et performants visuellement.",
    commission: 30,
    popularity: 83,
    accent: "bg-neutral-900",
    textColor: "text-white",
    url: "#",
  },
  {
    id: 8,
    name: "Trello",
    initials: "T",
    category: "Gestion de projet",
    description:
      "Organisez vos tâches et collaborez efficacement avec votre équipe.",
    commission: 20,
    popularity: 80,
    accent: "bg-sky-100",
    textColor: "text-sky-700",
    url: "#",
  },
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="m7 17 10-10M7.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M20 7h-8a6 6 0 1 0 5.2 9M20 7l-3-3m3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M14.5 5.5c2.5-2.5 5.5-2 5.5-2s.5 3-2 5.5l-4 4-3-3 3.5-4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 10.5 7 11l-3 3 5 1m4.5-1.5L13 17l-3 3-1-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16.5" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="flex min-h-32 items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-neutral-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-500">{description}</p>
      </div>
    </article>
  );
}

function SaaSCard({ saas }: { saas: SaaS }) {
  return (
    <article className="group flex min-h-80 flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${saas.accent} ${saas.textColor}`}
        >
          {saas.initials}
        </div>

        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
          {saas.category}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold tracking-tight text-neutral-950">
          {saas.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          {saas.description}
        </p>
      </div>

      <div className="mt-auto border-t border-neutral-100 pt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Commission
            </p>
            <p className="mt-1 text-2xl font-black text-violet-700">
              {saas.commission}%
            </p>
          </div>

          <a
            href={saas.url}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            Voir l’offre
            <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function AffiliatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes les catégories");
  const [sort, setSort] = useState("popularite");

  const categories = useMemo(
    () => [
      "Toutes les catégories",
      ...Array.from(new Set(saasList.map((saas) => saas.category))),
    ],
    [],
  );

  const filteredSaaS = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("fr");

    const results = saasList.filter((saas) => {
      const matchesCategory =
        category === "Toutes les catégories" || saas.category === category;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        saas.name.toLocaleLowerCase("fr").includes(normalizedSearch) ||
        saas.category.toLocaleLowerCase("fr").includes(normalizedSearch) ||
        saas.description.toLocaleLowerCase("fr").includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return [...results].sort((a, b) => {
      if (sort === "commission") {
        return b.commission - a.commission;
      }

      if (sort === "alphabetique") {
        return a.name.localeCompare(b.name, "fr");
      }

      return b.popularity - a.popularity;
    });
  }, [category, search, sort]);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-neutral-950">
      <section className="relative border-b border-neutral-100">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
              Programme affiliés Vexly
            </div>

            <h1 className="mt-8 text-balance text-4xl font-black leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-6xl lg:text-7xl">
              Gagnez des revenus récurrents en partageant les meilleurs SaaS
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg">
              Rejoignez le programme d’affiliation Vexly et monétisez votre
              audience avec une sélection de logiciels utiles, fiables et
              performants.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<PercentIcon />}
              title="Commissions généreuses"
              description="Obtenez jusqu’à 40 % de commissions récurrentes sur chaque vente."
            />

            <FeatureCard
              icon={<RepeatIcon />}
              title="Revenus récurrents"
              description="Gagnez chaque mois tant que vos filleuls restent abonnés."
            />

            <FeatureCard
              icon={<RocketIcon />}
              title="SaaS de qualité"
              description="Accédez à une sélection des meilleurs outils disponibles sur le marché."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row">
          <label className="relative block w-full lg:max-w-lg">
            <span className="sr-only">Rechercher un SaaS</span>

            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-neutral-400">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un SaaS..."
              className="h-13 w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className="sr-only">Filtrer par catégorie</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-13 w-full min-w-56 cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Trier les résultats</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-13 w-full min-w-52 cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              >
                <option value="popularite">Trier par popularité</option>
                <option value="commission">Meilleure commission</option>
                <option value="alphabetique">Ordre alphabétique</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            <strong className="font-semibold text-neutral-950">
              {filteredSaaS.length}
            </strong>{" "}
            solution{filteredSaaS.length > 1 ? "s" : ""} disponible
            {filteredSaaS.length > 1 ? "s" : ""}
          </p>
        </div>

        {filteredSaaS.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSaaS.map((saas) => (
              <SaaSCard key={saas.id} saas={saas} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-20 text-center">
            <h2 className="text-xl font-bold text-neutral-950">
              Aucun SaaS trouvé
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Modifiez votre recherche ou sélectionnez une autre catégorie.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("Toutes les catégories");
              }}
              className="mt-6 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-violet-200 bg-violet-50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-lg font-bold text-neutral-950">
              Vous ne trouvez pas le SaaS que vous aimez ?
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Proposez-le et aidez-nous à enrichir notre programme
              d’affiliation.
            </p>
          </div>

          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
          >
            Proposer un SaaS
            <ArrowIcon />
          </a>
        </div>
      </section>
    </main>
  );
}