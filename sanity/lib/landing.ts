import { client } from "./client";
import { landingcontent as fallbackLandingContent } from "@/content/landing";

export type LandingPageContent = typeof fallbackLandingContent;

const landingPageQuery = /* groq */ `
  *[_type == "landingPage"][0]{
    seo,
    hero,
    projection,
    problems,
    features,
    method,
    faq,
    finalCta
  }
`;

export async function getLandingPage(): Promise<LandingPageContent> {
  const data = await client.fetch<LandingPageContent | null>(
    landingPageQuery,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return data ?? fallbackLandingContent;
}