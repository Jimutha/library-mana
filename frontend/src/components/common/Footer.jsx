import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-6 text-center">
      &copy; {new Date().getFullYear()} Library Management System
    </footer>
  );
}
