import type { Metadata } from "next";
import RessourcesClient from "@/components/ressources/RessourcesClient";

export const metadata: Metadata = {
  title: "Ressources – Vexly",
  description: "Articles et parcours guidés pour construire et monétiser ton projet SaaS.",
  alternates: { canonical: "/ressources" },
};

export default async function RessourcesPage() {
  return <RessourcesClient />;
}
