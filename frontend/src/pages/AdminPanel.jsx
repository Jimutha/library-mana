import { useState } from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import Inventory from "../components/admin/Inventory";
import AddBookForm from "../components/admin/AddBookForm";
import BookList from "../components/admin/BookList";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="tabs mb-4">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "inventory" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => setActiveTab("addBook")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "addBook" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Add Book
        </button>
        <button
          onClick={() => setActiveTab("books")}
          className={`px-4 py-2 rounded ${
            activeTab === "books" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Books
        </button>
      </div>
      {activeTab === "dashboard" && <AdminDashboard />}
      {activeTab === "inventory" && <Inventory />}
      {activeTab === "addBook" && <AddBookForm />}
      {activeTab === "books" && <BookList />}
    </div>
  );
}

export default AdminPanel;
