import React, { useEffect, useState } from "react";
import X from "../assets/img/X.webp";

const Overlay = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1000); // Temps avant le début du fade-out

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed font-poppins z-1000 inset-0 bg-neutral-50 dark:bg-black bg-opacity-80 flex items-center justify-center text-black dark:text-white transition-opacity duration-800 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img src={X} alt="Logo" className="size-9 md:size-17 lg:size-27" />
      <h1 className="text-4xl md:text-6xl lg:text-9xl font-bold">Chain</h1>
    </div>
  );
};

export default Overlay;
