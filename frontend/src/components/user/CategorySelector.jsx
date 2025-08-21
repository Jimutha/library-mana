import React from "react";

export default function CategorySelector({
  categories,
  selected,
  setSelected,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`p-3 rounded border ${
            selected === cat ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setSelected(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
