// import { Router } from "express";
// import {
//   getBanner,
//   uploadBanner,
//   updateBanner,
//   deleteBanner,
// } from "../controllers/bannerController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { uploadSingleImage } from "../middleware/uploadMiddleware.js";
// import {
//   uploadBannerValidator,
//   updateBannerValidator,
// } from "../validators/bannerValidator.js";
// import validateMiddleware from "../middleware/validateMiddleware.js";

// const router = Router();

// router.get("/", getBanner);

// router.post(
//   "/",
//   protect,
//   ...uploadSingleImage("image"),
//   uploadBannerValidator,
//   validateMiddleware,
//   uploadBanner
// );

// router.put(
//   "/:id",
//   protect,
//   ...uploadSingleImage("image"),
//   updateBannerValidator,
//   validateMiddleware,
//   updateBanner
// );

// router.delete("/:id", protect, deleteBanner);

// export default router;

import { Router } from "express";
import {
  getAllBanners,
  getCurrentBanner,
  uploadBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";
import {
  uploadBannerValidator,
  updateBannerValidator,
} from "../validators/bannerValidator.js";
import validateMiddleware from "../middleware/validateMiddleware.js";

const router = Router();

// ====================
// ADMIN
// ====================
router.get("/", getAllBanners);

// ====================
// FRONTEND
// ====================
router.get("/current", getCurrentBanner);

// ====================
// CREATE
// ====================
router.post(
  "/",
  protect,
  ...uploadSingleImage("image"),
  uploadBannerValidator,
  validateMiddleware,
  uploadBanner
);

// ====================
// UPDATE
// ====================
router.put(
  "/:id",
  protect,
  ...uploadSingleImage("image"),
  updateBannerValidator,
  validateMiddleware,
  updateBanner
);

// ====================
// DELETE
// ====================
router.delete("/:id", protect, deleteBanner);

export default router;