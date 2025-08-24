import { useEffect, useState } from "react";

function App() {
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setApiMessage(data.message);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch API");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md text-center text-2xl font-bold">
        My DevOps Project
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-gray-600 text-lg mb-6">
          This is a fully automated CI/CD deployed React + Node.js app on AWS.
        </p>

        {loading && <p className="text-blue-600 font-medium">Loading API...</p>}
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {!loading && !error && (
          <div className="p-4 bg-white rounded-xl shadow-md max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-2">API Status</h2>
            <p className="text-green-600 font-medium">{apiMessage}</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-2 text-center">
        © {new Date().getFullYear()} My DevOps Project
      </footer>
    </div>
  );
}

export default App;
