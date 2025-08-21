// src/context/BookContext.jsx
import { createContext, useState, useContext } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [language, setLanguage] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <BookContext.Provider
      value={{
        language,
        setLanguage,
        category,
        setCategory,
        selectedBook,
        setSelectedBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
