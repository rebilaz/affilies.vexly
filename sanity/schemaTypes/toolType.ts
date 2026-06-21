import { defineField, defineType } from "sanity";

export const toolType = defineType({
  name: "tool",
  title: "Outil",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom de l’outil",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Doit correspondre au dossier dans app/embed. Exemple : calculateur-roi",
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
      name: "height",
      title: "Hauteur de l’iframe",
      type: "number",
      initialValue: 720,
      validation: (Rule) => Rule.min(300).max(2000),
    }),

    defineField({
      name: "intro",
      title: "Texte SEO avant l’outil",
      type: "text",
    }),

    defineField({
      name: "outro",
      title: "Texte SEO après l’outil",
      type: "text",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});