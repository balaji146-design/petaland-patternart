// import React from "react";
// import { motion } from "framer-motion";
// import { FaWhatsapp, FaGem, FaLeaf, FaClock, FaAward } from "react-icons/fa";
// import BannerSlider from "../../components/banner/BannerSlider.jsx";
// import CategoryCard from "../../components/categories/CategoryCard.jsx";
// import DesignGrid from "../../components/designs/DesignGrid.jsx";
// import { getFeaturedDesigns } from "../../services/designService.js";
// import Button from "../../components/common/Button.jsx";

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
// ];

// const featuredDesigns = []

// const whyChooseUs = [
//   {
//     icon: FaGem,
//     title: "Premium Craftsmanship",
//     description:
//       "Every design is hand-drawn with precision, blending tradition with contemporary elegance.",
//   },
//   {
//     icon: FaLeaf,
//     title: "100% Natural Henna",
//     description:
//       "We use organic, skin-safe henna cones for rich, long-lasting color without harsh chemicals.",
//   },
//   {
//     icon: FaClock,
//     title: "On-Time Bookings",
//     description:
//       "Punctual, reliable service for weddings, festivals, and every special occasion.",
//   },
//   {
//     icon: FaAward,
//     title: "Trusted by Hundreds",
//     description:
//       "Years of experience creating unforgettable henna moments for happy clients.",
//   },
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// function Home() {
//   const [featured, setFeatured] = React.useState([])

//   React.useEffect(() => {
//     let mounted = true
//     async function loadFeatured() {
//       try {
//         const data = await getFeaturedDesigns()
//         const list = Array.isArray(data) ? data : data?.data || []
//         const normalized = list.map((d) => ({ ...d, image: d.image || d.image_url || d.imageUrl }))
//         if (mounted) setFeatured(normalized)
//       } catch (err) {
//         console.error('Failed to load featured designs', err)
//       }
//     }
//     loadFeatured()
//     return () => (mounted = false)
//   }, [])
//   return (
//     <div className="w-full">
//       <BannerSlider />

//       <section className="container-luxury py-20">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={fadeUp}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-12 text-center"
//         >
//           <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">
//             EXPLORE
//           </p>
//           <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
//             Our Design Categories
//           </h2>
//           <div className="divider-luxury" />
//           <p className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base">
//             From bridal grandeur to everyday elegance, discover a henna style
//             crafted for every celebration.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category.id}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               variants={fadeUp}
//               transition={{ duration: 0.5, delay: index * 0.08 }}
//             >
//               <CategoryCard name={category.name} image={category.image} />
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section className="bg-beige/40 py-20">
//         <div className="container-luxury">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="mb-12 text-center"
//           >
//             <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">
//               HANDPICKED
//             </p>
//             <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
//               Featured Designs
//             </h2>
//             <div className="divider-luxury" />
//             <p className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base">
//               Our most loved henna patterns, chosen for their artistry and
//               timeless appeal.
//             </p>
//           </motion.div>

//           <DesignGrid designs={featured} />
//         </div>
//       </section>

//       <section className="container-luxury py-20">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={fadeUp}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-12 text-center"
//         >
//           <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">
//             WHY PETALAND PATTERNART
//           </p>
//           <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
//             The Art of Timeless Henna
//           </h2>
//           <div className="divider-luxury" />
//         </motion.div>

//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {whyChooseUs.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <motion.div
//                 key={item.title}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.3 }}
//                 variants={fadeUp}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="rounded-xl border border-beige-dark bg-cream p-8 text-center shadow-luxury transition-transform duration-300 hover:-translate-y-2"
//               >
//                 <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-henna-brown/10 text-2xl text-henna-brown">
//                   <Icon />
//                 </div>
//                 <h3 className="mb-2 font-serif text-lg text-henna-brown">
//                   {item.title}
//                 </h3>
//                 <p className="text-sm text-coffee-brown">
//                   {item.description}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="relative overflow-hidden bg-coffee-brown py-20">
//         <div className="container-luxury relative z-10 flex flex-col items-center gap-6 text-center">
//           <motion.h2
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="font-serif text-3xl font-semibold text-cream sm:text-4xl"
//           >
//             Ready to Adorn Your Hands with Art?
//           </motion.h2>
//           <motion.p
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
//             className="max-w-xl text-sm text-beige sm:text-base"
//           >
//             Book your session today and let us craft a design as unique as
//             your celebration.
//           </motion.p>
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
//           >
//             <a
//               href="https://wa.me/6369960501?text=Hi%2C%20I%20would%20like%20to%20book%20a%20henna%20session"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button variant="secondary" className="gap-3">
//                 <FaWhatsapp className="text-lg" />
//                 Book on WhatsApp
//               </Button>
//             </a>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

// import React from "react";
// import { motion } from "framer-motion";
// import { FaWhatsapp, FaGem, FaLeaf, FaClock, FaAward } from "react-icons/fa";
// import BannerSlider from "../../components/banner/BannerSlider.jsx";
// import CategoryCard from "../../components/categories/CategoryCard.jsx";
// import DesignGrid from "../../components/designs/DesignGrid.jsx";
// import { getFeaturedDesigns } from "../../services/designService.js";
// import Button from "../../components/common/Button.jsx";

// const categories = [
//   { id: "cat-1", name: "Bridal Henna", image: "/assets/images/category-bridal.jpg" },
//   { id: "cat-2", name: "Arabic Henna", image: "/assets/images/category-arabic.jpg" },
//   { id: "cat-3", name: "Traditional Mehndi", image: "/assets/images/category-traditional.jpg" },
//   { id: "cat-4", name: "Minimalist Henna", image: "/assets/images/category-minimalist.jpg" },
//   { id: "cat-5", name: "Kids Henna", image: "/assets/images/category-kids.jpg" },
//   { id: "cat-6", name: "Party Henna", image: "/assets/images/category-party.jpg" },
// ];

// const whyChooseUs = [
//   { icon: FaGem, title: "Premium Craftsmanship", description: "Every design is hand-drawn with precision, blending tradition with contemporary elegance." },
//   { icon: FaLeaf, title: "100% Natural Henna", description: "We use organic, skin-safe henna cones for rich, long-lasting color without harsh chemicals." },
//   { icon: FaClock, title: "On-Time Bookings", description: "Punctual, reliable service for weddings, festivals, and every special occasion." },
//   { icon: FaAward, title: "Trusted by Hundreds", description: "Years of experience creating unforgettable henna moments for happy clients." },
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

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

// function Home() {
//   const [featured, setFeatured] = React.useState([]);

//   React.useEffect(() => {
//     let mounted = true;
//     async function loadFeatured() {
//       try {
//         const data = await getFeaturedDesigns();
//         const list = Array.isArray(data) ? data : data?.data || [];
//         const normalized = list.map(normalizeDesign);
//         if (mounted) setFeatured(normalized);
//       } catch (err) {
//         console.error("Failed to load featured designs", err);
//       }
//     }
//     loadFeatured();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <div className="w-full">
//       <BannerSlider />

//       <section className="container-luxury py-20">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={fadeUp}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-12 text-center"
//         >
//           <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">EXPLORE</p>
//           <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
//             Our Design Categories
//           </h2>
//           <div className="divider-luxury" />
//           <p className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base">
//             From bridal grandeur to everyday elegance, discover a henna style crafted for every celebration.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category.id}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               variants={fadeUp}
//               transition={{ duration: 0.5, delay: index * 0.08 }}
//             >
//               <CategoryCard name={category.name} image={category.image} />
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section className="bg-beige/40 py-20">
//         <div className="container-luxury">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="mb-12 text-center"
//           >
//             <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">HANDPICKED</p>
//             <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
//               Featured Designs
//             </h2>
//             <div className="divider-luxury" />
//             <p className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base">
//               Our most loved henna patterns, chosen for their artistry and timeless appeal.
//             </p>
//           </motion.div>

//           <DesignGrid designs={featured} />
//         </div>
//       </section>

//       <section className="container-luxury py-20">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={fadeUp}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-12 text-center"
//         >
//           <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">
//             WHY PETALAND PATTERNART
//           </p>
//           <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
//             The Art of Timeless Henna
//           </h2>
//           <div className="divider-luxury" />
//         </motion.div>

//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {whyChooseUs.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <motion.div
//                 key={item.title}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.3 }}
//                 variants={fadeUp}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="rounded-xl border border-beige-dark bg-cream p-8 text-center shadow-luxury transition-transform duration-300 hover:-translate-y-2"
//               >
//                 <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-henna-brown/10 text-2xl text-henna-brown">
//                   <Icon />
//                 </div>
//                 <h3 className="mb-2 font-serif text-lg text-henna-brown">{item.title}</h3>
//                 <p className="text-sm text-coffee-brown">{item.description}</p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="relative overflow-hidden bg-coffee-brown py-20">
//         <div className="container-luxury relative z-10 flex flex-col items-center gap-6 text-center">
//           <motion.h2
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="font-serif text-3xl font-semibold text-cream sm:text-4xl"
//           >
//             Ready to Adorn Your Hands with Art?
//           </motion.h2>
//           <motion.p
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
//             className="max-w-xl text-sm text-beige sm:text-base"
//           >
//             Book your session today and let us craft a design as unique as your celebration.
//           </motion.p>
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeUp}
//             transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
//           >
//             <a
//               href="https://wa.me/916369960501?text=Hi%2C%20I%20would%20like%20to%20book%20a%20henna%20session"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button variant="secondary" className="gap-3">
//                 <FaWhatsapp className="text-lg" />
//                 Book on WhatsApp
//               </Button>
//             </a>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaGem, FaLeaf, FaClock, FaAward } from "react-icons/fa";
import BannerSlider from "../../components/banner/BannerSlider.jsx";
import CategoryCard from "../../components/categories/CategoryCard.jsx";
import DesignGrid from "../../components/designs/DesignGrid.jsx";
import { getFeaturedDesigns } from "../../services/designService.js";
import { getCategories } from "../../services/categoryService.js";
import { getCategoryImage } from "../../utils/categoryImages.js";
import Button from "../../components/common/Button.jsx";

const whyChooseUs = [
  { icon: FaGem, title: "Premium Craftsmanship", description: "Every design is hand-drawn with precision, blending tradition with contemporary elegance." },
  { icon: FaLeaf, title: "100% Natural Henna", description: "We use organic, skin-safe henna cones for rich, long-lasting color without harsh chemicals." },
  { icon: FaClock, title: "On-Time Bookings", description: "Punctual, reliable service for weddings, festivals, and every special occasion." },
  { icon: FaAward, title: "Trusted by Hundreds", description: "Years of experience creating unforgettable henna moments for happy clients." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function normalizeDesign(d) {
  return {
    id: d.id,
    name: d.name,
    description: d.description,
    image: d.image || d.image_url || d.imageUrl || "",
    category: d.category_name || d.category || "Uncategorized",
    actualPrice: Number(d.actual_price ?? d.actualPrice ?? 0),
    offerPrice: Number(d.offer_price ?? d.offerPrice ?? d.actual_price ?? d.actualPrice ?? 0),
    featured: Boolean(d.featured),
  };
}

function Home() {
  const [featured, setFeatured] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;

    async function loadFeatured() {
      try {
        const data = await getFeaturedDesigns();
        const list = Array.isArray(data) ? data : data?.data || [];
        const normalized = list.map(normalizeDesign);
        if (mounted) setFeatured(normalized);
      } catch (err) {
        console.error("Failed to load featured designs", err);
      }
    }

    async function loadCategories() {
      try {
        const data = await getCategories();
        const list = Array.isArray(data) ? data : data?.data || [];
        const normalized = list.map((c) => ({
          id: c.id,
          name: c.name,
          image: getCategoryImage(c.name),
        }));
        if (mounted) setCategories(normalized);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }

    loadFeatured();
    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <BannerSlider />

      <section className="container-luxury py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">EXPLORE</p>
          <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
            Our Design Categories
          </h2>
          <div className="divider-luxury" />
          <p className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base">
            From bridal grandeur to everyday elegance, discover a henna style crafted for every celebration.
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <p className="text-center text-sm text-coffee-brown/60">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <CategoryCard
                  name={category.name}
                  image={category.image}
                  to={`/designs?category=${category.id}`}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-beige/40 py-20">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">HANDPICKED</p>
            <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
              Featured Designs
            </h2>
            <div className="divider-luxury" />
            <p className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base">
              Our most loved henna patterns, chosen for their artistry and timeless appeal.
            </p>
          </motion.div>

          <DesignGrid designs={featured} />
        </div>
      </section>

      <section className="container-luxury py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold">
            WHY PETALAND PATTERNART
          </p>
          <h2 className="font-serif text-3xl font-semibold text-henna-brown sm:text-4xl">
            The Art of Timeless Henna
          </h2>
          <div className="divider-luxury" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-beige-dark bg-cream p-8 text-center shadow-luxury transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-henna-brown/10 text-2xl text-henna-brown">
                  <Icon />
                </div>
                <h3 className="mb-2 font-serif text-lg text-henna-brown">{item.title}</h3>
                <p className="text-sm text-coffee-brown">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-coffee-brown py-20">
        <div className="container-luxury relative z-10 flex flex-col items-center gap-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif text-3xl font-semibold text-cream sm:text-4xl"
          >
            Ready to Adorn Your Hands with Art?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="max-w-xl text-sm text-beige sm:text-base"
          >
            Book your session today and let us craft a design as unique as your celebration.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <a
              href="https://wa.me/916369960501?text=Hi%2C%20I%20would%20like%20to%20book%20a%20henna%20session"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="gap-3">
                <FaWhatsapp className="text-lg" />
                Book on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;