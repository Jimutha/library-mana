import React from "react";

export default function LanguageSelector({ languages, selected, setSelected }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {languages.map((lang) => (
        <button
          key={lang}
          className={`p-3 rounded border ${
            selected === lang ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setSelected(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
