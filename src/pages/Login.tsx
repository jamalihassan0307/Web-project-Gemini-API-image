import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = savedUsers.find(
        (u: any) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        const success = await login(username, password);
        if (success) {
          navigate("/");
        }
      } else {
        setError("Invalid credentials. Try demo/123");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://source.unsplash.com/1600x900/?artificial-intelligence,technology")',
      }}
    >
      <div className="bg-white/95 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
              {error}
            </div>
          )}
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <FiLogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/register" className="text-blue-600 hover:text-blue-700">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
