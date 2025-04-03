import { useLanguage } from "../LangContext";
import Overlay from "../components/Overlay";
import heroImg from "../assets/img/portrait-hero.jpg";
import aboutImg from "../assets/img/office.jpg";

const LandingPage = () => {
  const { language } = useLanguage();

  return (
    <div className="font-poppins">
      <Overlay />
      <section className="flex flex-col md:flex-row items-center text-center md:text-start justify-center md:justify-start py-8 md:py-12 px-5 md:px-7 lg:px-12 gap-7 md:gap-9 lg:gap-12 bg-neutral-50 dark:bg-black transition-colors duration-300">
        <div className="flex flex-col flex-1 items-center md:items-start gap-6 md:gap-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-9 md:leading-12 lg:leading-16 tracking-tighter text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "MANAGE YOUR SUPPLY CHAIN LIKE NEVER BEFORE"
              : " GÉREZ VOTRE SUPPLY CHAIN COMME JAMAIS AUPARAVANT"}
          </h1>
          <h2 className="text-sm md:text-lg lg:text-xl font-normal text-neutral-800 dark:text-neutral-50">
            {language === "en"
              ? "The blockchain-based logistics platform which helps you with the supply chain."
              : "La plateforme de logistique basée sur la blockchain qui vous aide pour la gestion de votre supply chain."}
          </h2>
          <button className="text-neutral-800 dark:text-neutral-50 bg-gradient-to-r from-yellow-600 to-orange-600 font-normal py-3 px-8 md:py-4 lg:py-5 text-sm md:text-lg lg:text-xl rounded-full cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-102">
            <a href="/PreDashboard">
              {language === "en"
                ? "Let's work together!"
                : "Travaillons ensemble !"}
            </a>
          </button>
        </div>
        <div className="flex flex-1">
          <img
            src={heroImg}
            alt="Hero image"
            className="rounded-xl scale-95 md:scale-100 md:h-96 object-cover flex flex-1 justify-center"
          />
        </div>
      </section>
      <section
        id="about"
        className="flex py-8 md:py-12 px-5 md:px-7 lg:px-12 lg:gap-12 bg-neutral-50 dark:bg-black transition-colors duration-300"
      >
        <div className="flex-1 hidden lg:flex">
          <img src={aboutImg} alt="Office image" className="rounded-xl" />
        </div>
        <div className="flex flex-1 flex-col gap-6 md:gap-8">
          <div>
            <h2 className="text-neutral-800 dark:text-neutral-50 font-extrabold text-2xl md:text-3xl lg:text-4xl uppercase">
              {language === "en" ? "About XChain" : "Qui sommes-nous ?"}
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
              {language === "en" ? "Our Mission" : "Notre Mission"}
            </h3>
            <p className="text-sm md:text-lg lg:text-xl font-normal text-neutral-800 dark:text-neutral-50">
              {language === "en"
                ? "At XChain, our mission is to revolutionize the logistics industry by providing transparent, secure, and efficient solutions through blockchain technology. We aim to transform the way businesses manage their logistical operations, making them smoother and more reliable."
                : "Chez XChain, notre mission est de révolutionner l'industrie de la logistique en offrant des solutions transparentes, sécurisées et efficaces grâce à la technologie blockchain. Nous visons à transformer la manière dont les entreprises gèrent leurs opérations logistiques, en les rendant plus fluides et plus fiables"}
            </p>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
              {language === "en" ? "Our Vision" : "Notre Vision"}
            </h3>
            <p className="text-sm md:text-lg lg:text-xl font-normal text-neutral-800 dark:text-neutral-50">
              {language === "en"
                ? "We envision a future where every shipment is traceable in real-time, fraud is minimized, and operational efficiency is maximized. We aspire to be the global leader in blockchain-based logistics solutions, setting new standards for the industry."
                : "Nous envisageons un avenir où chaque expédition est traçable en temps réel, où les fraudes sont réduites au minimum, et où l'efficacité opérationnelle est maximisée. Nous aspirons à être le leader mondial des solutions logistiques basées sur la blockchain, en établissant de nouvelles normes pour l'industrie."}
            </p>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
              {language === "en" ? "Our Story" : "Notre Histoire"}
            </h3>
            <p className="text-sm md:text-lg lg:text-xl font-normal text-neutral-800 dark:text-neutral-50">
              {language === "en"
                ? "XChain was founded by four friends passionate about blockchain technology. Together, they identified the challenges of the traditional logistics industry and decided to create an innovative solution to address them."
                : "XChain a été fondée par quatre amis passionnés par la technologie blockchain. Ensemble, ils ont identifié les défis de l'industrie logistique traditionnelle et ont décidé de créer une solution innovante pour y remédier."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
