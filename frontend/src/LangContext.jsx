import React, { createContext, useState, useEffect } from "react";

export const LangContext = createContext();

// Créer un fournisseur de contexte pour la langue
export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Récupérer la langue depuis le localStorage lors de l'initialisation
    return localStorage.getItem("language") || "fr";
  });

  useEffect(() => {
    // Stocker la langue dans le localStorage chaque fois qu'elle change
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LangContext.Provider value={{ language, setLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => React.useContext(LangContext);
