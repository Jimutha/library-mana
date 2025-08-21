import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Card from "../common/Card";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get("/analytics/overview");
      setAnalytics(response.data.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Books by Genre</h2>
          <div className="space-y-2">
            {analytics.byGenre.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="capitalize">{item.category}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-2">Books by Language</h2>
          <div className="space-y-2">
            {analytics.byLanguage.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.language}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-2">Most Borrowed Books</h2>
          <div className="space-y-2">
            {analytics.topRecent.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="truncate mr-2">{item.title}</span>
                <span className="font-semibold">{item.borrowCount}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
