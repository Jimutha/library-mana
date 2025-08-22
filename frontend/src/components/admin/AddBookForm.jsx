import React, { useState } from "react";
import api from "../../services/api";
import { LANGUAGES, CATEGORIES } from "../../utils/constants";

const AddBookForm = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: "English",
    category: "comedy",
    copiesTotal: 1,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Prepare the data exactly as the backend expects it
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        language: formData.language,
        category: formData.category,
        copiesTotal: parseInt(formData.copiesTotal),
        description: formData.description.trim(),
      };

      console.log("Sending book data:", bookData);

      const response = await api.post("/books", bookData);
      console.log("Book added successfully:", response.data);

      setMessage("Book added successfully!");
      setFormData({
        title: "",
        author: "",
        language: "English",
        category: "comedy",
        copiesTotal: 1,
        description: "",
      });

      if (onBookAdded) onBookAdded();
    } catch (error) {
      console.error("Full error details:", error);

      // Extract the actual error message from the backend
      let errorMessage = "Unknown error occurred";

      if (error.response) {
        // The server responded with an error status
        console.error("Server response:", error.response);

        if (error.response.data && error.response.data.error) {
          errorMessage =
            error.response.data.error.message ||
            JSON.stringify(error.response.data.error);
        } else if (error.response.data) {
          errorMessage = JSON.stringify(error.response.data);
        } else {
          errorMessage = `Server error: ${error.response.status} ${error.response.statusText}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        errorMessage =
          "No response from server. Please check if the backend is running.";
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        errorMessage = error.message;
      }

      setMessage(`Error adding book: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language *
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Copies *
          </label>
          <input
            type="number"
            name="copiesTotal"
            value={formData.copiesTotal}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book description (optional)"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="loading-spinner mr-2"></div>
              Adding Book...
            </>
          ) : (
            "Add Book"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
