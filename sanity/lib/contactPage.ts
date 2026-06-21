import { client } from "@/sanity/lib/client";

export type ContactLink = {
  label?: string;
  value?: string;
  href?: string;
  type?: "email" | "phone" | "link";
};

export type ContactHighlight = {
  label?: string;
  type?: "bolt" | "shield" | "star" | "location";
};

export type ContactFormOption = {
  label?: string;
  value?: string;
};

export type ContactForm = {
  title?: string;
  description?: string;
  action?: string;
  submitLabel?: string;
  responseNote?: string;
  projectPlaceholder?: string;
  projectOptions?: ContactFormOption[];
  privacyText?: string;
  privacyLinkLabel?: string;
  privacyLinkHref?: string;
};

export type ContactPageData = {
  _id?: string;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  eyebrow?: string;
  title?: string;
  description?: string;
  intro?: string[];

  contactLinks?: ContactLink[];
  highlights?: ContactHighlight[];
  form?: ContactForm;
};

const contactPageQuery = /* groq */ `
  *[_type == "contactPage"][0]{
    _id,

    seoTitle,
    seoDescription,
    canonicalUrl,

    eyebrow,
    title,
    description,
    intro,

    contactLinks[]{
      label,
      value,
      href,
      type
    },

    highlights[]{
      label,
      type
    },

    form{
      title,
      description,
      action,
      submitLabel,
      responseNote,
      projectPlaceholder,
      projectOptions[]{
        label,
        value
      },
      privacyText,
      privacyLinkLabel,
      privacyLinkHref
    }
  }
`;

export async function getContactPage(): Promise<ContactPageData | null> {
  return client.fetch<ContactPageData | null>(
    contactPageQuery,
    {},
    {
      next: {
        tags: ["contactPage"],
      },
    }
  );
}