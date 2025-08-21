import React from "react";
import Card from "../common/Card";
import { LANGUAGES } from "../../utils/constants";

const LanguageSelector = ({ onLanguageSelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Select Language</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LANGUAGES.map((language) => (
          <Card
            key={language}
            className="text-center p-8 cursor-pointer hover:shadow-lg transition-shadow fade-in"
            onClick={() => onLanguageSelect(language)}
          >
            <h3 className="text-xl font-semibold mb-2">{language}</h3>
            <p className="text-gray-600">Browse {language} books</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
