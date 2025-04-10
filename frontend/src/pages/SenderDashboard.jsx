import { useState } from "react";
import { useLanguage } from "../LangContext";
import Card from "../components/Card";
import Modal from "../components/Modal";

function SenderDashboard() {
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState(null);

  const CreateShipmentFields = [
    {
      en: "Shipment name...",
      fr: "Nom de l'expédition...",
    },
    {
      en: "Receiver address...",
      fr: "Adresse du destinataire...",
    },
    {
      en: "Shipment price...",
      fr: "Prix de l'expédition...",
    },
    {
      en: "Pickup location...",
      fr: "Lieu de ramassage...",
    },
    {
      en: "Delivery location...",
      fr: "Lieu de livraison...",
    },
  ];

  const IDFields = [
    {
      en: "Shipment ID...",
      fr: "ID de l'expédition...",
    },
  ];

  const modalsContent = {
    create: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Create a shipment" : "Créer une expédition"}
        </h2>
        {CreateShipmentFields.map((field, index) => (
          <input
            key={index}
            className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
            type="text"
            placeholder={field[language]}
          />
        ))}
      </>
    ),
    info: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "Get shipment information"
            : "Obtenir les informations"}
        </h2>
        {IDFields.map((field, index) => (
          <input
            key={index}
            className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
            type="text"
            placeholder={field[language]}
          />
        ))}
      </>
    ),
    payment: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Release the payment" : "Libérer le paiement"}
        </h2>
        {IDFields.map((field, index) => (
          <input
            key={index}
            className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
            type="text"
            placeholder={field[language]}
          />
        ))}
      </>
    ),
    history: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "See transaction history"
            : "Voir l'historique des transactions"}
        </h2>
        <p className="text-black dark:text-white text-sm md:text-base font-normal mb-2">
          {language === "en"
            ? "table (development running)"
            : "tableau (developpement en cours)"}
        </p>
      </>
    ),
    live_tracking: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Real-time tracking" : "Suivi en temps réel"}
        </h2>
        {IDFields.map((field, index) => (
          <input
            key={index}
            className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
            type="text"
            placeholder={field[language]}
          />
        ))}
      </>
    ),
    notifications: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "Notifications and alerts"
            : "Notifications et alertes"}
        </h2>
        <p className="text-black dark:text-white text-sm md:text-base font-normal mb-2">
          {language === "en" ? "development running" : "developpement en cours"}
        </p>
      </>
    ),
    doc: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Document management" : "Gestion des documents"}
        </h2>
        <p className="text-black dark:text-white text-sm md:text-base font-normal mb-2">
          {language === "en" ? "development running" : "developpement en cours"}
        </p>
      </>
    ),
    stats: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "Statistics and reports"
            : "Statistiques et rapports"}
        </h2>
        <p className="text-black dark:text-white text-sm md:text-base font-normal mb-2">
          {language === "en" ? "development running" : "developpement en cours"}
        </p>
      </>
    ),
    rate_carrier: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Rate carriers" : "Évaluer les transporteurs"}
        </h2>
        <p className="text-black dark:text-white text-sm md:text-base font-normal mb-2">
          {language === "en" ? "development running" : "developpement en cours"}
        </p>
      </>
    ),
    profile: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "My Profile" : "Mon profil"}
        </h2>
        <p className="text-black dark:text-white text-sm md:text-base font-normal mb-2">
          {language === "en" ? "development running" : "developpement en cours"}
        </p>
      </>
    ),
  };

  return (
    <div className="font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full min-h-screen gap-4 md:gap-6 bg-neutral-50 dark:bg-black transition-colors duration-300">
      <div className="flex flex-col items-center justify-center w-full h-auto gap-4 md:gap-6">
        <h2 className="flex justify-center items-center text-center text-xl md:text-2xl lg:text-3xl font-normal w-full py-4 rounded-xl text-black dark:text-white bg-gradient-to-r from-yellow-600 to-orange-600 transition-colors duration-300">
          {language === "en"
            ? "Sender Dashboard"
            : "Tableau de bord expéditeur"}
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 w-full h-full">
          <button id="createShipment" onClick={() => setOpenModal("create")}>
            <Card>
              {language === "en" ? "Create a shipment" : "Créer une expédition"}
            </Card>
          </button>
          <button id="getInfo" onClick={() => setOpenModal("info")}>
            <Card>
              {language === "en"
                ? "Get shipment information"
                : "Obtenir les informations sur une expédition"}
            </Card>
          </button>
          <button id="releasePayment" onClick={() => setOpenModal("payment")}>
            <Card>
              {language === "en"
                ? "Release the payment for a shipment"
                : "Libérer le paiement pour une expédition"}
            </Card>
          </button>
          <button id="history" onClick={() => setOpenModal("history")}>
            <Card>
              {language === "en"
                ? "See transaction history"
                : "Voir l'historique des transactions"}
            </Card>
          </button>
          <button
            id="liveTracking"
            onClick={() => setOpenModal("live_tracking")}
          >
            <Card>
              {language === "en" ? "Real-time tracking" : "Suivi en temps réel"}
            </Card>
          </button>
          <button
            id="notifications"
            onClick={() => setOpenModal("notifications")}
          >
            <Card>
              {language === "en"
                ? "Notifications and alerts"
                : "Notifications et alertes"}
            </Card>
          </button>
          <button id="documents" onClick={() => setOpenModal("doc")}>
            <Card>
              {language === "en"
                ? "Document management"
                : "Gestion des documents"}
            </Card>
          </button>
          <button id="stats" onClick={() => setOpenModal("stats")}>
            <Card>
              {language === "en"
                ? "Statistics and reports"
                : "Statistiques et rapports"}
            </Card>
          </button>
          <button
            id="rate_carrier"
            onClick={() => setOpenModal("rate_carrier")}
          >
            <Card>
              {language === "en"
                ? "Rate carriers"
                : "Évaluer les transporteurs"}
            </Card>
          </button>
          <button id="profile" onClick={() => setOpenModal("profile")}>
            <Card>{language === "en" ? "My Profile" : "Mon Profil"}</Card>
          </button>
          <Modal open={openModal !== null} onClose={() => setOpenModal(null)}>
            {modalsContent[openModal]}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default SenderDashboard;
