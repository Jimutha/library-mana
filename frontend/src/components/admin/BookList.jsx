import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");
        setBooks(res.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {books.map((b) => (
        <div key={b._id} className="border p-4 rounded shadow">
          <h3 className="font-bold">{b.title}</h3>
          <p>Author: {b.author}</p>
          <p>Available: {b.copiesAvailable}</p>
          <div className="mt-2 flex justify-between">
            <button className="bg-yellow-500 text-white px-2 py-1 rounded">
              Edit
            </button>
            <button
              onClick={() => handleDelete(b._id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
