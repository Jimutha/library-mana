import asyncHandler from "express-async-handler";
import Member from "../models/Member.js";
import Loan from "../models/Loan.js";

export const listMembers = asyncHandler(async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json({ success: true, data: members });
});

export const getMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }
  res.json({ success: true, data: member });
});

export const createMember = asyncHandler(async (req, res) => {
  const { memberId, name, email, phone, address } = req.body;
  const exists = await Member.findOne({ memberId });
  if (exists) {
    res.status(400);
    throw new Error("memberId already exists");
  }
  const member = await Member.create({ memberId, name, email, phone, address });
  res.status(201).json({ success: true, data: member });
});

export const updateMember = asyncHandler(async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }
  res.json({ success: true, data: member });
});

export const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }
  await Loan.deleteMany({ memberId: member._id });
  res.json({ success: true, data: { _id: member._id } });
});
