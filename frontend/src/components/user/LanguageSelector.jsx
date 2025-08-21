import { LANGUAGES } from "../../utils/constants";

function LanguageSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {LANGUAGES.map((language) => (
        <div
          key={language}
          onClick={() => onSelect(language)}
          className="p-4 border rounded text-center cursor-pointer hover:bg-blue-100"
        >
          <h3 className="text-xl font-semibold">{language}</h3>
        </div>
      ))}
    </div>
  );
}

export default LanguageSelector;
