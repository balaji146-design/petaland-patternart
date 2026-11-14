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

const CATEGORY_IMAGE_MAP = {
  "bridal henna": "/assets/images/category-bridal.svg",
  "arabic henna": "/assets/images/category-arabic.svg",
  "traditional mehndi": "/assets/images/category-traditional.svg",
  "minimalist henna": "/assets/images/category-minimalist.svg",
  "kids henna": "/assets/images/category-kids.svg",
  "party henna": "/assets/images/category-party.svg",
  "festival henna": "/assets/images/category-festival.svg",
  "engagement henna": "/assets/images/category-engagement.svg",
};

const DEFAULT_CATEGORY_IMAGE = "/assets/images/category-default.svg";

export function getCategoryImage(categoryName) {
  if (!categoryName) return DEFAULT_CATEGORY_IMAGE;
  const key = categoryName.trim().toLowerCase();
  return CATEGORY_IMAGE_MAP[key] || DEFAULT_CATEGORY_IMAGE;
}

export default getCategoryImage;