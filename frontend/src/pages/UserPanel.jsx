import React, { useState } from "react";
import { LANGUAGES, CATEGORIES } from "../utils/constants";
import LanguageSelector from "../components/user/LanguageSelector";
import CategorySelector from "../components/user/CategorySelector";
import BookBrowser from "../components/user/BookBrowser";
import BookDetails from "../components/user/BookDetails";
import { useAuth } from "../context/AuthContext";

export default function UserPanel() {
  const [step, setStep] = useState(1); // 1: Language, 2: Category, 3: Books
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { user } = useAuth();

  if (selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        memberId={user._id}
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  return (
    <div className="p-6">
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold mb-4">Select Language</h2>
          <LanguageSelector
            languages={LANGUAGES}
            selected={selectedLanguage}
            setSelected={setSelectedLanguage}
          />
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-4">Select Category</h2>
          <CategorySelector
            categories={CATEGORIES}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="mt-4 space-x-2">
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => setStep(3)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <BookBrowser
          language={selectedLanguage}
          category={selectedCategory}
          onSelectBook={(b) => setSelectedBook(b)}
        />
      )}
    </div>
  );
}
