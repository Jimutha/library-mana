import React from "react";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-1 rounded ${
            activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
