import { defineArrayMember, defineField, defineType } from "sanity";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export const affiliateProgramType = defineType({
  name: "affiliateProgram",
  title: "Programme affiliation SaaS",
  type: "document",
  groups: [
    { name: "main", title: "Principal", default: true },
    { name: "details", title: "Page détail" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nom du SaaS",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: {
        source: "name",
        maxLength: 96,
        slugify,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Description courte",
      type: "text",
      rows: 3,
      group: "main",
      validation: (Rule) => Rule.required().min(40).max(260),
    }),
    defineField({
      name: "description",
      title: "Description longue",
      type: "text",
      rows: 5,
      group: "details",
      validation: (Rule) => Rule.max(900),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "main",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "commission",
      title: "Commission",
      description: "Exemple : 30%, 150 EUR, 20% récurrent",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "model",
      title: "Modèle de rémunération",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cookie",
      title: "Durée du cookie",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "payout",
      title: "Paiement",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "audience",
      title: "Audience idéale",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Prix du SaaS",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlight",
      title: "Argument principal",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "affiliateUrl",
      title: "Lien affilié",
      type: "url",
      group: "main",
    }),
    defineField({
      name: "websiteUrl",
      title: "Site officiel",
      type: "url",
      group: "main",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "main",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "metrics",
      title: "Métriques affichées",
      type: "array",
      group: "details",
      validation: (Rule) => Rule.max(6),
      of: [
        defineArrayMember({
          name: "affiliateMetric",
          title: "Métrique",
          type: "object",
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
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "Points forts",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "idealFor",
      title: "À recommander si",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "howItWorks",
      title: "Comment le promouvoir",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          name: "affiliateFaqItem",
          title: "Question",
          type: "object",
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
            select: { title: "question", subtitle: "answer" },
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "Meta title",
          type: "string",
          validation: (Rule) => Rule.max(65),
        }),
        defineField({
          name: "description",
          title: "Meta description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(170),
        }),
        defineField({
          name: "canonical",
          title: "Canonical",
          type: "string",
        }),
        defineField({
          name: "noIndex",
          title: "Ne pas indexer",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "logo",
    },
  },
});
