// const CATEGORY_IMAGE_MAP = {
//   "bridal henna":
//     "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
//   "arabic henna":
//     "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
//   "traditional mehndi":
//     "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
//   "minimalist henna":
//     "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
//   "kids henna":
//     "https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=600&q=80",
//   "party henna":
//     "https://images.unsplash.com/photo-1587691592099-24045742c181?w=600&q=80",
// };

// const DEFAULT_CATEGORY_IMAGE =
//   "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80";

// export function getCategoryImage(categoryName) {
//   if (!categoryName) return DEFAULT_CATEGORY_IMAGE;
//   const key = categoryName.trim().toLowerCase();
//   return CATEGORY_IMAGE_MAP[key] || DEFAULT_CATEGORY_IMAGE;
// }

// export default getCategoryImage;

// frontend/src/utils/categoryImages.js — complete replacement
const CATEGORY_IMAGE_MAP = {
  "bridal henna": "https://loremflickr.com/600/600/henna,bridal,wedding",
  "arabic henna": "https://loremflickr.com/600/600/henna,arabic",
  "traditional mehndi": "https://loremflickr.com/600/600/mehndi,traditional",
  "minimalist henna": "https://loremflickr.com/600/600/henna,minimal",
  "kids henna": "https://loremflickr.com/600/600/henna,children",
  "party henna": "https://loremflickr.com/600/600/henna,party",
  "festival henna": "https://loremflickr.com/600/600/henna,festival",
  "engagement henna": "https://loremflickr.com/600/600/henna,engagement",
};

const DEFAULT_CATEGORY_IMAGE = "https://loremflickr.com/600/600/henna,mehndi";

export function getCategoryImage(categoryName) {
  if (!categoryName) return DEFAULT_CATEGORY_IMAGE;
  const key = categoryName.trim().toLowerCase();
  return CATEGORY_IMAGE_MAP[key] || DEFAULT_CATEGORY_IMAGE;
}

export default getCategoryImage;