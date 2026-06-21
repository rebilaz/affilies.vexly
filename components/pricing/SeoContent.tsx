import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PricingPageSeoContent } from "@/sanity/lib/pricingPage";

type SeoContentProps = {
  content?: PricingPageSeoContent;
};

const fallbackParagraphs = [
  "Lancer un projet tech demande de la vélocité. L'offre Vexly Launch est conçue pour les entrepreneurs qui souhaitent déployer un Minimum Viable Product (MVP) robuste sans sacrifier la qualité du code. Contrairement aux solutions no-code qui peuvent rapidement montrer leurs limites en termes d'évolutivité, nous te livrons une base technique moderne.",
  "Notre stack s'appuie sur des technologies de pointe : Next.js, React, et Tailwind CSS pour un front-end ultra-performant, couplé à une authentification sécurisée et une intégration Stripe native. Le résultat ? Un code propre, pensé pour la conversion et prêt à scaler dès tes premiers utilisateurs.",
];

const fallbackResources = [
  {
    label: "Comment valider son idée de SaaS avant de coder ?",
    href: "/articles/comment-valider-idee-saas",
  },
  {
    label: "Qu'est-ce qu'un MVP et comment définir ses fonctionnalités ?",
    href: "/articles/definition-mvp",
  },
  {
    label: "Stratégies d'acquisition : Trouver ses 10 premiers clients B2B",
    href: "/articles/trouver-premiers-clients-b2b",
  },
];

export default function SeoContent({ content }: SeoContentProps) {
  const title =
    content?.title ?? "Pourquoi choisir une création de SaaS sur-mesure ?";

  const paragraphs =
    content?.paragraphs && content.paragraphs.length > 0
      ? content.paragraphs
      : fallbackParagraphs;

  const resourcesTitle =
    content?.resourcesTitle ?? "Ressources pour aller plus loin";

  const resourcesDescription =
    content?.resourcesDescription ??
    "Avant de démarrer ton développement, assure-toi que ton concept est validé. Découvre nos ressources pour t'accompagner dans cette étape cruciale :";

  const resources =
    content?.resources && content.resources.length > 0
      ? content.resources
      : fallbackResources;

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] px-6 py-20 text-slate-600 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-10 top-20 hidden h-36 w-36 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)] backdrop-blur sm:p-8 lg:p-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {title}
            </h2>

            <div className="mt-6 h-1 w-20 rounded-full bg-indigo-600" />

            <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}