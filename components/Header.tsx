"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";

import type {
  SiteSettings,
  SiteNavItem,
  SiteNavLink,
  SiteNavColumn,
} from "@/sanity/lib/siteSettings";

type HeaderProps = {
  data?: SiteSettings["header"];
};

const CLOSE_DELAY_MS = 220;

function isExternalLink(href: string, isExternal?: boolean) {
  return Boolean(isExternal || href.startsWith("http"));
}

function getDropdownPanelWidth(columnCount: number) {
  if (columnCount >= 4) return "w-[1120px]";
  if (columnCount === 3) return "w-[900px]";
  if (columnCount === 2) return "w-[700px]";
  return "w-[390px]";
}

function getDropdownGridClass(columnCount: number) {
  if (columnCount >= 4) return "grid-cols-4";
  if (columnCount === 3) return "grid-cols-3";
  if (columnCount === 2) return "grid-cols-2";
  return "grid-cols-1";
}

function SmartLink({
  href,
  isExternal,
  className,
  children,
  onClick,
}: {
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (!href) return null;

  if (isExternalLink(href, isExternal)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function HeaderLogo({
  logoUrl,
  logoAlt,
  onClick,
}: {
  logoUrl?: string | null;
  logoAlt?: string | null;
  onClick?: () => void;
}) {
  if (!logoUrl) return null;

  return (
    <Link href="/" className="flex shrink-0 items-center" onClick={onClick}>
      <img
        src={logoUrl}
        alt={logoAlt ?? ""}
        width={150}
        height={40}
        className="block h-8 w-auto max-w-[150px] object-contain md:h-9"
        decoding="async"
      />
    </Link>
  );
}

function ChevronIcon({ isOpen = false }: { isOpen?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={[
        "transition-transform duration-200",
        isOpen ? "rotate-180" : "",
      ].join(" ")}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header({ data }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeTimer = useRef<number | null>(null);

  if (!data) return null;

  const navigation = data.navigation ?? [];
  const loginLink = data.loginLink;
  const cta = data.cta;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = (index: number) => {
    clearCloseTimer();
    setOpenMenu(index);
  };

  const scheduleClose = (index: number) => {
    clearCloseTimer();

    closeTimer.current = window.setTimeout(() => {
      setOpenMenu((cur) => (cur === index ? null : cur));
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  };

  const forceClose = () => {
    clearCloseTimer();
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const renderDropdownLink = (
    link: SiteNavLink,
    linkIndex: number,
    keyPrefix: string,
  ) => {
    if (!link.label || !link.href) return null;

    return (
      <SmartLink
        key={`${keyPrefix}-${link.label}-${link.href}-${linkIndex}`}
        href={link.href}
        isExternal={link.isExternal}
        onClick={forceClose}
        className="group block rounded-2xl px-4 py-3.5 transition-all duration-200 hover:translate-x-1 hover:bg-slate-50"
      >
        <div className="text-[16px] font-semibold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-slate-950">
          {link.label}
        </div>

        {link.description ? (
          <div className="mt-1.5 text-[13px] leading-relaxed text-slate-500 transition-colors duration-200 group-hover:text-slate-600">
            {link.description}
          </div>
        ) : null}
      </SmartLink>
    );
  };

  const renderDesktopDropdown = (item: SiteNavItem, index: number) => {
    const links = item.items ?? [];
    const columns = item.columns ?? [];
    const usesColumns =
      item.dropdownLayout === "columns" && columns.length > 0;

    if (!item.label) return null;
    if (!usesColumns && !links.length) return null;

    const isOpen = openMenu === index;
    const columnCount = Math.min(Math.max(columns.length, 1), 4);

    return (
      <div key={`${item.label}-${index}`} className="relative inline-flex">
        <button
          type="button"
          onMouseEnter={() => open(index)}
          onMouseLeave={() => scheduleClose(index)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-950"
        >
          {item.label}
          <span className="text-slate-400">
            <ChevronIcon isOpen={isOpen} />
          </span>
        </button>

        <div
          className={[
            "absolute top-full z-50 pt-4",
            usesColumns ? "left-1/2 -translate-x-1/2" : "left-0",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={() => scheduleClose(index)}
        >
          <div
            className={[
              "relative max-w-[calc(100vw-2rem)] origin-top rounded-3xl border border-slate-200/80 bg-white/95 p-6 backdrop-blur-md",
              usesColumns
                ? getDropdownPanelWidth(columnCount)
                : "w-[390px] origin-top-left",
              "shadow-[0_24px_70px_rgba(15,23,42,0.14)]",
              "transition-all duration-300 ease-out",
              isOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-1 scale-[0.98] opacity-0",
            ].join(" ")}
          >
            <div className="absolute -top-4 left-0 h-4 w-full" />

            {usesColumns ? (
              <div
                className={[
                  "grid gap-7 divide-x divide-slate-100",
                  getDropdownGridClass(columnCount),
                ].join(" ")}
              >
                {columns.map((column: SiteNavColumn, columnIndex: number) => {
                  const columnLinks = column.items ?? [];

                  return (
                    <div
                      key={`${column.title ?? "column"}-${columnIndex}`}
                      className={columnIndex === 0 ? "pr-3" : "pl-7 pr-3"}
                    >
                      {column.title ? (
                        <p className="px-4 text-xs font-black uppercase tracking-[0.16em] text-indigo-600">
                          {column.title}
                        </p>
                      ) : null}

                      {column.description ? (
                        <p className="mt-2 px-4 text-xs leading-5 text-slate-500">
                          {column.description}
                        </p>
                      ) : null}

                      <div className="mt-3 space-y-2">
                        {columnLinks.map((link, linkIndex) =>
                          renderDropdownLink(
                            link,
                            linkIndex,
                            `${item.label}-${columnIndex}`,
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {links.map((link, linkIndex) =>
                  renderDropdownLink(link, linkIndex, item.label ?? "menu"),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopLink = (item: SiteNavItem, index: number) => {
    if (!item.label || !item.href) return null;

    return (
      <SmartLink
        key={`${item.label}-${index}`}
        href={item.href}
        isExternal={item.isExternal}
        onClick={forceClose}
        className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-950"
      >
        {item.label}
      </SmartLink>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <HeaderLogo
            logoUrl={data.logoUrl}
            logoAlt={data.logoAlt}
            onClick={forceClose}
          />

          {navigation.length ? (
            <nav className="hidden items-center gap-3 md:flex">
              {navigation.map((item, index) =>
                item.type === "dropdown"
                  ? renderDesktopDropdown(item, index)
                  : renderDesktopLink(item, index),
              )}
            </nav>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-200 hover:bg-slate-50 md:hidden"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {loginLink?.isVisible !== false &&
            loginLink?.href &&
            loginLink?.label ? (
              <SmartLink
                href={loginLink.href}
                onClick={forceClose}
                className="hidden rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-950 md:inline-block"
              >
                {loginLink.label}
              </SmartLink>
            ) : null}

            {cta?.isVisible !== false && cta?.href && cta?.label ? (
              <SmartLink
                href={cta.href}
                onClick={forceClose}
                className="group hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(88,80,236,0.22)] transition duration-200 hover:brightness-110 hover:shadow-[0_10px_28px_rgba(88,80,236,0.28)] active:scale-[0.97] md:inline-flex"
              >
                <span className="flex items-center gap-2">
                  {cta.label}
                  <ArrowRightIcon />
                </span>
              </SmartLink>
            ) : null}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          <button
            aria-label="Fermer le menu"
            onClick={forceClose}
            className="absolute inset-0 bg-slate-950/25 backdrop-blur-sm"
          />

          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <HeaderLogo
                logoUrl={data.logoUrl}
                logoAlt={data.logoAlt}
                onClick={forceClose}
              />

              <button
                type="button"
                onClick={forceClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition duration-200 hover:bg-slate-50 hover:text-slate-950"
                aria-label="Fermer"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 py-8">
              {navigation.length ? (
                <div className="flex flex-col gap-4">
                  {navigation.map((item, index) => {
                    if (!item.label) return null;

                    if (item.type === "dropdown") {
                      const links = item.items ?? [];
                      const columns = item.columns ?? [];
                      const usesColumns =
                        item.dropdownLayout === "columns" &&
                        columns.length > 0;

                      if (!usesColumns && !links.length) return null;

                      return (
                        <details
                          key={`${item.label}-${index}`}
                          className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-slate-950">
                            {item.label}
                            <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                              <ChevronIcon />
                            </span>
                          </summary>

                          {usesColumns ? (
                            <div className="mt-5 space-y-6">
                              {columns.map((column, columnIndex) => (
                                <div
                                  key={`${column.title ?? "column"}-${columnIndex}`}
                                >
                                  {column.title ? (
                                    <p className="px-2 text-[11px] font-black uppercase tracking-[0.16em] text-indigo-600">
                                      {column.title}
                                    </p>
                                  ) : null}

                                  {column.description ? (
                                    <p className="mt-1.5 px-2 text-xs leading-5 text-slate-500">
                                      {column.description}
                                    </p>
                                  ) : null}

                                  <div className="mt-2 flex flex-col gap-2">
                                    {(column.items ?? []).map(
                                      (link, linkIndex) => {
                                        if (!link.label || !link.href) {
                                          return null;
                                        }

                                        return (
                                          <SmartLink
                                            key={`${link.label}-${link.href}-${linkIndex}`}
                                            href={link.href}
                                            isExternal={link.isExternal}
                                            onClick={forceClose}
                                            className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:text-slate-950 hover:shadow-sm"
                                          >
                                            <span className="block">
                                              {link.label}
                                            </span>

                                            {link.description ? (
                                              <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">
                                                {link.description}
                                              </span>
                                            ) : null}
                                          </SmartLink>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-4 flex flex-col gap-2">
                              {links.map((link, linkIndex) => {
                                if (!link.label || !link.href) return null;

                                return (
                                  <SmartLink
                                    key={`${link.label}-${link.href}-${linkIndex}`}
                                    href={link.href}
                                    isExternal={link.isExternal}
                                    onClick={forceClose}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:text-slate-950 hover:shadow-sm"
                                  >
                                    {link.label}
                                  </SmartLink>
                                );
                              })}
                            </div>
                          )}
                        </details>
                      );
                    }

                    if (!item.href) return null;

                    return (
                      <SmartLink
                        key={`${item.label}-${index}`}
                        href={item.href}
                        isExternal={item.isExternal}
                        onClick={forceClose}
                        className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 text-base font-semibold text-slate-950 transition-all duration-200 hover:bg-white hover:shadow-sm"
                      >
                        {item.label}
                      </SmartLink>
                    );
                  })}

                  {loginLink?.isVisible !== false &&
                  loginLink?.href &&
                  loginLink?.label ? (
                    <SmartLink
                      href={loginLink.href}
                      onClick={forceClose}
                      className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 text-base font-semibold text-slate-950 transition-all duration-200 hover:bg-white hover:shadow-sm"
                    >
                      {loginLink.label}
                    </SmartLink>
                  ) : null}
                </div>
              ) : null}

              {cta?.isVisible !== false && cta?.href && cta?.label ? (
                <div className="mt-10">
                  <SmartLink
                    href={cta.href}
                    onClick={forceClose}
                    className="group block w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3.5 text-center text-sm font-bold text-white shadow-[0_8px_22px_rgba(88,80,236,0.24)] transition duration-200 hover:brightness-110 active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {cta.label}
                      <ArrowRightIcon />
                    </span>
                  </SmartLink>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
