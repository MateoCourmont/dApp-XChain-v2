const Card = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center text-center h-full rounded-xl bg-neutral-200 dark:bg-neutral-800 p-4 transition-all duration-300 hover:scale-104 cursor-pointer"
    >
      <p className="text-lg md:text-xl font-normal text-black dark:text-white transition-colors duration-300">
        {children}
      </p>
    </div>
  );
};

export default Card;
