import { useLanguage } from "../LangContext";
import Card from "../components/Card";

function SenderDashboard() {
  const { language } = useLanguage();

  return (
    <div className="font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full min-h-screen gap-4 md:gap-6 bg-neutral-50 dark:bg-black transition-colors duration-300">
      <div className="flex flex-col items-center justify-center w-full h-auto gap-4 md:gap-6">
        <h2 className="flex justify-center items-center text-center text-xl md:text-2xl lg:text-3xl font-semibold w-full py-4 rounded-xl text-black dark:text-white bg-gradient-to-r from-yellow-600 to-orange-600 transition-colors duration-300">
          {language === "en"
            ? "Sender Dashboard"
            : "Tableau de bord expéditeur"}
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 w-full h-full">
          <Card>
            {language === "en" ? "Create a shipment" : "Créer une expédition"}
          </Card>
          <Card>
            {language === "en"
              ? "Get shipment information"
              : "Obtenir les informations sur une expédition"}
          </Card>
          <Card>
            {language === "en"
              ? "Get all shipments information"
              : "Obtenir toutes les informations sur les expéditions"}
          </Card>
          <Card>
            {language === "en"
              ? "Release the payment for an shipment"
              : "Liberer le paiement pour une expédition"}
          </Card>
          <Card>
            {language === "en"
              ? "See transaction history"
              : "Voir l'historique des transactions"}
          </Card>
          <Card>
            {language === "en" ? "Real-time tracking" : "Suivi en temps réel"}
          </Card>
          <Card>
            {language === "en"
              ? "Notifications and alerts"
              : "Notifications et alertes"}
          </Card>
          <Card>
            {language === "en"
              ? "Document management"
              : "Gestion des documents"}
          </Card>
          <Card>
            {language === "en"
              ? "Statistics and reports"
              : "Statistiques et rapports"}
          </Card>
          <Card>
            {language === "en" ? "Rate carriers" : "Évaluer les transporteurs"}
          </Card>
          <Card>{language === "en" ? "My Profile" : "Mon profil"}</Card>
        </div>
      </div>
    </div>
  );
}

export default SenderDashboard;
