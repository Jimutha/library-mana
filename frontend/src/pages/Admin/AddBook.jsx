import { useState } from "react";
import api from "../../services/api";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    language: "english",
    genre: "novel",
    copies: 1,
  });

  const genres = [
    "adventure",
    "science fiction",
    "novel",
    "mystery",
    "fantasy",
    "comedy",
    "education",
    "kids",
    "other",
  ];
  const languages = ["sinhala", "english", "other"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", form);
      alert("Book added successfully!");
      setForm({
        title: "",
        author: "",
        language: "english",
        genre: "novel",
        copies: 1,
      });
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="copies"
          value={form.copies}
          onChange={handleChange}
          placeholder="Copies"
          className="w-full border p-2 rounded"
          min="1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
