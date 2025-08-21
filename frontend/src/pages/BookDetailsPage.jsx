// frontend/src/pages/BookDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../services/api";
import BookDetails from "../components/user/BookDetails";

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBook(id);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  if (!book) return <div>Loading...</div>;

  return <BookDetails book={book} onBack={handleBack} />;
}

export default BookDetailsPage;
