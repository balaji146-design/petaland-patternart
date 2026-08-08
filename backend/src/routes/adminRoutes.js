import { Router } from "express";
import {
  getDashboardStats,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.get("/dashboard", getDashboardStats);
router.get("/profile", getAdminProfile);
router.put("/profile", updateAdminProfile);
router.put("/change-password", changePassword);

export default router;