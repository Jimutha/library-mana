import express from "express";
import {
  listLoans,
  borrow,
  returnBook,
} from "../controllers/loanController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Viewing loans requires login, returning/borrowing requires login
router.get("/", protect, listLoans);
router.post("/", protect, borrow);
router.put("/:id/return", protect, returnBook);

export default router;
