import { useLanguage } from "../LangContext";

const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className="flex items-center justify-center bg-neutral-50 dark:bg-black h-20 transition-colors duration-300">
      <p className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-50 transition-colors duration-300">
        {language === "en"
          ? "© 2025 XChain. All rights reserved."
          : "© 2025 XChain. Tous droits reservés."}
      </p>
    </footer>
  );
};

export default Footer;
