import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex space-x-2 mt-4">
      {pages.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded ${
            p === page ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
