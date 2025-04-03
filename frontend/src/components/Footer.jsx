import { useLanguage } from "../LangContext";

const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className="flex flex-col md:flex-row gap-2 items-center justify-center bg-neutral-200 dark:bg-neutral-900 h-20 text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-50 transition-colors duration-300">
      <p>
        {language === "en"
          ? "© 2025 XChain. All rights reserved"
          : "© 2025 XChain. Tous droits reservés"}
      </p>
      <p className="hidden md:block">-</p>
      <a
        href="/TermsAndCond"
        className="underline hover:text-black dark:hover:text-neutral-300"
      >
        {language === "en"
          ? "Terms and conditions"
          : "Conditions générales d'utilisation"}
      </a>
    </footer>
  );
};

export default Footer;
