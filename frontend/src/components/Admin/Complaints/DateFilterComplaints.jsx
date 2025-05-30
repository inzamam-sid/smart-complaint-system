import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DateFilterComplaints = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleViewStatus = () => {
    if (!dateFrom || !dateTo) {
      setError("Please select both start and end dates.");
      return;
    }
    if (dateTo < dateFrom) {
      setError("End date cannot be earlier than start date.");
      return;
    }
    setError("");
    navigate(`/admin/complaints/datefilter/list?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition"
          aria-label="Go back"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          View Complaints by Date Range
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleViewStatus();
          }}
          noValidate
        >
          <div className="mb-6">
            <label
              htmlFor="dateFrom"
              className="block text-gray-700 font-medium mb-2"
            >
              From:
            </label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="dateTo"
              className="block text-gray-700 font-medium mb-2"
            >
              To:
            </label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
              aria-required="true"
            />
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={!dateFrom || !dateTo || dateTo < dateFrom}
            className={`w-full py-3 rounded-md text-white font-semibold transition
              ${
                dateFrom && dateTo && dateTo >= dateFrom
                  ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            aria-disabled={!dateFrom || !dateTo || dateTo < dateFrom}
          >
            View Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateFilterComplaints;
