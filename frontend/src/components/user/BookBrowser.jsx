import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Pagination from "../common/Pagination";

export default function BookBrowser({ language, category, onSelectBook }) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data } = await api.get(
          `/books?language=${language}&category=${category}&page=${page}`
        );
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    }
    fetchBooks();
  }, [language, category, page]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Books in {category} ({language})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded p-3 shadow cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectBook(book)}
          >
            <h3 className="font-bold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
