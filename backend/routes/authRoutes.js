import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register); // for seeding/admin use
router.post("/login", login);
router.get("/me", protect, me);

export default router;
