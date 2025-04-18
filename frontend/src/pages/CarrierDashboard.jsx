import { useState } from "react";
import { useLanguage } from "../LangContext";
import Card from "../components/Card";
import Modal from "../components/Modal";

function CarrierDashboard() {
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState(null);
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [shipmentID, setShipmentID] = useState("");

  const handleCompleteSubmit = () => {};

  const CompleteShipmentFields = [
    {
      en: "Pickup time... (hour-minutes)",
      fr: "Heure de ramassage... (heure-minutes)",
    },
    {
      en: "Delivery time... (hour-minutes)",
      fr: "Heure de livraison... (heure-minutes)",
    },
    // A compléter avec les éléments du smartcontract
  ];

  const IDFields = [
    {
      en: "Shipment ID...",
      fr: "ID de l'expédition...",
    },
  ];

  const modalsContent = {
    join: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Join a shipment" : "Se placer sur un transport"}
        </h2>
        <p className="text-black dark:text-white text-sm md:text-base font-normal mb-2">
          {language === "en"
            ? "see created shipments (development running)"
            : "voir les expéditions créees (developpement en cours)"}
        </p>
      </>
    ),
    complete: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "Complete shipment information"
            : "Compléter les informations"}
        </h2>

        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          placeholder={
            CompleteShipmentFields[0] ? CompleteShipmentFields[0][language] : ""
          }
        />
        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          placeholder={
            CompleteShipmentFields[1] ? CompleteShipmentFields[1][language] : ""
          }
        />

        {pickupTime && deliveryTime && (
          <button
            onClick={handleCompleteSubmit}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full"
          >
            {language === "en" ? "Submit" : "Valider"}
          </button>
        )}
      </>
    ),
    info: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "Get shipment information"
            : "Obtenir les informations"}
        </h2>

        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={shipmentID}
          onChange={(e) => setShipmentID(e.target.value)}
          placeholder={IDFields[0] ? IDFields[0][language] : ""}
        />

        {shipmentID && (
          <button
            onClick={handleCompleteSubmit}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full"
          >
            {language === "en" ? "Submit" : "Valider"}
          </button>
        )}
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
        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={shipmentID}
          onChange={(e) => setShipmentID(e.target.value)}
          placeholder={IDFields[0] ? IDFields[0][language] : ""}
        />

        {shipmentID && (
          <button
            onClick={handleCompleteSubmit}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full"
          >
            {language === "en" ? "Submit" : "Valider"}
          </button>
        )}
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
    rating: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "Ratings and reviews"
            : "Évaluations et commentaires"}
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
            ? "Carrier Dashboard"
            : "Tableau de bord transporteur"}
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 w-full h-full">
          <button id="joinShipment" onClick={() => setOpenModal("join")}>
            <Card>
              {language === "en"
                ? "Join a shipment"
                : "Se placer sur un transport"}
            </Card>
          </button>
          <button
            id="completeShipment"
            onClick={() => setOpenModal("complete")}
          >
            <Card>
              {language === "en"
                ? "Complete shipment information"
                : "Compléter les informations d'une expédition"}
            </Card>
          </button>
          <button id="getInfo" onClick={() => setOpenModal("info")}>
            <Card>
              {language === "en"
                ? "Get shipment informations"
                : "Obtenir les informations d'une expédition"}
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
          <button id="rating" onClick={() => setOpenModal("rating")}>
            <Card>
              {language === "en"
                ? "Ratings and reviews"
                : "Évaluations et commentaires"}
            </Card>
          </button>
          <button id="profile" onClick={() => setOpenModal("profile")}>
            <Card>{language === "en" ? "My Profile" : "Mon profil"}</Card>
          </button>
          <Modal open={openModal !== null} onClose={() => setOpenModal(null)}>
            {modalsContent[openModal]}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default CarrierDashboard;
