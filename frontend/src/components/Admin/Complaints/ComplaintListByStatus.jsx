import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axiosInstance";

const ComplaintListByStatus = () => {
  const { status } = useParams(); // status will be like "pending", "resolved", etc.
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaintsByStatus = async () => {
      try {
        setLoading(true);
        setError("");
        // API expects status with spaces, so convert from 'inprogress' to 'In Progress'
        const formatStatus = (status) => {
          if (!status) return "";
          if (status === "inprogress") return "In Progress";
          // Capitalize first letter for others
          return status.charAt(0).toUpperCase() + status.slice(1);
        };

        const formattedStatus = formatStatus(status);

        const response = await axios.get(`/complaints?status=${encodeURIComponent(formattedStatus)}`);
        const data = response.data;

        const complaintsData = Array.isArray(data)
          ? data
          : Array.isArray(data?.complaints)
          ? data.complaints
          : [];

        setComplaints(complaintsData);
      } catch (err) {
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintsByStatus();
  }, [status]);

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (complaints.length === 0) return <p>No complaints found for status: {status}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Complaints with status: {status}</h2>
      <ul className="space-y-4">
        {complaints.map((complaint) => (
          <li key={complaint._id} className="border p-4 rounded shadow">
            <p><strong>User:</strong> {complaint.username || complaint.user || "Unknown"}</p>
            <p><strong>Title:</strong> {complaint.title || complaint.name || complaint.subject}</p>
            <p><strong>Description:</strong> {complaint.description || complaint.details}</p>
            <p><strong>Status:</strong> {complaint.status}</p>
            <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintListByStatus;

