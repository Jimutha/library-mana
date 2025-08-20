import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Member from "../models/Member.js";
import Book from "../models/Book.js";

dotenv.config();

const run = async () => {
  await connectDB();

  console.log("🔄 Clearing collections...");
  await Promise.all([
    User.deleteMany({}),
    Member.deleteMany({}),
    Book.deleteMany({}),
  ]);

  console.log("👤 Creating users...");
  const [admin, user] = await User.create([
    {
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    {
      name: "User One",
      email: "user@example.com",
      password: "user123",
      role: "user",
    },
  ]);

  console.log("🧑‍🤝‍🧑 Creating members...");
  const [m1, m2] = await Member.create([
    {
      memberId: "MBR-0001",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+94 11 111 1111",
      address: "Colombo",
    },
    {
      memberId: "MBR-0002",
      name: "John Wick",
      email: "john@example.com",
      phone: "+94 77 222 3333",
      address: "Kandy",
    },
  ]);

  console.log("📚 Creating books...");
  await Book.create([
    {
      title: "The Hidden Temple",
      author: "A. Silva",
      language: "Sinhala",
      category: "adventure",
      copiesTotal: 3,
      copiesAvailable: 3,
      description: "Adventure in Sri Lanka",
    },
    {
      title: "Space Beyond",
      author: "N. Perera",
      language: "English",
      category: "science fiction",
      copiesTotal: 2,
      copiesAvailable: 2,
      description: "Sci-fi odyssey",
    },
    {
      title: "Little Learners",
      author: "K. Fernando",
      language: "Other",
      category: "kids",
      copiesTotal: 4,
      copiesAvailable: 4,
      description: "Kids education",
    },
  ]);

  console.log("✅ Seeded:");
  console.log("- Admin: admin@example.com / admin123");
  console.log("- User:  user@example.com / user123");
  console.log("- Members: MBR-0001, MBR-0002");
  console.log("- Books: 3 sample books");

  await mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
