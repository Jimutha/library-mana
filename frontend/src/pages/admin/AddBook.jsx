import { useState } from "react";
import bookService from "../../services/bookService";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await bookService.addBook({ title, author, quantity });
    navigate("/admin/inventory");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Book</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-4 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="border p-2 mb-4 w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 mb-4 w-full"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
