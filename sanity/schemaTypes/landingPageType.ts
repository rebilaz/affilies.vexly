import { defineArrayMember, defineField, defineType } from "sanity";

export const landingPageType = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "titleline1", title: "Title line 1", type: "string" }),
        defineField({ name: "titlehighlight", title: "Title highlight", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text" }),
      ],
    }),

    defineField({
      name: "projection",
      title: "Revenue projection",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text" }),
        defineField({ name: "clients", title: "Clients", type: "number" }),
        defineField({ name: "price", title: "Price per month", type: "number" }),
      ],
    }),

    defineField({
      name: "problems",
      title: "Problems",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Ban", value: "Ban" },
                      { title: "Trending down", value: "TrendingDown" },
                      { title: "Shield alert", value: "ShieldAlert" },
                    ],
                  },
                }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "features",
      title: "Features",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Rocket", value: "Rocket" },
                      { title: "Target", value: "Target" },
                      { title: "Credit card", value: "CreditCard" },
                      { title: "Settings", value: "Settings" },
                      { title: "Monitor smartphone", value: "MonitorSmartphone" },
                      { title: "Server", value: "Server" },
                    ],
                  },
                }),
                defineField({ name: "label", title: "Label", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "method",
      title: "Execution method",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text" }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "week", title: "Week", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text" }),
              ],
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
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "q", title: "Question", type: "string" }),
                defineField({ name: "a", title: "Answer", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
        defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
      ],
    }),
  ],
});