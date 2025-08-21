import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Card from "../common/Card";
import Pagination from "../common/Pagination";

const BookBrowser = ({ language, category, onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [language, category, currentPage]);

  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams({
        language,
        category,
        status: "available",
        page: currentPage,
        limit: 12,
      });

      const response = await api.get(`/books?${params}`);
      setBooks(response.data.data.items);
      setTotalPages(Math.ceil(response.data.data.total / 12));
    } catch (error) {
      console.error("Error fetching books:", error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        {language} - {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
        Books
      </h1>
      <p className="text-gray-600 mb-6">Available books for borrowing</p>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books available in this category
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {books.map((book) => (
              <Card
                key={book._id}
                className="cursor-pointer hover:shadow-lg transition-shadow fade-in"
                onClick={() => onBookSelect(book)}
              >
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="mb-2">Language: {book.language}</p>
                <p className="capitalize mb-2">Category: {book.category}</p>
                <p className="font-semibold text-green-600">
                  {book.copiesAvailable} available
                </p>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BookBrowser;
