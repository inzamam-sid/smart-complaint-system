import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved", "Rejected"];
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const AdminComplaintManager = ({ onStatusUpdate }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await axiosInstance.get("/complaints");
      const data = res.data.complaints || res.data || [];
      setComplaints(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load complaints.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSelectChange = (complaintId, status) => {
    if (["Rejected", "In Progress", "Resolved"].includes(status)) {
      setSelectedComplaintId(complaintId);
      setNewStatus(status);
      setReason("");
      setShowModal(true);
    } else {
      updateStatus(complaintId, status);
    }
  };

  const updateStatus = async (complaintId, status, reasonText = "") => {
    try {
      await axiosInstance.put(`/complaints/${complaintId}/status`, {
        status,
        reason: reasonText,
        
      });
    

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId ? { ...c, status, reason: reasonText } : c
        )
      );

      if (onStatusUpdate) onStatusUpdate();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating complaint status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleModalSubmit = () => {
    if (!reason.trim()) {
      alert("Reason is required.");
      return;
    }
    updateStatus(selectedComplaintId, newStatus, reason);
  };

  if (loading) return <p className="text-gray-600">Loading complaints...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛠️ Manage Complaints</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">👤 User</th>
              <th className="px-4 py-3 text-left">📌 Title</th>
              <th className="px-4 py-3 text-left">📊 Status</th>
              <th className="px-4 py-3 text-left">🔄 Change Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {complaint.username || complaint.createdBy.firstName || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-700">{complaint.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      statusColors[complaint.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={complaint.status}
                    onChange={(e) => handleSelectChange(complaint._id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
     {/* Modal */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300">
    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-200 animate-fade-in">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">📝 Reason Required</h3>
        <p className="text-sm text-gray-600 mt-1">
          Please describe why you're changing the status to{" "}
          <span className="font-medium text-blue-600">{newStatus}</span>.
        </p>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">Reason / Description</label>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 h-28 resize-none text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="Explain your reason for the status change..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <div className="flex justify-end gap-3 mt-6">
        <button
          className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          onClick={handleModalSubmit}
        >
          Submit
        </button>
      </div>
    </div>
    </div>
)};
    </div>
  );
}

export default AdminComplaintManager;
