import { useEffect, useState } from "react";
import analyticsService from "../../services/analyticsService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await analyticsService.getOverview();
      setOverview(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {overview ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Total Books</h2>
            <p className="text-2xl">{overview.totalBooks}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Active Loans</h2>
            <p className="text-2xl">{overview.activeLoans}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Overdue Loans</h2>
            <p className="text-2xl">{overview.overdueLoans}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="bg-white rounded shadow p-4 mt-6">
        <h2 className="font-semibold mb-4">Borrowed Books Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={overview?.borrowedBooksPerMonth || []}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
