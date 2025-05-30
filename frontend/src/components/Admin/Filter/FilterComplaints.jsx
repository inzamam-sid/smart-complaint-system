// src/components/AdminDashboard/FilteredComplaints.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FilteredComplaints = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`/complaints?status=${status}`);
        if (res.data.success) {
          setComplaints(res.data.complaints);
          setError(res.data.complaints.length === 0 ? "No complaints found for this status." : "");
        } else {
          setError("Failed to fetch complaints.");
        }
      } catch (err) {
        setError("Error fetching complaints.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [status]);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    "in progress": "bg-blue-100 text-blue-800",
    success: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow"
        >
          ⬅ Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          Complaints -{" "}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || "bg-gray-200 text-gray-700"}`}>
            {status}
          </span>
        </h2>
      </div>

      {loading && <p className="text-gray-600">Loading complaints...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fadeIn">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{c.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[c.status] || "bg-gray-100 text-gray-800"}`}
                >
                  {c.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredComplaints;
