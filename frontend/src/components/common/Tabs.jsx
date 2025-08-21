import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || 0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                index === activeTab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
