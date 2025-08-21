import React, { useState } from "react";
import api from "../../services/api";
import { LANGUAGES, CATEGORIES } from "../../utils/constants";

export default function AddBookForm() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    language: "Sinhala",
    category: "adventure",
    copiesTotal: 1,
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", form);
      alert("Book added successfully!");
      setForm({
        title: "",
        author: "",
        language: "Sinhala",
        category: "adventure",
        copiesTotal: 1,
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding book.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-4 border rounded shadow"
    >
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <select
        name="language"
        value={form.language}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        {LANGUAGES.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        name="copiesTotal"
        value={form.copiesTotal}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Book
      </button>
    </form>
  );
}
