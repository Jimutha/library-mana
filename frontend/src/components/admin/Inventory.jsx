// src/components/admin/Inventory.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { LANGUAGES, CATEGORIES } from "../../utils/constants";
import Tabs from "../common/Tabs";
import Card from "../common/Card";
import Pagination from "../common/Pagination";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [dueSoon, setDueSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    language: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    fetchBooks();
    fetchDueSoon();
  }, [currentPage, filters]);

  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...filters,
      });

      const response = await api.get(`/books?${params}`);
      setBooks(response.data.data.items);
      setTotalPages(Math.ceil(response.data.data.total / 12));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDueSoon = async () => {
    try {
      const response = await api.get("/analytics/due-soon?days=3");
      setDueSoon(response.data.data);
    } catch (error) {
      console.error("Error fetching due soon:", error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const languageTabs = [
    {
      label: "Sinhala",
      content: (
        <BookList
          books={books.filter((book) => book.bookLanguage === "Sinhala")}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ),
    },
    {
      label: "English",
      content: (
        <BookList
          books={books.filter((book) => book.bookLanguage === "English")}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ),
    },
    {
      label: "Other Languages",
      content: (
        <BookList
          books={books.filter((book) => book.bookLanguage === "Other")}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      <Tabs tabs={languageTabs} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Members with Books Due Soon
        </h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Member Name</th>
                  <th className="px-4 py-2 text-left">Book Title</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {dueSoon.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2">{item.memberName}</td>
                    <td className="px-4 py-2">{item.bookTitle}</td>
                    <td className="px-4 py-2">
                      {new Date(item.dueAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

const BookList = ({
  books,
  loading,
  filters,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="onloan">On Loan</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book._id} className="fade-in">
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="capitalize mb-2">Category: {book.category}</p>
            <p className="mb-2">Language: {book.bookLanguage}</p>
            <p
              className={`font-semibold ${
                book.copiesAvailable > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {book.copiesAvailable} of {book.copiesTotal} available
            </p>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Inventory;
