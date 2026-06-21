import { client } from "@/sanity/lib/client";

export type SanityTool = {
  _id: string;
  title: string;
  slug: string;
  provider?: string;
  externalEmbedUrl?: string;
  height?: number;
  intro?: string;
  outro?: string;
};

const toolFields = `
  _id,
  title,
  "slug": slug.current,
  provider,
  externalEmbedUrl,
  height,
  intro,
  outro
`;

export async function getToolBySlug(slug: string): Promise<SanityTool | null> {
  const tool = await client.fetch<SanityTool | null>(
    `
    *[
      _type == "tool" &&
      defined(slug.current) &&
      slug.current == $slug
    ][0] {
      ${toolFields}
    }
    `,
    { slug }
  );

  return tool;
}