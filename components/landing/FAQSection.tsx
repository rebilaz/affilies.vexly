type FaqItem = {
    q: string;
    a: string;
};

type FAQSectionProps = {
    title: string;
    items: readonly FaqItem[];
};

export default function FAQSection({ title, items }: FAQSectionProps) {
    return (
        <section className="mx-auto max-w-4xl">
            <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    {title}
                </h2>
            </div>

            <div className="mt-12 space-y-4">
                {items.map((item) => (
                    <details
                        key={item.q}
                        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <summary className="cursor-pointer list-none text-left text-lg font-semibold text-slate-900">
                            <div className="flex items-center justify-between gap-4">
                                <span>{item.q}</span>
                                <span className="text-slate-400 transition group-open:rotate-45">
                                    +
                                </span>
                            </div>
                        </summary>

                        <p className="mt-4 text-sm leading-relaxed text-slate-600">
                            {item.a}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}