// frontend/src/components/admin/DueSoonTable.jsx
import { useEffect, useState } from "react";
import { getDueSoon } from "../../services/api";

function DueSoonTable() {
  const [dueList, setDueList] = useState([]);

  useEffect(() => {
    const fetchDue = async () => {
      const response = await getDueSoon(3); // Next 3 days
      setDueList(response.data);
    };
    fetchDue();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Members Nearest to Due Dates</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Member</th>
            <th className="p-2">Book</th>
            <th className="p-2">Remaining Time</th>
          </tr>
        </thead>
        <tbody>
          {dueList.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{item.memberName}</td>
              <td className="p-2">{item.bookTitle}</td>
              <td className="p-2">
                {new Date(item.dueAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DueSoonTable;
