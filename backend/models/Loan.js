import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    borrowedAt: { type: Date, default: () => new Date() },
    dueAt: { type: Date, required: true },
    returnedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ["BORROWED", "RETURNED"],
      default: "BORROWED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);
