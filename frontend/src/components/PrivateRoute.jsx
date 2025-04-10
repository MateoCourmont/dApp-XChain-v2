import React, { useState, useEffect } from "react";
import { useLanguage } from "../LangContext";
import { Navigate } from "react-router-dom";
import { ethers } from "ethers";

// Protéger l'accès aux dashboards
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Ajouter un état pour le chargement

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          // Vérifier la connexion et l'adresse de l'utilisateur
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          // Si l'utilisateur est connecté, on met à jour isAuthenticated
          if (address) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkConnection();
  }, []);

  // Si l'on est en train de charger
  if (loading) {
    return <div className="bg-neutral-50 dark:bg-black"></div>;
  }

  // Si l'utilisateur est authentifié, rendre la route demandée, sinon rediriger vers PreDashboard
  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/PreDashboard" />
  );
};

export default PrivateRoute;
