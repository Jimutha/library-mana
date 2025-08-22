// controllers/bookController.js
import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";

export const listBooks = asyncHandler(async (req, res) => {
  const { language, category, q, status, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (language) filter.bookLanguage = language;
  if (category) filter.category = category;
  if (q) filter.$text = { $search: q };
  if (status === "available") filter.copiesAvailable = { $gt: 0 };
  if (status === "onloan") filter.copiesAvailable = { $lte: 0 };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Book.countDocuments(filter),
  ]);
  res.json({
    success: true,
    data: { items, total, page: Number(page), limit: Number(limit) },
  });
});

export const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, data: book });
});

export const createBook = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    language,
    category,
    copiesTotal = 1,
    description = "",
  } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      bookLanguage: language,
      category,
      copiesTotal,
      copiesAvailable: copiesTotal,
      description,
    });
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
      throw new Error(`Validation error: ${error.message}`);
    }
    res.status(500);
    throw new Error("Failed to create book due to server error");
  }
});

export const updateBook = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  if (updates.language) {
    updates.bookLanguage = updates.language;
    delete updates.language;
  }
  if (updates.copiesTotal != null) {
    const current = await Book.findById(req.params.id);
    if (!current) {
      res.status(404);
      throw new Error("Book not found");
    }
    if (updates.copiesAvailable == null) {
      const delta = updates.copiesTotal - current.copiesTotal;
      updates.copiesAvailable = Math.max(0, current.copiesAvailable + delta);
    }
  }
  const book = await Book.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, data: book });
});

export const deleteBook = asyncHandler(async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, data: { _id: deleted._id } });
});
