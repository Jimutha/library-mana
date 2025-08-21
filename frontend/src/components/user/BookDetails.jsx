import React, { useState } from "react";
import api from "../../services/api";

export default function BookDetails({ book, memberId, onBack }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBorrow = async () => {
    setLoading(true);
    setMessage("");
    try {
      await api.post("/loans", { bookId: book._id, memberId });
      setMessage("Book borrowed successfully!");
    } catch (err) {
      setMessage("Failed to borrow book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-400 text-white px-3 py-1 rounded"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p className="mb-1">Author: {book.author}</p>
      <p className="mb-1">Language: {book.language}</p>
      <p className="mb-1">Category: {book.category}</p>
      <p className="mb-1">Available Copies: {book.availableCopies}</p>

      <button
        onClick={handleBorrow}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Borrowing..." : "Borrow Book"}
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
