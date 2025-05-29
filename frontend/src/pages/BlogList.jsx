import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/blogs").then((res) => setBlogs(res.data.blogs));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold text-indigo-700">All Blogs</h2>
          <p className="text-gray-600 mt-2 text-md">Explore the latest blog posts from our users</p>
        </header>

        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
            >
              <Link
                to={`/blogs/${blog._id}`}
                className="text-2xl font-semibold text-indigo-600 hover:underline"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">By {blog.author?.email}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/create"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-md font-medium px-6 py-3 rounded-full transition-colors duration-300"
          >
            + Create New Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

