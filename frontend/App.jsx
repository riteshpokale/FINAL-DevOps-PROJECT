import { useEffect, useState } from "react";

function App() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(() => setApiMessage("Error connecting to backend"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      {/* Header */}
      <header className="bg-blue-600 w-full text-white py-4 shadow-md">
        <h1 className="text-3xl font-extrabold text-center">My DevOps Project</h1>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">API Status</h2>
          <p
            className={`text-lg font-medium ${
              apiMessage.includes("working")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {apiMessage}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-3 text-center w-full">
        &copy; {new Date().getFullYear()} My DevOps Project. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
