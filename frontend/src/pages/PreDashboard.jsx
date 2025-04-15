import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { UserRoleABI } from "../contracts/UserRole";
import { useLanguage } from "../LangContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function PreDashboard({ setWalletAddress }) {
  const toastId = useRef(null);
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState(null);
  const [alreadyRedirected, setAlreadyRedirected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const contractAddress = "0x19CF2c5cCa8BF8a43C47E16a01725dDDA679D305";
  const navigate = useNavigate();
  const msg =
    language === "fr"
      ? `Rôle déjà détecté, redirection...`
      : `Role already detected, redirecting...`;

  const roleTranslations = {
    carrier: { en: "carrier", fr: "transporteur" },
    sender: { en: "sender", fr: "expéditeur" },
  };

  useEffect(() => {
    autoConnectAndRedirectIfRoleExists();
  }, []);

  useEffect(() => {
    if (fadeOut) {
      document.body.classList.add("bg-neutral-50", "dark:bg-black");
    } else {
      document.body.classList.remove("bg-neutral-50", "dark:bg-black");
    }
  }, [fadeOut]);

  function redirectToDashboard(role, toastMessage = null) {
    if (alreadyRedirected) return;

    setAlreadyRedirected(true);

    if (toastMessage && !toast.isActive(toastId.current)) {
      toastId.current = toast(toastMessage, {
        position: "top-center",
        pauseOnHover: true,
        autoClose: 2000,
        hideProgressBar: false,
        progressClassName: "bg-orange-500",
        theme: "auto",
        className:
          "bg-white dark:bg-neutral-800 text-black dark:text-neutral-50 font-light italic font-poppins",
      });
    }

    setFadeOut(true);
    setTimeout(() => {
      navigate(role === "Carrier" ? "/CarrierDashboard" : "/SenderDashboard");
    }, 600);
  }

  async function autoConnectAndRedirectIfRoleExists() {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length === 0) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const contract = new ethers.Contract(
        contractAddress,
        UserRoleABI,
        signer
      );
      const existingRole = await contract.myRole();

      if (existingRole === "Sender" || existingRole === "Carrier") {
        redirectToDashboard(existingRole, msg);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la tentative de connexion automatique :",
        error
      );
    }
  }

  async function connectWallet() {
    if (alreadyRedirected) return;

    if (!window.ethereum) {
      toast.error(
        language === "fr" ? "MetaMask non installé" : "MetaMask not found"
      );
      return;
    }

    if (!selectedRole) {
      toast.warning(
        language === "fr"
          ? "Veuillez choisir un rôle."
          : "Please select a role."
      );
      return;
    }

    try {
      setLoading(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const contract = new ethers.Contract(
        contractAddress,
        UserRoleABI,
        signer
      );
      const existingRole = await contract.myRole();

      if (existingRole !== "None") {
        redirectToDashboard(existingRole, msg);
        return;
      }

      const role = selectedRole === "carrier" ? 2 : 1;
      const tx = await contract.setRole(role);
      await tx.wait();

      redirectToDashboard(role === 2 ? "Carrier" : "Sender");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error(
        language === "fr"
          ? "Une erreur s'est produite lors de la connexion."
          : "An error occurred while connecting."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full h-screen bg-neutral-50 dark:bg-black transition-colors duration-300 ${
        fadeOut
          ? "opacity-0 transition-opacity duration-500 pointer-events-none"
          : ""
      }`}
    >
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-50 transition-colors duration-300">
          {language === "en" ? "You are:" : "Vous êtes :"}
        </h2>
      </div>

      <div className="flex flex-col w-8/10 md:flex-row gap-7 md:gap-9 lg:gap-12 py-8 md:py-12">
        {["carrier", "sender"].map((role) => (
          <button
            key={role}
            className={`flex-1 bg-neutral-200 dark:bg-neutral-800 text-xl md:text-2xl lg:text-3xl w-full py-2 rounded-full dark:text-white cursor-pointer hover:opacity-90 hover:scale-102 transition-all duration-300 ${
              selectedRole === role ? "ring-2 ring-orange-500" : ""
            }`}
            onClick={() => setSelectedRole(role)}
          >
            {language === "en"
              ? `The ${roleTranslations[role].en}`
              : role === "carrier"
              ? "Le transporteur"
              : "L'expéditeur"}
          </button>
        ))}
      </div>

      {selectedRole && (
        <div
          className={`flex flex-col text-center w-8/10 gap-3 md:gap-4 lg:gap-5 py-4 md:py-6 transition-colors duration-300 ${
            fadeOut ? "opacity-0 transition-opacity duration-500" : ""
          }`}
        >
          <button
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-lg md:text-2xl lg:text-3xl w-full py-2 rounded-full dark:text-white cursor-pointer hover:opacity-90 hover:scale-102 transition-all duration-300"
            onClick={connectWallet}
            disabled={loading}
          >
            {loading
              ? language === "en"
                ? "Connecting..."
                : "Connexion..."
              : language === "en"
              ? `Connect as a ${roleTranslations[selectedRole]?.en}`
              : `Connexion en tant ${
                  roleTranslations[selectedRole]?.fr?.match(/^[aeiouh]/)
                    ? "qu'"
                    : "que "
                }${roleTranslations[selectedRole]?.fr}`}
          </button>
        </div>
      )}
    </div>
  );
}

export default PreDashboard;
