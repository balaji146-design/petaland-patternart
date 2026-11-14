// import { motion } from "framer-motion";
// import CategoryList from "../../components/categories/CategoryList.jsx";

// const categories = [
//   {
//     id: "cat-1",
//     name: "Bridal Henna",
//     image: "/assets/images/category-bridal.jpg",
//   },
//   {
//     id: "cat-2",
//     name: "Arabic Henna",
//     image: "/assets/images/category-arabic.jpg",
//   },
//   {
//     id: "cat-3",
//     name: "Traditional Mehndi",
//     image: "/assets/images/category-traditional.jpg",
//   },
//   {
//     id: "cat-4",
//     name: "Minimalist Henna",
//     image: "/assets/images/category-minimalist.jpg",
//   },
//   {
//     id: "cat-5",
//     name: "Kids Henna",
//     image: "/assets/images/category-kids.jpg",
//   },
//   {
//     id: "cat-6",
//     name: "Party Henna",
//     image: "/assets/images/category-party.jpg",
//   },
//   {
//     id: "cat-7",
//     name: "Festival Henna",
//     image: "/assets/images/category-festival.jpg",
//   },
//   {
//     id: "cat-8",
//     name: "Engagement Henna",
//     image: "/assets/images/category-engagement.jpg",
//   },
// ];

// function Categories() {
//   return (
//     <div className="w-full">
//       <section className="bg-beige/40 py-16 sm:py-20">
//         <div className="container-luxury text-center">
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold"
//           >
//             BROWSE BY STYLE
//           </motion.p>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="font-serif text-3xl font-semibold text-henna-brown sm:text-5xl"
//           >
//             Our Henna Categories
//           </motion.h1>
//           <div className="divider-luxury" />
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base"
//           >
//             Every occasion deserves its own artistry. Explore our curated
//             categories to find the perfect henna style for you.
//           </motion.p>
//         </div>
//       </section>

//       <section className="container-luxury py-16">
//         <CategoryList categories={categories} />
//       </section>
//     </div>
//   );
// }

// export default Categories;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CategoryList from "../../components/categories/CategoryList.jsx";
import { getCategories } from "../../services/categoryService.js";
import { getCategoryImage } from "../../utils/categoryImages.js";

const DEFAULT_CATEGORIES = [
  "Bridal Henna",
  "Arabic Henna",
  "Traditional Mehndi",
  "Minimalist Henna",
  "Kids Henna",
  "Party Henna",
  "Festival Henna",
  "Engagement Henna",
].map((name, index) => ({
  id: `default-category-${index + 1}`,
  name,
  image: getCategoryImage(name),
}));

function Categories() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await getCategories();
        const list = Array.isArray(data) ? data : data?.data || [];
        const normalized = list.map((c) => ({
          id: c.id,
          name: c.name,
          image: getCategoryImage(c.name),
        }));
        if (mounted && normalized.length > 0) setCategories(normalized);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <section className="bg-beige/40 py-16 sm:py-20">
        <div className="container-luxury text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold"
          >
            BROWSE BY STYLE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-semibold text-henna-brown sm:text-5xl"
          >
            Our Henna Categories
          </motion.h1>
          <div className="divider-luxury" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base"
          >
            Every occasion deserves its own artistry. Explore our curated
            categories to find the perfect henna style for you.
          </motion.p>
        </div>
      </section>

      <section className="container-luxury py-16">
        <CategoryList categories={categories} loading={loading} />
      </section>
    </div>
  );
}

export default Categories;