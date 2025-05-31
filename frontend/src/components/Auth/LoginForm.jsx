import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // or email if needed
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);

    try {
        await axios.post("http://localhost:8000/login", {
        emailId: username,
        password: password,
      }, { withCredentials: true });

      //  navigate("/")
       navigate("/student/dashboard");
      
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-gray-600">Enter your email and password</p>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="username"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="you@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Signup
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
