import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import UserPanel from "./pages/UserPanel";
import BookDetailsPage from "./pages/BookDetailsPage";
import NotFound from "./pages/NotFound";

// Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// Private route wrapper
import PrivateRoute from "./components/common/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin protected routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          {/* User protected routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user" element={<UserPanel />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
