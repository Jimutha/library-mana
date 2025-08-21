import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddBook from "./pages/Admin/AddBook";
import BooksList from "./pages/Admin/BooksList";
import Inventory from "./pages/Admin/Inventory";
import UserHome from "./pages/User/UserHome";
import BookCategories from "./pages/User/BookCategories";
import BookList from "./pages/User/BookList";
import BorrowBook from "./pages/User/BorrowBook";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/admin/books" element={<BooksList />} />
        <Route path="/admin/inventory" element={<Inventory />} />
      </Route>

      {/* User */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/categories" element={<BookCategories />} />
        <Route path="/user/books" element={<BookList />} />
        <Route path="/user/borrow/:id" element={<BorrowBook />} />
      </Route>
    </Routes>
  );
}

export default App;
