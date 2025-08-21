import { Link } from "react-router-dom";

function BorrowSuccess() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">Success!</h1>
      <p className="mt-4">You have borrowed the book successfully.</p>
      <Link
        to="/user/home"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go Home
      </Link>
    </div>
  );
}

export default BorrowSuccess;
