import { useState } from "react";
import { useLanguage } from "../LangContext";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShippingContractABI } from "../contracts/ShippingContract";

function CarrierDashboard() {
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState(null);
  const [shipmentID, setShipmentID] = useState("");
  const [pendingShipments, setPendingShipments] = useState([]);
  const contractAddress = "0xb54e6492ad031681602822b5e0000f163f3a1923";

  const handleCompleteSubmit = async () => {
    switch (openModal) {
      case "payment":
      case "live_tracking":
        setShipmentID("");
        break;
      default:
        break;
    }
    setOpenModal(null);
  };

  const startShipment = () => {};
  const markAsDelivered = () => {};

  const getPending = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const shippingContract = new ethers.Contract(
        contractAddress,
        ShippingContractABI,
        signer
      );

      console.log("Calling getPendingShipments from the contract...");

      const shipments = await shippingContract.getPendingShipments();

      console.log("Raw shipments data:", shipments);

      const formattedShipments = shipments.map((s) => ({
        id: s[0].toString(),
        name: s[1],
        sender: s[2],
        receiver: s[3],
        carrier: s[4],
        price: ethers.formatEther(s[5]),
        pickup: s[6],
        delivery: s[7],
        status: s[8].toString(),
        delivered: s[9],
        createdAt: s[10].toString(),
        deliveredAt: s[11].toString(),
      }));

      setPendingShipments(formattedShipments);
    } catch (error) {
      console.error("Failed to fetch shipment details:", error);
      toast.error("Failed to fetch shipments");
      setPendingShipments([]);
    }
  };

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

        <div className="mt-4 max-h-[300px] overflow-y-auto space-y-3">
          {pendingShipments.length === 0 ? (
            <p className="text-black dark:text-white text-sm">
              {language === "en"
                ? "No pending shipments"
                : "Aucune expédition en attente"}
            </p>
          ) : (
            pendingShipments.map((s) => (
              <div
                key={s.id}
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 w-full"
              >
                <p>
                  <strong>ID:</strong> {s.id}
                </p>
                <p>
                  <strong>{language === "en" ? "Name" : "Nom"}:</strong>{" "}
                  {s.name}
                </p>
                <p>
                  <strong>{language === "en" ? "Pickup" : "Départ"}:</strong>{" "}
                  {s.pickup}
                </p>
                <p>
                  <strong>
                    {language === "en" ? "Delivery" : "Livraison"}:
                  </strong>{" "}
                  {s.delivery}
                </p>
                <p>
                  <strong>{language === "en" ? "Price" : "Prix"}:</strong>{" "}
                  {s.price} ETH
                </p>
              </div>
            ))
          )}
        </div>
      </>
    ),
    start: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Start the shipment" : "Démarrer le transport"}
        </h2>

        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={shipmentID}
          onChange={(e) => setShipmentID(e.target.value)}
          placeholder={IDFields[0] ? IDFields[0][language] : ""}
        />

        <button
          onClick={startShipment}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full"
        >
          {language === "en" ? "Start" : "Démarrer"}
        </button>
      </>
    ),
    delivered: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "Mark the shipment as delivered"
            : "Déclarer le transport comme livré"}
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
            onClick={markAsDelivered}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full"
          >
            {language === "en" ? "Mark as delivered" : "Déclarer comme livré"}
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
          <button
            id="joinShipment"
            onClick={() => {
              getPending();
              setOpenModal("join");
            }}
          >
            <Card>
              {language === "en"
                ? "Join a shipment"
                : "Se placer sur un transport"}
            </Card>
          </button>
          <button id="startShipment" onClick={() => setOpenModal("start")}>
            <Card>
              {language === "en"
                ? "Start the shipment"
                : "Démarrer le transport"}
            </Card>
          </button>
          <button id="completeShipment" onClick={() => setOpenModal("join")}>
            <Card>
              {language === "en"
                ? "Complete shipment information"
                : "Compléter les informations d'une expédition"}
            </Card>
          </button>
          <button
            id="markAsDelivered"
            onClick={() => setOpenModal("delivered")}
          >
            <Card>
              {language === "en"
                ? "Mark the shipment as delivered"
                : "Déclarer le transport comme livré"}
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
