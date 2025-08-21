// frontend/src/components/user/BookBrowser.jsx
import { useEffect, useState } from "react";
import { getBooks } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";

function BookBrowser({ language, category, onBack }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getBooks({
        language,
        category,
        status: "available",
      });
      setBooks(response.data.items);
    };
    fetchBooks();
  }, [language, category]);

  const handleSelect = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book._id}>
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <button
              onClick={() => handleSelect(book._id)}
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              View More
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BookBrowser;
