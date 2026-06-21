import { defineField, defineType } from "sanity";

const textItemsField = defineField({
  name: "items",
  title: "Éléments",
  type: "array",
  of: [
    {
      type: "object",
      title: "Élément",
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
        }),
      ],
      preview: {
        select: {
          title: "title",
          subtitle: "description",
        },
      },
    },
  ],
});

export const featuresSectionType = defineType({
  name: "featuresSection",
  title: "Section Features",
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
      name: "pageType",
      title: "Type de page",
      type: "string",
      initialValue: "solution",
      options: {
        layout: "radio",
        list: [
          { title: "Solution", value: "solution" },
          { title: "Ressource", value: "resource" },
          { title: "Autre", value: "other" },
        ],
      },
    }),

    defineField({
      name: "navLabel",
      title: "Label navigation",
      type: "string",
    }),

    defineField({
      name: "showInHeader",
      title: "Afficher dans le header",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "showOnHome",
      title: "Afficher sur la home",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "description",
      title: "Description Hero",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "eyebrow",
      title: "Petit titre Hero",
      type: "string",
      initialValue: "Expertise Vexly",
    }),

    defineField({
      name: "ctaLabel",
      title: "Texte du CTA principal",
      type: "string",
    }),

    defineField({
      name: "ctaHref",
      title: "Lien du CTA principal",
      type: "string",
    }),

    defineField({
      name: "landingLabel",
      title: "Texte du lien secondaire Hero",
      type: "string",
    }),

    defineField({
      name: "landingHref",
      title: "Lien secondaire Hero",
      type: "string",
    }),

    defineField({
      name: "heroMedia",
      title: "Média du Hero",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type de média",
          type: "string",
          options: {
            layout: "radio",
            list: [
              { title: "Lien YouTube", value: "youtube" },
              { title: "Vidéo fichier", value: "video" },
              { title: "Image fichier", value: "image" },
            ],
          },
        }),

        defineField({
          name: "youtubeUrl",
          title: "Lien YouTube",
          type: "url",
          hidden: ({ parent }) => parent?.type !== "youtube",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        }),

        defineField({
          name: "videoFile",
          title: "Fichier vidéo",
          type: "file",
          options: {
            accept: "video/*",
          },
          hidden: ({ parent }) => parent?.type !== "video",
        }),

        defineField({
          name: "imageFile",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== "image",
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
      name: "advantagesIntro",
      title: "Intro avantages",
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
      ],
    }),

    defineField({
      name: "advantages",
      title: "Avantages",
      type: "array",
      of: [
        {
          type: "object",
          title: "Avantage",
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
            }),
            defineField({
              name: "linkLabel",
              title: "Texte du lien",
              type: "string",
            }),
            defineField({
              name: "linkHref",
              title: "Lien",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Image",
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
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
    }),

    defineField({
      name: "service",
      title: "Service",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        textItemsField,
      ],
    }),

    defineField({
      name: "whyUs",
      title: "Pourquoi nous",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        textItemsField,
      ],
    }),

    defineField({
      name: "realisations",
      title: "Réalisations",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        defineField({
          name: "ctaLabel",
          title: "Texte du lien",
          type: "string",
        }),
        defineField({
          name: "ctaHref",
          title: "Lien",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Réalisations",
          type: "array",
          of: [
            {
              type: "object",
              title: "Réalisation",
              fields: [
                defineField({
                  name: "title",
                  title: "Titre",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "category",
                  title: "Catégorie",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "tags",
                  title: "Tags",
                  type: "array",
                  of: [{ type: "string" }],
                }),
                defineField({
                  name: "image",
                  title: "Image",
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
                defineField({
                  name: "linkLabel",
                  title: "Texte du lien",
                  type: "string",
                }),
                defineField({
                  name: "linkHref",
                  title: "Lien",
                  type: "string",
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "category",
                  media: "image",
                },
              },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "method",
      title: "Méthode",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
        }),
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
          name: "steps",
          title: "Étapes",
          type: "array",
          of: [
            {
              type: "object",
              title: "Étape",
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
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "description",
                },
              },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "technologies",
      title: "Technologies",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Technologies / partenaires",
          type: "array",
          of: [
            {
              type: "object",
              title: "Technologie",
              fields: [
                defineField({
                  name: "title",
                  title: "Titre",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "logoLabel",
                  title: "Logo texte court",
                  type: "string",
                  description: "Exemple : Next, TS, Stripe, DB",
                }),
                defineField({
                  name: "logo",
                  title: "Logo image",
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
              preview: {
                select: {
                  title: "title",
                  subtitle: "logoLabel",
                  media: "logo",
                },
              },
            },
          ],
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
          title: "Titre SEO",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphes SEO",
          type: "array",
          of: [{ type: "text" }],
        }),
        defineField({
          name: "items",
          title: "Cartes SEO",
          type: "array",
          of: [
            {
              type: "object",
              title: "Carte SEO",
              fields: [
                defineField({
                  name: "title",
                  title: "Titre",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre de la FAQ",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description de la FAQ",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "items",
          title: "Questions / Réponses",
          type: "array",
          of: [
            {
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
                  validation: (Rule) => Rule.required(),
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
      name: "finalCta",
      title: "CTA final",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Sous-titre",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ctaLabel",
          title: "Texte du bouton",
          type: "string",
        }),
        defineField({
          name: "ctaHref",
          title: "Lien du bouton",
          type: "string",
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
          title: "URL canonique",
          type: "url",
        }),
        defineField({
          name: "ogImage",
          title: "Image Open Graph",
          type: "image",
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
      subtitle: "slug.current",
    },
  },
});