// frontend/src/components/user/CategorySelector.jsx
import { CATEGORIES } from "../../utils/constants";

function CategorySelector({ onSelect, onBack }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => (
          <div
            key={category}
            onClick={() => onSelect(category)}
            className="p-4 border rounded text-center cursor-pointer hover:bg-blue-100"
          >
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
