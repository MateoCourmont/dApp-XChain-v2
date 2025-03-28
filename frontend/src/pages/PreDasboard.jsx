import { useLanguage } from "../LangContext";

function goToCarrier() {
  window.location.href = "/CarrierDashboard";
}

function goToSender() {
  window.location.href = "/SenderDashboard";
}

function PreDasboard() {
  const { language } = useLanguage();

  return (
    <div className="font-poppins flex flex-col px-5 md:px-7 py-8 items-center justify-start w-full h-screen bg-neutral-50 dark:bg-black transition-colors duration-300">
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-50">
          {language === "en" ? "I am:" : "Je suis :"}
        </h2>
      </div>
      <div className="flex flex-col w-8/10 md:flex-row gap-7 md:gap-9 lg:gap-12 py-8 md:py-12">
        <div className="flex flex-1 justify-center items-center h-auto rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 cursor-pointer hover:opacity-90">
          <button
            className="text-xl md:text-2xl lg:text-3xl w-full h-full py-2 font-semibold text-neutral-800 dark:text-neutral-50 cursor-pointer"
            onClick={goToCarrier}
          >
            {language === "en" ? "The carrier" : "Le transporteur"}
          </button>
        </div>
        <div className="flex flex-1 justify-center items-center h-auto rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 cursor-pointer hover:opacity-90">
          <button
            className="text-xl md:text-2xl lg:text-3xl w-full h-full py-2 font-semibold text-neutral-800 dark:text-neutral-50 cursor-pointer"
            onClick={goToSender}
          >
            {language === "en" ? "The sender" : "L'expéditeur"}
          </button>
        </div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          class="bi bi-truck fill-black dark:fill-white rotate-225 transition-colors duration-300"
          viewBox="0 0 16 16"
        >
          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
        </svg>
      </div>
    </div>
  );
}

export default PreDasboard;
