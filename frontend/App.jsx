import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Hello, React on EC2!</h1>
      <p className="text-lg text-gray-700">
        Your frontend is running successfully with Vite + React + TailwindCSS.
      </p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
