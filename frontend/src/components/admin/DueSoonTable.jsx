import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function DueSoonTable() {
  const [dueList, setDueList] = useState([]);

  useEffect(() => {
    const fetchDue = async () => {
      try {
        const res = await api.get("/analytics/due-soon?days=3");
        setDueList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDue();
  }, []);

  return (
    <div>
      <h3 className="font-bold mb-2">⚠️ Due Soon</h3>
      {dueList.length === 0 ? (
        <p>No books due soon.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Member</th>
              <th className="border p-2">Book</th>
              <th className="border p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {dueList.map((d, i) => (
              <tr key={i} className="text-center">
                <td className="border p-2">{d.memberName}</td>
                <td className="border p-2">{d.bookTitle}</td>
                <td className="border p-2">
                  {new Date(d.dueAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
