import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import bookService from "../../services/bookService";

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetch = async () => {
      const genre = searchParams.get("genre");
      const language = searchParams.get("language");
      setBooks(await bookService.getBooks({ genre, language }));
    };
    fetch();
  }, [searchParams]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Books</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((b) => (
          <li key={b._id} className="bg-white rounded shadow p-4">
            <h2 className="font-semibold">{b.title}</h2>
            <p className="text-sm">{b.author}</p>
            <Link
              to={`/user/book/${b._id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-3 py-1 rounded"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
