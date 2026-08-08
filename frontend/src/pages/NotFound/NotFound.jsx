import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import SEO from "../../components/common/SEO.jsx";

function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center bg-cream px-4 py-16">
      <SEO
        title="Page Not Found | Petaland Patternart"
        description="The page you are looking for could not be found. Return to Petaland Patternart's home page to explore our premium henna designs."
      />

      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-serif text-7xl font-semibold text-henna-brown sm:text-9xl"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto my-6 h-[2px] bg-soft-gold"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 font-serif text-2xl font-semibold text-henna-brown sm:text-3xl"
        >
          This Pattern Doesn't Exist
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mb-10 max-w-md text-sm text-coffee-brown sm:text-base"
        >
          The page you're searching for may have been moved or no longer
          exists. Let's guide you back to our beautiful collection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-henna-brown px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-coffee-brown"
          >
            <FaHome className="text-base" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;