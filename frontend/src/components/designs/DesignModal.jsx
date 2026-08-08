import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

function DesignModal({ design, isOpen, onClose }) {
  if (!design) return null;

  const { name, image, category, actualPrice, offerPrice, description } =
    design;

  const whatsappMessage = encodeURIComponent(
    `Hi, I would like to book the "${name}" henna design.`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-coffee-brown/80 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} details`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-cream shadow-luxury md:flex-row md:max-h-[85vh]"
          >
            <button
              type="button"
              aria-label="Close design details"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-coffee-brown/60 text-cream transition-colors duration-300 hover:bg-henna-brown"
            >
              <FaTimes />
            </button>

            <div className="h-72 w-full overflow-hidden md:h-auto md:w-1/2">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex w-full flex-col justify-center gap-4 p-6 md:w-1/2 md:overflow-y-auto md:p-10">
              <span className="w-fit rounded-full bg-henna-brown px-3 py-1 text-xs font-medium tracking-wide text-cream">
                {category}
              </span>

              <h2 className="font-serif text-2xl font-semibold text-henna-brown sm:text-3xl">
                {name}
              </h2>

              <div className="flex items-center gap-3">
                {actualPrice > offerPrice && (
                  <span className="text-base text-coffee-brown/60 line-through">
                    ₹{actualPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-2xl font-semibold text-henna-brown">
                  ₹{offerPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {description && (
                <p className="text-sm leading-relaxed text-coffee-brown sm:text-base">
                  {description}
                </p>
              )}

              <a
                href={`https://wa.me/6369960501?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-henna-brown px-6 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-coffee-brown sm:w-fit"
              >
                <FaWhatsapp className="text-base" />
                Book on WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DesignModal;