import asyncHandler from "express-async-handler";
import Loan from "../models/Loan.js";
import Book from "../models/Book.js";
import User from "../models/User.js"; // Added User import
import { DURATIONS } from "../utils/constants.js";

export const listLoans = asyncHandler(async (req, res) => {
  const { status, userId, bookId, overdue } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (userId) filter.userId = userId;
  if (bookId) filter.bookId = bookId;
  if (overdue === "true") {
    filter.status = "BORROWED";
    filter.dueAt = { $lt: new Date() };
  }
  const loans = await Loan.find(filter)
    .populate("bookId")
    .populate("userId")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: loans });
});

// POST /api/loans  Body: { bookId, userId, durationDays }
export const borrow = asyncHandler(async (req, res) => {
  const { bookId, userId, durationDays } = req.body; // Changed from customMemberId to userId

  console.log("Borrow request received:", { bookId, userId, durationDays }); // Debug log
  if (!DURATIONS.includes(Number(durationDays))) {
    res.status(400);
    throw new Error("Invalid duration");
  }
  const [book, user] = await Promise.all([
    Book.findById(bookId),
    User.findById(userId).lean(), // Use User model directly
  ]);
  console.log("Found book:", book); // Debug log
  console.log("Found user:", user); // Debug log
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (book.copiesAvailable <= 0) {
    res.status(409);
    throw new Error("No copies available");
  }

  const now = new Date();
  const dueAt = new Date(now.getTime() + Number(durationDays) * 86400000);

  const session = await Book.startSession();
  session.startTransaction();
  try {
    const loan = await Loan.create(
      [{ bookId, userId, borrowedAt: now, dueAt }],
      { session }
    );
    book.copiesAvailable -= 1;
    await book.save({ session });
    await session.commitTransaction();
    res.status(201).json({ success: true, data: loan[0] });
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});

// PUT /api/loans/:id/return
export const returnBook = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) {
    res.status(404);
    throw new Error("Loan not found");
  }
  if (loan.status === "RETURNED")
    return res.json({ success: true, data: loan });

  const session = await Loan.startSession();
  session.startTransaction();
  try {
    loan.status = "RETURNED";
    loan.returnedAt = new Date();
    await loan.save({ session });

    const book = await Book.findById(loan.bookId).session(session);
    if (book) {
      book.copiesAvailable += 1;
      await book.save({ session });
    }
    await session.commitTransaction();
    res.json({ success: true, data: loan });
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});
