import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Book Not Found</h1>
        <p className="text-gray-600">The requested book could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => window.history.back()}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-600 text-lg mb-4">by {book.author}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Book Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Language:</span> {book.language}
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

        {isAuthenticated && book.copiesAvailable > 0 && (
          <div className="border-t pt-6">
            <a
              href="/user"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Borrow This Book
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailsPage;
