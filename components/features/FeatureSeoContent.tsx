type FeatureSeoContentProps = {
    data?: {
        title?: string;
        paragraphs?: string[];
        items?: {
            title?: string;
        }[];
    };
};

export function FeatureSeoContent({ data }: FeatureSeoContentProps) {
    const paragraphs = data?.paragraphs || [];
    const items = data?.items || [];

    if (!data?.title && paragraphs.length === 0 && items.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
            <div className="border-t border-slate-200 pt-16 sm:pt-24">
                <div className="mx-auto max-w-4xl text-center">
                    {data?.title && (
                        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            {data.title}
                        </h2>
                    )}

                    {paragraphs.length > 0 && (
                        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-slate-600">
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
                        {items.map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border-2 border-slate-200/80 bg-white p-6 text-center shadow-sm transition hover:border-indigo-200 hover:shadow-md duration-300"
                            >
                                <div
                                    className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
                                />

                                <p className="text-sm font-semibold text-slate-800">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}