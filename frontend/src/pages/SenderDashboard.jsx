import { useState, useEffect } from "react";
import { useLanguage } from "../LangContext";
import { ethers } from "ethers";
import { formatUnits, toBigInt } from "ethers";
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
  const [createdShipmentsBySender, setCreatedShipmentsBySender] = useState([]);
  const contractAddress = "0xccFFA988d079e83b7C891e4Ba237A2B1821b288d";

  useEffect(() => {
    const fetchSenderAddress = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        return address;
      }
      return null;
    };

    const fetchShipments = async () => {
      const senderAddress = await fetchSenderAddress();
      if (senderAddress) {
        await fetchAllShipments(senderAddress);
      }
    };

    if (openModal === "see_all_created") {
      fetchShipments();
    }
  }, [openModal]);

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

    if (isNaN(Number(shipmentPrice)) || Number(shipmentPrice) <= 0) {
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

      const shippingContract = new ethers.Contract(
        contractAddress,
        ShippingContractABI,
        signer
      );

      // Convertir le prix en wei
      const priceInEther = ethers.parseEther(shipmentPrice.toString());

      console.log({
        shipmentPrice,
        parsed: ethers.parseEther(shipmentPrice),
      });

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

  const getShipmentById = async (shippingContract, id) => {
    const shipment = await shippingContract.getShipment(id);

    console.log("shipment.price =", shipment.price);

    return {
      id: shipment.id.toString(),
      name: shipment.name,
      sender: shipment.sender,
      carrier: shipment.carrier,
      receiver: shipment.receiver,
      price: ethers.formatEther(shipment.price),
      pickupLocation: shipment.pickupLocation,
      deliveryLocation: shipment.deliveryLocation,
      status: shipment.status.toString(),
      paymentReleased: shipment.paymentReleased,
      pickupDate:
        shipment.pickupDate > 0
          ? new Date(Number(shipment.pickupDate) * 1000).toLocaleDateString()
          : "N/A",
      deliveryDate:
        shipment.deliveryDate > 0
          ? new Date(Number(shipment.deliveryDate) * 1000).toLocaleDateString()
          : "N/A",
    };
  };

  const fetchAllShipments = async (senderAddress) => {
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

      const shipmentIds = await shippingContract.getShipmentsBySender(
        senderAddress
      );
      console.log("Shipment IDs:", shipmentIds);

      const shipments = await Promise.all(
        shipmentIds.map((id) => getShipmentById(shippingContract, id))
      );

      console.log("Full Shipment Data:", shipments);
      setCreatedShipmentsBySender(shipments);
    } catch (error) {
      console.error("Failed to fetch shipment details:", error);
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

      const shippingContract = new ethers.Contract(
        contractAddress,
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

  const releasePayment = async () => {
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
      const shippingContract = new ethers.Contract(
        contractAddress,
        ShippingContractABI,
        signer
      );

      const shipment = await shippingContract.shipments(shipmentID);

      if (shipment.status !== 3n) {
        toast.error(
          language === "en"
            ? "Shipment is not delivered yet, payment cannot be released."
            : "L'expédition n'a pas encore été livrée, le paiement ne peut pas être libéré."
        );
        return;
      }

      if (shipment.paymentReleased) {
        toast.error(
          language === "en"
            ? "Payment has already been released for this shipment."
            : "Le paiement a déjà été libéré pour cette expédition."
        );
        return;
      }

      const carrierAddress = shipment.carrier;

      if (!ethers.isAddress(carrierAddress)) {
        toast.error(
          language === "en"
            ? "Invalid carrier address."
            : "Adresse du transporteur invalide."
        );
        return;
      }

      const tx = await signer.sendTransaction({
        to: carrierAddress,
        value: shipment.price,
      });

      await tx.wait();

      const txUpdate = await shippingContract.releasePayment(shipmentID);
      await txUpdate.wait();

      toast.success(
        language === "en"
          ? "Payment successfully released to the carrier!"
          : "Paiement libéré avec succès au transporteur !"
      );
    } catch (error) {
      console.error(
        "Erreur lors de la libération du paiement de l'expédition :",
        error
      );
      toast.error(
        language === "en"
          ? "Error while releasing payment for the shipment."
          : "Erreur lors de la libération du paiement de l'expédition."
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

  const truncateAddress = (address) => {
    if (!address) return "N/A";
    return `${address.slice(0, 16)}...`;
  };

  const statusLabels = {
    en: ["Pending", "Accepted", "In transit", "Delivered", "Paid"],
    fr: ["En attente", "Acceptée", "En transit", "Livrée", "Payée"],
  };

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
    see_all_created: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en"
            ? "All created shipments"
            : "Toutes les expéditions créees"}
        </h2>

        <div className="space-y-4 w-full">
          {createdShipmentsBySender.map((s) => (
            <div
              key={s.id}
              className="w-full rounded-xl shadow-md bg-neutral-100 dark:bg-neutral-800 p-4 text-sm text-black dark:text-white"
            >
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="font-bold">
                  #{s.id} - {s.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {s.price} ETH
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-semibold">
                    {language === "en" ? "Status:" : "Statut :"}
                  </span>{" "}
                  {statusLabels[language][Number(s.status)]}
                </div>
              </div>
            </div>
          ))}
        </div>
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
          {language === "en" ? "Release payment" : "Liberer le paiement"}
        </h2>

        <input
          type="text"
          className="text-black dark:text-white text-sm md:text-base font-normal rounded-xl bg-neutral-200 dark:bg-neutral-800 p-2 mb-2 w-full"
          value={shipmentID}
          onChange={(e) => setShipmentID(e.target.value)}
          placeholder={IDFields[0] ? IDFields[0][language] : ""}
        />
        <button
          onClick={releasePayment}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2 hover:scale-101 hover:opacity-90 cursor-pointer transition-all duration-300 w-full"
        >
          {language === "en" ? "Pay" : "Payer"}
        </button>
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
      <div className="space-y-4 w-full">
        <div className="w-full rounded-xl shadow-md bg-neutral-100 dark:bg-neutral-800 p-4 text-sm text-black dark:text-white">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold">
              #{shipmentDetails.id} - {shipmentDetails.name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatUnits(toBigInt(shipmentDetails.price), "ether")} ETH
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-semibold">
                {language === "en" ? "Sender:" : "Expéditeur :"}
              </span>{" "}
              {truncateAddress(shipmentDetails.sender)}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en" ? "Receiver:" : "Destinataire :"}
              </span>{" "}
              {truncateAddress(shipmentDetails.receiver)}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en" ? "Carrier:" : "Transporteur :"}
              </span>{" "}
              {shipmentDetails.carrier ===
              "0x0000000000000000000000000000000000000000"
                ? "N/A"
                : truncateAddress(shipmentDetails.carrier)}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en" ? "Pickup location:" : "Lieu de ramassage :"}
              </span>{" "}
              {shipmentDetails.pickupLocation}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en"
                  ? "Delivery location:"
                  : "Lieu de livraison :"}
              </span>{" "}
              {shipmentDetails.deliveryLocation}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en" ? "Status:" : "Statut :"}
              </span>{" "}
              {statusLabels[language][Number(shipmentDetails.status)]}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en" ? "Payment Released:" : "Paiement libéré :"}
              </span>{" "}
              {shipmentDetails.paymentReleased
                ? language === "en"
                  ? "Yes"
                  : "Oui"
                : language === "en"
                ? "No"
                : "Non"}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en" ? "Pickup Date:" : "Date de ramassage :"}
              </span>{" "}
              {shipmentDetails.pickupDate > 0
                ? new Date(
                    Number(shipmentDetails.pickupDate) * 1000
                  ).toLocaleString()
                : "N/A"}
            </div>
            <div>
              <span className="font-semibold">
                {language === "en" ? "Delivery Date:" : "Date de livraison :"}
              </span>{" "}
              {shipmentDetails.deliveryDate > 0
                ? new Date(
                    Number(shipmentDetails.deliveryDate) * 1000
                  ).toLocaleString()
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
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
          <button
            id="seeAllCreated"
            onClick={() => setOpenModal("see_all_created")}
          >
            <Card>
              {language === "en"
                ? "See all created shipments"
                : "Voir toutes les expéditions créées"}
            </Card>
          </button>
          <button id="getInfo" onClick={() => setOpenModal("info")}>
            <Card>
              {language === "en"
                ? "Get specific shipment information"
                : "Obtenir les informations d'une expédition spécifique"}
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
