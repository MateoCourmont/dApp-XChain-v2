import React, { useState, useEffect } from "react";
import { useLanguage } from "../LangContext";
import { Navigate } from "react-router-dom";
import { ethers } from "ethers";
import { UserRoleABI } from "../contracts/UserRole";

// Protéger l'accès aux dashboards avec vérification du rôle
const PrivateRoute = ({ element: Element, requiredRole, ...rest }) => {
  const { language } = useLanguage();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const contractAddress = "0x19CF2c5cCa8BF8a43C47E16a01725dDDA679D305";

  useEffect(() => {
    const checkAccess = async () => {
      try {
        if (!window.ethereum) throw new Error("MetaMask not found");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const contract = new ethers.Contract(
          contractAddress,
          UserRoleABI,
          signer
        );
        const role = await contract.myRole(); // "Sender", "Carrier", or "None"

        if (role === requiredRole) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Authorization failed:", err);
        setIsAuthorized(false);
      }
      setLoading(false);
    };

    checkAccess();
  }, [requiredRole]);

  if (loading) {
    return (
      <div className="bg-neutral-50 dark:bg-black text-black dark:text-white flex justify-center w-full pt-20">
        {language === "en" ? "Loading..." : "Chargement..."}
      </div>
    );
  }

  return isAuthorized ? <Element {...rest} /> : <Navigate to="/PreDashboard" />;
};

export default PrivateRoute;
