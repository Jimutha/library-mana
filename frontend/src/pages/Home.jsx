import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Library System</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
