// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { HiMenu, HiX } from "react-icons/hi";
// import petalandLogo from "../../assets/logo/logo.jpeg";

// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "Designs", path: "/designs" },
//   { name: "Categories", path: "/categories" },
//   { name: "About", path: "/about" },
//   { name: "Contact", path: "/contact" },
// ];

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//   }, [isOpen]);

//   return (
//     <nav
//       className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
//         isScrolled
//           ? "bg-cream/95 border-beige-dark shadow-luxury backdrop-blur-sm"
//           : "bg-cream border-transparent"
//       }`}
//     >
//       <div className="container-luxury flex items-center justify-between py-4">
//         <NavLink to="/" className="flex items-center gap-2 lg:gap-3">
//           <img
//             src={petalandLogo}
//             alt="PETALAND PATTERNART"
//             className="h-12 w-auto sm:h-14 md:h-16 transition-transform duration-300 hover:scale-105"
//           />
//         </NavLink>

//         <ul className="hidden items-center gap-10 md:flex">
//           {navLinks.map((link) => (
//             <li key={link.path} className="relative">
//               <NavLink
//                 to={link.path}
//                 end={link.path === "/"}
//                 className={({ isActive }) =>
//                   `relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
//                     isActive
//                       ? "text-henna-brown"
//                       : "text-coffee-brown hover:text-henna-brown"
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     {link.name}
//                     <motion.span
//                       initial={false}
//                       animate={{ width: isActive ? "100%" : "0%" }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       className="absolute -bottom-1 left-0 h-[2px] bg-soft-gold"
//                     />
//                   </>
//                 )}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         <button
//           type="button"
//           aria-label="Toggle menu"
//           onClick={() => setIsOpen((prev) => !prev)}
//           className="text-2xl text-henna-brown md:hidden"
//         >
//           {isOpen ? <HiX /> : <HiMenu />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden border-t border-beige-dark bg-cream md:hidden"
//           >
//             <ul className="container-luxury flex flex-col gap-1 py-4">
//               {navLinks.map((link) => (
//                 <li key={link.path}>
//                   <NavLink
//                     to={link.path}
//                     end={link.path === "/"}
//                     onClick={() => setIsOpen(false)}
//                     className={({ isActive }) =>
//                       `block rounded-md px-3 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${
//                         isActive
//                           ? "bg-beige text-henna-brown"
//                           : "text-coffee-brown hover:bg-beige/60 hover:text-henna-brown"
//                       }`
//                     }
//                   >
//                     {link.name}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// export default Navbar;

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import petalandLogo from "../../assets/logo/logo.jpeg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Designs", path: "/designs" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-cream/95 border-beige-dark shadow-luxury backdrop-blur-sm"
          : "bg-cream border-transparent"
      }`}
    >
      <div className="container-luxury flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2.5 lg:gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-coffee-brown bg-cream shadow-md transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-14">
            <img
              src={petalandLogo}
              alt="PETALAND PATTERNART"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base font-semibold text-henna-brown">
              PETALAND
            </span>
            <span className="text-[10px] tracking-[0.3em] text-coffee-brown">
              PATTERNART
            </span>
          </div>
        </NavLink>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.path} className="relative">
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-henna-brown"
                      : "text-coffee-brown hover:text-henna-brown"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <motion.span
                      initial={false}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="pointer-events-none absolute -bottom-1 left-0 block h-[2px] rounded-full bg-soft-gold"
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-2xl text-henna-brown md:hidden"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-beige-dark bg-cream md:hidden"
          >
            <ul className="container-luxury flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive
                          ? "bg-beige text-henna-brown"
                          : "text-coffee-brown hover:bg-beige/60 hover:text-henna-brown"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;