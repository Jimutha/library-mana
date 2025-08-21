import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Bar, Pie } from "react-chartjs-2";
import BookList from "./BookList";
import DueSoonTable from "./DueSoonTable";

export default function AdminDashboard() {
  const [overview, setOverview] = useState({
    byGenre: [],
    byLanguage: [],
    topRecent: [],
  });

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await api.get("/analytics/overview");
        setOverview(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOverview();
  }, []);

  const pieData = {
    labels: overview.byGenre.map((b) => b.category),
    datasets: [
      {
        label: "# of Borrowed Books",
        data: overview.byGenre.map((b) => b.count),
        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#F59E0B",
          "#10B981",
          "#8B5CF6",
        ],
      },
    ],
  };

  const barData = {
    labels: overview.byLanguage.map((b) => b.language),
    datasets: [
      {
        label: "Borrowed by Language",
        data: overview.byLanguage.map((b) => b.count),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded shadow">
          <h2 className="font-bold mb-2">Borrowed Books by Genre</h2>
          <Pie data={pieData} />
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="font-bold mb-2">Borrowed Books by Language</h2>
          <Bar data={barData} />
        </div>
      </div>

      <div className="p-4 border rounded shadow">
        <h2 className="font-bold mb-2">Most Borrowed Books Recently</h2>
        <ul className="list-disc pl-5">
          {overview.topRecent.map((b) => (
            <li key={b.bookId}>
              {b.title} — {b.borrowCount} times
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded shadow">
          <h2 className="font-bold mb-2">All Books</h2>
          <BookList />
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="font-bold mb-2">Books Due Soon</h2>
          <DueSoonTable />
        </div>
      </div>
    </div>
  );
}
