import { defineArrayMember, defineField, defineType } from "sanity";

export const comparisonPageType = defineType({
  name: "comparisonPage",
  title: "Page Comparaison",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Titre interne",
      type: "string",
      description: "Exemple : Agence vs Vexly",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug de la page",
      type: "slug",
      description:
        "Slug enfant du hub. Exemple : agence-vs-vexly donnera /articles/agence-vs-vexly si le hub associé est /articles",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "hubs",
      title: "Hubs associés",
      type: "array",
      description:
        "Sélectionne le ou les hubs où cette page comparaison doit apparaître",
      of: [
        {
          type: "reference",
          to: [{ type: "hubPage" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Meta description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "canonical",
          title: "Canonical",
          type: "string",
          description:
            "Optionnel. Sinon le front utilise automatiquement /hub/slug.",
        }),
        defineField({
          name: "ogTitle",
          title: "Open Graph title",
          type: "string",
        }),
        defineField({
          name: "ogDescription",
          title: "Open Graph description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "noIndex",
          title: "Ne pas indexer cette page",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
          initialValue: "Comparaison",
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "primaryCtaLabel",
          title: "Texte bouton principal",
          type: "string",
          initialValue: "Discuter de mon projet",
        }),
        defineField({
          name: "primaryCtaHref",
          title: "Lien bouton principal",
          type: "string",
          initialValue: "/contact",
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Texte bouton secondaire",
          type: "string",
          initialValue: "Voir les tarifs",
        }),
        defineField({
          name: "secondaryCtaHref",
          title: "Lien bouton secondaire",
          type: "string",
          initialValue: "/tarifs",
        }),
      ],
    }),

    defineField({
      name: "comparison",
      title: "Comparaison principale",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "left",
          title: "Option gauche",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "name",
              title: "Nom",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "price",
              title: "Prix indicatif",
              type: "string",
            }),
            defineField({
              name: "ctaLabel",
              title: "Texte bouton",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "Lien bouton",
              type: "string",
            }),
          ],
        }),

        defineField({
          name: "right",
          title: "Option droite",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "name",
              title: "Nom",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "price",
              title: "Prix indicatif",
              type: "string",
            }),
            defineField({
              name: "ctaLabel",
              title: "Texte bouton",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "Lien bouton",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "criteria",
      title: "Critères de comparaison",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: "comparisonCriterion",
          type: "object",
          title: "Critère",
          fields: [
            defineField({
              name: "category",
              title: "Catégorie",
              type: "string",
            }),
            defineField({
              name: "label",
              title: "Critère",
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
              name: "leftValue",
              title: "Valeur option gauche",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rightValue",
              title: "Valeur option droite",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "winner",
              title: "Meilleure option",
              type: "string",
              options: {
                list: [
                  { title: "Option gauche", value: "left" },
                  { title: "Option droite", value: "right" },
                  { title: "Égalité", value: "tie" },
                ],
                layout: "radio",
              },
              initialValue: "right",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "category",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "highlights",
      title: "Points forts",
      type: "array",
      of: [
        defineArrayMember({
          name: "comparisonHighlight",
          type: "object",
          title: "Point fort",
          fields: [
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
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "useCases",
      title: "Cas d’usage",
      type: "array",
      of: [
        defineArrayMember({
          name: "comparisonUseCase",
          type: "object",
          title: "Cas d’usage",
          fields: [
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
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
          initialValue: "Questions fréquentes",
        }),
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Avant de faire ton choix",
        }),
        defineField({
          name: "items",
          title: "Questions / réponses",
          type: "array",
          of: [
            defineArrayMember({
              name: "comparisonFaqItem",
              type: "object",
              title: "Question",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "answer",
                  title: "Réponse",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "question",
                  subtitle: "answer",
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "cta",
      title: "Section CTA finale",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "buttonLabel",
          title: "Texte du bouton",
          type: "string",
        }),
        defineField({
          name: "buttonHref",
          title: "Lien du bouton",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "seoContent",
      title: "Contenu SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphes",
          type: "array",
          of: [
            defineArrayMember({
              type: "text",
              rows: 4,
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title || "Page comparaison",
        subtitle: slug ? `/${slug}` : "Slug manquant",
      };
    },
  },
});