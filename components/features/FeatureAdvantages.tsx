import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Advantage = {
  title: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
};

type FeatureAdvantagesProps = {
  title?: string;
  description?: string;
  advantages?: Advantage[];
};

function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function SmartLink({
  href,
  isExternal,
  className,
  children,
}: {
  href: string;
  isExternal: boolean;
  className: string;
  children: ReactNode;
}) {
  if (isExternal) {
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

export function FeatureAdvantages({
  title = "Des fonctionnalités pensées pour propulser votre activité.",
  description = "Découvrez en détail les avantages clés de cette expertise et comment elle s’intègre à votre futur SaaS.",
  advantages,
}: FeatureAdvantagesProps) {
  const validAdvantages = (advantages ?? []).filter((advantage) =>
    advantage.title?.trim()
  );

  if (!validAdvantages.length) return null;

  return (
    <section
      id="vexly-avantages"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#061A33_0%,#0B1F3A_52%,#061A33_100%)] py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -left-28 bottom-[-18rem] h-[32rem] w-[32rem] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute right-16 top-20 hidden h-32 w-32 bg-[radial-gradient(circle,_rgba(199,210,254,0.45)_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-black leading-[1.03] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-16 flex flex-col gap-8 sm:mt-20 lg:mt-24 lg:gap-10">
          {validAdvantages.map((advantage, index) => {
            const imageUrl = advantage.image?.asset?.url;
            const hasImage = Boolean(imageUrl);
            const imageOnRight = index % 2 === 0;

            const linkHref = advantage.linkHref?.trim();
            const linkLabel = advantage.linkLabel?.trim() || "En savoir plus";
            const hasLink = Boolean(linkHref);
            const isExternal = linkHref ? isExternalUrl(linkHref) : false;

            const cardSideClass = imageOnRight
              ? "lg:w-[calc(100%+((100vw-100%)/2))] lg:-ml-[calc((100vw-100%)/2)]"
              : "lg:w-[calc(100%+((100vw-100%)/2))] lg:-mr-[calc((100vw-100%)/2)]";

            const edgeRadiusClass = imageOnRight
              ? "lg:[border-top-left-radius:0] lg:[border-bottom-left-radius:0]"
              : "lg:[border-top-right-radius:0] lg:[border-bottom-right-radius:0]";

            const linkElement =
              hasLink && linkHref ? (
                <div className="mt-8 flex justify-center">
                  <SmartLink
                    href={linkHref}
                    isExternal={isExternal}
                    className="group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-black text-white backdrop-blur transition duration-300 hover:border-indigo-300/50 hover:bg-white/[0.1] hover:text-indigo-100"
                  >
                    {linkLabel}
                    <span className="transition duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </SmartLink>
                </div>
              ) : null;

            const textBlock = (
              <div
                key="text"
                className={`relative flex flex-col justify-center overflow-hidden p-8 text-center sm:p-10 ${
                  hasImage
                    ? "min-h-[300px] md:min-h-[380px] lg:min-h-[430px] lg:p-14"
                    : "min-h-[340px] lg:p-20"
                }`}
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/35 to-transparent" />
                <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-indigo-400/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 left-10 size-72 rounded-full bg-violet-400/10 blur-3xl" />
                <div className="pointer-events-none absolute right-10 bottom-10 hidden h-28 w-28 bg-[radial-gradient(circle,_rgba(199,210,254,0.35)_1px,_transparent_1px)] [background-size:14px_14px] opacity-20 lg:block" />

                <div className="relative mx-auto flex max-w-4xl flex-col items-center">
                  <h3
                    className={
                      hasImage
                        ? "max-w-xl text-3xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl"
                        : "max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl"
                    }
                  >
                    {advantage.title}
                  </h3>

                  {advantage.description ? (
                    <p
                      className={
                        hasImage
                          ? "mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9"
                          : "mt-7 max-w-3xl text-lg leading-9 text-slate-300 sm:text-xl sm:leading-10"
                      }
                    >
                      {advantage.description}
                    </p>
                  ) : null}

                  {linkElement}
                </div>
              </div>
            );

            if (!hasImage) {
              return (
                <article
                  key={`${advantage.title}-${index}`}
                  className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_36px_110px_rgba(0,0,0,0.26)] ${cardSideClass} ${edgeRadiusClass}`}
                >
                  <div
                    className={`relative overflow-hidden rounded-[2.5rem] ${edgeRadiusClass}`}
                  >
                    {textBlock}
                  </div>
                </article>
              );
            }

            const imageBlock = (
              <div
                key="image"
                className={`relative min-h-[300px] overflow-hidden bg-[#10294A] md:min-h-[380px] lg:min-h-[430px] ${
                  imageOnRight
                    ? "md:border-l md:border-white/10"
                    : "md:border-r md:border-white/10"
                }`}
              >
                <Image
                  src={imageUrl!}
                  alt={advantage.image?.alt || advantage.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#061A33]/45 via-transparent to-indigo-500/20" />
              </div>
            );

            return (
              <article
                key={`${advantage.title}-${index}`}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_36px_110px_rgba(0,0,0,0.26)] ${cardSideClass} ${edgeRadiusClass}`}
              >
                <div
                  className={`relative grid overflow-hidden rounded-[2.5rem] md:grid-cols-2 ${edgeRadiusClass}`}
                >
                  {imageOnRight ? (
                    <>
                      {textBlock}
                      {imageBlock}
                    </>
                  ) : (
                    <>
                      {imageBlock}
                      {textBlock}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}