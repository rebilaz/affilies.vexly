"use client";

import React from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

import type { SiteSettings, SiteNavLink } from "@/sanity/lib/siteSettings";

type FooterProps = {
  year?: number;
  data?: SiteSettings["footer"];
};

function isExternalLink(href: string, isExternal?: boolean) {
  return Boolean(isExternal || href.startsWith("http"));
}

function FooterLink({
  link,
  className,
}: {
  link: SiteNavLink;
  className?: string;
}) {
  if (!link.href || !link.label) return null;

  if (isExternalLink(link.href, link.isExternal)) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

const Footer: React.FC<FooterProps> = ({ year, data }) => {
  if (!data) return null;

  const currentYear = year ?? new Date().getFullYear();

  const columns = data.columns ?? [];
  const legalLinks = data.legalLinks ?? [];

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <div className="space-y-5">
            {data.logoUrl ? (
              <Link href="/" className="inline-flex items-center gap-2">
                <img
                  src={data.logoUrl}
                  alt={data.logoAlt ?? ""}
                  className="h-7 w-auto"
                />
              </Link>
            ) : null}

            {data.description ? (
              <p className="max-w-sm text-sm leading-6 text-slate-400">
                {data.description}
              </p>
            ) : null}

            {data.email ? (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 text-sm transition hover:text-indigo-400"
              >
                <Mail size={16} /> {data.email}
              </a>
            ) : null}
          </div>

          {columns.map((column, columnIndex) => {
            const links = column.links ?? [];

            if (!column.title && !links.length) return null;

            return (
              <div key={`${column.title}-${columnIndex}`} className="space-y-4">
                {column.title ? (
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {column.title}
                  </h3>
                ) : null}

                {links.length ? (
                  <ul className="space-y-3 text-sm">
                    {links.map((link, linkIndex) => {
                      if (!link.label || !link.href) return null;

                      return (
                        <li key={`${link.label}-${link.href}-${linkIndex}`}>
                          <FooterLink
                            link={link}
                            className="transition hover:text-indigo-400"
                          />
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {data.copyright || legalLinks.length ? (
        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-6xl px-6 py-5">
            <div className="flex flex-col items-center gap-3 text-center text-xs text-slate-500 md:flex-row md:justify-between md:text-left">
              {data.copyright ? (
                <span>
                  © {currentYear} {data.copyright}
                </span>
              ) : null}

              {legalLinks.length ? (
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  {legalLinks.map((link, index) => {
                    if (!link.label || !link.href) return null;

                    return (
                      <FooterLink
                        key={`${link.label}-${link.href}-${index}`}
                        link={link}
                        className="transition hover:text-indigo-400"
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
};

export default Footer;