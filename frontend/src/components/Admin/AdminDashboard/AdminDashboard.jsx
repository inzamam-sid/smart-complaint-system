import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaCalendarAlt,
} from "react-icons/fa";
import axios from "../../../api/axiosInstance";
import AdminStatsGraph from "./AdminStatsGraph";
import NotificationCenter from "../Filter/NotificationCenter";
import AdminComplaintManager from "./AdminComplaintManager";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved", "Rejected"];

const statusIcons = {
  Pending: <FaClock className="text-yellow-500 text-4xl" />,
  "In Progress": <FaSpinner className="text-blue-500 text-4xl animate-spin" />,
  Resolved: <FaCheckCircle className="text-green-500 text-4xl" />,
  Rejected: <FaTimesCircle className="text-red-500 text-4xl" />,
};

const cardColors = {
  Pending: "bg-yellow-50",
  "In Progress": "bg-blue-50",
  Resolved: "bg-green-50",
  Rejected: "bg-red-50",
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [showGraph, setShowGraph] = useState(false);
  const [counts, setCounts] = useState({
    Pending: 0,
    "In Progress": 0,
    Resolved: 0,
    Rejected: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("/complaints");
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.complaints)
        ? response.data.complaints
        : [];

      setComplaints(data);

      const statusCount = {
        Pending: 0,
        "In Progress": 0,
        Resolved: 0,
        Rejected: 0,
      };

      data.forEach((complaint) => {
        const status = complaint.status;
        if (statusCount.hasOwnProperty(status)) {
          statusCount[status]++;
        }
      });

      setCounts(statusCount);
    } catch (error) {
      console.error("❌ Failed to fetch complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleCardClick = (status) => {
    const formattedStatus = status.toLowerCase().replace(/\s/g, "");
    navigate(`/admin/complaints/${formattedStatus}`);
  };

  const handleApplyFilter = () => {
    if (!selectedStatus) return alert("Please select a status.");
    const formattedStatus = selectedStatus.toLowerCase().replace(/\s/g, "");
    navigate(`/admin/complaints/${formattedStatus}`);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }
    const formattedQuery = searchQuery.trim().toLowerCase();
    navigate(`/admin/complaints/search/${formattedQuery}`);
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    let reason = "";

    if (["Rejected", "In Progress", "Resolved"].includes(newStatus)) {
      const messages = {
        Rejected: "Please provide a reason for rejecting the complaint:",
        "In Progress": "What actions will be taken to resolve this complaint?",
        Resolved: "Please describe how this complaint was resolved:",
      };

      reason = prompt(messages[newStatus]);
      if (!reason?.trim()) {
        alert("Reason is required to update status.");
        return;
      }
    }

    try {
      await axios.put(`/complaints/${complaintId}/status`, { status: newStatus, reason });

      const updatedComplaints = complaints.map((c) =>
        c._id === complaintId ? { ...c, status: newStatus, reason } : c
      );
      setComplaints(updatedComplaints);

      const newCounts = {
        Pending: 0,
        "In Progress": 0,
        Resolved: 0,
        Rejected: 0,
      };
      updatedComplaints.forEach((c) => {
        if (newCounts[c.status] !== undefined) newCounts[c.status]++;
      });
      setCounts(newCounts);
    } catch (error) {
      console.error("Error updating complaint status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-gray-100 to-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>
        <div className="flex items-center gap-8">
          <NotificationCenter />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {showGraph ? "Hide Graph View" : "Graph View of Complaints"}
        </button>

        <button
          onClick={() => navigate("/admin/complaints/summary")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View Summary
        </button>

        <div className="relative">
          <button
            onClick={() => setShowStatusFilter(!showStatusFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            <FaFilter />
            Filter
          </button>

          {showStatusFilter && (
            <div className="absolute mt-2 p-4 bg-white border rounded shadow-lg z-10 w-56">
              <label className="block mb-2 font-semibold">Select Status:</label>
              <select
                className="w-full p-2 border rounded mb-4"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">-- Select Status --</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                onClick={handleApplyFilter}
                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:bg-gray-300"
                disabled={!selectedStatus}
              >
                Apply Filter
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/admin/complaints/datefilter")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaCalendarAlt />
          View Complaints by Date
        </button>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by username or status"
            className="p-2 border rounded w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Search
          </button>
        </div>
      </div>

      {!showGraph ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {STATUS_OPTIONS.map((status) => (
            <div
              key={status}
              onClick={() => handleCardClick(status)}
              className={`cursor-pointer rounded-xl shadow-lg p-6 ${cardColors[status]} border border-gray-200 hover:shadow-xl transition duration-300`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md">
                  {statusIcons[status]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    {status} Complaints
                  </h2>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {counts[status]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            📈 Complaint Statistics
          </h2>
          <AdminStatsGraph complaints={complaints} />
        </div>
      )}

      <AdminComplaintManager
        complaints={complaints}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AdminDashboard;
