import { useState } from "react";
import { useLanguage } from "../LangContext";
import { ethers } from "ethers";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShippingContractABI } from "../contracts/ShippingContract";

function SenderDashboard() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [shipmentName, setShipmentName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [shipmentPrice, setShipmentPrice] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [shipmentID, setShipmentID] = useState("");

  const handleCompleteSubmit = async () => {
    if (openModal === "info") {
      await getShipmentDetails();
      if (shipmentDetails) {
        setOpenModal("see_details");
      }
    } else {
      switch (openModal) {
        case "create":
          await createShipment();
          break;
        case "payment":
        case "live_tracking":
          setShipmentID("");
          break;
        default:
          break;
      }
      setOpenModal(null);
    }
  };

  const createShipment = async () => {
    if (
      !shipmentName ||
      !receiverAddress ||
      !shipmentPrice ||
      !pickupLocation ||
      !deliveryLocation
    ) {
      toast.error(
        language === "en"
          ? "Please fill in all fields correctly."
          : "Veuillez remplir tous les champs correctement."
      );
      return;
    }

    if (!ethers.isAddress(receiverAddress)) {
      toast.error(
        language === "en"
          ? "Invalid receiver address."
          : "Adresse du destinataire invalide."
      );
      return;
    }

    const price = parseFloat(shipmentPrice);
    if (isNaN(price) || price <= 0) {
      toast.error(
        language === "en"
          ? "Shipment price must be a positive number."
          : "Le prix de l'expédition doit être un nombre positif."
      );
      return;
    }

    setIsLoading(true);
    toast.info(
      language === "en"
        ? "Please confirm the transaction in MetaMask..."
        : "Veuillez confirmer la transaction dans MetaMask..."
    );

    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const ShippingContractAddress =
        "0xb54e6492ad031681602822b5e0000f163f3a1923";

      const shippingContract = new ethers.Contract(
        ShippingContractAddress,
        ShippingContractABI,
        signer
      );

      // Convertir le prix en wei
      const priceInEther = ethers.parseEther(price.toFixed(18));

      const tx = await shippingContract.createShipment(
        shipmentName,
        receiverAddress,
        priceInEther,
        pickupLocation,
        deliveryLocation,
        { gasLimit: 2000000 }
      );

      await tx.wait();

      setShipmentName("");
      setReceiverAddress("");
      setShipmentPrice("");
      setPickupLocation("");
      setDeliveryLocation("");

      toast.success(
        language === "en"
          ? "Shipment created successfully!"
          : "Expédition créée avec succès !"
      );
    } catch (error) {
      console.error("Error creating shipment:", error);
      toast.error(
        language === "en"
          ? "Error creating the shipment."
          : "Erreur lors de la création de l'expédition."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getShipmentDetails = async () => {
    if (!shipmentID) {
      toast.error(
        language === "en"
          ? "Please enter a valid shipment ID."
          : "Veuillez entrer un ID d'expédition valide."
      );
      return;
    }

    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const ShippingContractAddress =
        "0xb54e6492ad031681602822b5e0000f163f3a1923";
      const shippingContract = new ethers.Contract(
        ShippingContractAddress,
        ShippingContractABI,
        signer
      );

      const shipment = await shippingContract.getShipment(shipmentID);

      setShipmentDetails(shipment);

      console.log("Détails de l'expédition :", shipment);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'expédition :",
        error
      );
      toast.error(
        language === "en"
          ? "Error retrieving shipment details."
          : "Erreur lors de la récupération des détails de l'expédition."
      );
    }
  };

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
        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={shipmentName}
          onChange={(e) => setShipmentName(e.target.value)}
          placeholder={
            CreateShipmentFields[0] ? CreateShipmentFields[0][language] : ""
          }
        />
        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          placeholder={
            CreateShipmentFields[1] ? CreateShipmentFields[1][language] : ""
          }
        />
        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={shipmentPrice}
          onChange={(e) => setShipmentPrice(e.target.value)}
          placeholder={
            CreateShipmentFields[2] ? CreateShipmentFields[2][language] : ""
          }
        />
        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder={
            CreateShipmentFields[3] ? CreateShipmentFields[3][language] : ""
          }
        />
        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
          placeholder={
            CreateShipmentFields[4] ? CreateShipmentFields[4][language] : ""
          }
        />
        <button
          onClick={handleCompleteSubmit}
          disabled={isLoading}
          className={`bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading
            ? language === "en"
              ? "Submitting..."
              : "Soumettre..."
            : language === "en"
            ? "Submit"
            : "Valider"}
        </button>
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
        <button
          onClick={handleCompleteSubmit}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full"
        >
          {language === "en" ? "Submit" : "Valider"}
        </button>
      </>
    ),
    payment: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Release the payment" : "Libérer le paiement"}
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
    see_details: shipmentDetails ? (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Shipment Details" : "Détails de l'expédition"}
        </h2>
        <div className="flex flex-col gap-4 flex-wrap w-full">
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Shipment Name" : "Nom de l'expédition"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.name || "N/A"}
            </span>
          </p>
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Receiver" : "Destinataire"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.receiver || "N/A"}
            </span>
          </p>
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Price" : "Prix"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.price
                ? ethers.formatEther(shipmentDetails.price) + " ETH"
                : "N/A"}
            </span>
          </p>
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Pickup Location" : "Lieu de ramassage"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.pickupLocation || "N/A"}
            </span>
          </p>
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Delivery Location" : "Lieu de livraison"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.deliveryLocation || "N/A"}
            </span>
          </p>
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Pickup Date" : "Date de ramassage"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.pickupDate && shipmentDetails.pickupDate > 0
                ? new Date(
                    Number(shipmentDetails.pickupDate) * 1000
                  ).toLocaleString()
                : "N/A"}
            </span>
          </p>
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Delivery Date" : "Date de livraison"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.deliveryDate && shipmentDetails.deliveryDate > 0
                ? new Date(
                    Number(shipmentDetails.deliveryDate) * 1000
                  ).toLocaleString()
                : "N/A"}
            </span>
          </p>
          <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
            <strong className="text-black dark:text-white text-sm md:text-base font-bold">
              {language === "en" ? "Status" : "Statut"} :
            </strong>{" "}
            <span className="text-sm md:text-base break-all">
              {shipmentDetails.status === 0n
                ? language === "en"
                  ? "Pending"
                  : "En attente"
                : shipmentDetails.status === 1n
                ? language === "en"
                  ? "Accepted"
                  : "Accepté"
                : shipmentDetails.status === 2n
                ? language === "en"
                  ? "In transit"
                  : "En transit"
                : shipmentDetails.status === 3n
                ? language === "en"
                  ? "Delivered"
                  : "Livraison effectuée"
                : "Paid"}
            </span>
          </p>
        </div>
      </>
    ) : (
      <p className="text-black dark:text-white p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800">
        {language === "en"
          ? "No shipment details available."
          : "Aucun détail d'expédition disponible."}
      </p>
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
                : "Obtenir les informations d'une expédition"}
            </Card>
          </button>
          <button id="releasePayment" onClick={() => setOpenModal("payment")}>
            <Card>
              {language === "en"
                ? "Release the payment for a shipment"
                : "Libérer le paiement d'une expédition"}
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
