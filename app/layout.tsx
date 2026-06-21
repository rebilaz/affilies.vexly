// app/layout.tsx

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import LayoutChrome from "@/components/LayoutChrome";
import { getSiteSettings } from "@/sanity/lib/siteSettings";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vexly.fr"),
  title: "Vexly — Création de SaaS pour créateurs",
  description:
    "Vexly accompagne les créateurs dans la création de SaaS, outils IA et plateformes propriétaires pour générer des revenus récurrents.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="fr">
      <body
        className={`${GeistSans.variable} min-h-screen bg-white font-sans text-slate-900`}
      >
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KN4N4JCC');
          `}
        </Script>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KN4N4JCC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <LayoutChrome siteSettings={siteSettings}>
          {children}
        </LayoutChrome>
      </body>
    </html>
  );
}