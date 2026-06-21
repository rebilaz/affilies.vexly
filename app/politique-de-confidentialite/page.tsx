export default function PolitiqueConfidentialite() {
  return (
    <div className="bg-white">
      {/* Header simple */}
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-xl">
            Cette page explique comment VEXLY collecte, utilise et protège vos données personnelles.
            Nous respectons le RGPD et nous ne revendons jamais vos données.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-12">

        {/* SECTION */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Responsable du traitement</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Le responsable du traitement des données personnelles est :
            <br /><strong>VEXLY</strong>
            <br />Email : <a href="mailto:contact@vexly.fr" className="text-indigo-600 underline">contact@vexly.fr</a>
          </p>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Données collectées</h2>
          <p className="mt-2 text-sm text-slate-600">Nous collectons uniquement les données nécessaires :</p>

          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>Email (newsletter, contact)</li>
            <li>Nom et informations envoyées via nos formulaires</li>
            <li>Données techniques (cookies, analytics anonymisés)</li>
            <li>Données de facturation si vous devenez client</li>
          </ul>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Utilisation des données</h2>
          <p className="mt-2 text-sm text-slate-600">
            Vos données servent exclusivement à :
          </p>

          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>Répondre à vos demandes</li>
            <li>Envoyer la newsletter (si inscrit)</li>
            <li>Gérer nos prestations (création de SaaS clé en main)</li>
            <li>Analyser le trafic du site</li>
            <li>Réaliser la facturation</li>
          </ul>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Base légale</h2>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>Consentement : newsletter, formulaires</li>
            <li>Contrat : prestations et projets clients</li>
            <li>Intérêt légitime : amélioration du site</li>
            <li>Obligation légale : facturation</li>
          </ul>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Partage des données</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Vos données ne sont <strong>jamais vendues</strong>.
            Elles sont uniquement partagées avec des prestataires :
          </p>

          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>Outils emailing</li>
            <li>Solutions de paiement</li>
            <li>Hébergement & sécurité</li>
          </ul>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Durée de conservation</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            <strong>Newsletter :</strong> jusqu'à désinscription <br />
            <strong>Données clients :</strong> 5 ans <br />
            <strong>Cookies :</strong> selon votre navigateur
          </p>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Vos droits</h2>
          <p className="mt-2 text-sm text-slate-600">Vous pouvez :</p>

          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>Accéder à vos données</li>
            <li>Demander la modification ou suppression</li>
            <li>Retirer votre consentement</li>
            <li>Demander la portabilité</li>
            <li>Limiter ou vous opposer au traitement</li>
          </ul>

          <p className="mt-3 text-sm text-slate-600">
            Pour exercer vos droits :{" "}
            <a href="mailto:contact@vexly.fr" className="text-indigo-600 underline">
              contact@vexly.fr
            </a>
          </p>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">8. Cookies</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Nous utilisons des cookies strictement nécessaires et des statistiques anonymisées.
          </p>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">9. Sécurité</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Nous mettons en place des mesures techniques avancées pour protéger vos données.
          </p>
        </section>

        <hr className="border-slate-200" />

        <section>
          <h2 className="text-xl font-semibold text-slate-900">10. Contact</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Pour toute question :{" "}
            <a href="mailto:contact@vexly.fr" className="text-indigo-600 underline">
              contact@vexly.fr
            </a>
          </p>
        </section>

        <p className="pt-8 text-xs text-slate-400 text-right">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>
    </div>
  );
}
