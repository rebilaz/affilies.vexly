import type { Metadata } from "next";
import LandingLayout from "@/components/landing/LandingLayout";
import { getLandingPage } from "@/sanity/lib/landing";

export async function generateMetadata(): Promise<Metadata> {
  const landingcontent = await getLandingPage();

  return {
    title: landingcontent.seo.title,
    description: landingcontent.seo.description,
    alternates: {
      canonical: "/",
    },
  };
}

export default async function LandingPage() {
  const landingcontent = await getLandingPage();

  return (
    <main>
      <LandingLayout landingcontent={landingcontent} />
    </main>
  );
}