import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookDetails from "../components/user/BookDetails";
import { useAuth } from "../context/AuthContext";

export default function BookDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const book = location.state?.book;

  if (!book) {
    navigate("/user/home");
    return null;
  }

  return (
    <BookDetails book={book} memberId={user._id} onBack={() => navigate(-1)} />
  );
}
