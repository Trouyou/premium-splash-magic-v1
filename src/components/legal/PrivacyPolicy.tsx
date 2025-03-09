
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="prose prose-sm max-w-none">
      <h2 className="text-xl font-semibold mb-4">Politique de Protection des Données Personnelles – Eatly</h2>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">1. Introduction</h3>
      <p>Eatly accorde une importance primordiale à la protection des données personnelles de ses utilisateurs. La présente politique de confidentialité vise à vous informer sur la manière dont nous collectons, utilisons et protégeons vos données, en conformité avec le Règlement Général sur la Protection des Données (RGPD) (Règlement UE 2016/679) et la Loi Informatique et Libertés (loi n° 78-17 du 6 janvier 1978 modifiée).</p>
      <p>Eatly s'engage à garantir la confidentialité et la sécurité de vos données personnelles et à respecter vos droits en matière de protection des données.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">2. Responsable du traitement</h3>
      <p>Le responsable du traitement des données personnelles est :</p>
      <p><strong>Eatly SAS</strong><br />
      58 rue de Monceau, Paris 75008<br />
      Email : <a href="mailto:contact@eatlyfood.fr" className="text-eatly-primary hover:underline">contact@eatlyfood.fr</a></p>
      <p>Eatly a désigné un Délégué à la Protection des Données (DPO) que vous pouvez contacter pour toute question relative à la protection des données :</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Par courrier postal : Eatly – DPO, 58 rue de Monceau, Paris 75008</li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">3. Définitions</h3>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Donnée à caractère personnel</strong> : toute information relative à une personne physique identifiée ou identifiable (nom, prénom, adresse e-mail, etc.).</li>
        <li><strong>Donnée sensible</strong> : toute donnée révélant l'origine raciale ou ethnique, les opinions religieuses, les données de santé ou les préférences alimentaires spécifiques.</li>
        <li><strong>Traitement</strong> : toute opération effectuée sur des données personnelles (collecte, stockage, modification, suppression, etc.).</li>
        <li><strong>Responsable du traitement</strong> : la personne morale qui détermine les finalités et moyens du traitement des données.</li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">4. Données collectées</h3>
      <p>Les données collectées par Eatly varient selon votre relation avec nous et comprennent notamment :</p>
      
      <h4 className="text-md font-semibold mt-4 mb-2">4.1. Données d'identification</h4>
      <ul className="list-disc pl-5 mb-4">
        <li>Nom, prénom</li>
        <li>Adresse e-mail</li>
        <li>Adresse postale et numéro de téléphone</li>
      </ul>
      
      <h4 className="text-md font-semibold mt-4 mb-2">4.2. Données liées à votre compte et votre abonnement</h4>
      <ul className="list-disc pl-5 mb-4">
        <li>Identifiants de connexion</li>
        <li>Préférences alimentaires</li>
        <li>Historique des commandes et abonnements</li>
      </ul>
      
      {/* Sections suivantes abrégées pour la brièveté */}
      <h3 className="text-lg font-semibold mt-6 mb-2">5. Collecte des données</h3>
      <p>Nous collectons vos données lors de la création de votre compte, l'achat d'un abonnement, et lors de votre navigation sur notre site.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">6. Finalités du traitement des données</h3>
      <p>Eatly collecte et traite vos données pour la gestion des abonnements, la personnalisation de l'expérience utilisateur, et l'amélioration du service.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">7. Partage des données</h3>
      <p>Les données personnelles peuvent être partagées avec les services internes d'Eatly, nos prestataires et partenaires, et les autorités légales en cas d'obligation réglementaire.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">8. Hébergement et transfert des données</h3>
      <p>Les données sont hébergées dans l'Union Européenne. Si des données personnelles sont transférées hors de l'Union Européenne, Eatly veille à ce que ces transferts soient encadrés par des garanties appropriées.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">9. Durée de conservation des données</h3>
      <p>Les données personnelles sont conservées uniquement pour la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">10. Sécurité des données</h3>
      <p>Eatly met en place des mesures techniques et organisationnelles pour assurer la sécurité de vos données, incluant le chiffrement des données sensibles et le stockage sécurisé.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">11. Vos droits</h3>
      <p>Vous disposez de droits sur vos données personnelles, notamment le droit d'accès, de rectification, d'effacement, et d'opposition. Pour exercer vos droits, envoyez-nous un courrier postal.</p>
      
      <h3 className="text-lg font-semibold mt-6 mb-2">12. Modifications de la politique de confidentialité</h3>
      <p>Cette politique peut être mise à jour à tout moment en fonction des évolutions légales ou techniques. La dernière mise à jour date du <strong>08 mars 2025</strong>.</p>
      <p>Toute modification majeure sera notifiée via notre site ou par e-mail.</p>
      
      <div className="mt-6 text-center font-semibold">
        <p>Eatly – Bien manger, en toute confiance.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
