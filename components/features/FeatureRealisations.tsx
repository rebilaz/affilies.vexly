import type { ReactNode } from "react";
import Link from "next/link";

type Realisation = {
  title?: string;
  category?: string;
  description?: string;
  result?: string;
  tags?: string[];
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
  linkLabel?: string;
  linkHref?: string;
};

type FeatureRealisationsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: Realisation[];
  ctaLabel?: string;
  ctaHref?: string;
};

function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const defaultItems: Realisation[] = [
  {
    title: "Plateforme d’abonnement créateur",
    category: "SaaS abonnement",
    description:
      "Création d’une plateforme privée avec espace membre, paiement Stripe et accès à du contenu premium.",
    result: "Une offre récurrente prête à vendre.",
    tags: ["Stripe", "Espace membre", "Abonnement"],
  },
  {
    title: "MVP SaaS pour audience niche",
    category: "MVP SaaS",
    description:
      "Développement d’une première version simple pour tester une idée, collecter les premiers utilisateurs et valider le marché.",
    result: "Un produit testable rapidement.",
    tags: ["MVP", "Dashboard", "Next.js"],
  },
  {
    title: "Dashboard client sur-mesure",
    category: "Outil SaaS",
    description:
      "Mise en place d’un espace utilisateur clair pour centraliser les données, les accès et les actions importantes.",
    result: "Une expérience utilisateur plus fluide.",
    tags: ["Dashboard", "UX", "Automatisation"],
  },
];

function ProjectImage({
  item,
  className = "",
}: {
  item: Realisation;
  className?: string;
}) {
  const imageUrl = item.image?.asset?.url;

  if (!imageUrl) {
    return (
      <div
        className={`relative overflow-hidden bg-[radial-gradient(circle_at_70%_35%,rgba(139,92,246,0.55),transparent_32%),linear-gradient(135deg,#112B4D_0%,#263B5C_48%,#7C3AED_100%)] ${className}`}
      >
        <div className="absolute inset-0 bg-slate-950/10" />
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={imageUrl}
        alt={item.image?.alt || item.title || ""}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
    </div>
  );
}

export function FeatureRealisations({
  eyebrow = "Nos réalisations",
  title = "Quelques SaaS développés par notre agence.",
  items = defaultItems,
  ctaLabel = "Voir tous les projets",
  ctaHref = "/contact",
}: FeatureRealisationsProps) {
  const displayedItems = (items.length ? items : defaultItems)
    .filter((item) => item.title || item.description)
    .slice(0, 3);

  if (!displayedItems.length) return null;

  const featured = displayedItems[0];
  const secondaryItems = displayedItems.slice(1, 3);

  return (
    <section
      id="realisations"
      className="relative isolate overflow-hidden bg-[#061A33] px-6 py-20 text-white sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute left-16 bottom-20 hidden h-32 w-32 bg-[radial-gradient(circle,_rgba(199,210,254,0.45)_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow ? (
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-400">
                {eyebrow}
              </p>
            ) : null}

            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          </div>

          {ctaHref ? (
            <SmartLink
              href={ctaHref}
              className="group inline-flex w-fit items-center gap-2 text-sm font-black text-slate-300 transition hover:text-white"
            >
              {ctaLabel}
              <span className="transition duration-300 group-hover:translate-x-1">
                →
              </span>
            </SmartLink>
          ) : null}
        </div>

        <div className="mt-14 space-y-6">
          <article className="group relative overflow-hidden rounded-[2rem] bg-[#10294A] shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
            <div className="grid min-h-[390px] lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                {featured.category ? (
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
                    {featured.category}
                  </p>
                ) : null}

                {featured.title ? (
                  <h3 className="mt-5 max-w-xl text-3xl font-black leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                    {featured.title}
                  </h3>
                ) : null}

                {featured.description ? (
                  <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
                    {featured.description}
                  </p>
                ) : null}

                {featured.tags?.length ? (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {featured.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {featured.linkHref ? (
                  <SmartLink
                    href={featured.linkHref}
                    className="group/link mt-8 inline-flex w-fit items-center gap-2 text-sm font-black text-amber-300 transition hover:text-amber-200"
                  >
                    {featured.linkLabel || "Découvrir le projet"}
                    <span className="transition duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </SmartLink>
                ) : null}
              </div>

              <ProjectImage
                item={featured}
                className="min-h-[280px] lg:min-h-full"
              />
            </div>
          </article>

          {secondaryItems.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {secondaryItems.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="group relative min-h-[320px] overflow-hidden rounded-[2rem] bg-[#10294A] shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
                >
                  <ProjectImage item={item} className="absolute inset-0" />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                  <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between p-7 sm:p-8">
                    <div>
                      {item.category ? (
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">
                          {item.category}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      {item.title ? (
                        <h3 className="max-w-md text-2xl font-black leading-tight tracking-[-0.04em] text-white sm:text-3xl">
                          {item.title}
                        </h3>
                      ) : null}

                      {item.linkHref ? (
                        <SmartLink
                          href={item.linkHref}
                          className="group/link mt-5 inline-flex w-fit items-center gap-2 text-sm font-black text-amber-300 transition hover:text-amber-200"
                        >
                          {item.linkLabel || "Découvrir le projet"}
                          <span className="transition duration-300 group-hover/link:translate-x-1">
                            →
                          </span>
                        </SmartLink>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}