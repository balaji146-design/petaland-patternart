// import { Router } from "express";
// import { login, logout, getProfile } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = Router();

// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/profile", protect, getProfile);

// export default router;

import { Router } from "express";
import { login, logout, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { loginValidator } from "../validators/authValidator.js";
import validateMiddleware from "../middleware/validateMiddleware.js";

const router = Router();

router.post("/login", loginValidator, validateMiddleware, login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

export default router;