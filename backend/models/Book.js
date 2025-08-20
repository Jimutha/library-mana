import mongoose from "mongoose";
import { LANGUAGES, CATEGORIES } from "../utils/constants.js";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: "text" },
    author: { type: String, required: true, index: true },
    language: { type: String, enum: LANGUAGES, required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    copiesTotal: { type: Number, default: 1, min: 0 },
    copiesAvailable: { type: Number, default: 1, min: 0 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
