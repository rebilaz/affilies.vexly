import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { ArticleToolEmbed } from "./ArticleToolEmbed";

export function ArticlePortableContent({ content }: { content: any[] }) {
  return (
    <section className="max-w-3xl">
      <PortableText
        value={content}
        components={{
          block: {
            h1: ({ children }) => (
              <h1 className="mb-6 text-3xl font-bold text-slate-900">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="mb-4 mt-10 text-2xl sm:text-3xl font-bold text-slate-900">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="mb-3 mt-8 text-xl font-semibold text-slate-900">
                {children}
              </h3>
            ),

            h4: ({ children }) => (
              <h4 className="mb-2 mt-6 text-lg font-semibold text-slate-900">
                {children}
              </h4>
            ),

            normal: ({ children }) => (
              <p className="mb-4 text-[15px] leading-relaxed text-slate-700">
                {children}
              </p>
            ),

            blockquote: ({ children }) => (
              <blockquote className="mb-6 border-l-4 border-slate-300 pl-4 italic text-slate-700">
                {children}
              </blockquote>
            ),
          },

          list: {
            bullet: ({ children }) => (
              <ul className="mb-4 ml-5 list-disc space-y-1 text-[15px] text-slate-700">
                {children}
              </ul>
            ),

            number: ({ children }) => (
              <ol className="mb-4 ml-5 list-decimal space-y-1 text-[15px] text-slate-700">
                {children}
              </ol>
            ),
          },

          listItem: {
            bullet: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),

            number: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
          },

          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold text-slate-900">
                {children}
              </strong>
            ),

            em: ({ children }) => <em>{children}</em>,

            link: ({ children, value }) => {
              const href = value?.href || "#";
              const isInternal = href.startsWith("/");

              if (isInternal) {
                return (
                  <Link
                    href={href}
                    className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                  >
                    {children}
                  </Link>
                );
              }

              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  {children}
                </a>
              );
            },
          },

          types: {
            image: ({ value }) => {
              const src = urlFor(value)?.width(1400).url();

              if (!src) return null;

              return (
                <div className="my-8 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100/60">
                  <Image
                    src={src}
                    alt={value?.alt || ""}
                    width={1400}
                    height={900}
                    className="h-auto w-full object-cover"
                  />

                  {value?.caption ? (
                    <p className="px-4 py-3 text-sm text-slate-500">
                      {value.caption}
                    </p>
                  ) : null}
                </div>
              );
            },

            toolEmbed: ({ value }) => {
              return <ArticleToolEmbed value={value} />;
            },
          },
        }}
      />
    </section>
  );
}