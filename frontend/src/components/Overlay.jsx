import React, { useEffect, useState } from "react";

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
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">XChain</h1>
    </div>
  );
};

export default Overlay;
