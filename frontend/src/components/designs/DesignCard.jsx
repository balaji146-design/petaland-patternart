// import { motion } from "framer-motion";
// import { FaWhatsapp } from "react-icons/fa";

// function DesignCard({ design }) {
//   const { name, image, category, actualPrice, offerPrice } = design;

//   const discount =
//     actualPrice && offerPrice
//       ? Math.round(((actualPrice - offerPrice) / actualPrice) * 100)
//       : 0;

//   const whatsappMessage = encodeURIComponent(
//     `Hi, I would like to book the "${name}" henna design.`
//   );

//   return (
//     <motion.div
//       whileHover={{ y: -8 }}
//       transition={{ duration: 0.3, ease: "easeOut" }}
//       className="group overflow-hidden rounded-xl border border-beige-dark bg-cream shadow-luxury"
//     >
//       <div className="relative h-64 w-full overflow-hidden">
//         <img
//           src={image}
//           alt={name}
//           className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//         <span className="absolute left-3 top-3 rounded-full bg-henna-brown px-3 py-1 text-xs font-medium tracking-wide text-cream shadow-md">
//           {category}
//         </span>

//         {discount > 0 && (
//           <span className="absolute right-3 top-3 rounded-full bg-soft-gold px-3 py-1 text-xs font-semibold text-coffee-brown shadow-md">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       <div className="p-5">
//         <h3 className="mb-2 font-serif text-lg font-semibold text-henna-brown">
//           {name}
//         </h3>

//         <div className="mb-4 flex items-center gap-3">
//           {actualPrice > offerPrice && (
//             <span className="text-sm text-coffee-brown/60 line-through">
//               ₹{actualPrice.toLocaleString("en-IN")}
//             </span>
//           )}
//           <span className="text-xl font-semibold text-henna-brown">
//             ₹{offerPrice.toLocaleString("en-IN")}
//           </span>
//         </div>

//         <a
//           href={`https://wa.me/6369960501?text=${whatsappMessage}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex w-full items-center justify-center gap-2 rounded-md bg-henna-brown px-4 py-2.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-coffee-brown"
//         >
//           <FaWhatsapp className="text-base" />
//           Book on WhatsApp
//         </a>
//       </div>
//     </motion.div>
//   );
// }

// export default DesignCard;

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

function DesignCard({ design }) {
  const name = design?.name || "Untitled Design";
  const image = design?.image || design?.image_url || "";
  const category = design?.category || design?.category_name || "Uncategorized";
  const actualPrice = Number(design?.actualPrice ?? design?.actual_price ?? 0);
  const offerPrice = Number(design?.offerPrice ?? design?.offer_price ?? actualPrice);

  const discount =
    actualPrice > 0 && offerPrice > 0 && actualPrice > offerPrice
      ? Math.round(((actualPrice - offerPrice) / actualPrice) * 100)
      : 0;

  const whatsappMessage = encodeURIComponent(
    `Hi, I would like to book the "${name}" henna design.`
  );

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group overflow-hidden rounded-xl border border-beige-dark bg-cream shadow-luxury"
    >
      <div className="relative h-64 w-full overflow-hidden bg-beige/40">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-coffee-brown/40 text-sm">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 rounded-full bg-henna-brown px-3 py-1 text-xs font-medium tracking-wide text-cream shadow-md">
          {category}
        </span>

        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-soft-gold px-3 py-1 text-xs font-semibold text-coffee-brown shadow-md">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-2 font-serif text-lg font-semibold text-henna-brown">
          {name}
        </h3>

        <div className="mb-4 flex items-center gap-3">
          {actualPrice > offerPrice && (
            <span className="text-sm text-coffee-brown/60 line-through">
              ₹{actualPrice.toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-xl font-semibold text-henna-brown">
            ₹{offerPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <a
          href={`https://wa.me/916369960501?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-henna-brown px-4 py-2.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-coffee-brown"
        >
          <FaWhatsapp className="text-base" />
          Book on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export default DesignCard;