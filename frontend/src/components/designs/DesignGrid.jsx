import { motion } from "framer-motion";
import DesignCard from "./DesignCard.jsx";

function DesignGrid({ designs = [] }) {
  if (!designs || designs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-beige-dark bg-cream py-20 text-center">
        <p className="mb-2 font-serif text-xl text-henna-brown">
          No Designs Available
        </p>
        <p className="max-w-sm text-sm text-coffee-brown">
          New henna designs are on their way. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {designs.map((design, index) => (
        <motion.div
          key={design.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
        >
          <DesignCard design={design} />
        </motion.div>
      ))}
    </div>
  );
}

export default DesignGrid;