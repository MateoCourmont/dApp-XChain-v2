import { useLanguage } from "../LangContext";

function goToCarrier() {
  window.location.href = "/CarrierDashboard";
}

function goToSender() {
  window.location.href = "/SenderDashboard";
}

function PreDashboard() {
  const { language } = useLanguage();

  return (
    <div className="font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full h-screen bg-neutral-50 dark:bg-black transition-colors duration-300">
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-50">
          {language === "en" ? "I am:" : "Je suis :"}
        </h2>
      </div>
      <div className="flex flex-col w-8/10 md:flex-row gap-7 md:gap-9 lg:gap-12 py-8 md:py-12">
        <div className="flex flex-1 justify-center items-center h-auto rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 cursor-pointer hover:opacity-90 hover:scale-102 transition-all duration-300">
          <button
            className="text-xl md:text-2xl lg:text-3xl w-full h-full py-2 font-normal text-neutral-800 dark:text-neutral-50 cursor-pointer"
            onClick={goToCarrier}
          >
            {language === "en" ? "The carrier" : "Le transporteur"}
          </button>
        </div>
        <div className="flex flex-1 justify-center items-center h-auto rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 cursor-pointer hover:opacity-90 hover:scale-102 transition-all duration-300">
          <button
            className="text-xl md:text-2xl lg:text-3xl w-full h-full py-2 font-normal text-neutral-800 dark:text-neutral-50 cursor-pointer"
            onClick={goToSender}
          >
            {language === "en" ? "The sender" : "L'expéditeur"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreDashboard;
