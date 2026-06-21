import "server-only";

import { client } from "@/sanity/lib/client";

export type SiteNavLink = {
  label?: string;
  href?: string;
  description?: string;
  isExternal?: boolean;
  isVisible?: boolean;
  order?: number;
};

export type SiteNavColumn = {
  title?: string;
  description?: string;
  isVisible?: boolean;
  order?: number;
  items?: SiteNavLink[];
};

export type SiteNavItem = {
  label?: string;
  type?: "link" | "dropdown";
  dropdownLayout?: "list" | "columns";
  href?: string;
  isExternal?: boolean;
  isVisible?: boolean;
  order?: number;
  items?: SiteNavLink[];
  columns?: SiteNavColumn[];
};

export type SiteSettings = {
  header?: {
    logoUrl?: string | null;
    logoAlt?: string | null;
    logoMimeType?: string | null;
    navigation?: SiteNavItem[];
    loginLink?: {
      label?: string;
      href?: string;
      isVisible?: boolean;
    };
    cta?: {
      label?: string;
      href?: string;
      isVisible?: boolean;
    };
  };

  footer?: {
    logoUrl?: string | null;
    logoAlt?: string | null;
    logoMimeType?: string | null;
    description?: string;
    email?: string;
    columns?: {
      title?: string;
      isVisible?: boolean;
      order?: number;
      links?: SiteNavLink[];
    }[];
    legalLinks?: SiteNavLink[];
    copyright?: string;
  };
};

function sortByOrder<T extends { order?: number }>(items?: T[] | null) {
  return [...(items ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
}

function cleanSettings(settings?: SiteSettings | null): SiteSettings {
  if (!settings) return {};

  const headerNavigation = sortByOrder(
    settings.header?.navigation?.filter((item) => item.isVisible !== false),
  ).map((item) => ({
    ...item,
    dropdownLayout: item.dropdownLayout ?? "list",
    items: sortByOrder(
      item.items?.filter((link) => link.isVisible !== false),
    ),
    columns: sortByOrder(
      item.columns?.filter((column) => column.isVisible !== false),
    ).map((column) => ({
      ...column,
      items: sortByOrder(
        column.items?.filter((link) => link.isVisible !== false),
      ),
    })),
  }));

  const footerColumns = sortByOrder(
    settings.footer?.columns?.filter((column) => column.isVisible !== false),
  ).map((column) => ({
    ...column,
    links: sortByOrder(
      column.links?.filter((link) => link.isVisible !== false),
    ),
  }));

  const legalLinks = sortByOrder(
    settings.footer?.legalLinks?.filter((link) => link.isVisible !== false),
  );

  return {
    header: settings.header
      ? {
          ...settings.header,
          navigation: headerNavigation,
          loginLink: settings.header.loginLink,
          cta: settings.header.cta,
        }
      : undefined,

    footer: settings.footer
      ? {
          ...settings.footer,
          columns: footerColumns,
          legalLinks,
        }
      : undefined,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client
    .withConfig({ useCdn: false })
    .fetch<SiteSettings | null>(
      `
      *[_type == "siteSettings"][0] {
        header {
          "logoUrl": logo.asset->url,
          "logoAlt": logo.alt,
          "logoMimeType": logo.asset->mimeType,

          navigation[] | order(coalesce(order, 0) asc) {
            label,
            type,
            dropdownLayout,
            href,
            isExternal,
            isVisible,
            "order": coalesce(order, 0),

            items[] | order(coalesce(order, 0) asc) {
              label,
              href,
              description,
              isExternal,
              isVisible,
              "order": coalesce(order, 0)
            },

            columns[] | order(coalesce(order, 0) asc) {
              title,
              description,
              isVisible,
              "order": coalesce(order, 0),

              items[] | order(coalesce(order, 0) asc) {
                label,
                href,
                description,
                isExternal,
                isVisible,
                "order": coalesce(order, 0)
              }
            }
          },

          loginLink {
            label,
            href,
            isVisible
          },

          cta {
            label,
            href,
            isVisible
          }
        },

        footer {
          "logoUrl": logo.asset->url,
          "logoAlt": logo.alt,
          "logoMimeType": logo.asset->mimeType,
          description,
          email,

          columns[] | order(coalesce(order, 0) asc) {
            title,
            isVisible,
            "order": coalesce(order, 0),

            links[] | order(coalesce(order, 0) asc) {
              label,
              href,
              isExternal,
              isVisible,
              "order": coalesce(order, 0)
            }
          },

          legalLinks[] | order(coalesce(order, 0) asc) {
            label,
            href,
            isVisible,
            "order": coalesce(order, 0)
          },

          copyright
        }
      }
    `,
      {},
      {
        cache: "no-store",
      },
    );

  return cleanSettings(settings);
}
