import asyncHandler from "express-async-handler";
import Loan from "../models/Loan.js";

// GET /api/analytics/overview
export const overview = asyncHandler(async (req, res) => {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const byGenre = await Loan.aggregate([
    { $match: { status: "BORROWED" } },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    { $group: { _id: "$book.category", count: { $sum: 1 } } },
    { $project: { _id: 0, category: "$_id", count: 1 } },
  ]);

  const byLanguage = await Loan.aggregate([
    { $match: { status: "BORROWED" } },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    { $group: { _id: "$book.language", count: { $sum: 1 } } },
    { $project: { _id: 0, language: "$_id", count: 1 } },
  ]);

  const topRecent = await Loan.aggregate([
    { $match: { borrowedAt: { $gte: since } } },
    { $group: { _id: "$bookId", borrowCount: { $sum: 1 } } },
    { $sort: { borrowCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    {
      $project: {
        _id: 0,
        bookId: "$book._id",
        title: "$book.title",
        borrowCount: 1,
      },
    },
  ]);

  res.json({ success: true, data: { byGenre, byLanguage, topRecent } });
});

// GET /api/analytics/due-soon?days=3
export const dueSoon = asyncHandler(async (req, res) => {
  const days = Number(req.query.days ?? 3);
  const now = new Date();
  const to = new Date(now.getTime() + days * 86400000);

  const loans = await Loan.find({
    status: "BORROWED",
    dueAt: { $gte: now, $lte: to },
  })
    .populate("bookId")
    .populate("memberId")
    .sort({ dueAt: 1 });

  const list = loans.map((l) => ({
    memberName: l.memberId?.name,
    bookTitle: l.bookId?.title,
    dueAt: l.dueAt,
  }));

  res.json({ success: true, data: list });
});
