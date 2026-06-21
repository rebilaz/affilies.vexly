import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

type SanityCategory = {
    _id: string
    title: string
    slug: string
    articles?: {
        _id: string
        title: string
        slug: string
        subtitle?: string
        description?: string
        date?: string
        coverImage?: any
    }[]
}

export async function getAllCategories() {
    return client.fetch(
        `
    *[_type == "category"] | order(title asc){
      _id,
      title,
      "slug": slug.current
    }
    `
    )
}

export async function getAllCategorySlugs(): Promise<string[]> {
    const slugs = await client.fetch<string[]>(
        `
    *[_type == "category" && defined(slug.current)][]{
      "slug": slug.current
    }[].slug
    `
    )

    return slugs ?? []
}

export async function getCategoryBySlug(slug: string) {
    const category = await client.fetch<SanityCategory | null>(
        `
    *[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      "articles": *[
        _type == "article" &&
        category._ref == ^._id
      ] | order(date desc){
        _id,
        title,
        "slug": slug.current,
        subtitle,
        description,
        date,
        coverImage
      }
    }
    `,
        { slug }
    )

    if (!category) return null

    return {
        ...category,
        articles: (category.articles ?? []).map((article) => ({
            ...article,
            coverImageUrl: article.coverImage ? urlFor(article.coverImage).url() : '',
        })),
    }
}