import { useLanguage } from "../LangContext";

function CarrierDashboard() {
  const { language } = useLanguage();

  return (
    <div className="font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full h-screen bg-neutral-50 dark:bg-black transition-colors duration-300">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-50">
        {language === "en"
          ? "Carrier Dashboard"
          : "Tableau de bord du transporteur"}
      </h2>
    </div>
  );
}

export default CarrierDashboard;
