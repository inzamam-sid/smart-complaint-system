// // src/pages/AllComplaintsPage.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e'];

// const StylishComplaintCard = ({ title, description, category, status, resolutionNote, resolvedBy }) => {
//   const theme = {
//     Resolved: 'emerald',
//     Pending: 'amber',
//     Rejected: 'rose',
//     'In Progress': 'sky',
//   }[status] || 'gray';

//   return (
//     <div className="relative bg-white rounded-2xl shadow-lg px-5 pt-10 pb-6 border">
//       {/* Top Avatar Circle */}
//       <div
//         className={`absolute -top-8 left-5 w-16 h-16 rounded-full bg-${theme}-100 border-4 border-white flex items-center justify-center text-${theme}-600 text-2xl`}
//       >
//         <i className="fas fa-user" />
//       </div>

//       {/* Title and Content */}
//       <h3 className={`text-lg font-bold text-${theme}-700 mt-4`}>{title}</h3>
//       <p className="text-sm text-gray-500">Complaint Description</p>
//       <p className="mt-2 text-sm text-gray-600">{description}</p>

//       {/* Category + Status */}
//       <div className="mt-4 text-sm">
//         <span className="font-medium text-gray-700">Category:</span> {category}
//       </div>
//       <div className="mt-1 text-sm">
//         <span className="font-medium text-gray-700">Status:</span>{' '}
//         <span className={`font-semibold text-${theme}-600`}>{status}</span>
//       </div>

//       {/* Bottom Stylish Bar */}
//       <div className={`mt-6 flex items-center justify-between`}>
//         <div className={`flex gap-1`}>
//           {[...Array(5)].map((_, i) => (
//             <svg
//               key={i}
//               className={`w-4 h-4 fill-${theme}-500`}
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
//             </svg>
//           ))}
//         </div>
//         <div className={`text-${theme}-500 text-xl`}>
//           <i className="fas fa-fire" />
//         </div>
//       </div>
//     </div>
//   );
// };

// const AllComplaintsPage = () => {
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {
//     const fetchAllComplaints = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/complaints', {
//           withCredentials: true,
//         });
//         setComplaints(res.data.complaints);
//       } catch (err) {
//         console.error('Failed to fetch complaints:', err);
//       }
//     };

//     fetchAllComplaints();
//   }, []);

//   // Count by category
//   const categoryCounts = complaints.reduce((acc, curr) => {
//     acc[curr.category] = (acc[curr.category] || 0) + 1;
//     return acc;
//   }, {});

//   const dataForChart = Object.entries(categoryCounts).map(([key, value]) => ({
//     name: key,
//     value,
//   }));

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">All Complaints</h1>

//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Complaints by Category</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={dataForChart}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {dataForChart.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {complaints.map((c) => (
//           <StylishComplaintCard
//             key={c._id}
//             title={c.title}
//             description={c.description}
//             category={c.category}
//             status={c.status}
//             resolutionNote={c.resolutionNote}
//             resolvedBy={c.resolvedBy}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllComplaintsPage;
















// src/pages/AllComplaintsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#f97316', '#ec4899', '#ef4444', '#3b82f6'];

const StylishComplaintCard = ({ title, description, category, status, resolvedBy, resolutionNote }) => {
  const themeColors = {
    Resolved: {
      base: 'orange-500',
      light: 'orange-100',
      ring: 'ring-orange-300',
    },
    Pending: {
      base: 'pink-500',
      light: 'pink-100',
      ring: 'ring-pink-300',
    },
    Rejected: {
      base: 'red-500',
      light: 'red-100',
      ring: 'ring-red-300',
    },
    'In Progress': {
      base: 'blue-500',
      light: 'blue-100',
      ring: 'ring-blue-300',
    },
  };

  const color = themeColors[status] || {
    base: 'gray-500',
    light: 'gray-100',
    ring: 'ring-gray-300',
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md border px-4 pt-16 pb-6">
      {/* Avatar */}
      <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2`}>
        <div className={`w-16 h-16 rounded-full bg-${color.light} ring-4 ${color.ring} flex items-center justify-center text-${color.base} text-2xl`}>
          <i className="fas fa-user" />
        </div>

        {/* <div
        className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-${theme}-100 border-4 border-white shadow-md flex items-center justify-center`}
        >
        <i className={`fas fa-user text-${theme}-600 text-2xl`} />
        </div> */}

      </div>

      {/* Content */}
      <h3 className={`text-center text-lg font-semibold text-${color.base}`}>{title}</h3>
      <p className="text-center text-sm text-gray-500 mb-2">Complaint Category: {category}</p>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Status:</strong> <span className={`text-${color.base} font-medium`}>{status}</span>
      </p>

      {resolvedBy && (
        <p className="text-sm text-gray-700 mb-1">
          <strong>Resolved By:</strong> {resolvedBy.name || 'Admin'}
        </p>
      )}
      {resolutionNote && (
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> {resolutionNote}
        </p>
      )}

      {/* Star Bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 fill-${color.base}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
        </div>
        <i className={`fas fa-quote-right text-${color.base}`} />
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
            resolvedBy={c.resolvedBy}
            resolutionNote={c.resolutionNote}
          />
        ))}
      </div>
    </div>
  );
};

export default AllComplaintsPage;



