import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Card from "../common/Card";

const DueSoonTable = () => {
  const [dueSoon, setDueSoon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDueSoon();
  }, []);

  const fetchDueSoon = async () => {
    try {
      const response = await api.get("/analytics/due-soon?days=7");
      setDueSoon(response.data.data);
    } catch (error) {
      console.error("Error fetching due soon:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        Books Due Soon (Next 7 Days)
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Member Name</th>
              <th className="px-4 py-2 text-left">Book Title</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Days Remaining</th>
            </tr>
          </thead>
          <tbody>
            {dueSoon.map((item, index) => {
              const dueDate = new Date(item.dueAt);
              const today = new Date();
              const daysRemaining = Math.ceil(
                (dueDate - today) / (1000 * 60 * 60 * 24)
              );

              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2">{item.memberName}</td>
                  <td className="px-4 py-2">{item.bookTitle}</td>
                  <td className="px-4 py-2">{dueDate.toLocaleDateString()}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      daysRemaining <= 1
                        ? "text-red-600"
                        : daysRemaining <= 3
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {dueSoon.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No books due in the next 7 days
        </p>
      )}
    </Card>
  );
};

export default DueSoonTable;
