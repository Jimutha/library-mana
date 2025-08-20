import express from "express";
import {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", protect, adminOnly, createBook);
router.put("/:id", protect, adminOnly, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);

export default router;
