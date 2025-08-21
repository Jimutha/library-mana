import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import UserPanel from "./pages/UserPanel";
import BookDetailsPage from "./pages/BookDetailsPage";
import NotFound from "./pages/NotFound";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin"
              element={
                user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />
              }
            />
            <Route
              path="/user"
              element={
                user?.role === "user" ? <UserPanel /> : <Navigate to="/" />
              }
            />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
