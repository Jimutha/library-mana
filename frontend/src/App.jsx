import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Inventory from "./pages/admin/Inventory";
import AddBook from "./pages/admin/AddBook";
import Books from "./pages/admin/Books";
import Home from "./pages/user/Home";
import Genres from "./pages/user/Genres";
import BookList from "./pages/user/BookList";
import BookDetails from "./pages/user/BookDetails";
import BorrowSuccess from "./pages/user/BorrowSuccess";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      {user?.role === "admin" && (
        <>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/add-book" element={<AddBook />} />
          <Route path="/admin/books" element={<Books />} />
        </>
      )}

      {/* User routes */}
      {user?.role === "user" && (
        <>
          <Route path="/user/home" element={<Home />} />
          <Route path="/user/genres/:language" element={<Genres />} />
          <Route path="/user/books" element={<BookList />} />
          <Route path="/user/book/:id" element={<BookDetails />} />
          <Route path="/user/borrow-success" element={<BorrowSuccess />} />
        </>
      )}

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
