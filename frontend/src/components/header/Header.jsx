// import { FaWhatsapp, FaInstagram } from "react-icons/fa";

// function Header() {
//   return (
//     <div className="hidden w-full bg-coffee-brown text-cream sm:block">
//       <div className="container-luxury flex items-center justify-between py-2 text-xs tracking-wide sm:text-sm">
//         <p className="font-serif italic text-soft-gold">
//           Premium Henna Artistry, Crafted for You
//         </p>

//         <div className="flex items-center gap-5">
          
//           <a
//             href="https://wa.me/6369960501"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 transition-colors duration-300 hover:text-soft-gold"
//           >
//             <FaWhatsapp className="text-base" />
//             <span>+91 63699 60501</span>
//           </a>

//             <a          
//             href="https://instagram.com/petalandpatternart"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 transition-colors duration-300 hover:text-soft-gold"
//           >
//             <FaInstagram className="text-base" />
//             <span>@petalandpatternart</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;

import { FaWhatsapp, FaInstagram } from "react-icons/fa";

function Header() {
  return (
    <div className="hidden w-full bg-coffee-brown text-cream sm:block">
      <div className="container-luxury flex flex-col items-center justify-between gap-1 py-2 text-xs sm:flex-row sm:gap-4 sm:text-sm">
        <p className="truncate font-serif italic text-soft-gold">
          Premium Henna Artistry, Crafted for You
        </p>

        <div className="flex flex-shrink-0 items-center gap-4 sm:gap-5">
          <a
            href="https://wa.me/916369960501"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors duration-300 hover:text-soft-gold"
          >
            <FaWhatsapp className="text-sm sm:text-base" />
            <span>+91 63699 60501</span>
          </a>

          <a
            href="https://instagram.com/petalandpatternart"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors duration-300 hover:text-soft-gold"
          >
            <FaInstagram className="text-sm sm:text-base" />
            <span>@petalandpatternart</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;