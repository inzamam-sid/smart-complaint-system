import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/signup", formData, {
        withCredentials: true,
      });
      alert("Signup successful!");
      navigate("/loginform")
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed!");
    }
  };



  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-semibold text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="emailId"
            placeholder="Enter your email"
            value={formData.emailId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Department</option>
            <option value="bca">BCA</option>
            <option value="btech-cse">CSE</option>
            <option value="btech-dsai">B.Tech DSAI</option>
            <option value="btech-cloud">B.Tech Cloud Application</option>
            <option value="btech-ai">B.Tech AI</option>
            <option value="mca">MCA</option>
            <option value="mtech">M.Tech</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Signup
        </button>
        <p > Already have an Account{" "}
          <a href="/loginform" className="text-blue-600 font-bold hover:underline">
           SignIn
          </a>

        </p>
      </form>
    </div>
  );
};

export default Signup;
