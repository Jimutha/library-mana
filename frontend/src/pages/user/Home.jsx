import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Library</h1>
      <p className="mb-6">Explore books by language or genre.</p>
      <div className="flex justify-center gap-6">
        <Link
          to="/user/genres/english"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          English
        </Link>
        <Link
          to="/user/genres/sinhala"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Sinhala
        </Link>
        <Link
          to="/user/genres/tamil"
          className="bg-yellow-600 text-white px-6 py-3 rounded"
        >
          Tamil
        </Link>
      </div>
    </div>
  );
}

export default Home;
