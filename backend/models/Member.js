import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }, // Link to User
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
