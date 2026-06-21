import { defineField, defineType } from "sanity";

type HeaderNavigationItem = {
  type?: "link" | "dropdown";
  dropdownLayout?: "list" | "columns";
  href?: string;
  items?: unknown[];
  columns?: Array<{
    items?: unknown[];
  }>;
};

const dropdownLinkFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "href",
    title: "Lien de redirection",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 2,
  }),
  defineField({
    name: "isExternal",
    title: "Lien externe",
    type: "boolean",
    initialValue: false,
  }),
  defineField({
    name: "order",
    title: "Ordre",
    type: "number",
    initialValue: 0,
  }),
  defineField({
    name: "isVisible",
    title: "Afficher",
    type: "boolean",
    initialValue: true,
  }),
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Titre interne",
      type: "string",
      initialValue: "Paramètres du site",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        defineField({
          name: "logo",
          title: "Logo du header",
          type: "file",
          options: {
            accept:
              "image/svg+xml,image/webp,image/png,image/jpeg,image/gif,.svg,.webp,.png,.jpg,.jpeg,.gif",
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              initialValue: "Vexly logo",
            }),
          ],
        }),

        defineField({
          name: "navigation",
          title: "Navigation principale",
          type: "array",
          of: [
            {
              type: "object",
              title: "Élément de navigation",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: "type",
                  title: "Type",
                  type: "string",
                  options: {
                    layout: "radio",
                    list: [
                      { title: "Lien simple", value: "link" },
                      { title: "Menu déroulant", value: "dropdown" },
                    ],
                  },
                  initialValue: "link",
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: "href",
                  title: "Lien de redirection",
                  type: "string",
                  description: "Exemple : /tarifs ou /mvp-saas-createurs",
                  hidden: ({ parent }) => parent?.type === "dropdown",
                }),

                defineField({
                  name: "dropdownLayout",
                  title: "Disposition du menu déroulant",
                  type: "string",
                  description:
                    "Utilise une liste simple pour un petit menu, ou plusieurs colonnes pour regrouper les expertises et les outils.",
                  options: {
                    layout: "radio",
                    list: [
                      { title: "Liste simple", value: "list" },
                      { title: "Plusieurs colonnes", value: "columns" },
                    ],
                  },
                  initialValue: "list",
                  hidden: ({ parent }) => parent?.type !== "dropdown",
                }),

                defineField({
                  name: "items",
                  title: "Liens du menu déroulant",
                  type: "array",
                  hidden: ({ parent }) =>
                    parent?.type !== "dropdown" ||
                    parent?.dropdownLayout === "columns",
                  of: [
                    {
                      type: "object",
                      title: "Lien du menu",
                      fields: dropdownLinkFields,
                    },
                  ],
                }),

                defineField({
                  name: "columns",
                  title: "Colonnes du menu déroulant",
                  type: "array",
                  description:
                    "Exemple : une colonne « Expertises » et une colonne « Outils gratuits ».",
                  hidden: ({ parent }) =>
                    parent?.type !== "dropdown" ||
                    parent?.dropdownLayout !== "columns",
                  validation: (Rule) => Rule.max(4),
                  of: [
                    {
                      type: "object",
                      title: "Colonne",
                      fields: [
                        defineField({
                          name: "title",
                          title: "Titre de la colonne",
                          type: "string",
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: "description",
                          title: "Description de la colonne",
                          type: "text",
                          rows: 2,
                        }),
                        defineField({
                          name: "items",
                          title: "Liens de la colonne",
                          type: "array",
                          validation: (Rule) => Rule.min(1),
                          of: [
                            {
                              type: "object",
                              title: "Lien du menu",
                              fields: dropdownLinkFields,
                            },
                          ],
                        }),
                        defineField({
                          name: "order",
                          title: "Ordre",
                          type: "number",
                          initialValue: 0,
                        }),
                        defineField({
                          name: "isVisible",
                          title: "Afficher",
                          type: "boolean",
                          initialValue: true,
                        }),
                      ],
                      preview: {
                        select: {
                          title: "title",
                        },
                        prepare({ title }) {
                          return {
                            title: title || "Colonne sans titre",
                          };
                        },
                      },
                    },
                  ],
                }),

                defineField({
                  name: "isExternal",
                  title: "Lien externe",
                  type: "boolean",
                  initialValue: false,
                  hidden: ({ parent }) => parent?.type === "dropdown",
                }),

                defineField({
                  name: "order",
                  title: "Ordre",
                  type: "number",
                  initialValue: 0,
                }),

                defineField({
                  name: "isVisible",
                  title: "Afficher",
                  type: "boolean",
                  initialValue: true,
                }),
              ],

              validation: (Rule) =>
                Rule.custom((item) => {
                  const value = item as HeaderNavigationItem | undefined;

                  if (!value) return true;

                  if (value.type === "link" && !value.href) {
                    return "Ajoute un lien pour cet élément.";
                  }

                  if (value.type !== "dropdown") {
                    return true;
                  }

                  if (value.dropdownLayout === "columns") {
                    if (!value.columns || value.columns.length === 0) {
                      return "Ajoute au moins une colonne au menu déroulant.";
                    }

                    const hasEmptyColumn = value.columns.some(
                      (column) => !column.items || column.items.length === 0,
                    );

                    if (hasEmptyColumn) {
                      return "Chaque colonne doit contenir au moins un lien.";
                    }

                    return true;
                  }

                  if (!value.items || value.items.length === 0) {
                    return "Ajoute au moins un lien dans le menu déroulant.";
                  }

                  return true;
                }),
            },
          ],
        }),

        defineField({
          name: "loginLink",
          title: "Lien connexion",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              initialValue: "Connexion",
            }),
            defineField({
              name: "href",
              title: "Lien",
              type: "string",
              initialValue: "/connexion",
            }),
            defineField({
              name: "isVisible",
              title: "Afficher",
              type: "boolean",
              initialValue: true,
            }),
          ],
        }),

        defineField({
          name: "cta",
          title: "CTA principal",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              initialValue: "Créer mon SaaS",
            }),
            defineField({
              name: "href",
              title: "Lien",
              type: "string",
              initialValue: "/#formulaire",
            }),
            defineField({
              name: "isVisible",
              title: "Afficher",
              type: "boolean",
              initialValue: true,
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "logo",
          title: "Logo du footer",
          type: "file",
          options: {
            accept:
              "image/svg+xml,image/webp,image/png,image/jpeg,image/gif,.svg,.webp,.png,.jpg,.jpeg,.gif",
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              initialValue: "VEXLY",
            }),
          ],
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),

        defineField({
          name: "email",
          title: "Email de contact",
          type: "string",
          initialValue: "contact@vexly.fr",
        }),

        defineField({
          name: "columns",
          title: "Colonnes du footer",
          type: "array",
          of: [
            {
              type: "object",
              title: "Colonne",
              fields: [
                defineField({
                  name: "title",
                  title: "Titre",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: "links",
                  title: "Liens",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      title: "Lien",
                      fields: [
                        defineField({
                          name: "label",
                          title: "Label",
                          type: "string",
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: "href",
                          title: "Lien",
                          type: "string",
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: "isExternal",
                          title: "Lien externe",
                          type: "boolean",
                          initialValue: false,
                        }),
                        defineField({
                          name: "order",
                          title: "Ordre",
                          type: "number",
                          initialValue: 0,
                        }),
                        defineField({
                          name: "isVisible",
                          title: "Afficher",
                          type: "boolean",
                          initialValue: true,
                        }),
                      ],
                    },
                  ],
                }),

                defineField({
                  name: "order",
                  title: "Ordre",
                  type: "number",
                  initialValue: 0,
                }),

                defineField({
                  name: "isVisible",
                  title: "Afficher",
                  type: "boolean",
                  initialValue: true,
                }),
              ],
            },
          ],
        }),

        defineField({
          name: "legalLinks",
          title: "Liens légaux",
          type: "array",
          of: [
            {
              type: "object",
              title: "Lien légal",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "href",
                  title: "Lien",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "isVisible",
                  title: "Afficher",
                  type: "boolean",
                  initialValue: true,
                }),
              ],
            },
          ],
        }),

        defineField({
          name: "copyright",
          title: "Copyright",
          type: "string",
          initialValue: "VEXLY — Tous droits réservés.",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});
