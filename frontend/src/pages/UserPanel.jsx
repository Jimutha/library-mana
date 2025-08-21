import { useState } from "react";
import LanguageSelector from "../components/user/LanguageSelector";
import CategorySelector from "../components/user/CategorySelector";
import BookBrowser from "../components/user/BookBrowser";

function UserPanel() {
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setStep(2);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 3) {
      setSelectedCategory("");
      setStep(2);
    } else if (step === 2) {
      setSelectedLanguage("");
      setStep(1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Browse Books</h1>
      {step === 1 && <LanguageSelector onSelect={handleLanguageSelect} />}
      {step === 2 && (
        <CategorySelector onSelect={handleCategorySelect} onBack={handleBack} />
      )}
      {step === 3 && (
        <BookBrowser
          language={selectedLanguage}
          category={selectedCategory}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default UserPanel;
