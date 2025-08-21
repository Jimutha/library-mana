import { useEffect, useState } from "react";
import { getAnalyticsOverview } from "../../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    byGenre: [],
    byLanguage: [],
    topRecent: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getAnalyticsOverview();
        setAnalytics(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  const genreChart = {
    type: "pie",
    data: {
      labels: analytics.byGenre.map((g) => g.category),
      datasets: [
        {
          data: analytics.byGenre.map((g) => g.count),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#C9CBCF",
            "#7BC225",
            "#F7464A",
          ],
        },
      ],
    },
    options: {
      plugins: { title: { display: true, text: "Borrowed Books by Genre" } },
    },
  };

  const languageChart = {
    type: "bar",
    data: {
      labels: analytics.byLanguage.map((l) => l.language),
      datasets: [
        {
          label: "Books Borrowed",
          data: analytics.byLanguage.map((l) => l.count),
          backgroundColor: "#36A2EB",
        },
      ],
    },
    options: {
      plugins: { title: { display: true, text: "Borrowed Books by Language" } },
    },
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl mb-2">Borrowed by Genre</h3>
          <div className="w-full max-w-md mx-auto">
            <Pie {...genreChart} />
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-2">Borrowed by Language</h3>
          <div className="w-full max-w-md mx-auto">
            <Bar {...languageChart} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl mb-2">Top Recent Books</h3>
        <ul className="space-y-2">
          {analytics.topRecent.map((book) => (
            <li key={book.bookId} className="p-2 border rounded">
              {book.title} - Borrowed {book.borrowCount} times
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
