import { useState, useEffect } from "react";
import { useLanguage } from "../LangContext";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { ethers } from "ethers";
import { formatUnits, toBigInt } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShippingContractABI } from "../contracts/ShippingContract";
import checkBtn from "../assets/img/check.png";

function CarrierDashboard() {
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState(null);
  const [shipmentID, setShipmentID] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [pendingShipments, setPendingShipments] = useState([]);
  const [createdShipmentsByCarrier, setCreatedShipmentsByCarrier] = useState(
    []
  );
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

    if (openModal === "see_all_joined") {
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

  const acceptShipment = async (shipmentId) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        ShippingContractABI,
        signer
      );

      const tx = await contract.acceptShipment(shipmentId);
      await tx.wait();
      getPending(); // Refresh list
    } catch (error) {
      toast.error(
        language === "en"
          ? "You already accepted a shipment"
          : "Vous avez deja accepté une expédition"
      );
      console.error(error);
    }
  };

  const startShipment = async (shipmentId) => {
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

      console.log("Calling shipmentInTransit from the contract...");

      const carrierAddress = await signer.getAddress();

      const activeShipment = await shippingContract.getActiveShipment(
        carrierAddress
      );
      const shipmentId = activeShipment.id;

      const tx = await shippingContract.shipmentInTransit(shipmentId);
      await tx.wait();

      toast.success(
        language === "en"
          ? "Shipment started successfully!"
          : "Expédition commencée avec succès !"
      );
    } catch (error) {
      console.error("Failed to start shipment:", error);
      toast.error(
        language === "en"
          ? "Failed to start shipment"
          : "Impossible de commencer l'expédition"
      );
    }
  };

  const markDeliveredShipment = async (shipmentId) => {
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

      console.log("Calling markAsDelivered from the contract...");

      const carrierAddress = await signer.getAddress();

      const inTransitShipment = await shippingContract.getInTransitShipment(
        carrierAddress
      );
      const shipmentId = inTransitShipment.id;

      const tx = await shippingContract.markAsDelivered(shipmentId);
      await tx.wait();

      toast.success(
        language === "en"
          ? "Shipment mark as delivered!"
          : "Expédition marquée comme livrée !"
      );
    } catch (error) {
      console.error("Failed to mark shipment delivered:", error);
      toast.error(
        language === "en"
          ? "Failed to mark shipment delivered"
          : "Impossible de marquer l'expédition comme livrée"
      );
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
          ? new Date(Number(shipment.pickupDate) * 1000).toLocaleString()
          : "N/A",
      deliveryDate:
        shipment.deliveryDate > 0
          ? new Date(Number(shipment.deliveryDate) * 1000).toLocaleString()
          : "N/A",
    };
  };

  const truncateAddress = (address) => {
    if (!address) return "N/A";
    return `${address.slice(0, 16)}...`;
  };

  const statusLabels = {
    en: ["Pending", "Accepted", "In transit", "Delivered", "Paid"],
    fr: ["En attente", "Acceptée", "En transit", "Livrée", "Payée"],
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

      const shipmentIds = await shippingContract.getShipmentsByCarrier(
        senderAddress
      );
      console.log("Shipment IDs:", shipmentIds);

      const shipments = await Promise.all(
        shipmentIds.map((id) => getShipmentById(shippingContract, id))
      );

      console.log("Full Shipment Data:", shipments);
      setCreatedShipmentsByCarrier(shipments);
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

  const IDFields = [
    {
      en: "Shipment ID...",
      fr: "ID de l'expédition...",
    },
  ];

  const modalsContent = {
    see_all: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Pending shipments" : "Expéditions en attente"}
        </h2>

        <div className="space-y-4 w-full">
          {pendingShipments.map((s) => (
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
                    {language === "en" ? "Pickup:" : "Départ :"}
                  </span>{" "}
                  {s.pickup}
                </div>
                <div>
                  <span className="font-semibold">
                    {language === "en" ? "Delivery:" : "Livraison :"}
                  </span>{" "}
                  {s.delivery}
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    acceptShipment(s.id);
                    setOpenModal(null);
                  }}
                  className="hover:scale-110 hover:cursor-pointer transition"
                >
                  <img src={checkBtn} alt="accept" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
    start: (
      <>
        <button
          className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black
        dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2
        hover:scale-101 hover:opacity-90 cursor-pointer transition-all
        duration-300 w-full"
          onClick={() => startShipment(shipmentID)}
        >
          {language === "en" ? "Start the shipment" : "Commencer l'expédition"}
        </button>
      </>
    ),
    delivered: (
      <>
        <button
          className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black
        dark:text-white text-sm md:text-base font-normal rounded-xl p-2 mb-2
        hover:scale-101 hover:opacity-90 cursor-pointer transition-all
        duration-300 w-full"
          onClick={() => markDeliveredShipment(shipmentID)}
        >
          {language === "en" ? "Mark as delivered" : "Marquer comme livrée"}
        </button>
      </>
    ),
    see_all_joined: (
      <>
        <h2 className="text-black dark:text-white text-lg md:text-xl font-normal mb-2">
          {language === "en" ? "Joined shipments" : "Expéditions rejointes"}
        </h2>

        <div className="space-y-4 w-full">
          {createdShipmentsByCarrier.map((s) => (
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
                    {language === "en"
                      ? "Pickup location:"
                      : "Adresse de depart :"}
                  </span>{" "}
                  {s.pickupLocation}
                </div>
                <div>
                  <span className="font-semibold">
                    {language === "en"
                      ? "Delivery location:"
                      : "Adresse de livraison :"}
                  </span>{" "}
                  {s.deliveryLocation}
                </div>
                <div>
                  <span className="font-semibold">
                    {language === "en" ? "Pickup date:" : "Date de depart :"}
                  </span>{" "}
                  {s.pickupDate}
                </div>
                <div>
                  <span className="font-semibold">
                    {language === "en"
                      ? "Delivery date:"
                      : "Date de livraison :"}
                  </span>{" "}
                  {s.deliveryDate}
                </div>
                <div>
                  <span className="font-semibold">
                    {language === "en" ? "Payed:" : "Payé :"}
                  </span>{" "}
                  {s.paymentReleased
                    ? language === "en"
                      ? "Yes"
                      : "Oui"
                    : language === "en"
                    ? "No"
                    : "Non"}
                </div>
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
            ? "Carrier Dashboard"
            : "Tableau de bord transporteur"}
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 w-full h-full">
          <button
            id="joinShipment"
            onClick={() => {
              getPending();
              setOpenModal("see_all");
            }}
          >
            <Card>
              {language === "en"
                ? "See all pending shipments"
                : "Voir toutes les expéditions en attente"}
            </Card>
          </button>
          <button id="startShipment" onClick={() => setOpenModal("start")}>
            <Card>
              {language === "en"
                ? "Start the active shipment"
                : "Commencer l'expédition active"}
            </Card>
          </button>
          <button
            id="markAsDelivered"
            onClick={() => setOpenModal("delivered")}
          >
            <Card>
              {language === "en"
                ? "Mark the shipment as delivered"
                : "Déclarer l'expédition comme livré"}
            </Card>
          </button>
          <button
            id="seeAllJoined"
            onClick={() => setOpenModal("see_all_joined")}
          >
            <Card>
              {language === "en"
                ? "See all joined shipments"
                : "Voir toutes les expéditions rejointes"}
            </Card>
          </button>
          <button id="getInfo" onClick={() => setOpenModal("info")}>
            <Card>
              {language === "en"
                ? "Get specific shipment information"
                : "Obtenir les informations d'une expédition spécifique"}
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
