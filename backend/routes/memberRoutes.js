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

// Members are managed by admin
router.get("/", protect, adminOnly, listMembers);
router.get("/:id", protect, adminOnly, getMember);
router.post("/", protect, adminOnly, createMember);
router.put("/:id", protect, adminOnly, updateMember);
router.delete("/:id", protect, adminOnly, deleteMember);

export default router;
