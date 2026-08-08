// import { motion } from "framer-motion";
// import CategoryCard from "./CategoryCard.jsx";

// function CategoryList({ categories = [] }) {
//   if (!categories || categories.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-beige-dark bg-cream py-20 text-center">
//         <p className="mb-2 font-serif text-xl text-henna-brown">
//           No Categories Available
//         </p>
//         <p className="max-w-sm text-sm text-coffee-brown">
//           New henna categories will be added soon. Please check back later.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
//       {categories.map((category, index) => (
//         <motion.div
//           key={category.id}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
//         >
//           <CategoryCard name={category.name} image={category.image} />
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// export default CategoryList;

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard.jsx";

function CategoryList({ categories = [] }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-beige-dark bg-cream py-20 text-center">
        <p className="mb-2 font-serif text-xl text-henna-brown">
          No Categories Available
        </p>
        <p className="max-w-sm text-sm text-coffee-brown">
          New henna categories will be added soon. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
        >
          <CategoryCard
            name={category.name}
            image={category.image}
            to={`/designs?category=${category.id}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default CategoryList;