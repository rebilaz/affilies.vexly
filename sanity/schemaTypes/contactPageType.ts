import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Page contact",
  type: "document",

  groups: [
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "content",
      title: "Contenu",
    },
    {
      name: "form",
      title: "Formulaire",
    },
  ],

  fields: [
    defineField({
      name: "seoTitle",
      title: "Titre SEO",
      type: "string",
      group: "seo",
      initialValue: "Contact | Vexly",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seoDescription",
      title: "Description SEO",
      type: "text",
      rows: 3,
      group: "seo",
      initialValue:
        "Contactez Vexly : question, partenariat, support. Réponse sous 24–48h.",
      validation: (Rule) => Rule.required().max(180),
    }),

    defineField({
      name: "canonicalUrl",
      title: "URL canonique",
      type: "url",
      group: "seo",
      initialValue: "https://www.vexly.fr/contact",
    }),

    defineField({
      name: "eyebrow",
      title: "Petit titre",
      type: "string",
      group: "hero",
      initialValue: "Contact",
    }),

    defineField({
      name: "title",
      title: "Titre principal",
      type: "string",
      group: "hero",
      initialValue: "Nous contacter",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description principale",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue:
        "Une question, une demande de partenariat, un bug à signaler ? Écrivez-nous et on revient vers vous rapidement.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Paragraphes d’introduction",
      type: "array",
      group: "content",
      of: [
        {
          type: "text",
          rows: 3,
        },
      ],
      initialValue: [
        "Vous avez une question sur Vexly, une idée de partenariat ou besoin d’aide ?",
        "Envoyez-nous un message et notre équipe reviendra vers vous rapidement.",
      ],
    }),

    defineField({
      name: "contactLinks",
      title: "Moyens de contact",
      type: "array",
      group: "content",
      of: [
        defineField({
          name: "contactLink",
          title: "Moyen de contact",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Valeur affichée",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Lien",
              type: "string",
              description:
                "Exemples : mailto:contact@vexly.fr, tel:+33123456789, https://...",
            }),
            defineField({
              name: "type",
              title: "Type d’icône",
              type: "string",
              options: {
                list: [
                  {
                    title: "Email",
                    value: "email",
                  },
                  {
                    title: "Téléphone",
                    value: "phone",
                  },
                  {
                    title: "Lien",
                    value: "link",
                  },
                ],
                layout: "radio",
              },
              initialValue: "email",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        }),
      ],
      initialValue: [
        {
          label: "Email",
          value: "contact@vexly.fr",
          href: "mailto:contact@vexly.fr",
          type: "email",
        },
        {
          label: "Partenariats",
          value: "partners@vexly.fr",
          href: "mailto:partners@vexly.fr",
          type: "email",
        },
      ],
    }),

    defineField({
      name: "highlights",
      title: "Points de réassurance",
      type: "array",
      group: "content",
      of: [
        defineField({
          name: "highlight",
          title: "Point de réassurance",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Texte",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  {
                    title: "Éclair",
                    value: "bolt",
                  },
                  {
                    title: "Bouclier",
                    value: "shield",
                  },
                  {
                    title: "Étoile",
                    value: "star",
                  },
                  {
                    title: "Localisation",
                    value: "location",
                  },
                ],
                layout: "radio",
              },
              initialValue: "bolt",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "type",
            },
          },
        }),
      ],
      initialValue: [
        {
          label: "Réponse sous 24–48h",
          type: "bolt",
        },
        {
          label: "Support humain",
          type: "shield",
        },
        {
          label: "Partenariats bienvenus",
          type: "star",
        },
        {
          label: "Équipe basée en France",
          type: "location",
        },
      ],
    }),

    defineField({
      name: "form",
      title: "Formulaire",
      type: "object",
      group: "form",
      fields: [
        defineField({
          name: "title",
          title: "Titre du formulaire",
          type: "string",
          initialValue: "Parlez-nous de votre demande",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "description",
          title: "Description du formulaire",
          type: "text",
          rows: 3,
          initialValue:
            "Complétez le formulaire ci-dessous. Plus votre message est précis, plus notre réponse sera utile.",
        }),

        defineField({
          name: "action",
          title: "Action du formulaire",
          type: "string",
          description: "Exemple : /api/contact",
          initialValue: "/api/contact",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "projectPlaceholder",
          title: "Placeholder du select",
          type: "string",
          initialValue: "Quel est le sujet de votre message ? *",
        }),

        defineField({
          name: "projectOptions",
          title: "Options du select",
          type: "array",
          of: [
            defineField({
              name: "projectOption",
              title: "Option",
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
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
                select: {
                  title: "label",
                  subtitle: "value",
                },
              },
            }),
          ],
          initialValue: [
            {
              label: "Question générale",
              value: "question",
            },
            {
              label: "Support",
              value: "support",
            },
            {
              label: "Partenariat",
              value: "partenariat",
            },
            {
              label: "Autre",
              value: "autre",
            },
          ],
        }),

        defineField({
          name: "submitLabel",
          title: "Texte du bouton",
          type: "string",
          initialValue: "Envoyer",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "responseNote",
          title: "Note sous le formulaire",
          type: "string",
          initialValue: "Réponse généralement sous 24–48h.",
        }),

        defineField({
          name: "privacyText",
          title: "Texte confidentialité",
          type: "text",
          rows: 2,
          initialValue:
            "En envoyant ce formulaire, vous acceptez d’être recontacté par email.",
        }),

        defineField({
          name: "privacyLinkLabel",
          title: "Label du lien confidentialité",
          type: "string",
          initialValue: "Politique de confidentialité",
        }),

        defineField({
          name: "privacyLinkHref",
          title: "Lien confidentialité",
          type: "string",
          initialValue: "/privacy",
        }),
      ],
      initialValue: {
        title: "Parlez-nous de votre demande",
        description:
          "Complétez le formulaire ci-dessous. Plus votre message est précis, plus notre réponse sera utile.",
        action: "/api/contact",
        submitLabel: "Envoyer",
        responseNote: "Réponse généralement sous 24–48h.",
        projectPlaceholder: "Quel est le sujet de votre message ? *",
        privacyText:
          "En envoyant ce formulaire, vous acceptez d’être recontacté par email.",
        privacyLinkLabel: "Politique de confidentialité",
        privacyLinkHref: "/privacy",
        projectOptions: [
          {
            label: "Question générale",
            value: "question",
          },
          {
            label: "Support",
            value: "support",
          },
          {
            label: "Partenariat",
            value: "partenariat",
          },
          {
            label: "Autre",
            value: "autre",
          },
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "seoDescription",
    },
  },
});