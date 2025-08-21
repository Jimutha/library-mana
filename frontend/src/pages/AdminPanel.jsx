import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "../components/admin/AdminDashboard";
import Inventory from "../components/admin/Inventory";
import AddBookForm from "../components/admin/AddBookForm";
import BookList from "../components/admin/BookList";
import DueSoonTable from "../components/admin/DueSoonTable";
import Tabs from "../components/common/Tabs";

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600">
          You need administrator privileges to access this page.
        </p>
      </div>
    );
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
      <Tabs tabs={tabs} />
    </div>
  );
};

export default AdminPanel;
