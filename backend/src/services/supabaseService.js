// import { createClient } from "@supabase/supabase-js";
// import fs from "fs";
// import path from "path";
// import env from "../config/env.js";

// const supabase = createClient(
//   env.supabase.url,
//   env.supabase.serviceRoleKey,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   }
// );

// const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// const MAX_FILE_SIZE = 10 * 1024 * 1024;

// function validateImageFile(file) {
//   if (!file) {
//     const error = new Error("No image file provided");
//     error.statusCode = 400;
//     throw error;
//   }

//   if (!allowedMimeTypes.includes(file.mimetype)) {
//     const error = new Error(
//       "Invalid image format. Only jpg, jpeg, png and webp are allowed"
//     );
//     error.statusCode = 400;
//     throw error;
//   }

//   if (file.size > MAX_FILE_SIZE) {
//     const error = new Error("Image size must not exceed 10MB");
//     error.statusCode = 400;
//     throw error;
//   }

//   return true;
// }

// async function uploadImage(file, folder = "designs") {
//   try {
//     validateImageFile(file);

//     const fileBuffer = fs.readFileSync(file.path);
//     const fileExt = path.extname(file.originalname).toLowerCase();
//     const fileName = `${folder}/${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${fileExt}`;

//     const { error: uploadError } = await supabase.storage
//       .from(env.supabase.bucket)
//       .upload(fileName, fileBuffer, {
//         contentType: file.mimetype,
//         upsert: false,
//       });

//     fs.unlink(file.path, () => {});

//     if (uploadError) {
//       const error = new Error(`Supabase upload failed: ${uploadError.message}`);
//       error.statusCode = 500;
//       throw error;
//     }

//     return getPublicUrl(fileName);
//   } catch (error) {
//     if (file?.path && fs.existsSync(file.path)) {
//       fs.unlink(file.path, () => {});
//     }
//     throw error;
//   }
// }

// function getPublicUrl(filePath) {
//   const { data } = supabase.storage
//     .from(env.supabase.bucket)
//     .getPublicUrl(filePath);

//   if (!data?.publicUrl) {
//     const error = new Error("Failed to generate public URL for image");
//     error.statusCode = 500;
//     throw error;
//   }

//   return data.publicUrl;
// }

// function extractStoragePath(publicUrl) {
//   const marker = `/object/public/${env.supabase.bucket}/`;
//   const index = publicUrl.indexOf(marker);

//   if (index === -1) {
//     return null;
//   }

//   return publicUrl.substring(index + marker.length);
// }

// async function deleteImage(publicUrl) {
//   try {
//     if (!publicUrl) return;

//     const storagePath = extractStoragePath(publicUrl);

//     if (!storagePath) {
//       return;
//     }

//     const { error } = await supabase.storage
//       .from(env.supabase.bucket)
//       .remove([storagePath]);

//     if (error) {
//       const err = new Error(`Failed to delete image: ${error.message}`);
//       err.statusCode = 500;
//       throw err;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   uploadImage,
//   deleteImage,
//   getPublicUrl,
//   validateImageFile,
// };


// import fs from "fs";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";
// import supabaseClient from "../config/supabase.js";
// import env from "../config/env.js";
// import logger from "../utils/logger.js";

// const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// const MAX_FILE_SIZE = 10 * 1024 * 1024;

// function validateImageFile(file) {
//   if (!file) {
//     const error = new Error("No image file provided");
//     error.statusCode = 400;
//     throw error;
//   }

//   if (!allowedMimeTypes.includes(file.mimetype)) {
//     const error = new Error(
//       "Invalid image format. Only jpg, jpeg, png and webp are allowed"
//     );
//     error.statusCode = 400;
//     throw error;
//   }

//   if (file.size > MAX_FILE_SIZE) {
//     const error = new Error("Image size must not exceed 10MB");
//     error.statusCode = 400;
//     throw error;
//   }

//   return true;
// }

// async function uploadToStorage(file, folder) {
//   try {
//     validateImageFile(file);

//     const fileBuffer = fs.readFileSync(file.path);
//     const fileExt = path.extname(file.originalname).toLowerCase();
//     // const uniqueFileName = `${folder}/${uuidv4()}${fileExt}`;
//     const uniqueFileName = `${uuidv4()}${fileExt}`;

// console.log("Bucket Name:", env.supabase.bucket);
// console.log("Folder:", folder);


//     const { error: uploadError } = await supabaseClient.storage
//       // .from(env.supabase.bucket)
//       .from(folder)
//       .upload(uniqueFileName, fileBuffer, {
//         contentType: file.mimetype,
//         upsert: false,
//       });

//     fs.unlink(file.path, () => {});

//     if (uploadError) {
//       logger.error(`Supabase upload failed: ${uploadError.message}`);
//       const error = new Error(`Image upload failed: ${uploadError.message}`);
//       error.statusCode = 500;
//       throw error;
//     }

//     // const publicUrl = getPublicUrl(uniqueFileName);
//     const publicUrl = getPublicUrl(folder, uniqueFileName);

//     logger.info(`Image uploaded successfully: ${uniqueFileName}`);

//     return publicUrl;
//   } catch (error) {
//     if (file?.path && fs.existsSync(file.path)) {
//       fs.unlink(file.path, () => {});
//     }
//     throw error;
//   }
// }

// async function uploadDesignImage(file) {
//   return uploadToStorage(file, "designs");
// }

// async function uploadBannerImage(file) {
//   return uploadToStorage(file, "banners");
// }

// // function getPublicUrl(storagePath) {
// //   const { data } = supabaseClient.storage
// //     .from(env.supabase.bucket)
// //     .getPublicUrl(storagePath);

// //   if (!data?.publicUrl) {
// //     const error = new Error("Failed to generate public URL for image");
// //     error.statusCode = 500;
// //     throw error;
// //   }

// //   return data.publicUrl;
// // }

// function getPublicUrl(bucket, storagePath) {
//   const { data } = supabaseClient.storage
//     .from(bucket)
//     .getPublicUrl(storagePath);

//   if (!data?.publicUrl) {
//     throw new Error("Failed to generate public URL");
//   }

//   return data.publicUrl;
// }

// // function extractStoragePath(publicUrl) {
// //   const marker = `/object/public/${env.supabase.bucket}/`;
// function extractStoragePath(publicUrl, bucket) {
//   const marker = `/object/public/${bucket}/`;
//   const index = publicUrl.indexOf(marker);

//   if (index === -1) {
//     return null;
//   }

//   return publicUrl.substring(index + marker.length);
// }

// async function deleteImage(pathOrUrl) {
//   try {
//     if (!pathOrUrl) return;

//     const storagePath = pathOrUrl.startsWith("http")
//       ? extractStoragePath(pathOrUrl)
//       : pathOrUrl;

//     if (!storagePath) {
//       logger.warn(`Could not resolve storage path for: ${pathOrUrl}`);
//       return;
//     }

//     const { error } = await supabaseClient.storage
//       // .from(env.supabase.bucket)
//       .from(bucket)
//       .remove([storagePath]);

//     if (error) {
//       logger.error(`Failed to delete image: ${error.message}`);
//       const err = new Error(`Failed to delete image: ${error.message}`);
//       err.statusCode = 500;
//       throw err;
//     }

//     logger.info(`Image deleted successfully: ${storagePath}`);
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   uploadDesignImage,
//   uploadBannerImage,
//   deleteImage,
//   getPublicUrl,
//   validateImageFile,
// };

import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import supabaseClient from "../config/supabase.js";

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function validateImageFile(file) {
  if (!file) throw new Error("No image");

  if (!allowedMimeTypes.includes(file.mimetype))
    throw new Error("Invalid image type");

  if (file.size > MAX_FILE_SIZE)
    throw new Error("Image too large");
}

async function upload(file, bucket) {
  validateImageFile(file);

  const ext = path.extname(file.originalname);

  const filename = `${uuid()}${ext}`;

  const buffer = fs.readFileSync(file.path);

  const { error } = await supabaseClient.storage
    .from(bucket)
    .upload(filename, buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  fs.unlinkSync(file.path);

  if (error) throw error;

  const { data } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(filename);

  return data.publicUrl;
}

async function uploadBannerImage(file) {
  return upload(file, "banners");
}

async function uploadDesignImage(file) {
  return upload(file, "designs");
}

async function deleteImage(url) {
  if (!url) return;

  const match = url.match(/\/object\/public\/([^/]+)\/(.+)$/);

  if (!match) return;

  const bucket = match[1];
  const file = match[2];

  const { error } = await supabaseClient.storage
    .from(bucket)
    .remove([file]);

  if (error) console.log(error.message);
}

export default {
  uploadBannerImage,
  uploadDesignImage,
  deleteImage,
};