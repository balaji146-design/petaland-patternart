// import { motion } from "framer-motion";

// function CategoryCard({ name, image }) {
//   return (
//     <motion.div
//       whileHover={{ y: -6, scale: 1.02 }}
//       transition={{ duration: 0.3, ease: "easeOut" }}
//       className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-beige-dark shadow-luxury"
//     >
//       <img
//         src={image}
//         alt={name}
//         className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/85 via-coffee-brown/20 to-transparent transition-opacity duration-300 group-hover:from-henna-brown/90" />

//       <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 p-4 text-center">
//         <span className="font-serif text-sm font-semibold text-cream sm:text-base">
//           {name}
//         </span>
//         <span className="h-[2px] w-0 bg-soft-gold transition-all duration-300 group-hover:w-10" />
//       </div>
//     </motion.div>
//   );
// }

// export default CategoryCard;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CategoryCard({ name, image, to }) {
  const content = (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-beige-dark shadow-luxury"
    >
      <img
        src={image}
        alt={name}
        onError={(event) => {
          event.currentTarget.src = "/assets/images/category-default.svg";
        }}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/85 via-coffee-brown/20 to-transparent transition-opacity duration-300 group-hover:from-henna-brown/90" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 p-4 text-center">
        <span className="font-serif text-sm font-semibold text-cream sm:text-base">
          {name}
        </span>
        <span className="h-[2px] w-0 bg-soft-gold transition-all duration-300 group-hover:w-10" />
      </div>
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

export default CategoryCard;