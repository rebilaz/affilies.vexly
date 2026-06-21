export default function MentionsLegales() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                <div className="mx-auto max-w-3xl px-6 py-16">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                        Mentions légales
                    </h1>
                    <p className="mt-4 text-sm text-slate-600 max-w-xl">
                        Informations légales concernant l’éditeur et l’hébergement du site VEXLY,
                        conformément à la loi française.
                    </p>
                </div>
            </div>

            {/* Contenu */}
            <div className="mx-auto max-w-3xl px-6 py-12 space-y-12">

                {/* ÉDITEUR */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        1. Éditeur du site
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        <strong>Nom du site :</strong> VEXLY<br />
                        <strong>Éditeur :</strong> VEXLY<br />
                        <strong>Statut :</strong> Éditeur de services numériques / SaaS<br />
                        <strong>Email :</strong>{" "}
                        <a
                            href="mailto:contact@vexly.fr"
                            className="text-indigo-600 underline"
                        >
                            contact@vexly.fr
                        </a>
                    </p>
                </section>

                <hr className="border-slate-200" />

                {/* RESPONSABLE DE PUBLICATION */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        2. Directeur de la publication
                    </h2>
                    <p className="mt-3 text-sm text-slate-600">
                        Le directeur de la publication est le responsable de VEXLY.
                    </p>
                </section>

                <hr className="border-slate-200" />

                {/* HÉBERGEMENT */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        3. Hébergement
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        Le site est hébergé par :<br />
                        <strong>Vercel Inc.</strong><br />
                        440 N Barranca Ave #4133<br />
                        Covina, CA 91723<br />
                        États-Unis<br />
                        <a
                            href="https://vercel.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 underline"
                        >
                            https://vercel.com
                        </a>
                    </p>
                </section>

                <hr className="border-slate-200" />

                {/* PROPRIÉTÉ INTELLECTUELLE */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        4. Propriété intellectuelle
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        L’ensemble du contenu présent sur le site VEXLY (textes, images,
                        graphismes, logo, structure, code) est protégé par le droit d’auteur.
                        <br /><br />
                        Toute reproduction, représentation, modification ou exploitation,
                        totale ou partielle, sans autorisation préalable est strictement interdite.
                    </p>
                </section>

                <hr className="border-slate-200" />

                {/* RESPONSABILITÉ */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        5. Responsabilité
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        VEXLY s’efforce de fournir des informations fiables et à jour.
                        Toutefois, aucune garantie n’est donnée quant à l’exactitude ou
                        l’exhaustivité des contenus.
                        <br /><br />
                        L’éditeur ne saurait être tenu responsable des dommages directs ou
                        indirects résultant de l’utilisation du site.
                    </p>
                </section>

                <hr className="border-slate-200" />

                {/* DONNÉES PERSONNELLES */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        6. Données personnelles
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        Le traitement des données personnelles est détaillé dans la{" "}
                        <a
                            href="/politique-de-confidentialite"
                            className="text-indigo-600 underline"
                        >
                            politique de confidentialité
                        </a>.
                    </p>
                </section>

                <hr className="border-slate-200" />

                {/* DROIT APPLICABLE */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        7. Droit applicable
                    </h2>
                    <p className="mt-3 text-sm text-slate-600">
                        Le présent site est soumis au droit français.
                    </p>
                </section>

                <p className="pt-8 text-xs text-slate-400 text-right">
                    Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
                </p>
            </div>
        </div>
    );
}
