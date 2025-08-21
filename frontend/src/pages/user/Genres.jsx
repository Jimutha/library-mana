import { useParams, Link } from "react-router-dom";

function Genres() {
  const { language } = useParams();

  const genres = ["Fiction", "Non-Fiction", "Science", "History"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{language} Genres</h1>
      <ul className="space-y-3">
        {genres.map((g) => (
          <li key={g}>
            <Link
              to={`/user/books?genre=${g}&language=${language}`}
              className="bg-gray-200 px-4 py-2 rounded block hover:bg-gray-300"
            >
              {g}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;
