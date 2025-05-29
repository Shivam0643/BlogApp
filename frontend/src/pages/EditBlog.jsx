import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

export default function EditBlog() {
  const [form, setForm] = useState({ title: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/blogs/${id}`).then((res) =>
      setForm({ title: res.data.title, content: res.data.content })
    );
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/blogs/${id}`, form);
      navigate(`/blogs/${id}`);
    } catch (err) {
      alert("Failed to update blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Edit Blog
        </h2>

        <input
          type="text"
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          rows={10}
          placeholder="Update your blog content..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 w-full md:w-auto block mx-auto"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
