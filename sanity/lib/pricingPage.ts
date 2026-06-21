import { groq } from "next-sanity";
import { client } from "./client";

export type PricingPageSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export type PricingPageHero = {
  title?: string;
  description?: string;
};

export type PricingPageOffer = {
  name?: string;
  highlight?: string;
  basePrice?: number;
  oldPrice?: number;
  priceSuffix?: string;
  limitedLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  features?: string[];
};

export type PricingPageTestimonials = {
  eyebrow?: string;
  title?: string;
  items?: {
    name?: string;
    role?: string;
    text?: string;
    stars?: number;
    image?: string;
  }[];
};

export type PricingPageFaq = {
  eyebrow?: string;
  title?: string;
  items?: {
    question?: string;
    answer?: string;
  }[];
};

export type PricingPageSeoContent = {
  title?: string;
  paragraphs?: string[];
  resourcesTitle?: string;
  resourcesDescription?: string;
  resources?: {
    label?: string;
    href?: string;
  }[];
};

export type PricingPageData = {
  seo?: PricingPageSeo;
  hero?: PricingPageHero;
  offer?: PricingPageOffer;
  testimonials?: PricingPageTestimonials;
  faq?: PricingPageFaq;
  seoContent?: PricingPageSeoContent;
};

const pricingPageQuery = groq`
  *[_type == "pricingPage"][0]{
    seo{
      title,
      description,
      canonical,
      ogTitle,
      ogDescription,
      "ogImage": ogImage.asset->url,
      noIndex
    },
    hero{
      title,
      description
    },
    offer{
      name,
      highlight,
      basePrice,
      oldPrice,
      priceSuffix,
      limitedLabel,
      ctaLabel,
      ctaHref,
      features
    },
    testimonials{
      eyebrow,
      title,
      items[]{
        name,
        role,
        text,
        stars,
        "image": image.asset->url
      }
    },
    faq{
      eyebrow,
      title,
      items[]{
        question,
        answer
      }
    },
    seoContent{
      title,
      paragraphs,
      resourcesTitle,
      resourcesDescription,
      resources[]{
        label,
        href
      }
    }
  }
`;

export async function getPricingPage(): Promise<PricingPageData | null> {
  return client.fetch<PricingPageData | null>(
    pricingPageQuery,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
}