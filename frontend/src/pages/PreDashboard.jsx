import { useState } from "react";
import { ethers } from "ethers";
import { useLanguage } from "../LangContext";

function PreDashboard() {
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const roleTranslations = {
    carrier: { en: "carrier", fr: "transporteur" },
    sender: { en: "sender", fr: "expéditeur" },
  };

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask is required!");
      return;
    }

    try {
      setLoading(true);

      // Demande à MetaMask de fournir un accès utilisateur
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Crée un fournisseur à partir de l'objet ethereum de MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Obtient le signer pour l'adresse connectée
      const signer = await provider.getSigner();

      // Récupère l'adresse du portefeuille
      const address = await signer.getAddress();
      setWalletAddress(address);

      // Appel du smart contract pour enregistrer le rôle
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      // await contract.registerUser(address, selectedRole);

      // Redirection après enregistrement réussi
      setTimeout(() => {
        window.location.href =
          selectedRole === "carrier" ? "/CarrierDashboard" : "/SenderDashboard";
      }, 1000);
    } catch (error) {
      console.error("Wallet connection failed", error);
      alert("Failed to connect wallet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full h-screen bg-neutral-50 dark:bg-black transition-colors duration-300">
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-50 transition-colors duration-300">
          {language === "en" ? "I am:" : "Je suis :"}
        </h2>
      </div>
      <div className="flex flex-col w-8/10 md:flex-row gap-7 md:gap-9 lg:gap-12 py-8 md:py-12">
        <button
          className="flex-1 bg-neutral-200 dark:bg-neutral-800 text-xl md:text-2xl lg:text-3xl w-full py-2 rounded-full dark:text-white cursor-pointer hover:opacity-90 hover:scale-102 transition-all duration-300"
          onClick={() => setSelectedRole("carrier")}
        >
          {language === "en" ? "The carrier" : "Le transporteur"}
        </button>
        <button
          className="flex-1 bg-neutral-200 dark:bg-neutral-800 text-xl md:text-2xl lg:text-3xl w-full py-2 rounded-full dark:text-white cursor-pointer hover:opacity-90 hover:scale-102 transition-all duration-300"
          onClick={() => setSelectedRole("sender")}
        >
          {language === "en" ? "The sender" : "L'expéditeur"}
        </button>
      </div>
      {selectedRole && !walletAddress && (
        <div className="flex flex-col text-center w-8/10 gap-3 md:gap-4 lg:gap-5 py-4 md:py-6 transition-colors duration-300">
          <p className="text-md md:text-xl lg:text-2xl text-neutral-800 dark:text-neutral-50">
            {language === "en" ? (
              <>
                You are the{" "}
                <span className="font-semibold">
                  {roleTranslations[selectedRole]?.en}
                </span>
              </>
            ) : (
              <>
                Vous êtes {selectedRole === "sender" ? "l'" : "le "}
                <span className="font-semibold">
                  {roleTranslations[selectedRole]?.fr}
                </span>
              </>
            )}
          </p>
          <button
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-xl md:text-2xl lg:text-3xl w-full py-2 rounded-full dark:text-white cursor-pointer hover:opacity-90 hover:scale-102 transition-all duration-300"
            onClick={connectWallet}
            disabled={loading}
          >
            {loading
              ? language === "en"
                ? "Connecting..."
                : "Connexion..."
              : language === "en"
              ? "Connect to MetaMask"
              : "Connexion à MetaMask"}
          </button>
        </div>
      )}
    </div>
  );
}

export default PreDashboard;
