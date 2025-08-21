// frontend/src/components/admin/Inventory.jsx
import { useState, useEffect } from "react";
import Tabs from "../common/Tabs";
import { getBooks, getLoans } from "../../services/api";
import { LANGUAGES, CATEGORIES } from "../../utils/constants";
import Card from "../common/Card";
import DueSoonTable from "./DueSoonTable";

function Inventory() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [category, setCategory] = useState("");
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [booksRes, loansRes] = await Promise.all([
        getBooks({ language, category, status: "available" }),
        getLoans({ overdue: "true" }),
      ]);
      setBooks(booksRes.data.items);
      setLoans(loansRes.data);
    };
    fetchData();
  }, [language, category]);

  const tabs = LANGUAGES.map((lang) => ({
    label: lang,
    content: (
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="">All Genres</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <Card key={book._id}>
              <h3 className="font-bold">{book.title}</h3>
              <p>
                Available: {book.copiesAvailable}/{book.copiesTotal}
              </p>
            </Card>
          ))}
        </div>
        <h3 className="text-xl mt-8 mb-2">Members with Loans</h3>
        {/* List of members with remaining time */}
        <ul className="space-y-2">
          {loans.map((loan) => (
            <li key={loan._id} className="p-2 border rounded">
              {loan.memberId?.name} - Book: {loan.bookId?.title} - Due:{" "}
              {new Date(loan.dueAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <div>
      <Tabs
        tabs={tabs}
        defaultTab={0}
        onTabChange={(index) => setLanguage(LANGUAGES[index])}
      />
      <DueSoonTable />
    </div>
  );
}

export default Inventory;
