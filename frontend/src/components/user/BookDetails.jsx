// src/components/user/BookDetails.jsx
import React, { useState } from "react";
import api from "../../services/api";
import { DURATIONS } from "../../utils/constants";
import { calculateDueDate } from "../../utils/helpers";

const BookDetails = ({ book, onBorrowSuccess, onBack }) => {
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[0]);
  const [borrowing, setBorrowing] = useState(false);
  const [message, setMessage] = useState("");

  const handleBorrow = async () => {
    setBorrowing(true);
    setMessage("");

    try {
      // In a real app, you would get the member ID from the user context
      // For this demo, we'll use a hardcoded member ID
      const memberId = "MBR-0001"; // This should come from user context

      await api.post("/loans", {
        bookId: book._id,
        memberId: memberId,
        durationDays: selectedDuration,
      });

      const dueDate = calculateDueDate(selectedDuration);
      setMessage(
        `Book borrowed successfully! Please return by ${dueDate.toLocaleDateString()}`
      );

      if (onBorrowSuccess) {
        onBorrowSuccess();
      }
    } catch (error) {
      setMessage(
        "Error borrowing book: " +
          (error.response?.data?.error?.message || "Unknown error")
      );
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={onBack}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-600 text-lg mb-4">by {book.author}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Book Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Language:</span>{" "}
                {book.bookLanguage}
              </p>
              <p className="capitalize">
                <span className="font-medium">Category:</span> {book.category}
              </p>
              <p>
                <span className="font-medium">Available Copies:</span>{" "}
                {book.copiesAvailable}
              </p>
              <p>
                <span className="font-medium">Total Copies:</span>{" "}
                {book.copiesTotal}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              {book.description || "No description available."}
            </p>
          </div>
        </div>

        {book.copiesAvailable > 0 ? (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Borrow This Book</h2>

            <div className="flex items-center space-x-4 mb-4">
              <label className="font-medium">Select duration:</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                className="px-3 py-2 border rounded-md"
              >
                {DURATIONS.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration} days
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleBorrow}
              disabled={borrowing}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {borrowing ? "Processing..." : "Borrow Book"}
            </button>
          </div>
        ) : (
          <div className="border-t pt-6">
            <p className="text-red-600 font-semibold">
              Sorry, this book is currently not available for borrowing.
            </p>
          </div>
        )}
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default BookDetails;
