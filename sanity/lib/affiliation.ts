import { groq } from "next-sanity";
import { client } from "./client";

export type AffiliateMetric = {
  _key?: string;
  label: string;
  value: string;
};

export type AffiliateFaqItem = {
  _key?: string;
  question: string;
  answer: string;
};

export type AffiliateProgram = {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description?: string;
  commission: string;
  model: string;
  cookie: string;
  payout: string;
  audience: string;
  price: string;
  highlight: string;
  affiliateUrl?: string;
  websiteUrl?: string;
  logoUrl?: string;
  logoAlt?: string;
  tags?: string[];
  metrics?: AffiliateMetric[];
  features?: string[];
  idealFor?: string[];
  howItWorks?: string[];
  faq?: AffiliateFaqItem[];
  featured?: boolean;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    noIndex?: boolean;
  };
};

export type AffiliateProgramListItem = Pick<
  AffiliateProgram,
  | "_id"
  | "name"
  | "slug"
  | "category"
  | "shortDescription"
  | "commission"
  | "model"
  | "cookie"
  | "payout"
  | "audience"
  | "price"
  | "highlight"
  | "affiliateUrl"
  | "tags"
  | "featured"
>;

export const fallbackAffiliatePrograms: AffiliateProgram[] = [
  {
    name: "Vexly Launch",
    slug: "vexly-launch",
    category: "Création de SaaS",
    shortDescription:
      "Accompagnement complet pour lancer un SaaS monétisable avec paiement, espace membre et hébergement.",
    description:
      "Vexly Launch aide les créateurs, consultants et formateurs à transformer une idée ou une expertise en produit SaaS vendable. Le programme est adapté aux partenaires qui recommandent des audiences déjà proches d'un besoin business concret.",
    commission: "15%",
    model: "CPA sur projet signé",
    cookie: "90 jours",
    payout: "À l'acompte client",
    audience: "Créateurs, formateurs, consultants",
    price: "À partir de 990 EUR",
    highlight: "Commission élevée sur panier moyen premium",
    tags: ["High ticket", "B2B", "Service + SaaS"],
    featured: true,
  },
  {
    name: "Notion Sites Pro",
    slug: "notion-sites-pro",
    category: "Productivité",
    shortDescription:
      "Sites, portails clients et bases de connaissances propulsés par Notion pour petites équipes.",
    commission: "30%",
    model: "Récurrent 12 mois",
    cookie: "60 jours",
    payout: "Net 30",
    audience: "Freelances, agences, solopreneurs",
    price: "19 à 79 EUR / mois",
    highlight: "Conversion simple avec offre accessible",
    tags: ["Récurrent", "No-code", "PME"],
  },
  {
    name: "Creator CRM",
    slug: "creator-crm",
    category: "CRM audience",
    shortDescription:
      "CRM léger pour suivre prospects, sponsors, clients et opportunités issues d'une audience.",
    commission: "25%",
    model: "Récurrent 18 mois",
    cookie: "45 jours",
    payout: "Net 30",
    audience: "Créateurs B2B, newsletters, podcasts",
    price: "29 à 149 EUR / mois",
    highlight: "Bon fit pour contenus business et acquisition",
    tags: ["Récurrent", "Creator economy", "CRM"],
  },
  {
    name: "InvoiceFlow",
    slug: "invoiceflow",
    category: "Facturation",
    shortDescription:
      "Facturation, relances et suivi de trésorerie pour indépendants et petites structures.",
    commission: "20%",
    model: "Récurrent 12 mois",
    cookie: "30 jours",
    payout: "Net 45",
    audience: "Freelances, studios, consultants",
    price: "12 à 59 EUR / mois",
    highlight: "Besoin récurrent et faible friction d'achat",
    tags: ["Finance", "Freelance", "Récurrent"],
  },
  {
    name: "SupportDesk AI",
    slug: "supportdesk-ai",
    category: "Support client",
    shortDescription:
      "Assistant de support avec base de connaissances, réponses IA et routage vers l'équipe.",
    commission: "35%",
    model: "Premier paiement",
    cookie: "60 jours",
    payout: "Net 30",
    audience: "SaaS, e-commerce, agences support",
    price: "49 à 299 EUR / mois",
    highlight: "Fort intérêt pour les audiences SaaS et ops",
    tags: ["IA", "Support", "B2B"],
  },
  {
    name: "MetricPulse",
    slug: "metricpulse",
    category: "Analytics",
    shortDescription:
      "Dashboard simple pour suivre MRR, churn, cohortes, acquisition et rentabilité SaaS.",
    commission: "25%",
    model: "Récurrent 12 mois",
    cookie: "45 jours",
    payout: "Net 30",
    audience: "Fondateurs SaaS, growth, finance",
    price: "39 à 199 EUR / mois",
    highlight: "Très pertinent pour contenus SaaS et growth",
    tags: ["Analytics", "SaaS", "Récurrent"],
  },
];

const affiliateListQuery = groq`
  *[_type == "affiliateProgram" && defined(slug.current)] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    commission,
    model,
    cookie,
    payout,
    audience,
    price,
    highlight,
    affiliateUrl,
    tags,
    featured
  }
`;

const affiliateBySlugQuery = groq`
  *[_type == "affiliateProgram" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    description,
    commission,
    model,
    cookie,
    payout,
    audience,
    price,
    highlight,
    affiliateUrl,
    websiteUrl,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    tags,
    metrics[]{
      _key,
      label,
      value
    },
    features,
    idealFor,
    howItWorks,
    faq[]{
      _key,
      question,
      answer
    },
    featured,
    seo{
      title,
      description,
      canonical,
      noIndex
    }
  }
`;

const affiliateSlugsQuery = groq`
  *[_type == "affiliateProgram" && defined(slug.current)] | order(name asc) {
    "slug": slug.current
  }
`;

function normalizeSlug(slug: string) {
  return decodeURIComponent(slug).trim();
}

function fallbackBySlug(slug: string): AffiliateProgram | null {
  const normalizedSlug = normalizeSlug(slug);
  const program = fallbackAffiliatePrograms.find(
    (item) => item.slug === normalizedSlug,
  );

  if (!program) return null;

  return {
    ...program,
    metrics: [
      { label: "Commission", value: program.commission },
      { label: "Cookie", value: program.cookie },
      { label: "Paiement", value: program.payout },
      { label: "Prix", value: program.price },
    ],
    features: [
      program.highlight,
      `Modèle : ${program.model}`,
      `Audience idéale : ${program.audience}`,
    ],
    idealFor: [
      "Une audience déjà sensibilisée aux outils SaaS",
      "Un contenu comparatif, tutoriel ou retour d'expérience",
      "Une recommandation contextualisée plutôt qu'une simple bannière",
    ],
    howItWorks: [
      "Présenter le problème métier traité par le SaaS.",
      "Montrer le gain concret pour l'audience visée.",
      "Envoyer les prospects qualifiés vers le lien affilié ou le formulaire.",
    ],
    faq: [
      {
        question: "Comment demander le lien affilié ?",
        answer:
          "Passez par le formulaire de contact. Nous vérifions le fit audience, puis nous transmettons le lien, les conditions et les assets disponibles.",
      },
      {
        question: "Les commissions sont-elles garanties ?",
        answer:
          "Les commissions affichées servent de base de comparaison. Les conditions finales dépendent du programme, du volume et de l'accord partenaire.",
      },
    ],
  };
}

export async function getAffiliatePrograms(): Promise<AffiliateProgramListItem[]> {
  try {
    const programs = await client.fetch<AffiliateProgramListItem[]>(
      affiliateListQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return programs.length ? programs : fallbackAffiliatePrograms;
  } catch (error) {
    console.error("Erreur chargement Sanity affiliation:", error);
    return fallbackAffiliatePrograms;
  }
}

export async function getAffiliateProgramBySlug(
  slug: string,
): Promise<AffiliateProgram | null> {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) return null;

  try {
    const program = await client.fetch<AffiliateProgram | null>(
      affiliateBySlugQuery,
      { slug: normalizedSlug },
      { next: { revalidate: 60 } },
    );

    return program ?? fallbackBySlug(normalizedSlug);
  } catch (error) {
    console.error("Erreur chargement Sanity programme affiliation:", error);
    return fallbackBySlug(normalizedSlug);
  }
}

export async function getAffiliateProgramSlugs(): Promise<{ slug: string }[]> {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(
      affiliateSlugsQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return slugs.length
      ? slugs
      : fallbackAffiliatePrograms.map((program) => ({ slug: program.slug }));
  } catch {
    return fallbackAffiliatePrograms.map((program) => ({ slug: program.slug }));
  }
}
