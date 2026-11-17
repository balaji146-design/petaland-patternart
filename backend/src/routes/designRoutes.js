import { Router } from "express";
import {
  getAllDesigns,
  getDesignById,
  getFeaturedDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
} from "../controllers/designController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadMultipleImages } from "../middleware/uploadMiddleware.js";
import {
  createDesignValidator,
  updateDesignValidator,
} from "../validators/designValidator.js";
import validateMiddleware from "../middleware/validateMiddleware.js";

const router = Router();

router.get("/featured", getFeaturedDesigns);
router.get("/", getAllDesigns);
router.get("/:id", getDesignById);

router.post(
  "/",
  protect,
  ...uploadMultipleImages("images", 5),
  createDesignValidator,
  validateMiddleware,
  createDesign
);

router.put(
  "/:id",
  protect,
  ...uploadMultipleImages("images", 5),
  updateDesignValidator,
  validateMiddleware,
  updateDesign
);

router.delete("/:id", protect, deleteDesign);

export default router;