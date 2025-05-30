import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const ComplaintsByStatus = () => {
  const { status } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const normalizedStatus = decodeURIComponent(status)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get(`/complaints?status=${normalizedStatus}`);
        const data = res.data.complaints || [];
        if (data.length === 0) setError("No complaints found.");
        else setComplaints(data);
      } catch (err) {
        setError("Failed to fetch complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [status]);

  if (loading) return <p className="p-4">Loading complaints...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Complaints - {status}</h2>
      <ul className="space-y-4">
        {complaints.map((c) => (
          <li key={c._id} className="border rounded p-4 shadow bg-white">
            <h3 className="font-bold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-700"><strong>Status:</strong> {c.status}</p>
            {c.reason && (
              <p className="italic text-gray-600 mt-2">
                <strong>Admin's Reason:</strong> {c.reason}
              </p>
            )}
            <p className="mt-2 text-gray-800">{c.description || "No detailed description."}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintsByStatus;
