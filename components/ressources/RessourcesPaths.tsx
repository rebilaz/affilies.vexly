import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, TrendingUp, Brain } from "lucide-react";
import type React from "react";

type PathItem = {
  title: string;
  description: string;
  href: string;
  cta: string;

  // Optionnel : tu peux garder ou enlever
  Icon?: React.ComponentType<{ className?: string }>;
  iconBgClass?: string;
  ctaClass: string;

  // ✅ new
  imageSrc: string; // ex: "/images/ressources/parcours.webp"
  imageAlt?: string;
};

type RessourcesPathsProps = {
  title?: string;
  subtitle?: string;
  items?: PathItem[];
};

export default function RessourcesPaths({
  title = "Par où commencer ?",
  subtitle = "Des parcours conçus pour votre niveau d'expertise.",
  items,
}: RessourcesPathsProps) {
  const paths: PathItem[] =
    items ??
    [
      {
        title: "Parcours",
        description:
          "Avance étape par étape avec un chemin clair : débutant → autonome → avancé.",
        href: "/parcours",
        cta: "Voir les parcours",
        Icon: GraduationCap,
        iconBgClass: "bg-emerald-100 text-emerald-700",
        ctaClass: "text-emerald-700 hover:text-emerald-800",
        imageSrc: "/ressources/parcours.webp",
        imageAlt: "Illustration Parcours",
      },
      {
        title: "Outils",
        description:
          "Des outils actionnables pour gagner du temps et exécuter plus vite, sans friction.",
        href: "/outils",
        cta: "Explorer les outils",
        Icon: TrendingUp,
        iconBgClass: "bg-indigo-100 text-indigo-700",
        ctaClass: "text-indigo-700 hover:text-indigo-800",
        imageSrc: "/ressources/outils.webp",
        imageAlt: "Illustration Outils",
      },
      {
        title: "Articles",
        description:
          "Des articles structurés pour comprendre, décider et construire avec méthode.",
        href: "/articles",
        cta: "Lire les articles",
        Icon: Brain,
        iconBgClass: "bg-violet-100 text-violet-700",
        ctaClass: "text-violet-700 hover:text-violet-800",
        imageSrc: "/ressources/articles.webp",
        imageAlt: "Illustration Articles",
      },
    ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:py-14 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-base text-slate-600 sm:text-lg">{subtitle}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {paths.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm transition hover:shadow-md hover:shadow-slate-900/5 sm:p-8"
          >
            {/* ✅ image header */}
            <div className="relative mb-6 h-28 w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={p.imageSrc}
                alt={p.imageAlt ?? p.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 320px, 90vw"
                priority={false}
              />
              {/* petit voile pour garder la lisibilité si l'image est contrastée */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
            </div>

            {/* ✅ icon (optionnelle) */}
            {p.Icon && p.iconBgClass && (
              <div
                className={`inline-flex size-12 items-center justify-center rounded-2xl ${p.iconBgClass}`}
              >
                <p.Icon className="size-6" />
              </div>
            )}

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
              {p.title}
            </h3>

            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              {p.description}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              <span className={`${p.ctaClass} transition-colors`}>{p.cta}</span>
              <ArrowRight className={`size-4 ${p.ctaClass}`} />
            </div>

            {/* hover outline subtil */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-slate-200/80" />
          </Link>
        ))}
      </div>
    </section>
  );
}
