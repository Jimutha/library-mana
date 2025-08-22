import express from "express";
import {
  listMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Allow non-admins to create their own member on registration
router.get("/", protect, adminOnly, listMembers);
router.get("/:id", protect, adminOnly, getMember);
router.post("/", protect, createMember); // Removed adminOnly for registration
router.put("/:id", protect, adminOnly, updateMember);
router.delete("/:id", protect, adminOnly, deleteMember);

export default router;
