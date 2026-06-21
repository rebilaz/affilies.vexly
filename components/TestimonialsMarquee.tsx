import Image from "next/image";
import {
  getPricingPage,
  type PricingPageTestimonials,
} from "@/sanity/lib/pricingPage";

type Review = {
  name?: string;
  role?: string;
  text?: string;
  stars?: number;
  image?: string;
};

type TestimonialsMarqueeProps = {
  content?: PricingPageTestimonials;
};

const fallbackTestimonials: PricingPageTestimonials = {
  eyebrow: "Avis clients",
  title: "Ils ont transformé leur audience en plateforme rentable",
  items: [
    {
      name: "Thomas",
      role: "Créateur business",
      stars: 5,
      text: "Je savais que mon audience avait du potentiel, mais je ne savais pas comment en faire un vrai produit. Vexly m’a aidé à transformer mon idée en plateforme claire, propre et prête à vendre. Le plus rassurant, c’est que je n’ai pas eu à gérer la partie technique.",
    },
    {
      name: "Lina",
      role: "Créatrice formation",
      stars: 5,
      text: "J’avais déjà une communauté engagée, mais mes revenus dépendaient trop des lancements et des partenariats. Avec ma plateforme d’abonnement, j’ai enfin une offre récurrente que je peux améliorer chaque mois.",
    },
    {
      name: "Mehdi",
      role: "Coach en ligne",
      stars: 5,
      text: "Ce que j’ai apprécié, c’est qu’on ne m’a pas juste développé un outil. On m’a aidé à structurer une vraie offre autour de mon audience. En quelques semaines, j’avais une plateforme professionnelle avec paiement, espace membre et un parcours utilisateur propre.",
    },
    {
      name: "Clara",
      role: "Créatrice contenu fitness",
      stars: 5,
      text: "Je pensais qu’un SaaS était réservé aux grosses startups. Vexly m’a montré qu’on pouvait lancer une première version simple, rentable et adaptée à ma communauté. Aujourd’hui, j’ai un actif qui m’appartient vraiment.",
    },
  ],
};

function getInitials(name?: string) {
  if (!name) return "";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }: { review: Review }) {
  const stars = Math.min(Math.max(review.stars ?? 5, 1), 5);

  return (
    <div className="w-full max-w-[350px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-1 text-indigo-500">
        {[...Array(stars)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {review.text && (
        <p className="mt-4 text-sm leading-6 text-slate-700">
          “{review.text}”
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        {review.image ? (
          <Image
            src={review.image}
            alt={review.name ?? ""}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
            {getInitials(review.name)}
          </div>
        )}

        <div>
          {review.name && (
            <p className="text-sm font-bold text-slate-950">{review.name}</p>
          )}

          {review.role && (
            <p className="text-xs font-medium text-slate-500">{review.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function TestimonialsMarquee({
  content,
}: TestimonialsMarqueeProps) {
  const pricingPage = content ? null : await getPricingPage();

  const testimonials =
    content ??
    (pricingPage?.testimonials?.items?.length
      ? pricingPage.testimonials
      : null) ??
    fallbackTestimonials;

  const reviews = (testimonials?.items ?? []).filter(
    (review) => review.name || review.text || review.role
  );

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] px-6 py-20 sm:py-24 lg:px-8">
      {(testimonials?.eyebrow || testimonials?.title) && (
        <div className="mx-auto mb-12 max-w-6xl text-center">
          {testimonials?.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              {testimonials.eyebrow}
            </p>
          )}

          {testimonials?.title && (
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {testimonials.title}
            </h2>
          )}
        </div>
      )}

      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
        {reviews.map((review, idx) => (
          <ReviewCard key={`${review.name}-${idx}`} review={review} />
        ))}
      </div>
    </section>
  );
}