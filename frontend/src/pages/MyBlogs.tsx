import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar"; // ✅ import your Appbar

type Blog = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
};

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view your blogs.");
        setLoading(false);
        return;
      }
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/my-blogs`, {
        headers: { Authorization: token },
      });
      setBlogs(res.data.blogs || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: token },
      });
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      alert("Failed to delete blog ❌");
    }
  };

  return (
    <div>
      <Appbar /> {/* ✅ Always visible */}

      {loading ? (
        <div className="flex justify-center items-center h-screen">Loading your blogs...</div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
      ) : blogs.length === 0 ? (
        <div className="flex justify-center items-center h-screen">You haven’t created any blogs yet.</div>
      ) : (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-5 border rounded-2xl shadow hover:shadow-md transition">
                <Link to={`/blog/${blog.id}`}>
                  <h2 className="text-2xl font-semibold">{blog.title}</h2>
                </Link>
                <p className="text-gray-600 mt-2">
                  {blog.content.length > 200 ? blog.content.slice(0, 200) + "..." : blog.content}
                </p>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
                  <span>By {blog.author?.name}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/edit-blog/${blog.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
