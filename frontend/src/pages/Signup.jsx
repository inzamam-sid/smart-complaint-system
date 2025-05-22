import React from "react";

const Signup = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
      <form className="space-y-4">
        <div className="mb-4 text-left">
          <label className="block text-xl font-bold text-gray-700">
            First-Name
          </label>
          <input
            type="text"
            placeholder="Enetr your firstname"
            name="username"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-xl font-bold text-gray-700">
            Last-Name
          </label>
          <input
            type="email"
            placeholder="Enetr your lastname"
            name="email"
            className=" w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block mb-1 text-xl font-bold">EmailId</label>
          <input
            type="email"
            placeholder="Entyer your EmailId"
            name="email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block mb-1 text-xl font-bold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-xl font-bold">Role</label>
          <select name="role" className="w-full p-2 border rounded">
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-xl font-bold">Select-Department</label>
          <select name="role" className="w-full p-2 border rounded">
            <option value="">Select a role</option>
            <option value="btech">Btch</option>
            <option value="mtech">Mtech</option>
            <option value="bba">BBA</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
       Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
