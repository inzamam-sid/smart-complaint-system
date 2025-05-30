import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { FaSearch } from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  "in progress": "bg-blue-100 text-blue-800",
  success: "bg-emerald-100 text-emerald-800",
};

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.get("/complaints");

      if (res.data.success) {
        const search = query.trim().toLowerCase();

        // 🔍 Dynamic Filtering by multiple fields
        const filtered = res.data.complaints.filter((complaint) => {
          const title = complaint.title?.toLowerCase() || "";
          const description = complaint.description?.toLowerCase() || "";
          const status = complaint.status?.toLowerCase() || "";
          const user = complaint.user?.toLowerCase() || complaint.username?.toLowerCase() || "";

          return (
            title.includes(search) ||
            description.includes(search) ||
            status.includes(search) ||
            user.includes(search)
          );
        });

        if (filtered.length === 0) {
          setError("No complaints found.");
          setResults([]);
        } else {
          setResults(filtered);
        }
      } else {
        setError("Failed to fetch complaints.");
        setResults([]);
      }
    } catch (err) {
      setError("Error fetching complaints.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaSearch className="text-indigo-600" />
        Search Complaints
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title, description, status, or user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-5 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}

      {!error && results.length > 0 && (
        <ul className="space-y-4">
          {results.map((comp) => (
            <li
              key={comp._id}
              className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              title={`Complaint: ${comp.title}`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{comp.title}</h2>
                <span
                  className={`capitalize inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[comp.status?.toLowerCase()] || "bg-gray-200 text-gray-700"
                  }`}
                >
                  {comp.status}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{comp.description || "No description"}</p>
              <p className="text-sm text-gray-400 mt-2">
                By: <span className="font-medium">{comp.user || comp.username || "Unknown"}</span> | Created:{" "}
                {new Date(comp.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
