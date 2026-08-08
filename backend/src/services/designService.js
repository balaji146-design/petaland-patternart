// import Design from "../models/Design.js";
// import supabaseService from "./supabaseService.js";

// async function getAllDesigns(filters = {}) {
//   const designs = await Design.getAll(filters);
//   return designs;
// }

// async function getDesignById(id) {
//   const design = await Design.getById(id);

//   if (!design) {
//     const error = new Error("Design not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   return design;
// }

// async function getFeaturedDesigns() {
//   const designs = await Design.getFeatured();
//   return designs;
// }

// async function getDesignsByCategory(category) {
//   const designs = await Design.getAll({ category });
//   return designs;
// }

// async function createDesign(data, imageFile) {
//   if (!imageFile) {
//     const error = new Error("Design image is required");
//     error.statusCode = 400;
//     throw error;
//   }

//   const imageUrl = await supabaseService.uploadImage(imageFile, "designs");

//   const design = await Design.create({
//     name: data.name,
//     category: data.category,
//     description: data.description,
//     imageUrl,
//     actualPrice: Number(data.actualPrice),
//     offerPrice: Number(data.offerPrice),
//     isFeatured: data.isFeatured === "true" || data.isFeatured === true,
//   });

//   return design;
// }

// async function updateDesign(id, data, imageFile) {
//   const existingDesign = await Design.getById(id);

//   if (!existingDesign) {
//     const error = new Error("Design not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   let imageUrl = existingDesign.image_url;

//   if (imageFile) {
//     imageUrl = await supabaseService.uploadImage(imageFile, "designs");
//     await supabaseService.deleteImage(existingDesign.image_url);
//   }

//   const updatedDesign = await Design.update(id, {
//     name: data.name,
//     category: data.category,
//     description: data.description,
//     imageUrl,
//     actualPrice: data.actualPrice ? Number(data.actualPrice) : undefined,
//     offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
//     isFeatured:
//       data.isFeatured !== undefined
//         ? data.isFeatured === "true" || data.isFeatured === true
//         : undefined,
//   });

//   return updatedDesign;
// }

// async function deleteDesign(id) {
//   const existingDesign = await Design.getById(id);

//   if (!existingDesign) {
//     const error = new Error("Design not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   await Design.delete(id);
//   await supabaseService.deleteImage(existingDesign.image_url);

//   return { id };
// }

// export default {
//   getAllDesigns,
//   getDesignById,
//   getFeaturedDesigns,
//   getDesignsByCategory,
//   createDesign,
//   updateDesign,
//   deleteDesign,
// };

// import Design from "../models/Design.js";
// import supabaseService from "./supabaseService.js";

// async function getAllDesigns(filters = {}) {
//   return Design.getAll(filters);
// }

// async function getDesignById(id) {
//   const design = await Design.getById(id);
//   if (!design) {
//     const error = new Error("Design not found");
//     error.statusCode = 404;
//     throw error;
//   }
//   return design;
// }

// async function getFeaturedDesigns() {
//   return Design.getFeatured();
// }

// async function createDesign(data, imageFile) {
//   if (!imageFile) {
//     const error = new Error("Design image is required");
//     error.statusCode = 400;
//     throw error;
//   }

//   const imageUrl = await supabaseService.uploadDesignImage(imageFile);

//   const actual = Number(data.actualPrice);
//   const offer =
//     data.offerPrice !== undefined && data.offerPrice !== null && data.offerPrice !== ''
//       ? Number(data.offerPrice)
//       : actual;

//   return Design.create({
//     categoryId: data.categoryId,
//     name: data.name,
//     description: data.description,
//     image: imageUrl,
//     actualPrice: actual,
//     offerPrice: offer,
//     featured: data.featured === "true" || data.featured === true,
//   });
// }

// async function updateDesign(id, data, imageFile) {
//   const existingDesign = await Design.getById(id);
//   if (!existingDesign) {
//     const error = new Error("Design not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   let imageUrl = existingDesign.image;

//   if (imageFile) {
//     imageUrl = await supabaseService.uploadDesignImage(imageFile);
//     await supabaseService.deleteImage(existingDesign.image);
//   }

//   return Design.update(id, {
//     categoryId: data.categoryId,
//     name: data.name,
//     description: data.description,
//     image: imageUrl,
//     actualPrice: data.actualPrice ? Number(data.actualPrice) : undefined,
//     offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
//     featured:
//       data.featured !== undefined
//         ? data.featured === "true" || data.featured === true
//         : undefined,
//   });
// }

// async function deleteDesign(id) {
//   const existingDesign = await Design.getById(id);
//   if (!existingDesign) {
//     const error = new Error("Design not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   await Design.delete(id);
//   await supabaseService.deleteImage(existingDesign.image);

//   return { id };
// }

// export default {
//   getAllDesigns,
//   getDesignById,
//   getFeaturedDesigns,
//   createDesign,
//   updateDesign,
//   deleteDesign,
// };

import Design from "../models/Design.js";
import supabaseService from "./supabaseService.js";

async function getAllDesigns(filters = {}) {
  return Design.getAll(filters);
}

async function getDesignById(id) {
  const design = await Design.getById(id);
  if (!design) {
    const error = new Error("Design not found");
    error.statusCode = 404;
    throw error;
  }
  return design;
}

async function getFeaturedDesigns() {
  return Design.getFeatured();
}

async function createDesign(data, imageFile) {
  if (!imageFile) {
    const error = new Error("Design image is required");
    error.statusCode = 400;
    throw error;
  }

  const imageUrl = await supabaseService.uploadDesignImage(imageFile);

  const actual = Number(data.actualPrice);
  const offer =
    data.offerPrice !== undefined && data.offerPrice !== null && data.offerPrice !== ''
      ? Number(data.offerPrice)
      : actual;

  return Design.create({
    categoryId: data.categoryId,
    name: data.name,
    description: data.description,
    image: imageUrl,
    actualPrice: actual,
    offerPrice: offer,
    featured: data.featured === "true" || data.featured === true,
  });
}

async function updateDesign(id, data, imageFile) {
  const existingDesign = await Design.getById(id);
  if (!existingDesign) {
    const error = new Error("Design not found");
    error.statusCode = 404;
    throw error;
  }

  let imageUrl = existingDesign.image_url;

  if (imageFile) {
    imageUrl = await supabaseService.uploadDesignImage(imageFile);
    try {
      await supabaseService.deleteImage(existingDesign.image_url);
    } catch (err) {
      console.error('Failed to delete old design image from storage:', err.message || err);
    }
  }

  return Design.update(id, {
    categoryId: data.categoryId,
    name: data.name,
    description: data.description,
    image: imageUrl,
    actualPrice: data.actualPrice ? Number(data.actualPrice) : undefined,
    offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
    featured:
      data.featured !== undefined
        ? data.featured === "true" || data.featured === true
        : undefined,
  });
}

async function deleteDesign(id) {
  const existingDesign = await Design.getById(id);
  if (!existingDesign) {
    const error = new Error("Design not found");
    error.statusCode = 404;
    throw error;
  }

  await Design.delete(id);

  try {
    await supabaseService.deleteImage(existingDesign.image_url);
  } catch (err) {
    console.error('Failed to delete design image from storage:', err.message || err);
  }

  return { id };
}

export default {
  getAllDesigns,
  getDesignById,
  getFeaturedDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
};