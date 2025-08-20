import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    memberId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String },
    address: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
