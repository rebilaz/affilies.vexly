import "server-only";

import { client } from "./client";

export type TextItem = {
  title?: string;
  description?: string;
};

export type TechnologyItem = {
  title?: string;
  logoLabel?: string;
  logo?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
};

export type RealisationItem = {
  title?: string;
  category?: string;
  description?: string;
  tags?: string[];
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
  linkLabel?: string;
  linkHref?: string;
};

export type FeatureSolutionCard = {
  _id: string;
  title: string;
  slug: string;
  href: string;
  navLabel?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  order?: number;
};

export type FeatureSectionContent = {
  _id: string;
  title: string;
  slug: string;
  pageType?: "solution" | "resource" | "other";
  navLabel?: string;
  showInHeader?: boolean;
  showOnHome?: boolean;
  order?: number;
  description?: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  landingLabel?: string;
  landingHref?: string;

  heroMedia?: {
    type?: "youtube" | "video" | "image";
    youtubeUrl?: string;
    videoFile?: {
      asset?: {
        url?: string;
        mimeType?: string;
        originalFilename?: string;
      };
    };
    imageFile?: {
      asset?: {
        url?: string;
      };
      alt?: string;
    };
  };

  advantagesIntro?: {
    title?: string;
    description?: string;
  };

  advantages?: {
    title: string;
    description?: string;
    linkLabel?: string;
    linkHref?: string;
    image?: {
      asset?: {
        url?: string;
      };
      alt?: string;
    };
  }[];

  service?: {
    title?: string;
    items?: TextItem[];
  };

  whyUs?: {
    title?: string;
    items?: TextItem[];
  };

  realisations?: {
    eyebrow?: string;
    title?: string;
    ctaLabel?: string;
    ctaHref?: string;
    items?: RealisationItem[];
  };

  method?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    steps?: TextItem[];
  };

  technologies?: {
    eyebrow?: string;
    title?: string;
    items?: TechnologyItem[];
  };

  seoContent?: {
    title?: string;
    paragraphs?: string[];
    items?: {
      title?: string;
    }[];
  };

  faq?: {
    title?: string;
    description?: string;
    items?: {
      question?: string;
      answer?: string;
    }[];
  };

  finalCta?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };

  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImageUrl?: string | null;
    noIndex?: boolean;
  };
};

const featuresSectionFields = `
  _id,
  title,
  "slug": slug.current,
  "pageType": coalesce(pageType, "solution"),
  navLabel,
  "showInHeader": coalesce(showInHeader, false),
  "showOnHome": coalesce(showOnHome, true),
  "order": coalesce(order, 0),
  description,
  eyebrow,
  ctaLabel,
  ctaHref,
  landingLabel,
  landingHref,

  heroMedia {
    type,
    youtubeUrl,
    videoFile {
      asset-> {
        url,
        mimeType,
        originalFilename
      }
    },
    imageFile {
      asset-> {
        url
      },
      alt
    }
  },

  advantagesIntro {
    title,
    description
  },

  advantages[] {
    title,
    description,
    linkLabel,
    linkHref,
    image {
      asset-> {
        url
      },
      alt
    }
  },

  service {
    title,
    items[] {
      title,
      description
    }
  },

  whyUs {
    title,
    items[] {
      title,
      description
    }
  },

  realisations {
    eyebrow,
    title,
    ctaLabel,
    ctaHref,
    items[] {
      title,
      category,
      description,
      tags,
      image {
        asset-> {
          url
        },
        alt
      },
      linkLabel,
      linkHref
    }
  },

  method {
    eyebrow,
    title,
    description,
    steps[] {
      title,
      description
    }
  },

  technologies {
    eyebrow,
    title,
    items[] {
      title,
      logoLabel,
      logo {
        asset-> {
          url
        },
        alt
      }
    }
  },

  seoContent {
    title,
    paragraphs,
    items[] {
      title
    }
  },

  faq {
    title,
    description,
    items[] {
      question,
      answer
    }
  },

  finalCta {
    eyebrow,
    title,
    subtitle,
    ctaLabel,
    ctaHref
  },

  seo {
    title,
    description,
    canonical,
    "ogImageUrl": ogImage.asset->url,
    "noIndex": coalesce(noIndex, false)
  }
`;

const featureSolutionCardFields = `
  _id,
  title,
  "slug": slug.current,
  "href": "/" + slug.current,
  navLabel,
  description,
  ctaLabel,
  ctaHref,
  "order": coalesce(order, 0)
`;

const featuresFilter = `
  _type == "featuresSection" &&
  defined(slug.current) &&
  coalesce(pageType, "solution") == "solution"
`;

export async function getFeaturesSection(
  slug?: string
): Promise<FeatureSectionContent | null> {
  if (slug) {
    return client.withConfig({ useCdn: false }).fetch(
      `
      *[
        ${featuresFilter} &&
        slug.current == $slug
      ][0] {
        ${featuresSectionFields}
      }
      `,
      { slug }
    );
  }

  return client.withConfig({ useCdn: false }).fetch(`
    *[
      ${featuresFilter}
    ] | order(coalesce(order, 0) asc, _createdAt asc)[0] {
      ${featuresSectionFields}
    }
  `);
}

export async function getAllFeaturesSlugs(): Promise<{ slug: string }[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      ${featuresFilter} &&
      !(seo.noIndex == true)
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      "slug": slug.current
    }
  `);
}

export async function getAllFeaturesSections(): Promise<FeatureSolutionCard[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      ${featuresFilter}
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      ${featureSolutionCardFields}
    }
  `);
}

export async function getHeaderSolutions(): Promise<FeatureSolutionCard[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      ${featuresFilter} &&
      coalesce(showInHeader, false) == true
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      ${featureSolutionCardFields}
    }
  `);
}

export async function getHomeSolutions(): Promise<FeatureSolutionCard[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      ${featuresFilter} &&
      coalesce(showOnHome, true) == true
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      ${featureSolutionCardFields}
    }
  `);
}