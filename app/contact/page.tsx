import type { Metadata } from "next";
import Link from "next/link";

import {
  getContactPage,
  type ContactPageData,
  type ContactLink,
  type ContactHighlight,
} from "@/sanity/lib/contactPage";

const fallbackContactPage: ContactPageData = {
  seoTitle: "Contact | Vexly",
  seoDescription:
    "Contactez Vexly : question, partenariat, support. Réponse sous 24–48h.",
  canonicalUrl: "https://www.vexly.fr/contact",

  eyebrow: "Contact",
  title: "Nous contacter",
  description:
    "Une question, une demande de partenariat, un bug à signaler ? Écrivez-nous et on revient vers vous rapidement.",

  intro: [
    "Vous avez une question sur Vexly, une idée de partenariat ou besoin d’aide ?",
    "Envoyez-nous un message et notre équipe reviendra vers vous rapidement.",
  ],

  contactLinks: [
    {
      label: "Email",
      value: "contact@vexly.fr",
      href: "mailto:contact@vexly.fr",
      type: "email",
    },
    {
      label: "Partenariats",
      value: "partners@vexly.fr",
      href: "mailto:partners@vexly.fr",
      type: "email",
    },
  ],

  highlights: [
    {
      label: "Réponse sous 24–48h",
      type: "bolt",
    },
    {
      label: "Support humain",
      type: "shield",
    },
    {
      label: "Partenariats bienvenus",
      type: "star",
    },
    {
      label: "Équipe basée en France",
      type: "location",
    },
  ],

  form: {
    title: "Parlez-nous de votre demande",
    description:
      "Complétez le formulaire ci-dessous. Plus votre message est précis, plus notre réponse sera utile.",
    action: "/api/contact",
    submitLabel: "Envoyer",
    responseNote: "Réponse généralement sous 24–48h.",
    projectPlaceholder: "Quel est le sujet de votre message ? *",
    projectOptions: [
      {
        label: "Question générale",
        value: "question",
      },
      {
        label: "Support",
        value: "support",
      },
      {
        label: "Partenariat",
        value: "partenariat",
      },
      {
        label: "Autre",
        value: "autre",
      },
    ],
    privacyText:
      "En envoyant ce formulaire, vous acceptez d’être recontacté par email.",
    privacyLinkLabel: "Politique de confidentialité",
    privacyLinkHref: "/privacy",
  },
};

function getPageData(page: ContactPageData | null): ContactPageData {
  return {
    ...fallbackContactPage,
    ...page,
    intro: page?.intro?.length ? page.intro : fallbackContactPage.intro,
    contactLinks: page?.contactLinks?.length
      ? page.contactLinks
      : fallbackContactPage.contactLinks,
    highlights: page?.highlights?.length
      ? page.highlights
      : fallbackContactPage.highlights,
    form: {
      ...fallbackContactPage.form,
      ...page?.form,
      projectOptions: page?.form?.projectOptions?.length
        ? page.form.projectOptions
        : fallbackContactPage.form?.projectOptions,
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageData(await getContactPage());

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: page.canonicalUrl,
    },
  };
}

function Icon({ type }: { type?: ContactLink["type"] | ContactHighlight["type"] }) {
  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .95.68l1.5 4.5a1 1 0 0 1-.5 1.2l-2.26 1.14a11.04 11.04 0 0 0 5.51 5.51l1.14-2.26a1 1 0 0 1 1.2-.5l4.5 1.5a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m5.62-4.02A11.96 11.96 0 0 1 12 2.94a11.96 11.96 0 0 1-8.62 3.04A12.02 12.02 0 0 0 3 9c0 5.59 3.82 10.29 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.04-.13-2.05-.38-3.02Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "star") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29Z" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M17.66 16.66 13.41 20.9a2 2 0 0 1-2.82 0l-4.25-4.24a8 8 0 1 1 11.32 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M13 10V3L4 14h7v7l9-11h-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ContactPage() {
  const page = getPageData(await getContactPage());
  const form = page.form ?? fallbackContactPage.form;

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            {page.eyebrow ? (
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-violet-300">
                {page.eyebrow}
              </p>
            ) : null}

            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>

            {page.description ? (
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-300 sm:text-lg">
                {page.description}
              </p>
            ) : null}

            {page.intro?.length ? (
              <div className="mt-8 max-w-2xl space-y-4 text-sm font-medium leading-7 text-slate-400 sm:text-base">
                {page.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {page.contactLinks?.length ? (
              <div className="mt-8 flex flex-col gap-3">
                {page.contactLinks.map((link) => (
                  <a
                    key={`${link.label}-${link.value}`}
                    href={link.href || "#"}
                    className="flex w-fit items-center gap-3 text-sm font-semibold text-slate-300 transition hover:text-violet-200"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 ring-1 ring-violet-300/20">
                      <Icon type={link.type} />
                    </span>
                    <span>{link.value}</span>
                  </a>
                ))}
              </div>
            ) : null}

            {page.highlights?.length ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {page.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="mt-0.5 text-violet-300">
                      <Icon type={highlight.type} />
                    </span>
                    <p className="text-sm font-bold leading-6 text-white">
                      {highlight.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">{form?.title}</h2>

              {form?.description ? (
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {form.description}
                </p>
              ) : null}
            </div>

            <form
              className="flex flex-col gap-5"
              action={form?.action || "/api/contact"}
              method="POST"
            >
              <input
                name="website"
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="project" className="sr-only">
                  Sujet
                </label>
                <select
                  id="project"
                  name="project"
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-violet-300/50 bg-slate-950/40 px-4 py-3.5 text-sm font-medium text-slate-200 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-400/20"
                >
                  <option value="" disabled>
                    {form?.projectPlaceholder || "Quel est le sujet ? *"}
                  </option>

                  {(form?.projectOptions ?? []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="sr-only">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Votre nom *"
                  className="w-full rounded-xl border border-violet-300/50 bg-slate-950/40 px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-400/20"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Votre email *"
                    className="w-full rounded-xl border border-violet-300/50 bg-slate-950/40 px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-400/20"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="sr-only">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Téléphone"
                    className="w-full rounded-xl border border-violet-300/50 bg-slate-950/40 px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-400/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="sr-only">
                  Sujet
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Sujet *"
                  className="w-full rounded-xl border border-violet-300/50 bg-slate-950/40 px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-400/20"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Décrivez votre demande en quelques lignes… *"
                  className="w-full resize-y rounded-xl border border-violet-300/50 bg-slate-950/40 px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-400/20"
                />

                {form?.privacyText ? (
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {form.privacyText}{" "}
                    {form.privacyLinkHref ? (
                      <Link
                        href={form.privacyLinkHref}
                        className="text-slate-400 underline underline-offset-4 transition hover:text-violet-200"
                      >
                        {form.privacyLinkLabel || "Politique de confidentialité"}
                      </Link>
                    ) : null}
                    .
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {form?.responseNote ? (
                  <p className="text-xs font-medium text-slate-500">
                    {form.responseNote}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_rgba(88,80,236,0.35)] transition hover:brightness-110 active:scale-[0.98]"
                >
                  {form?.submitLabel || "Envoyer"}
                  <span className="ml-2">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}