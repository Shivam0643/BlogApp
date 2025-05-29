import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/blogs");
      } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message);
        alert("Failed to delete blog. Make sure you're authorized.");
      }
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-4xl font-bold text-indigo-700 mb-2">{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-6">By {blog.author?.email}</p>

        <div className="prose max-w-none text-gray-800 mb-6">
          <p>{blog.content}</p>
        </div>

        <div className="flex space-x-4">
          <Link
            to={`/edit/${blog._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
