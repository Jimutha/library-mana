import express from "express";
import { overview, dueSoon } from "../controllers/analyticsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/overview", protect, adminOnly, overview);
router.get("/due-soon", protect, adminOnly, dueSoon);

export default router;
