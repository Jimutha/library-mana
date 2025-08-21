import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LanguageSelector from "../components/user/LanguageSelector";
import CategorySelector from "../components/user/CategorySelector";
import BookBrowser from "../components/user/BookBrowser";
import BookDetails from "../components/user/BookDetails";

const UserPanel = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState("language");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowSuccess, setBorrowSuccess] = useState(false);

  if (!isAuthenticated || isAdmin) {
    return null; // The ProtectedRoute in App.jsx will handle redirection
  }

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentView("category");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentView("books");
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setCurrentView("details");
  };

  const handleBack = () => {
    if (currentView === "details") {
      setCurrentView("books");
      setSelectedBook(null);
    } else if (currentView === "books") {
      setCurrentView("category");
      setSelectedCategory("");
    } else if (currentView === "category") {
      setCurrentView("language");
      setSelectedLanguage("");
    }
  };

  const handleBorrowSuccess = () => {
    setBorrowSuccess(true);
  };

  const handleBorrowAnother = () => {
    setBorrowSuccess(false);
    setCurrentView("category");
    setSelectedBook(null);
  };

  const handleBackToHome = () => {
    setBorrowSuccess(false);
    setCurrentView("language");
    setSelectedLanguage("");
    setSelectedCategory("");
    setSelectedBook(null);
  };

  if (borrowSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <h2 className="text-xl font-semibold">Book Borrowed Successfully!</h2>
          <p>Thank you for borrowing from our library.</p>
        </div>

        <div className="space-x-4">
          <button
            onClick={handleBackToHome}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Home Page
          </button>
          <button
            onClick={handleBorrowAnother}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            Borrow Another Book
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {currentView === "language" && (
        <LanguageSelector onLanguageSelect={handleLanguageSelect} />
      )}

      {currentView === "category" && (
        <CategorySelector
          language={selectedLanguage}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {currentView === "books" && (
        <BookBrowser
          language={selectedLanguage}
          category={selectedCategory}
          onBookSelect={handleBookSelect}
        />
      )}

      {currentView === "details" && selectedBook && (
        <BookDetails
          book={selectedBook}
          onBorrowSuccess={handleBorrowSuccess}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default UserPanel;
