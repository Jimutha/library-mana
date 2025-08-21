import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Card from "../common/Card";
import Pagination from "../common/Pagination";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await api.get(`/books?page=${currentPage}&limit=12`);
      setBooks(response.data.data.items);
      setTotalPages(Math.ceil(response.data.data.total / 12));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error deleting book");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book._id);
    setEditForm({
      title: book.title,
      author: book.author,
      copiesTotal: book.copiesTotal,
    });
  };

  const handleEditSubmit = async (id) => {
    try {
      await api.put(`/books/${id}`, editForm);
      setEditingBook(null);
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book");
    }
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book._id} className="fade-in">
            {editingBook === book._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) => handleEditChange("author", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
                <input
                  type="number"
                  value={editForm.copiesTotal}
                  onChange={(e) =>
                    handleEditChange("copiesTotal", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                  min="0"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditSubmit(book._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBook(null)}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="capitalize mb-2">Category: {book.category}</p>
                <p className="mb-2">Language: {book.language}</p>
                <p
                  className={`font-semibold mb-4 ${
                    book.copiesAvailable > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.copiesAvailable} of {book.copiesTotal} available
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                  <a
                    href={`/book/${book._id}`}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View More
                  </a>
                </div>
              </>
            )}
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
    </div>
  );
};

export default BookList;
