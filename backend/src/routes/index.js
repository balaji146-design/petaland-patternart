import { Router } from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import designRoutes from "./designRoutes.js";
import bannerRoutes from "./bannerRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import contactRoutes from "./contactRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/designs", designRoutes);
router.use("/banners", bannerRoutes);
router.use("/categories", categoryRoutes);
router.use("/contact", contactRoutes);

export default router;