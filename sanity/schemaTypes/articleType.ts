import { defineType, defineField } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
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
      description: "Sélectionne les pages hub où cet article doit apparaître",
      of: [
        {
          type: "reference",
          to: [{ type: "hubPage" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),

    defineField({
      name: "searchIntent",
      title: "Search intent",
      type: "string",
    }),

    defineField({
      name: "category",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Lien",
                fields: [
                  defineField({
                    name: "href",
                    type: "string",
                    title: "URL",
                  }),
                ],
              },
            ],
          },
        },

        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },

        { type: "table" },

        {
          name: "toolEmbed",
          title: "Outil intégré",
          type: "object",
          fields: [
            defineField({
              name: "tool",
              title: "Outil",
              type: "reference",
              to: [{ type: "tool" }],
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "titleOverride",
              title: "Titre personnalisé dans cet article",
              type: "string",
              description:
                "Optionnel. Si vide, le nom de l’outil sera utilisé.",
            }),

            defineField({
              name: "heightOverride",
              title: "Hauteur personnalisée",
              type: "number",
              description:
                "Optionnel. Si vide, la hauteur définie dans l’outil sera utilisée.",
              validation: (Rule) => Rule.min(300).max(2000),
            }),
          ],
          preview: {
            select: {
              title: "tool.title",
              titleOverride: "titleOverride",
            },
            prepare({ title, titleOverride }) {
              return {
                title: titleOverride || title || "Outil intégré",
                subtitle: "Bloc outil",
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "coverImage",
    },
  },
});