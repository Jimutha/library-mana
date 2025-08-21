import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Library Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to our digital library. Browse, borrow, and manage books with
          ease.
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="bg-gray-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Register
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">For Readers</h3>
            <p className="text-gray-600">
              Browse our extensive collection of books in multiple languages and
              categories.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Easy Borrowing</h3>
            <p className="text-gray-600">
              Borrow books with just a few clicks and get reminders for return
              dates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">For Administrators</h3>
            <p className="text-gray-600">
              Manage inventory, track borrowings, and generate reports with our
              admin tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
