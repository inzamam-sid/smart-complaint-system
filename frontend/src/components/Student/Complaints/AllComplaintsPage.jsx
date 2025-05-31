// src/pages/AllComplaintsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e'];

const StylishComplaintCard = ({ title, description, category, status }) => {
  const theme = {
    Resolved: 'emerald',
    Pending: 'amber',
    Rejected: 'rose',
    'In Progress': 'sky',
  }[status] || 'gray';

  return (
    <div className="relative bg-white rounded-2xl shadow-lg px-5 pt-10 pb-6 border">
      {/* Top Avatar Circle */}
      <div
        className={`absolute -top-8 left-5 w-16 h-16 rounded-full bg-${theme}-100 border-4 border-white flex items-center justify-center text-${theme}-600 text-2xl`}
      >
        <i className="fas fa-user" />
      </div>

      {/* Title and Content */}
      <h3 className={`text-lg font-bold text-${theme}-700 mt-4`}>{title}</h3>
      <p className="text-sm text-gray-500">Complaint Description</p>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      {/* Category + Status */}
      <div className="mt-4 text-sm">
        <span className="font-medium text-gray-700">Category:</span> {category}
      </div>
      <div className="mt-1 text-sm">
        <span className="font-medium text-gray-700">Status:</span>{' '}
        <span className={`font-semibold text-${theme}-600`}>{status}</span>
      </div>

      {/* Bottom Stylish Bar */}
      <div className={`mt-6 flex items-center justify-between`}>
        <div className={`flex gap-1`}>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 fill-${theme}-500`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
        </div>
        <div className={`text-${theme}-500 text-xl`}>
          <i className="fas fa-fire" />
        </div>
      </div>
    </div>
  );
};

const AllComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:8000/complaints', {
          withCredentials: true,
        });
        setComplaints(res.data.complaints);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      }
    };

    fetchAllComplaints();
  }, []);

  // Count by category
  const categoryCounts = complaints.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const dataForChart = Object.entries(categoryCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Complaints</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Complaints by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataForChart}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {dataForChart.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((c) => (
          <StylishComplaintCard
            key={c._id}
            title={c.title}
            description={c.description}
            category={c.category}
            status={c.status}
          />
        ))}
      </div>
    </div>
  );
};

export default AllComplaintsPage;
