const Modal = ({ open, onClose, children }) => {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-300 z-100 ${
        open ? "visible bg-black/20 dark:bg-black/70" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-neutral-900 rounded-xl p-4 transition-all flex flex-col items-center gap-4 w-2/3 md:w-1/2 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
