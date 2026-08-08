export const APP_NAME = "Petaland Patternart";

export const APP_TAGLINE = "Premium Henna Artistry, Crafted for You";

export const WHATSAPP_NUMBER = "6369960501";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const SOCIAL_LINKS = {
  whatsapp: WHATSAPP_LINK,
  instagram: "https://instagram.com/petalandpatternart",
  facebook: "https://facebook.com/petalandpatternart",
};

export const BUSINESS_DETAILS = {
  email: "hello@petalandpatternart.com",
  address: "Available for bookings worldwide",
  workingHours: "Mon - Sun: 9:00 AM - 8:00 PM",
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  designs: "/designs",
  featuredDesigns: "/designs/featured",
  designById: (id) => `/designs/${id}`,
  categories: "/categories",
  categoryById: (id) => `/categories/${id}`,
  banners: "/banners",
  bannerById: (id) => `/banners/${id}`,
  contact: "/contact",
  auth: {
    login: "/auth/login",
    profile: "/auth/profile",
  },
};

export const DEFAULT_THEME = {
  colors: {
    cream: "#FBF6EE",
    beige: "#E9DCC9",
    coffeeBrown: "#4B3621",
    hennaBrown: "#7A3E1D",
    softGold: "#C9A24B",
  },
  fonts: {
    serif: "'Playfair Display', 'Georgia', serif",
    sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  },
};

export const STORAGE_KEYS = {
  token: "token",
  adminProfile: "adminProfile",
};

export default {
  APP_NAME,
  APP_TAGLINE,
  WHATSAPP_NUMBER,
  WHATSAPP_LINK,
  SOCIAL_LINKS,
  BUSINESS_DETAILS,
  API_BASE_URL,
  API_ENDPOINTS,
  DEFAULT_THEME,
  STORAGE_KEYS,
};