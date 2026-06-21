import { defineField, defineType } from "sanity";

export const hubPageType = defineType({
  name: "hubPage",
  title: "Hub Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "hubType",
      title: "Slug du hub",
      type: "string",
      description:
        "Doit correspondre au nom du dossier dans /app. Exemple : articles, comparaisons, guides.",
      validation: (Rule) =>
        Rule.required().regex(/^[a-z0-9-]+$/, {
          name: "slug",
          invert: false,
        }),
      initialValue: "articles",
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "titleline1",
          title: "Titre ligne 1",
          type: "string",
        }),

        defineField({
          name: "titlehighlight",
          title: "Titre mis en avant",
          type: "string",
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),

        defineField({
          name: "backgroundImage",
          title: "Image de fond",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
          ],
        }),
      ],
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
          title: "Canonical URL",
          type: "string",
          description: "Exemple : /articles",
        }),

        defineField({
          name: "ogImage",
          title: "Image Open Graph",
          type: "image",
          options: {
            hotspot: true,
          },
        }),

        defineField({
          name: "noIndex",
          title: "No index",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "hubType",
      media: "hero.backgroundImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Hub : /${subtitle}` : "Aucun hub",
        media,
      };
    },
  },
});