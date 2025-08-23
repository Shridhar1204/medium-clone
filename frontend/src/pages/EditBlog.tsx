// src/pages/EditBlog.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast } from "react-hot-toast"; // ✅ Import toast

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch blog data for pre-fill
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in.");
          setLoading(false);
          return;
        }
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: { Authorization: token },
        });
        setTitle(res.data.blog.title);
        setContent(res.data.blog.content);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Update blog
  const handleUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { id: Number(id), title, content },
        { headers: { Authorization: token } }
      );
      toast.success("Blog Updated ✅"); // ✅ Updated alert
      navigate(`/blog/${id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update blog ❌"); // ✅ Updated alert
    }
  };

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <span className="text-sm text-gray-600">Editing Blog</span>
          <span className="text-sm text-gray-400">Changes not saved</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Update
          </button>
          <div className="w-9 h-9 rounded-full bg-gray-500 text-white flex items-center justify-center">
            U
          </div>
        </div>
      </div>

      {/* Editor */}
      <form
        onSubmit={handleUpdate}
        className="flex-1 px-20 py-10 flex flex-col gap-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-5xl font-serif placeholder-gray-400 focus:outline-none w-full"
        />
        <textarea
          placeholder="Edit your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-xl font-light placeholder-gray-400 focus:outline-none w-full h-[70vh] resize-none"
        />
      </form>
    </div>
  );
}
