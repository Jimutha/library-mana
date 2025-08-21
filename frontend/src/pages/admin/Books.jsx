import { useEffect, useState } from "react";
import bookService from "../../services/bookService";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setBooks(await bookService.getBooks());
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await bookService.deleteBook(id);
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Books</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-b">
              <td className="p-2">{book.title}</td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
