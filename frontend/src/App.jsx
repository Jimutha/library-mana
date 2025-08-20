import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Inventory from "./pages/Admin/Inventory";
import AddBook from "./pages/Admin/AddBook";
import BookList from "./pages/Admin/BookList";
import Home from "./pages/User/Home";
import GenreSelection from "./pages/User/GenreSelection";
import BookDetails from "./pages/User/BookDetails";
import BorrowConfirmation from "./pages/User/BorrowConfirmation";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />

        {/* User */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/genres"
          element={
            <ProtectedRoute>
              <GenreSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/borrow-confirm"
          element={
            <ProtectedRoute>
              <BorrowConfirmation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
