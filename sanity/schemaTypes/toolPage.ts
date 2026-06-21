import { defineField, defineType } from "sanity";

function normalizeToolKey(value: unknown): string {
if (typeof value !== "string") {
return "";
}

return value
.trim()
.toLowerCase()
.replace(/[’']/g, "")
.replace(/[^a-z0-9]+/g, "-")
.replace(/^-+|-+$/g, "");
}

export const toolPage = defineType({
name: "toolPage",
title: "Page outil",
type: "document",

groups: [
{
name: "main",
title: "Contenu principal",
default: true,
},
{
name: "calculator",
title: "Calculateur",
},
{
name: "sections",
title: "Sections SEO",
},
{
name: "seo",
title: "SEO",
},
],

fields: [
defineField({
name: "title",
title: "Titre H1",
type: "string",
group: "main",
validation: (Rule) =>
Rule.required().min(5).max(90),
}),

defineField({
  name: "slug",
  title: "Slug exact",
  description:
    "Exemple : calculateur-mrr-youtube pour l’URL /outils/calculateur-mrr-youtube",
  type: "slug",
  group: "main",
  options: {
    source: "title",
    maxLength: 96,
  },
  validation: (Rule) => Rule.required(),
}),

defineField({
  name: "label",
  title: "Badge",
  type: "string",
  group: "main",
  initialValue: "Outil gratuit",
}),

defineField({
  name: "description",
  title: "Description d’introduction",
  type: "text",
  rows: 4,
  group: "main",
  validation: (Rule) =>
    Rule.required().min(40).max(320),
}),

defineField({
  name: "helperText",
  title: "Petit texte sous les statistiques",
  type: "text",
  rows: 3,
  group: "main",
}),

defineField({
  name: "stats",
  title: "Statistiques du hero",
  type: "array",
  group: "main",
  validation: (Rule) => Rule.max(4),

  of: [
    {
      type: "object",
      name: "toolStat",

      fields: [
        defineField({
          name: "label",
          title: "Libellé",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "value",
          title: "Valeur",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "string",
        }),
      ],

      preview: {
        select: {
          title: "label",
          subtitle: "value",
        },
      },
    },
  ],
}),

defineField({
  name: "calculator",
  title: "Configuration du calculateur",
  type: "object",
  group: "calculator",
  validation: (Rule) => Rule.required(),

  fields: [
    defineField({
      name: "toolType",
      title: "Clé du composant",
      description:
        "Écris exactement la clé déclarée dans components/outils/outil-registry.ts. Exemple : mrr-youtube",
      type: "string",

      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) {
            return true;
          }

          const normalizedValue =
            normalizeToolKey(value);

          if (normalizedValue !== value) {
            return `Utilise exactement cette clé : ${normalizedValue}`;
          }

          return true;
        }),
    }),

    defineField({
      name: "eyebrow",
      title: "Sur-titre du calculateur",
      type: "string",
      initialValue: "Simulation",
    }),

    defineField({
      name: "title",
      title: "Titre du calculateur",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "inputLabel",
      title: "Libellé du champ principal",
      type: "string",
    }),

    defineField({
      name: "defaultValue",
      title: "Valeur par défaut",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "minValue",
      title: "Valeur minimum",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "maxValue",
      title: "Valeur maximum",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),

    defineField({
      name: "step",
      title: "Pas du curseur",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),

    defineField({
      name: "quickValues",
      title: "Valeurs rapides",
      type: "array",
      of: [
        {
          type: "number",
        },
      ],
      validation: (Rule) => Rule.max(8),
    }),

    defineField({
      name: "monthlyPrice",
      title: "Prix mensuel en euros",
      type: "number",

      hidden: ({ parent }) =>
        normalizeToolKey(parent?.toolType) !==
        "mrr-youtube",

      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "conversionRate",
      title: "Taux de conversion en pourcentage",
      description:
        "Exemple : écrire 0.2 pour 0,20 %.",
      type: "number",

      hidden: ({ parent }) =>
        normalizeToolKey(parent?.toolType) !==
        "mrr-youtube",

      validation: (Rule) =>
        Rule.min(0).max(100),
    }),

    defineField({
      name: "inputResultLabel",
      title: "Libellé du premier résultat",
      type: "string",
    }),

    defineField({
      name: "clientsResultLabel",
      title: "Libellé du deuxième résultat",
      type: "string",
    }),

    defineField({
      name: "revenueResultLabel",
      title: "Libellé du troisième résultat",
      type: "string",
    }),
  ],
}),

defineField({
  name: "formulaSection",
  title: "Section formule",
  type: "object",
  group: "sections",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "formula",
      title: "Formule affichée",
      type: "string",
    }),

    defineField({
      name: "steps",
      title: "Étapes",
      type: "array",
      validation: (Rule) => Rule.max(6),

      of: [
        {
          type: "object",
          name: "formulaStep",

          fields: [
            defineField({
              name: "label",
              title: "Numéro ou repère",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "title",
              title: "Titre",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "text",
              title: "Valeur ou explication",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "text",
            },
          },
        },
      ],
    }),
  ],
}),

defineField({
  name: "scenariosSection",
  title: "Section scénarios",
  type: "object",
  group: "sections",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "cards",
      title: "Cartes",
      type: "array",
      validation: (Rule) => Rule.max(8),

      of: [
        {
          type: "object",
          name: "scenarioCard",

          fields: [
            defineField({
              name: "label",
              title: "Libellé",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "value",
              title: "Valeur",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
    }),
  ],
}),

defineField({
  name: "useCasesSection",
  title: "Section cas d’usage",
  type: "object",
  group: "sections",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Cas d’usage",
      type: "array",

      of: [
        {
          type: "object",
          name: "useCaseItem",

          fields: [
            defineField({
              name: "text",
              title: "Texte",
              type: "text",
              rows: 3,
              validation: (Rule) =>
                Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "text",
            },
          },
        },
      ],
    }),
  ],
}),

defineField({
  name: "relatedSection",
  title: "Section contenus associés",
  type: "object",
  group: "sections",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Liens",
      type: "array",
      validation: (Rule) => Rule.max(6),

      of: [
        {
          type: "object",
          name: "relatedItem",

          fields: [
            defineField({
              name: "label",
              title: "Badge",
              type: "string",
            }),

            defineField({
              name: "title",
              title: "Titre",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "href",
              title: "Lien interne ou externe",
              description:
                "Exemple : /articles/mon-article",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "href",
            },
          },
        },
      ],
    }),
  ],
}),

defineField({
  name: "faqSection",
  title: "Section FAQ",
  type: "object",
  group: "sections",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Questions",
      type: "array",

      of: [
        {
          type: "object",
          name: "faqItem",

          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "answer",
              title: "Réponse",
              type: "text",
              rows: 5,
              validation: (Rule) =>
                Rule.required(),
            }),
          ],

          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        },
      ],
    }),
  ],
}),

defineField({
  name: "cta",
  title: "Appel à l’action final",
  type: "object",
  group: "sections",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "primaryLabel",
      title: "Texte du bouton principal",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "primaryHref",
      title: "Lien du bouton principal",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "secondaryLabel",
      title: "Texte du bouton secondaire",
      type: "string",
    }),

    defineField({
      name: "secondaryHref",
      title: "Lien du bouton secondaire",
      type: "string",
    }),
  ],
}),

defineField({
  name: "seo",
  title: "Paramètres SEO",
  type: "object",
  group: "seo",

  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (Rule) => Rule.max(65),
    }),

    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(170),
    }),

    defineField({
      name: "canonicalUrl",
      title: "URL canonique",
      type: "url",
    }),

    defineField({
      name: "noIndex",
      title: "Ne pas indexer la page",
      type: "boolean",
      initialValue: false,
    }),
  ],
}),

],

preview: {
select: {
title: "title",
subtitle: "slug.current",
},

prepare({ title, subtitle }) {
  return {
    title,
    subtitle: subtitle
      ? `/outils/${subtitle}`
      : "Slug manquant",
  };
},

},
});
