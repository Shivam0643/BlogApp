import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">My Blog App</h1>
        <p className="text-gray-600 mt-2 text-lg">Create your account and start blogging</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">Sign Up</h2>

        <input
          type="email"
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
