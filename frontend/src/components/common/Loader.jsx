import { motion } from "framer-motion";

function Loader({ fullScreen = false, label = "Loading" }) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-[200] flex items-center justify-center bg-cream/90 backdrop-blur-sm"
    : "flex w-full items-center justify-center py-16";

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-beige-dark"
            aria-hidden="true"
          />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-henna-brown"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
          <motion.span
            className="absolute inset-2 rounded-full border-2 border-transparent border-t-soft-gold"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        </div>
        <span className="font-serif text-sm tracking-[0.3em] text-henna-brown sm:text-base">
          {label.toUpperCase()}
        </span>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}

export default Loader;