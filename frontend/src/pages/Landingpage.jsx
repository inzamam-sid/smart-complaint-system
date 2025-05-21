// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-12 text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        Welcome to Smart Complaint System
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        A smarter way to submit and manage complaints.
      </p>
      
      <Link
        to="/complain-list"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
       👁️ View Complain Lists 
      </Link>
      
    </div>
      );
};

export default Landingpage;
