import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Tabs from "../common/Tabs";

export default function Inventory() {
  const languages = ["Sinhala", "English", "Other"];
  const [activeLang, setActiveLang] = useState("Sinhala");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get(`/books?language=${activeLang}`);
        setBooks(res.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [activeLang]);

  return (
    <div>
      <Tabs
        tabs={languages}
        activeTab={activeLang}
        setActiveTab={setActiveLang}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((b) => (
          <div key={b._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{b.title}</h3>
            <p>Category: {b.category}</p>
            <p>Available: {b.copiesAvailable}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
