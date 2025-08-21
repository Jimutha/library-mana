import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookService from "../../services/bookService";
import loanService from "../../services/loanService";
import { useAuth } from "../../context/AuthContext";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setBook(await bookService.getBook(id));
    };
    fetch();
  }, [id]);

  const handleBorrow = async () => {
    await loanService.borrowBook(book._id, user._id, 7);
    navigate("/user/borrow-success");
  };

  if (!book) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600">{book.author}</p>
      <p className="mt-4">Quantity: {book.quantity}</p>
      <button
        onClick={handleBorrow}
        className="bg-green-600 text-white px-4 py-2 rounded mt-6"
      >
        Borrow
      </button>
    </div>
  );
}

export default BookDetails;
