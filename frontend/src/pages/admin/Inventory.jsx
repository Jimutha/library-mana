import { useEffect, useState } from "react";
import bookService from "../../services/bookService";

function Inventory() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await bookService.getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-b">
              <td className="p-2">{book.title}</td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">{book.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
