export default function ConditionsGenerales() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                <div className="mx-auto max-w-3xl px-6 py-16">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                        Conditions Générales d’Utilisation et de Vente
                    </h1>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                        Les présentes conditions encadrent l’utilisation du site VEXLY,
                        de la marketplace et des services proposés.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-3xl space-y-12 px-6 py-12 text-sm text-slate-600 leading-relaxed">

                {/* 1 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        1. Présentation
                    </h2>
                    <p className="mt-2">
                        Le site <strong>VEXLY</strong> propose :
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-6">
                        <li>un annuaire / marketplace de projets et SaaS</li>
                        <li>des services de conception et développement de SaaS</li>
                        <li>des contenus informatifs (articles, ressources)</li>
                    </ul>
                </section>

                <hr />

                {/* 2 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        2. Acceptation des conditions
                    </h2>
                    <p className="mt-2">
                        L’utilisation du site implique l’acceptation pleine et entière
                        des présentes CGU / CGV.
                    </p>
                </section>

                <hr />

                {/* 3 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        3. Accès au service
                    </h2>
                    <p className="mt-2">
                        Le site est accessible 24h/24, 7j/7 sauf interruption pour
                        maintenance ou force majeure.
                    </p>
                </section>

                <hr />

                {/* 4 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        4. Marketplace & contenus
                    </h2>
                    <p className="mt-2">
                        Les projets et SaaS présentés sur la marketplace sont fournis
                        à titre informatif.
                    </p>
                    <p className="mt-2">
                        VEXLY ne garantit pas la performance économique des projets listés.
                    </p>
                </section>

                <hr />

                {/* 5 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        5. Commandes et prestations
                    </h2>
                    <p className="mt-2">
                        Toute commande de prestation fait l’objet d’un accord explicite
                        (devis, formulaire ou validation écrite).
                    </p>
                    <p className="mt-2">
                        Les délais et livrables sont définis au cas par cas.
                    </p>
                </section>

                <hr />

                {/* 6 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        6. Prix et paiement
                    </h2>
                    <p className="mt-2">
                        Les prix sont indiqués en euros et hors taxes (HT), sauf mention contraire.
                    </p>
                    <p className="mt-2">
                        Le paiement est exigible avant le début de la prestation,
                        sauf accord spécifique.
                    </p>
                </section>

                <hr />

                {/* 7 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        7. Droit de rétractation
                    </h2>
                    <p className="mt-2">
                        Conformément à la loi, le droit de rétractation ne s’applique pas
                        aux prestations personnalisées commencées avec l’accord du client.
                    </p>
                </section>

                <hr />

                {/* 8 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        8. Responsabilité
                    </h2>
                    <p className="mt-2">
                        VEXLY ne pourra être tenu responsable des dommages indirects,
                        pertes financières ou pertes de données liées à l’utilisation du site.
                    </p>
                </section>

                <hr />

                {/* 9 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        9. Propriété intellectuelle
                    </h2>
                    <p className="mt-2">
                        Tous les contenus (textes, design, code, marque) sont la propriété
                        exclusive de VEXLY sauf mention contraire.
                    </p>
                </section>

                <hr />

                {/* 10 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        10. Données personnelles
                    </h2>
                    <p className="mt-2">
                        Les traitements de données sont détaillés dans notre{" "}
                        <a
                            href="/politique-de-confidentialite"
                            className="text-indigo-600 underline"
                        >
                            politique de confidentialité
                        </a>.
                    </p>
                </section>

                <hr />

                {/* 11 */}
                <section>
                    <h2 className="text-xl font-semibold text-slate-900">
                        11. Droit applicable
                    </h2>
                    <p className="mt-2">
                        Les présentes conditions sont régies par le droit français.
                    </p>
                </section>

                <p className="pt-8 text-right text-xs text-slate-400">
                    Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
                </p>
            </div>
        </div>
    );
}
