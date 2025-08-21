// frontend/src/components/admin/BookList.jsx
import { useState, useEffect } from "react";
import { getBooks, updateBook, deleteBook } from "../../services/api";
import Card from "../common/Card";
import Pagination from "../common/Pagination";

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getBooks({ page });
      setBooks(response.data.items);
      setTotalPages(Math.ceil(response.data.total / response.data.limit));
    };
    fetchBooks();
  }, [page]);

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks(books.filter((b) => b._id !== id));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updated = await updateBook(editingBook._id, editingBook);
    setBooks(books.map((b) => (b._id === updated.data._id ? updated.data : b)));
    setEditingBook(null);
  };

  const handleChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book._id}>
            <h3 className="font-bold">{book.title}</h3>
            <p>
              Copies: {book.copiesAvailable}/{book.copiesTotal}
            </p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleEdit(book)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      {editingBook && (
        <div className="mt-8">
          <h3 className="text-xl mb-4">Edit Book</h3>
          <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
            <div>
              <label>Title</label>
              <input
                name="title"
                value={editingBook.title}
                onChange={handleChange}
                className="w-full p-2 border"
              />
            </div>
            <div>
              <label>Copies Total</label>
              <input
                type="number"
                name="copiesTotal"
                value={editingBook.copiesTotal}
                onChange={handleChange}
                className="w-full p-2 border"
              />
            </div>
            {/* Add other fields as needed */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setEditingBook(null)}
              className="bg-gray-500 text-white p-2 rounded ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookList;
