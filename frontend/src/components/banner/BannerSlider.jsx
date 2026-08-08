// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { motion } from "framer-motion";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// // import useBanner from "../hooks/useBanner";
// import useBanner from "../../hooks/useBanner";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // const slides = [
// //   {
// //     id: "banner-1",
// //     image: "/assets/images/banner-1.jpg",
// //     title: "Timeless Henna Artistry",
// //     subtitle: "Crafted with elegance for your most cherished moments",
// //   },
// //   {
// //     id: "banner-2",
// //     image: "/assets/images/banner-2.jpg",
// //     title: "Bridal Henna, Redefined",
// //     subtitle: "Intricate mandalas designed to make your day unforgettable",
// //   },
// //   {
// //     id: "banner-3",
// //     image: "/assets/images/banner-3.jpg",
// //     title: "Where Tradition Meets Luxury",
// //     subtitle: "Premium henna experiences for every celebration",
// //   },
// // ];

// function BannerSlider() {
//     const { banner, loading } = useBanner();

//   if (loading) {
//     return (
//       <div className="h-[70vh] flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!banner) {
//     return (
//       <div className="h-[70vh] flex items-center justify-center">
//         No Banner
//       </div>
//     );
//   }
//   return (
//     <div className="relative w-full">
//       <Swiper
//         modules={[Autoplay, Navigation, Pagination]}
//         autoplay={{ delay: 4500, disableOnInteraction: false }}
//         loop
//         speed={900}
//         navigation={{
//           prevEl: ".banner-prev",
//           nextEl: ".banner-next",
//         }}
//         pagination={{ clickable: true, el: ".banner-pagination" }}
//         className="h-[70vh] min-h-[420px] w-full sm:h-[80vh]"
//       >
//         {/* {slides.map((slide) => ( */}
//         {(Array.isArray(banner) ? banner : [banner]).map((slide) => (

//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full w-full">
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="h-full w-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/80 via-coffee-brown/30 to-transparent" />

//               <div className="container-luxury absolute inset-0 flex flex-col items-start justify-end pb-24 sm:pb-28">
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.7, delay: 0.2 }}
//                   className="mb-3 text-xs font-medium tracking-[0.4em] text-soft-gold"
//                 >
//                   PETALAND PATTERNART
//                 </motion.p>
//                 <motion.h1
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.35 }}
//                   className="max-w-2xl font-serif text-3xl font-semibold text-cream sm:text-5xl"
//                 >
//                   {slide.title}
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.5 }}
//                   className="mt-4 max-w-lg text-sm text-beige sm:text-base"
//                 >
//                   {/* {slide.subtitle} */}
//                   {slide.subtitle || ""}
//                 </motion.p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <button
//         type="button"
//         aria-label="Previous slide"
//         className="banner-prev absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-coffee-brown/40 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-henna-brown sm:left-8"
//       >
//         <FaChevronLeft />
//       </button>

//       <button
//         type="button"
//         aria-label="Next slide"
//         className="banner-next absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-coffee-brown/40 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-henna-brown sm:right-8"
//       >
//         <FaChevronRight />
//       </button>

//       <div className="banner-pagination absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2" />
//     </div>
//   );
// }

// export default BannerSlider;

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
// import { motion } from "framer-motion";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import useBanner from "../../hooks/useBanner";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";

// function BannerSlider() {
//   const { banner, loading } = useBanner();

//   if (loading) {
//     return (
//       <div className="flex h-[55vh] min-h-[340px] items-center justify-center bg-beige/30 sm:h-[60vh]">
//         <span className="font-serif text-henna-brown/70">Loading...</span>
//       </div>
//     );
//   }

//   if (!banner || (Array.isArray(banner) && banner.length === 0)) {
//     return (
//       <div className="flex h-[55vh] min-h-[340px] items-center justify-center bg-beige/30 sm:h-[60vh]">
//         <span className="font-serif text-henna-brown/70">No Banner</span>
//       </div>
//     );
//   }

//   const slides = Array.isArray(banner) ? banner : [banner];

//   return (
//     <div className="relative w-full overflow-hidden">
//       <Swiper
//         modules={[Autoplay, Navigation, Pagination, EffectFade]}
//         effect={slides.length > 1 ? "fade" : undefined}
//         fadeEffect={{ crossFade: true }}
//         autoplay={{ delay: 4500, disableOnInteraction: false }}
//         loop={slides.length > 1}
//         speed={900}
//         navigation={{
//           prevEl: ".banner-prev",
//           nextEl: ".banner-next",
//         }}
//         pagination={{ clickable: true, el: ".banner-pagination" }}
//         className="h-[55vh] min-h-[340px] w-full sm:h-[62vh] sm:min-h-[400px] lg:h-[68vh]"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full w-full">
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="h-full w-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/85 via-coffee-brown/35 to-transparent" />
//               <div className="absolute inset-0 bg-gradient-to-r from-coffee-brown/40 via-transparent to-transparent" />

//               <div className="container-luxury absolute inset-0 flex flex-col items-start justify-end pb-16 sm:pb-20 lg:pb-24">
//                 <motion.span
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6, delay: 0.15 }}
//                   className="mb-3 inline-flex items-center gap-2 rounded-full border border-soft-gold/40 bg-coffee-brown/30 px-4 py-1.5 text-[11px] font-medium tracking-[0.3em] text-soft-gold backdrop-blur-sm"
//                 >
//                   PETALAND PATTERNART
//                 </motion.span>
//                 <motion.h1
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.7, delay: 0.3 }}
//                   className="max-w-2xl font-serif text-2xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl"
//                 >
//                   {slide.title}
//                 </motion.h1>
//                 {slide.subtitle && (
//                   <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.45 }}
//                     className="mt-3 max-w-md text-sm text-beige sm:text-base"
//                   >
//                     {slide.subtitle}
//                   </motion.p>
//                 )}
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: 56 }}
//                   transition={{ duration: 0.6, delay: 0.6 }}
//                   className="mt-5 h-[3px] rounded-full bg-soft-gold"
//                 />
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {slides.length > 1 && (
//         <>
//           <button
//             type="button"
//             aria-label="Previous slide"
//             className="banner-prev absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-coffee-brown/40 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-henna-brown sm:left-6 sm:h-11 sm:w-11"
//           >
//             <FaChevronLeft />
//           </button>

//           <button
//             type="button"
//             aria-label="Next slide"
//             className="banner-next absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-coffee-brown/40 text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-henna-brown sm:right-6 sm:h-11 sm:w-11"
//           >
//             <FaChevronRight />
//           </button>

//           <div className="banner-pagination absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2" />
//         </>
//       )}
//     </div>
//   );
// }

// export default BannerSlider;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useBanner from "../../hooks/useBanner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function BannerSlider() {
  const { banner, loading } = useBanner();

  if (loading) {
    return (
      <div className="banner-frame-wrapper">
        <div className="flex h-[45vh] min-h-[280px] items-center justify-center rounded-2xl bg-beige/30 sm:h-[55vh]">
          <span className="font-serif text-henna-brown/70">Loading...</span>
        </div>
      </div>
    );
  }

  if (!banner || (Array.isArray(banner) && banner.length === 0)) {
    return (
      <div className="banner-frame-wrapper">
        <div className="flex h-[45vh] min-h-[280px] items-center justify-center rounded-2xl bg-beige/30 sm:h-[55vh]">
          <span className="font-serif text-henna-brown/70">No Banner</span>
        </div>
      </div>
    );
  }

  const slides = Array.isArray(banner) ? banner : [banner];

  return (
    <div className="banner-frame-wrapper">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-luxury-lg sm:rounded-3xl">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect={slides.length > 1 ? "fade" : undefined}
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={slides.length > 1}
          speed={900}
          navigation={{
            prevEl: ".banner-prev",
            nextEl: ".banner-next",
          }}
          pagination={{ clickable: true, el: ".banner-pagination" }}
          className="h-[45vh] min-h-[280px] w-full sm:h-[55vh] sm:min-h-[380px] lg:h-[62vh]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/85 via-coffee-brown/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-coffee-brown/40 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-5 pb-8 sm:p-10 sm:pb-12 lg:p-14 lg:pb-16">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mb-3 inline-flex items-center gap-2 rounded-full border border-soft-gold/40 bg-coffee-brown/30 px-3 py-1 text-[10px] font-medium tracking-[0.25em] text-soft-gold backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.3em]"
                  >
                    PETALAND PATTERNART
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="max-w-2xl font-serif text-xl font-semibold leading-tight text-cream sm:text-3xl lg:text-5xl"
                  >
                    {slide.title}
                  </motion.h1>
                  {slide.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.45 }}
                      className="mt-2 max-w-md text-xs text-beige sm:mt-3 sm:text-base"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-4 h-[3px] rounded-full bg-gradient-to-r from-soft-gold to-henna-brown sm:mt-5 sm:w-14"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              className="banner-prev absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-coffee-brown/40 text-sm text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-henna-brown sm:left-4 sm:h-11 sm:w-11 sm:text-base"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              className="banner-next absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-coffee-brown/40 text-sm text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-henna-brown sm:right-4 sm:h-11 sm:w-11 sm:text-base"
            >
              <FaChevronRight />
            </button>

            <div className="banner-pagination absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2" />
          </>
        )}
      </div>
    </div>
  );
}

export default BannerSlider;