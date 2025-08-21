import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "../components/admin/AdminDashboard";
import Inventory from "../components/admin/Inventory";
import AddBookForm from "../components/admin/AddBookForm";
import BookList from "../components/admin/BookList";
import DueSoonTable from "../components/admin/DueSoonTable";
import Tabs from "../components/common/Tabs";

const AdminPanel = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (!isAuthenticated || !isAdmin) {
    return null; // The ProtectedRoute in App.jsx will handle redirection
  }

  const handleBookAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const tabs = [
    {
      label: "Dashboard",
      content: <AdminDashboard />,
    },
    {
      label: "Inventory",
      content: <Inventory />,
    },
    {
      label: "Add Book",
      content: <AddBookForm onBookAdded={handleBookAdded} />,
    },
    {
      label: "Manage Books",
      content: <BookList key={refreshTrigger} />,
    },
    {
      label: "Due Soon",
      content: <DueSoonTable />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default AdminPanel;
