"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import type { SiteSettings } from "@/sanity/lib/siteSettings";

type LayoutChromeProps = {
  children: React.ReactNode;
  siteSettings?: SiteSettings;
};

export default function LayoutChrome({
  children,
  siteSettings,
}: LayoutChromeProps) {
  const pathname = usePathname();

  const isMindmap = pathname?.startsWith("/saas/seo-mindmap");
  const isStudio = pathname?.startsWith("/studio");
  const isEmbed = pathname?.startsWith("/embed");

  React.useEffect(() => {
    if (!isMindmap) return;

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [isMindmap]);

  if (isStudio || isEmbed) {
    return <>{children}</>;
  }

  if (isMindmap) {
    return (
      <div className="h-[100dvh] w-[100vw] overflow-hidden bg-slate-50">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header data={siteSettings?.header} />
      <main className="flex-1">{children}</main>
      <Footer data={siteSettings?.footer} />
    </div>
  );
}