import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getHomeSolutions } from "@/sanity/lib/features";

export default async function FeaturesSection() {
  const expertises = await getHomeSolutions();

  if (!expertises?.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#F8FAFC] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-indigo-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-28 bottom-[-18rem] h-[32rem] w-[32rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-16 top-28 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div className="border-b border-slate-200 pb-12">
          <h2 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            Des expertises pensées pour lancer votre SaaS plus vite
          </h2>
        </div>

        <div className="divide-y divide-slate-200">
          {expertises.map((expertise, index) => (
            <Link
              key={expertise._id}
              href={expertise.href}
              className="group grid gap-6 py-12 transition duration-300 hover:bg-white/60 sm:grid-cols-[120px_1fr_auto] sm:px-4 lg:grid-cols-[140px_1fr_auto]"
            >
              <div className="flex items-start">
                <span className="text-6xl font-black leading-none tracking-[-0.08em] text-slate-200 transition duration-300 group-hover:text-indigo-200 sm:text-7xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="max-w-4xl">
                <h3 className="text-3xl font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {expertise.navLabel || expertise.title}
                </h3>

                {expertise.description ? (
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                    {expertise.description}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center sm:justify-end">
                <span className="flex size-14 items-center justify-center rounded-full bg-[#061A33] text-white shadow-[0_14px_35px_rgba(15,23,42,0.16)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-indigo-600 group-hover:shadow-[0_18px_45px_rgba(79,70,229,0.24)]">
                  <ArrowRight className="size-5 -rotate-45 transition duration-300 group-hover:rotate-0" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}