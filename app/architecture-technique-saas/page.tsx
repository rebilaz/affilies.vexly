import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Architecture technique d’un SaaS pour créateur | Structure, outils et stack",
  description:
    "Comprendre l’architecture technique d’un SaaS pour créateur : front-end, back-end, Stripe, espace utilisateur, base de données, back-office et CMS.",
};

const linkedPages = [
  {
    title: "Stripe pour SaaS créateur",
    href: "/technologies/stripe-saas-createur-abonnements-acces",
    description:
      "Comprendre comment gérer les abonnements, les paiements et les accès utilisateurs.",
  },
  {
    title: "Espace utilisateur SaaS",
    href: "/technologies/espace-utilisateur-saas-createur",
    description:
      "Créer un espace membre avec authentification, profil utilisateur et accès privés.",
  },
  {
    title: "Back-office SaaS créateur",
    href: "/technologies/back-office-saas-createur",
    description:
      "Gérer les utilisateurs, les contenus, les abonnements et les données clés du SaaS.",
  },
  {
    title: "Base de données SaaS",
    href: "/technologies/base-donnees-saas-createur",
    description:
      "Structurer les utilisateurs, abonnements, contenus et données métier du produit.",
  },
  {
    title: "CMS Sanity pour SaaS créateur",
    href: "/technologies/cms-sanity-saas-createur",
    description:
      "Gérer le contenu du SaaS sans modifier le code ni casser le produit.",
  },
];

export default function ArchitectureSaasCreateurPage() {
  return (
    <main className="bg-[#061A33] text-white">
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-200/80">
              Architecture SaaS
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Architecture technique d’un SaaS pour créateur
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Un SaaS pour créateur ne se limite pas à une belle interface. Il
              doit combiner une architecture claire, un espace utilisateur, des
              paiements récurrents, une base de données propre, un back-office
              et une gestion de contenu simple.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-50 active:scale-[0.97]"
              >
                Structurer mon SaaS
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="#architecture"
                className="inline-flex min-h-14 w-fit items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-black text-white transition hover:bg-white/[0.08]"
              >
                Voir la structure
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="px-6 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">
                Les briques principales d’un SaaS créateur
              </h2>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
                Chaque brique a un rôle précis : vendre, authentifier, gérer,
                stocker, administrer et faire évoluer le produit.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {[
                {
                  title: "Front-end",
                  text: "L’interface visible par l’utilisateur : landing page, espace membre, dashboard, pages de contenu et parcours d’achat.",
                },
                {
                  title: "Back-end",
                  text: "La logique métier du SaaS : permissions, abonnements, accès, traitements, automatisations et règles produit.",
                },
                {
                  title: "Authentification",
                  text: "La gestion des comptes utilisateurs : inscription, connexion, profil, rôles et accès privés.",
                },
                {
                  title: "Paiement & abonnements",
                  text: "La partie monétisation avec Stripe : paiement unique, abonnement mensuel, accès premium et facturation.",
                },
                {
                  title: "Base de données",
                  text: "L’endroit où sont stockées les données : utilisateurs, abonnements, contenus, préférences et données métier.",
                },
                {
                  title: "Back-office",
                  text: "L’interface interne pour piloter le SaaS : gérer les utilisateurs, les contenus, les abonnements et les opérations.",
                },
              ].map((item, index) => (
                <article
                  key={item.title}
                  className="grid gap-5 py-8 sm:grid-cols-[auto_1fr]"
                >
                  <p className="text-xs font-black tracking-[0.22em] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-200/80">
              Pourquoi c’est important
            </p>

            <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">
              Une mauvaise architecture ralentit le lancement et complique
              chaque évolution.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300">
              Pour un créateur, le SaaS doit rester simple à gérer. Une bonne
              architecture permet de lancer plus vite, d’ajouter des
              fonctionnalités sans repartir de zéro et de garder un produit
              stable quand les utilisateurs augmentent.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              "Lancer une première version plus vite",
              "Connecter facilement Stripe et les accès membres",
              "Faire évoluer le SaaS sans casser l’existant",
            ].map((benefit) => (
              <div
                key={benefit}
                className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6"
              >
                <p className="text-lg font-black leading-snug tracking-[-0.03em] text-white">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-200/80">
              Approfondir
            </p>

            <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">
              Explorer les autres briques techniques
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {linkedPages.map((page, index) => (
              <Link
                key={page.href}
                href={page.href}
                className="group grid gap-6 py-8 transition duration-300 hover:bg-white/[0.03] sm:grid-cols-[auto_1fr_auto] sm:px-5"
              >
                <div className="text-xs font-black tracking-[0.22em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="text-2xl font-black leading-snug tracking-[-0.04em] text-white sm:text-3xl">
                    {page.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                    {page.description}
                  </p>
                </div>

                <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-white/[0.08]">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur sm:p-12 lg:p-16">
          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">
            Besoin d’une architecture propre pour votre SaaS ?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Vexly vous aide à structurer et développer un SaaS pensé pour les
            créateurs : espace utilisateur, paiement, back-office, base de
            données et gestion de contenu.
          </p>

          <Link
            href="/contact"
            className="group mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-50 active:scale-[0.97]"
          >
            Créer mon SaaS
            <span className="transition duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}