import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }
    next();
  } catch (e) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  res.status(403);
  throw new Error("Admin access required");
};
