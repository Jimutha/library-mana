import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Library
        </Link>
        <nav>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              {user.role === "admin" && (
                <Link to="/admin" className="mr-4 hover:underline">
                  Admin Panel
                </Link>
              )}
              {user.role === "user" && (
                <Link to="/user" className="mr-4 hover:underline">
                  User Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
