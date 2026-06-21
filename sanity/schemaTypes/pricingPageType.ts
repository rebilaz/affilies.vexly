import { defineArrayMember, defineField, defineType } from "sanity";

export const pricingPageType = defineType({
  name: "pricingPage",
  title: "Page Tarifs",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta title",
          type: "string",
          initialValue: "Tarifs – Vexly",
        }),
        defineField({
          name: "description",
          title: "Meta description",
          type: "text",
          rows: 3,
          initialValue:
            "Tarifs pour lancer ton SaaS clé en main avec Vexly Launch.",
        }),
        defineField({
          name: "canonical",
          title: "Canonical",
          type: "string",
          initialValue: "/tarifs",
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
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Un MVP SaaS clair, sans choix compliqué.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Une offre claire pour transformer ton idée en SaaS moderne, propre et prêt à encaisser ses premiers clients.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "offer",
      title: "Offre",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nom de l’offre",
          type: "string",
          initialValue: "Vexly Launch",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "highlight",
          title: "Phrase courte",
          type: "string",
          initialValue: "Ton SaaS prêt à vendre en moins de 14 jours.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "basePrice",
          title: "Prix actuel",
          type: "number",
          initialValue: 990,
          validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
          name: "oldPrice",
          title: "Ancien prix",
          type: "number",
          initialValue: 1490,
        }),
        defineField({
          name: "priceSuffix",
          title: "Suffixe du prix",
          type: "string",
          initialValue: "/ projet",
        }),
        defineField({
          name: "limitedLabel",
          title: "Label places limitées",
          type: "string",
          initialValue: "Places limitées",
        }),
        defineField({
          name: "ctaLabel",
          title: "Texte du bouton",
          type: "string",
          initialValue: "Lancer mon SaaS",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "ctaHref",
          title: "Lien du bouton",
          type: "string",
          initialValue: "/contact",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "features",
          title: "Fonctionnalités incluses",
          type: "array",
          of: [
            defineArrayMember({
              type: "string",
            }),
          ],
          initialValue: [
            "Landing page premium responsive",
            "Page tarifs optimisée conversion",
            "Authentification utilisateur",
            "Intégration Stripe",
            "Dashboard SaaS de base",
            "Design system Vexly",
            "Code source livré",
            "Mise en ligne incluse",
          ],
        }),
      ],
    }),

    defineField({
      name: "testimonials",
      title: "Avis clients",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
          initialValue: "Ils ont lancé leur SaaS",
        }),
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Conçu pour vendre vite et bien",
        }),
        defineField({
          name: "items",
          title: "Avis",
          type: "array",
          of: [
            defineArrayMember({
              name: "testimonialItem",
              type: "object",
              title: "Avis",
              fields: [
                defineField({
                  name: "name",
                  title: "Nom",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "role",
                  title: "Rôle / entreprise",
                  type: "string",
                }),
                defineField({
                  name: "text",
                  title: "Texte de l’avis",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "stars",
                  title: "Étoiles",
                  type: "number",
                  initialValue: 5,
                  validation: (Rule) => Rule.required().min(1).max(5),
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                }),
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "role",
                  media: "image",
                },
              },
            }),
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
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
          initialValue: "Questions fréquentes",
        }),
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Avant de lancer ton SaaS",
        }),
        defineField({
          name: "items",
          title: "Questions / réponses",
          type: "array",
          of: [
            defineArrayMember({
              name: "faqItem",
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
          initialValue: [
            {
              _type: "faqItem",
              question: "Est-ce que le code source m’appartient ?",
              answer:
                "Oui. Une fois le projet livré et payé, tu récupères le code source du projet. Tu peux l’héberger, le modifier ou le faire évoluer librement.",
            },
            {
              _type: "faqItem",
              question: "Combien de temps prend la livraison ?",
              answer:
                "L’objectif est de livrer une première version exploitable en moins de 14 jours, selon la complexité du projet et la rapidité des retours.",
            },
            {
              _type: "faqItem",
              question: "Est-ce que Stripe est inclus ?",
              answer:
                "Oui. L’offre inclut l’intégration Stripe pour permettre à ton SaaS d’encaisser ses premiers paiements.",
            },
            {
              _type: "faqItem",
              question: "Puis-je demander des fonctionnalités custom ?",
              answer:
                "Oui. L’offre couvre une base SaaS solide. Les besoins très spécifiques peuvent être ajoutés sur devis après cadrage.",
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
          title: "Titre",
          type: "string",
          initialValue: "Pourquoi choisir une création de SaaS sur-mesure ?",
          validation: (Rule) => Rule.required(),
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
        defineField({
          name: "resourcesTitle",
          title: "Titre ressources",
          type: "string",
          initialValue: "Ressources pour aller plus loin",
        }),
        defineField({
          name: "resourcesDescription",
          title: "Description ressources",
          type: "text",
          rows: 3,
          initialValue:
            "Avant de démarrer ton développement, assure-toi que ton concept est validé. Découvre nos ressources pour t'accompagner dans cette étape cruciale :",
        }),
        defineField({
          name: "resources",
          title: "Liens ressources",
          type: "array",
          of: [
            defineArrayMember({
              name: "resourceLink",
              type: "object",
              title: "Lien ressource",
              fields: [
                defineField({
                  name: "label",
                  title: "Texte du lien",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "href",
                  title: "URL",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "href",
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Page Tarifs",
        subtitle: "Contenu complet de la page /tarifs",
      };
    },
  },
});