import Login from "../components/auth/Login";

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to the Library
      </h1>
      <Login />
    </div>
  );
}

export default Home;
