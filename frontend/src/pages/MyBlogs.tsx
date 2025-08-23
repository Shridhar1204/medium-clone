import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import toast from "react-hot-toast";
import { ConfirmModal } from "../components/ConfirmModal";

type Blog = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: { name: string };
};

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
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

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${deleteId}`, {
        headers: { Authorization: token },
      });
      setBlogs((prev) => prev.filter((blog) => blog.id !== deleteId));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete blog ❌");
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Appbar />

      {loading ? (
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Your stories</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              You haven't published any stories yet. When you do, they'll appear here.
            </p>
            <button
              onClick={() => navigate('/new-blog')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200"
            >
              Write your first story
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your stories</h1>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {blogs.length} {blogs.length === 1 ? 'story' : 'stories'}
              </p>
              <button
                onClick={() => navigate('/new-blog')}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Write a story
              </button>
            </div>
          </div>

          {/* Stories List */}
          <div className="space-y-12">
            {blogs.map((blog, index) => (
              <article key={blog.id} className="group border-b border-gray-100 pb-12 last:border-b-0">
                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-medium">
                      {blog.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{blog.author?.name}</span>
                    <span className="mx-1">·</span>
                    <span>{formatDate(blog.createdAt)}</span>
                    <span className="mx-1">·</span>
                    <span>{getReadingTime(blog.content)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <Link 
                    to={`/blog/${blog.id}`}
                    className="block group-hover:opacity-80 transition-opacity duration-200"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight font-serif">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      {blog.content.length > 140
                        ? blog.content.slice(0, 140) + "..."
                        : blog.content}
                    </p>
                  </Link>
                </div>

                {/* Actions and Tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      Read more
                    </Link>
                    <button
                      onClick={() => navigate(`/edit-blog/${blog.id}`)}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(blog.id)}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-400">
                    {/* More options menu */}
                    <button className="p-1 hover:text-gray-600 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More (if needed) */}
          {blogs.length > 10 && (
            <div className="text-center mt-12 pt-8 border-t border-gray-100">
              <button className="text-green-600 font-medium hover:text-green-700 transition-colors duration-200">
                Show older stories
              </button>
            </div>
          )}
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!deleteId}
        message="Delete story?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <style>{`
        .font-serif {
          font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
        }
        
        @media (max-width: 640px) {
          .max-w-2xl {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}