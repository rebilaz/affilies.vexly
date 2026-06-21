import { createClient, defineQuery } from "next-sanity";

function requiredEnvironmentVariable(
name: string,
value: string | undefined,
): string {
if (!value) {
throw new Error(
`[Sanity] La variable d'environnement ${name} est manquante.`,
);
}

return value;
}

export const sanityProjectId = requiredEnvironmentVariable(
"NEXT_PUBLIC_SANITY_PROJECT_ID",
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);

export const sanityDataset =
process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityApiVersion =
process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-27";

/**

* Client public, destiné uniquement à la lecture des contenus publiés.
*
* En production, le CDN accélère les lectures.
* En développement, il est désactivé pour voir les publications plus vite.
  */
  export const outilsSanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  perspective: "published",
  useCdn: process.env.NODE_ENV === "production",
  });

/* -------------------------------------------------------------------------- */
/* Types génériques Sanity                                                    */
/* -------------------------------------------------------------------------- */

export type SanityKey = {
_key: string;
};

export type SanityDocumentBase = {
_id: string;
_type: "toolPage";
_createdAt: string;
_updatedAt: string;
};

export type ToolType =
| "mrr-youtube"
| "mvp-cost"
| "idea-validator"
| "break-even";

/* -------------------------------------------------------------------------- */
/* Types du hero                                                              */
/* -------------------------------------------------------------------------- */

export type ToolStat = SanityKey & {
label: string;
value: string;
description?: string;
};

/* -------------------------------------------------------------------------- */
/* Configuration du composant outil                                           */
/* -------------------------------------------------------------------------- */

export type ToolCalculatorConfig = {
toolType: ToolType;

eyebrow?: string;
title: string;
inputLabel?: string;

defaultValue?: number;
minValue?: number;
maxValue?: number;
step?: number;
quickValues?: number[];

/**

* Champs utilisés par le calculateur MRR YouTube.
* Ils restent optionnels car les autres types d'outils ne les utilisent pas.
  */
  monthlyPrice?: number;
  conversionRate?: number;

inputResultLabel?: string;
clientsResultLabel?: string;
revenueResultLabel?: string;
};

/* -------------------------------------------------------------------------- */
/* Section formule                                                            */
/* -------------------------------------------------------------------------- */

export type FormulaStep = SanityKey & {
label: string;
title: string;
text: string;
};

export type FormulaSection = {
eyebrow?: string;
title: string;
intro?: string;
formula?: string;
steps?: FormulaStep[];
};

/* -------------------------------------------------------------------------- */
/* Section scénarios                                                          */
/* -------------------------------------------------------------------------- */

export type ScenarioCard = SanityKey & {
label: string;
value: string;
description?: string;
};

export type ScenariosSection = {
eyebrow?: string;
title: string;
description?: string;
cards?: ScenarioCard[];
};

/* -------------------------------------------------------------------------- */
/* Section cas d'usage                                                        */
/* -------------------------------------------------------------------------- */

export type UseCaseItem = SanityKey & {
text: string;
};

export type UseCasesSection = {
eyebrow?: string;
title: string;
items?: UseCaseItem[];
};

/* -------------------------------------------------------------------------- */
/* Section contenus associés                                                  */
/* -------------------------------------------------------------------------- */

export type RelatedItem = SanityKey & {
label?: string;
title: string;
href: string;
description?: string;
};

export type RelatedSection = {
eyebrow?: string;
title: string;
items?: RelatedItem[];
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export type FaqItem = SanityKey & {
question: string;
answer: string;
};

export type FaqSection = {
eyebrow?: string;
title: string;
items?: FaqItem[];
};

/* -------------------------------------------------------------------------- */
/* CTA final                                                                  */
/* -------------------------------------------------------------------------- */

export type ToolCta = {
eyebrow?: string;
title: string;
description?: string;

primaryLabel: string;
primaryHref: string;

secondaryLabel?: string;
secondaryHref?: string;
};

/* -------------------------------------------------------------------------- */
/* SEO                                                                        */
/* -------------------------------------------------------------------------- */

export type ToolSeo = {
metaTitle?: string;
metaDescription?: string;
canonicalUrl?: string;
noIndex?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Types légers                                                               */
/* -------------------------------------------------------------------------- */

export type ToolSlug = {
slug: string;
};

export type ToolListItem = {
_id: string;
title: string;
slug: string;
label?: string;
description: string;
toolType: ToolType;
};

/* -------------------------------------------------------------------------- */
/* Document complet retourné par Sanity                                       */
/* -------------------------------------------------------------------------- */

export type ToolPage = SanityDocumentBase & {
title: string;

/**

* Le GROQ transforme slug.current en simple chaîne.
* On utilise donc tool.slug, pas tool.slug.current dans le frontend.
  */
  slug: string;

label?: string;
description: string;
helperText?: string;
stats?: ToolStat[];

calculator: ToolCalculatorConfig;

formulaSection?: FormulaSection;
scenariosSection?: ScenariosSection;
useCasesSection?: UseCasesSection;
relatedSection?: RelatedSection;

/**

* Autres documents toolPage publiés, récupérés automatiquement.
  */
  relatedTools?: ToolListItem[];

faqSection?: FaqSection;
cta?: ToolCta;
seo?: ToolSeo;
};

/* -------------------------------------------------------------------------- */
/* Requêtes GROQ                                                              */
/* -------------------------------------------------------------------------- */

export const TOOL_PAGE_BY_SLUG_QUERY = defineQuery(`
*[
_type == "toolPage" &&
slug.current == $slug
][0] {
_id,
_type,
_createdAt,
_updatedAt,


title,
"slug": slug.current,
label,
description,
helperText,

stats[] {
  _key,
  label,
  value,
  description
},

calculator {
  toolType,
  eyebrow,
  title,
  inputLabel,
  defaultValue,
  minValue,
  maxValue,
  step,
  quickValues,
  monthlyPrice,
  conversionRate,
  inputResultLabel,
  clientsResultLabel,
  revenueResultLabel
},

formulaSection {
  eyebrow,
  title,
  intro,
  formula,
  steps[] {
    _key,
    label,
    title,
    text
  }
},

scenariosSection {
  eyebrow,
  title,
  description,
  cards[] {
    _key,
    label,
    value,
    description
  }
},

useCasesSection {
  eyebrow,
  title,
  items[] {
    _key,
    text
  }
},

relatedSection {
  eyebrow,
  title,
  items[] {
    _key,
    label,
    title,
    href,
    description
  }
},

"relatedTools": *[
  _type == "toolPage" &&
  defined(slug.current) &&
  defined(calculator.toolType) &&
  _id != ^._id
] | order(title asc)[0...6] {
  _id,
  title,
  "slug": slug.current,
  label,
  description,
  "toolType": calculator.toolType
},

faqSection {
  eyebrow,
  title,
  items[] {
    _key,
    question,
    answer
  }
},

cta {
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
},

seo {
  metaTitle,
  metaDescription,
  canonicalUrl,
  noIndex
}

}
`);

export const TOOL_SLUGS_QUERY = defineQuery(`  *[     _type == "toolPage" &&
    defined(slug.current)
  ] | order(_createdAt asc) {
    "slug": slug.current
  }`);

export const TOOL_LIST_QUERY = defineQuery(`  *[     _type == "toolPage" &&
    defined(slug.current) &&
    defined(calculator.toolType)
  ] | order(title asc) {     _id,
    title,
    "slug": slug.current,
    label,
    description,
    "toolType": calculator.toolType
  }`);

/* -------------------------------------------------------------------------- */
/* Fonctions publiques                                                        */
/* -------------------------------------------------------------------------- */

function normalizeSlug(slug: string): string {
return decodeURIComponent(slug).trim();
}

export async function getToolPageBySlug(
slug: string,
): Promise<ToolPage | null> {
const normalizedSlug = normalizeSlug(slug);

if (!normalizedSlug) {
return null;
}

return outilsSanityClient.fetch<ToolPage | null>(
TOOL_PAGE_BY_SLUG_QUERY,
{
slug: normalizedSlug,
},
);
}

export async function getToolSlugs(): Promise<ToolSlug[]> {
return outilsSanityClient.fetch<ToolSlug[]>(TOOL_SLUGS_QUERY);
}

export async function getToolList(): Promise<ToolListItem[]> {
return outilsSanityClient.fetch<ToolListItem[]>(TOOL_LIST_QUERY);
}

export async function toolPageExists(slug: string): Promise<boolean> {
const tool = await getToolPageBySlug(slug);
return Boolean(tool?._id);
}
