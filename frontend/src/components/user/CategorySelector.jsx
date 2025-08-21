import React from "react";
import Card from "../common/Card";
import { CATEGORIES } from "../../utils/constants";

const CategorySelector = ({ language, onCategorySelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">{language} Books</h1>
      <p className="text-gray-600 mb-6">Select a category</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => (
          <Card
            key={category}
            className="text-center p-8 cursor-pointer hover:shadow-lg transition-shadow fade-in"
            onClick={() => onCategorySelect(category)}
          >
            <h3 className="text-xl font-semibold mb-2 capitalize">
              {category}
            </h3>
            <p className="text-gray-600">Browse {category} books</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
