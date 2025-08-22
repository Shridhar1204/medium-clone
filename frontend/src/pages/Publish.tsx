// src/pages/CreateBlog.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // POST request to create the blog
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      // The backend should return the newly created blog object
      const newBlog = response.data; 

      alert("Blog Published ✅");

      // Redirect to the new blog's page
      navigate(`/blog/${newBlog.id}`);
      
      // Optional: clear the form
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to publish blog ❌");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <span className="text-sm text-gray-600">Draft in BlogApp</span>
          <span className="text-sm text-gray-400">Saved</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-1 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
          >
            Publish
          </button>
          <div className="w-9 h-9 rounded-full bg-gray-500 text-white flex items-center justify-center">
            U
          </div>
        </div>
      </div>

      {/* Editor */}
      <form
        onSubmit={handleSubmit}
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
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-xl font-light placeholder-gray-400 focus:outline-none w-full h-[70vh] resize-none"
        />
      </form>
    </div>
  );
}
