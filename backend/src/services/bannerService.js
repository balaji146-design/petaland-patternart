// import Banner from "../models/Banner.js";
// import supabaseService from "./supabaseService.js";

// async function getCurrentBanner() {
//   const banner = await Banner.getCurrent();

//   if (!banner) {
//     const error = new Error("No active banner found");
//     error.statusCode = 404;
//     throw error;
//   }

//   return banner;
// }

// async function uploadBanner(data, imageFile) {
//   if (!imageFile) {
//     const error = new Error("Banner image is required");
//     error.statusCode = 400;
//     throw error;
//   }

//   const imageUrl = await supabaseService.uploadImage(imageFile, "banners");

//   const banner = await Banner.create({
//     title: data.title,
//     subtitle: data.subtitle,
//     imageUrl,
//     isActive: true,
//   });

//   return banner;
// }

// async function updateBanner(id, data, imageFile) {
//   const existingBanner = await Banner.getCurrent();

//   let imageUrl;

//   if (imageFile) {
//     imageUrl = await supabaseService.uploadImage(imageFile, "banners");

//     if (existingBanner?.image_url) {
//       await supabaseService.deleteImage(existingBanner.image_url);
//     }
//   }

//   const updatedBanner = await Banner.update(id, {
//     title: data.title,
//     subtitle: data.subtitle,
//     imageUrl,
//     isActive: data.isActive,
//   });

//   return updatedBanner;
// }

// async function deleteBanner(id) {
//   const banner = await Banner.delete(id);

//   if (banner?.image_url) {
//     await supabaseService.deleteImage(banner.image_url);
//   }

//   return { id };
// }

// export default {
//   getCurrentBanner,
//   uploadBanner,
//   updateBanner,
//   deleteBanner,
// };

import Banner from "../models/Banner.js";
import supabaseService from "./supabaseService.js";

async function getCurrentBanner() {
  const banners = await Banner.getCurrent();
  // return empty array when none found (frontend can handle no-banner state)
  return banners || [];
}

async function getAllBanners() {
  return Banner.getAll();
}

async function uploadBanner(data, imageFile) {
  if (!imageFile) {
    const error = new Error("Banner image is required");
    error.statusCode = 400;
    throw error;
  }

  const imageUrl = await supabaseService.uploadBannerImage(imageFile);

  return Banner.create({
    title: data.title,
    subtitle: data.subtitle,
    image: imageUrl,
    isActive: data.isActive === "true" || data.isActive === true || data.isActive === undefined,
  });
}

async function updateBanner(id, data, imageFile) {
  let imageUrl;

  if (imageFile) {
    // get the banner being updated to remove its previous image
    const existing = await Banner.getById(id);
    imageUrl = await supabaseService.uploadBannerImage(imageFile);
    if (existing?.image) {
      await supabaseService.deleteImage(existing.image);
    }
  }

  return Banner.update(id, {
    title: data.title,
    subtitle: data.subtitle,
    image: imageUrl,
    isActive: data.isActive,
  });
}

async function deleteBanner(id) {
  const banner = await Banner.delete(id);
  if (banner?.image) {
    try {
      await supabaseService.deleteImage(banner.image);
    } catch (err) {
      // log and continue - don't fail delete if image cleanup fails
      console.error('Failed to delete banner image from storage:', err.message || err);
    }
  }
  return { id };
}

export default {
  getCurrentBanner,
  getAllBanners,
  uploadBanner,
  updateBanner,
  deleteBanner,
};