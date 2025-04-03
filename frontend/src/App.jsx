import { useState } from "react";
import axios from "axios";
import React from "react";

export default function App() {
  const [installationCode, setInstallationCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const fetchMCPServer = async () => {
    if (!installationCode.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/test-server`,
        { installationCode },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setData(response.data.data);
        setMessage(response.data.message);
      } else {
        setError("Invalid installation code or server not found.");
      }
    } catch (err) {
      setError(
        "Failed to fetch server details. Please check the installation code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="bg-white w-full sm:max-w-xl rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-black">
          MCP Server Tester
        </h1>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="text"
            placeholder="E.g.: @smithery-ai/server-sequential-thinking"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black transition-all duration-300 ease-in-out"
            value={installationCode}
            onChange={(e) => setInstallationCode(e.target.value)}
          />
          <button
            onClick={fetchMCPServer}
            className="mt-4 sm:mt-0 sm:w-32 bg-black text-white py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Checking..." : "Test Server"}
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-600">Checking MCP server...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {data && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-black">Server Details</h2>
            <p className="text-lg font-semibold text-green-700 mt-2">
              {message}
            </p>
            <p className="mt-2 text-black">
              <strong>Name:</strong> {data.displayName}
            </p>
            <p className="mt-2 text-black">
              <strong>Qualified Name:</strong> {data.qualifiedName}
            </p>
            <p className="mt-2 text-black">
              <strong>Remote:</strong> {data.remote ? "Yes" : "No"}
            </p>

            {data.connections.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-black">
                  Connections
                </h3>
                <ul className="mt-2 space-y-4">
                  {data.connections.map((conn, index) => (
                    <li
                      key={index}
                      className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                      <p className="text-black">
                        <strong>Type:</strong> {conn.type}
                      </p>
                      {conn.deploymentUrl && (
                        <p className="text-black">
                          <strong>URL:</strong>{" "}
                          <a
                            href={conn.deploymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {conn.deploymentUrl}
                          </a>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-200 rounded-lg">
              <h3 className="font-semibold text-black">Full JSON Response</h3>
              <pre className="mt-2 bg-gray-300 p-4 rounded-lg overflow-auto max-h-60">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
