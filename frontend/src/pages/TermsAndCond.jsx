import { useLanguage } from "../LangContext";

const TermsAndCond = () => {
  const { language } = useLanguage();

  return (
    <div className="font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full min-h-screen gap-4 md:gap-6 bg-neutral-50 dark:bg-black transition-colors duration-300">
      <div className="flex flex-col items-start justify-start w-full md:w-1/2 h-auto gap-4 md:gap-6">
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "Terms and conditions"
              : "Conditions générales d'utilisation"}
          </h2>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "1. Service description"
              : "1. Description du Service"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "Xchain is a decentralized application designed to facilitate logistics management using blockchain technology. It allows users to track shipments, manage inventory, and coordinate logistics operations securely and transparently."
              : "XChain est une application décentralisée conçue pour faciliter la gestion logistique en utilisant la technologie blockchain. Elle permet aux utilisateurs de suivre les expéditions, de gérer les stocks et de coordonner les opérations logistiques de manière sécurisée et transparente."}
          </p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en" ? "2. Eligibility" : "2. Éligibilité"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "To use XChain, you must be at least 18 years old and legally authorized to enter into a contract. The use of the dApp may be subject to geographic restrictions."
              : "Pour utiliser Xchain, vous devez avoir au moins 18 ans et être légalement autorisé à conclure un contrat. L'utilisation de la dApp peut être soumise à des restrictions géographiques."}
          </p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "3. Account Creation"
              : "3. Création de Compte"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "To access all features of XChain, you must create an account. You are responsible for the security of your account and must immediately notify XChain of any unauthorized use."
              : "Pour accéder à toutes les fonctionnalités de XChain, vous devez créer un compte. Vous êtes responsable de la sécurité de votre compte et devez informer immédiatement XChain de toute utilisation non autorisée."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "4. Acceptable Use"
              : "4. Utilisation Acceptable"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "You agree not to use XChain for illegal, fraudulent, or abusive activities. This includes, but is not limited to, manipulating logistics data, identity theft, or violating intellectual property rights."
              : "Vous acceptez de ne pas utiliser XChain pour des activités illégales, frauduleuses ou abusives. Cela inclut, sans s'y limiter, la manipulation des données logistiques, l'usurpation d'identité ou la violation des droits de propriété intellectuelle."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "5. Ownership and License"
              : "5. Propriété et Licence"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "All intellectual property rights related to XChain belong to [Company Name]. You are permitted to use the dApp in accordance with these terms of service."
              : "Tous les droits de propriété intellectuelle relatifs à XChain appartiennent à [Nom de l'Entreprise]. Vous êtes autorisé à utiliser la dApp conformément aux présentes conditions d'utilisation."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "6. Privacy and Security"
              : "6. Confidentialité et Sécurité"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "We are committed to protecting your personal data in accordance with our privacy policy. You are responsible for the security of your login information and account access."
              : "Nous nous engageons à protéger vos données personnelles conformément à notre politique de confidentialité. Vous êtes responsable de la sécurité de vos informations de connexion et de l'accès à votre compte."}
          </p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "7. Transactions and Payments"
              : "7. Transactions et Paiements"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "Transactions on XChain may be subject to fees. Payments must be made using accepted methods. No refunds will be issued due to the app nature."
              : "Les transactions sur XChain peuvent être soumises à des frais. Les paiements doivent être effectués selon les méthodes acceptées. Aucun remboursement ne sera effectué en raison de la nature de l'application."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en" ? "8. Liability" : "8. Responsabilité"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "XChain shall not be liable for any losses or damages resulting from the use of the dApp, except in cases of gross negligence or willful misconduct."
              : "XChain ne sera pas responsable des pertes ou dommages résultant de l'utilisation de la dApp, sauf en cas de négligence grave ou de faute intentionnelle."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en" ? "9. Indemnification" : "9. Indemnisation"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "You agree to indemnify XChain against any claims or damages resulting from your use of the dApp."
              : "Vous acceptez d'indemniser XChain contre toute réclamation ou dommage résultant de votre utilisation de la dApp."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "10. Changes to the Terms"
              : "10. Modifications des Conditions"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "We reserve the right to modify these terms of service at any time. Changes will be communicated to users via notification."
              : "Nous nous réservons le droit de modifier les présentes conditions d'utilisation à tout moment. Les modifications seront communiquées aux utilisateurs par notification."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en" ? "11. Termination" : "11. Résiliation"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "You may terminate your account at any time. XChain may suspend or terminate your account if you violate these terms of service."
              : "Vous pouvez résilier votre compte à tout moment. XChain peut suspendre ou résilier votre compte en cas de violation des présentes conditions d'utilisation."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "12. Legal Compliance"
              : "12. Conformité Légale"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "You agree to comply with all applicable laws and regulations when using XChain."
              : "Vous acceptez de vous conformer à toutes les lois et réglementations applicables lors de l'utilisation de XChain."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "13. Support and Maintenance"
              : "13. Support et Maintenance"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "We strive to provide technical support and maintain the availability of the dApp, but we do not guarantee continuous availability."
              : "Nous nous efforçons de fournir un support technique et de maintenir la disponibilité de la dApp, mais nous ne garantissons pas une disponibilité continue."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "14. Dispute Resolution"
              : "14. Résolution des Litiges"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "Any disputes arising from these terms of service shall be resolved through mediation or arbitration, in accordance with applicable laws."
              : "Tout litige découlant des présentes conditions d'utilisation sera résolu par médiation ou arbitrage, conformément aux lois applicables."}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "15. User Rights"
              : "15. Droits des Utilisateurs"}
          </h3>
          <p className="text-xs md:text-sm lg:text-base font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "You have the right to request the deletion of your personal data or transfer it to another service, in accordance with our privacy policy."
              : "Vous avez le droit de demander la suppression de vos données personnelles ou de les transférer vers un autre service, conformément à notre politique de confidentialité."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCond;
