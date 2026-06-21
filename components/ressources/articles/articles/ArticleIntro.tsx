import React from "react";
import Image from "next/image";
import { Calendar, Clock, Tag } from "lucide-react";

type ArticleIntroProps = {
  title: string;
  subtitle?: string;
  date?: string;
  readingTime?: string;
  tags: string[];
  coverImageUrl?: string;
  coverFocus?: string;
  fit?: "cover" | "contain";
};

export const ArticleIntro: React.FC<ArticleIntroProps> = ({
  title,
  subtitle,
  date,
  readingTime,
  tags,
  coverImageUrl,
  coverFocus = "50% 50%",
  fit = "cover",
}) => {
  const isContain = fit === "contain";

  return (
    <section className="mb-12 space-y-6">
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Article
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle ? (
          <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
            {subtitle}
          </p>
        ) : null}
      </div>


      {coverImageUrl ? (
        <div className="relative mt-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100/60 h-[220px] sm:h-[280px] lg:h-[320px]">
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            priority
            className={isContain ? "object-contain" : "object-cover"}
            style={{
              objectPosition: coverFocus,
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
          />
        </div>
      ) : null}
    </section>
  );
};