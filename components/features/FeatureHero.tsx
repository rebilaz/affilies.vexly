import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroMedia = {
  type?: "youtube" | "video" | "image";
  youtubeUrl?: string;
  videoFile?: {
    asset?: {
      url?: string;
      mimeType?: string;
      originalFilename?: string;
    };
  };
  imageFile?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
};

type FeaturesSectionData = {
  title: string;
  slug?: string;
  description?: string;
  heroMedia?: HeroMedia;
  youtubeUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  landingLabel?: string;
  landingHref?: string;
};

type FeatureHeroProps = {
  data: FeaturesSectionData;
};

function getYoutubeEmbedUrl(url?: string) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "").split("?")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      if (parsedUrl.pathname.includes("/embed/")) {
        return url;
      }

      if (parsedUrl.pathname.includes("/shorts/")) {
        const shortsId = parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0];

        return shortsId ? `https://www.youtube.com/embed/${shortsId}` : null;
      }

      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function hasHeroMedia(data: FeaturesSectionData) {
  const media = data.heroMedia;

  if (media?.type === "image" && media.imageFile?.asset?.url) return true;
  if (media?.type === "video" && media.videoFile?.asset?.url) return true;
  if (media?.type === "youtube" && getYoutubeEmbedUrl(media.youtubeUrl)) {
    return true;
  }

  if (getYoutubeEmbedUrl(data.youtubeUrl)) return true;

  return false;
}

function isExternalLink(href?: string) {
  return href?.startsWith("http");
}

const primaryButtonClassName =
  "group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(88,80,236,0.40)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_22px_55px_rgba(88,80,236,0.50)] active:scale-[0.97]";

const textLinkClassName =
  "group inline-flex items-center gap-2 text-sm font-black text-slate-900 transition duration-300 hover:text-indigo-600";

function SmartButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function HeroMediaRenderer({
  media,
  title,
  legacyYoutubeUrl,
}: {
  media?: HeroMedia;
  title: string;
  legacyYoutubeUrl?: string;
}) {
  const youtubeUrl =
    media?.type === "youtube" ? media.youtubeUrl : legacyYoutubeUrl;

  const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

  if (media?.type === "image" && media.imageFile?.asset?.url) {
    return (
      <div className="relative">
        <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-200/70 via-white to-cyan-200/70 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
          <img
            src={media.imageFile.asset.url}
            alt={media.imageFile.alt || title}
            className="aspect-video w-full rounded-[1.6rem] object-cover"
          />
        </div>
      </div>
    );
  }

  if (media?.type === "video" && media.videoFile?.asset?.url) {
    return (
      <div className="relative">
        <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-200/70 via-white to-cyan-200/70 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
          <video
            src={media.videoFile.asset.url}
            controls
            playsInline
            className="aspect-video w-full rounded-[1.6rem] object-cover"
          />
        </div>
      </div>
    );
  }

  if (embedUrl) {
    return (
      <div className="relative">
        <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-200/70 via-white to-cyan-200/70 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
          <iframe
            src={embedUrl}
            title={title}
            className="aspect-video w-full rounded-[1.6rem]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return null;
}

export function FeatureHero({ data }: FeatureHeroProps) {
  const shouldRenderMedia = hasHeroMedia(data);

  const ctaLabel = data.ctaLabel || "Créer ma plateforme";
  const ctaHref = data.ctaHref || "/contact";

  const landingLabel = data.landingLabel || "Découvrir Vexly";
  const landingHref = data.landingHref || "/";

  return (
    <section
      id={data.slug}
      className="relative isolate overflow-hidden bg-[#F8FAFC] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-28 bottom-[-18rem] h-[32rem] w-[32rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-16 bottom-[-14rem] h-[26rem] w-[26rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-bl-[7rem] bg-indigo-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-16 top-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div
          className={
            shouldRenderMedia
              ? "grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
              : "grid items-center gap-14 lg:gap-16"
          }
        >
          <div className="relative z-10">
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 shadow-sm backdrop-blur">
              Expertise Vexly
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
              {data.title}
            </h1>

            <div className="mt-8 h-1 w-20 rounded-full bg-indigo-600" />

            {data.description ? (
              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {data.description}
              </p>
            ) : null}

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <SmartButton href={ctaHref} className={primaryButtonClassName}>
                {ctaLabel}
                <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-1" />
              </SmartButton>

              <SmartButton href={landingHref} className={textLinkClassName}>
                {landingLabel}
                <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-1" />
              </SmartButton>
            </div>
          </div>

          {shouldRenderMedia ? (
            <div className="relative z-10">
              <HeroMediaRenderer
                media={data.heroMedia}
                title={data.title}
                legacyYoutubeUrl={data.youtubeUrl}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}