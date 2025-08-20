import asyncHandler from "express-async-handler";
import Loan from "../models/Loan.js";
import Book from "../models/Book.js";
import Member from "../models/Member.js";
import { DURATIONS } from "../utils/constants.js";

export const listLoans = asyncHandler(async (req, res) => {
  const { status, memberId, bookId, overdue } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (memberId) filter.memberId = memberId;
  if (bookId) filter.bookId = bookId;
  if (overdue === "true") {
    filter.status = "BORROWED";
    filter.dueAt = { $lt: new Date() };
  }
  const loans = await Loan.find(filter)
    .populate("bookId")
    .populate("memberId")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: loans });
});

// POST /api/loans  Body: { bookId, memberId, durationDays }
export const borrow = asyncHandler(async (req, res) => {
  const { bookId, memberId, durationDays } = req.body;

  if (!DURATIONS.includes(Number(durationDays))) {
    res.status(400);
    throw new Error("Invalid duration");
  }
  const [book, member] = await Promise.all([
    Book.findById(bookId),
    Member.findById(memberId),
  ]);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
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
      [{ bookId, memberId, borrowedAt: now, dueAt }],
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
