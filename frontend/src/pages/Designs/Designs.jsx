// import { useMemo, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaSearch } from "react-icons/fa";
// import DesignGrid from "../../components/designs/DesignGrid.jsx";
// import { getAllDesigns } from "../../services/designService.js";

// const categories = [
//   "All",
//   "Bridal Henna",
//   "Arabic Henna",
//   "Traditional Mehndi",
//   "Minimalist Henna",
//   "Kids Henna",
//   "Party Henna",
// ];

// function Designs() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [designs, setDesigns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       try {
//         const data = await getAllDesigns();
//         const list = Array.isArray(data) ? data : data?.data || [];
//         // normalize image field
//         const normalized = list.map((d) => ({
//           ...d,
//           image: d.image || d.image_url || d.imageUrl || d.image_url,
//         }));
//         if (mounted) setDesigns(normalized);
//       } catch (err) {
//         console.error('Failed to load designs', err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => (mounted = false);
//   }, []);

//   const filteredDesigns = useMemo(() => {
//     return designs.filter((design) => {
//       const matchesCategory =
//         activeCategory === "All" || design.category_name === activeCategory || design.category === activeCategory;
//       const matchesSearch = (design.name || "").toLowerCase().includes(searchTerm.trim().toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   }, [designs, activeCategory, searchTerm]);

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
//             OUR COLLECTION
//           </motion.p>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="font-serif text-3xl font-semibold text-henna-brown sm:text-5xl"
//           >
//             Explore Our Henna Designs
//           </motion.h1>
//           <div className="divider-luxury" />
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base"
//           >
//             From intricate bridal mandalas to minimalist everyday charm,
//             browse our full range of handcrafted henna artistry.
//           </motion.p>
//         </div>
//       </section>

//       <section className="container-luxury py-14">
//         <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 type="button"
//                 onClick={() => setActiveCategory(category)}
//                 className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 sm:text-sm ${
//                   activeCategory === category
//                     ? "border-henna-brown bg-henna-brown text-cream"
//                     : "border-beige-dark bg-cream text-coffee-brown hover:border-henna-brown hover:text-henna-brown"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full md:w-72">
//             <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee-brown/50" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//               placeholder="Search designs..."
//               className="w-full rounded-full border border-beige-dark bg-cream py-2.5 pl-11 pr-4 text-sm text-coffee-brown placeholder:text-coffee-brown/50 focus:border-henna-brown"
//             />
//           </div>
//         </div>

//         <DesignGrid designs={filteredDesigns} loading={loading} />
//       </section>
//     </div>
//   );
// }

// export default Designs;

// import { useMemo, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaSearch } from "react-icons/fa";
// import DesignGrid from "../../components/designs/DesignGrid.jsx";
// import { getAllDesigns } from "../../services/designService.js";

// const categories = [
//   "All",
//   "Bridal Henna",
//   "Arabic Henna",
//   "Traditional Mehndi",
//   "Minimalist Henna",
//   "Kids Henna",
//   "Party Henna",
// ];

// function normalizeDesign(d) {
//   return {
//     id: d.id,
//     name: d.name,
//     description: d.description,
//     image: d.image || d.image_url || d.imageUrl || "",
//     category: d.category_name || d.category || "Uncategorized",
//     actualPrice: Number(d.actual_price ?? d.actualPrice ?? 0),
//     offerPrice: Number(d.offer_price ?? d.offerPrice ?? d.actual_price ?? d.actualPrice ?? 0),
//     featured: Boolean(d.featured),
//   };
// }

// function Designs() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [designs, setDesigns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       try {
//         const data = await getAllDesigns();
//         const list = Array.isArray(data) ? data : data?.data || [];
//         const normalized = list.map(normalizeDesign);
//         if (mounted) setDesigns(normalized);
//       } catch (err) {
//         console.error("Failed to load designs", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const filteredDesigns = useMemo(() => {
//     return designs.filter((design) => {
//       const matchesCategory = activeCategory === "All" || design.category === activeCategory;
//       const matchesSearch = (design.name || "")
//         .toLowerCase()
//         .includes(searchTerm.trim().toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   }, [designs, activeCategory, searchTerm]);

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
//             OUR COLLECTION
//           </motion.p>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="font-serif text-3xl font-semibold text-henna-brown sm:text-5xl"
//           >
//             Explore Our Henna Designs
//           </motion.h1>
//           <div className="divider-luxury" />
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base"
//           >
//             From intricate bridal mandalas to minimalist everyday charm, browse our full range of handcrafted henna artistry.
//           </motion.p>
//         </div>
//       </section>

//       <section className="container-luxury py-14">
//         <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 type="button"
//                 onClick={() => setActiveCategory(category)}
//                 className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 sm:text-sm ${
//                   activeCategory === category
//                     ? "border-henna-brown bg-henna-brown text-cream"
//                     : "border-beige-dark bg-cream text-coffee-brown hover:border-henna-brown hover:text-henna-brown"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full md:w-72">
//             <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee-brown/50" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//               placeholder="Search designs..."
//               className="w-full rounded-full border border-beige-dark bg-cream py-2.5 pl-11 pr-4 text-sm text-coffee-brown placeholder:text-coffee-brown/50 focus:border-henna-brown"
//             />
//           </div>
//         </div>

//         <DesignGrid designs={filteredDesigns} loading={loading} />
//       </section>
//     </div>
//   );
// }

// export default Designs;

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import DesignGrid from "../../components/designs/DesignGrid.jsx";
import { getAllDesigns } from "../../services/designService.js";
import { getCategories } from "../../services/categoryService.js";

function normalizeDesign(d) {
  return {
    id: d.id,
    name: d.name,
    description: d.description,
    image: d.image || d.image_url || d.imageUrl || "",
    images: Array.isArray(d.images) ? d.images : [],
    categoryId: d.category_id || d.categoryId || "",
    category: d.category_name || d.category || "Uncategorized",
    actualPrice: Number(d.actual_price ?? d.actualPrice ?? 0),
    offerPrice: Number(d.offer_price ?? d.offerPrice ?? d.actual_price ?? d.actualPrice ?? 0),
    featured: Boolean(d.featured),
  };
}

function Designs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryId = searchParams.get("category") || "All";

  const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId);
  const [searchTerm, setSearchTerm] = useState("");
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const [designsData, categoriesData] = await Promise.all([
          getAllDesigns(),
          getCategories(),
        ]);

        const designList = Array.isArray(designsData) ? designsData : designsData?.data || [];
        const categoryList = Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];

        if (mounted) {
          setDesigns(designList.map(normalizeDesign));
          setCategories(categoryList);
        }
      } catch (err) {
        console.error("Failed to load designs or categories", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    if (categoryId === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredDesigns = useMemo(() => {
    return designs.filter((design) => {
      const matchesCategory =
        activeCategoryId === "All" || String(design.categoryId) === String(activeCategoryId);
      const matchesSearch = (design.name || "")
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [designs, activeCategoryId, searchTerm]);

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
            OUR COLLECTION
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-semibold text-henna-brown sm:text-5xl"
          >
            Explore Our Henna Designs
          </motion.h1>
          <div className="divider-luxury" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base"
          >
            Choose a design, open it to swipe through up to five pages of the artist's work, then book your favourite directly on WhatsApp.
          </motion.p>
        </div>
      </section>

      <section className="container-luxury py-14">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryClick("All")}
              className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 sm:text-sm ${
                activeCategoryId === "All"
                  ? "border-henna-brown bg-henna-brown text-cream"
                  : "border-beige-dark bg-cream text-coffee-brown hover:border-henna-brown hover:text-henna-brown"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 sm:text-sm ${
                  String(activeCategoryId) === String(cat.id)
                    ? "border-henna-brown bg-henna-brown text-cream"
                    : "border-beige-dark bg-cream text-coffee-brown hover:border-henna-brown hover:text-henna-brown"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee-brown/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search designs..."
              className="w-full rounded-full border border-beige-dark bg-cream py-2.5 pl-11 pr-4 text-sm text-coffee-brown placeholder:text-coffee-brown/50 focus:border-henna-brown"
            />
          </div>
        </div>

        <DesignGrid designs={filteredDesigns} loading={loading} />
      </section>
    </div>
  );
}

export default Designs;