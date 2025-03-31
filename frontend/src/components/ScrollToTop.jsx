import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`font-poppins fixed bottom-6 right-6 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white p-3 rounded-xl shadow-lg transition-opacity duration-300 cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      UP
    </button>
  );
};

export default ScrollToTop;
