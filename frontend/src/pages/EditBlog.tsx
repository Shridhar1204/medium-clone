import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast } from "react-hot-toast";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Store original values to detect changes
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  // Check if content has changed
  useEffect(() => {
    setHasChanges(title !== originalTitle || content !== originalContent);
  }, [title, content, originalTitle, originalContent]);

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
        const blogData = res.data.blog;
        setTitle(blogData.title);
        setContent(blogData.content);
        setOriginalTitle(blogData.title);
        setOriginalContent(blogData.content);
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
    
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { id: Number(id), title: title.trim(), content: content.trim() },
        { headers: { Authorization: token } }
      );
      
      // Update original values after successful save
      setOriginalTitle(title);
      setOriginalContent(content);
      
      toast.success("Story updated successfully");
      
      // Navigate after a brief delay to show success message
      setTimeout(() => {
        navigate(`/blog/${id}`);
      }, 1000);
      
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update story");
    } finally {
      setSaving(false);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (hasChanges && !saving) {
          handleUpdate();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasChanges, saving, handleUpdate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Link
            to="/blogs"
            className="text-gray-600 hover:text-black underline"
          >
            Return to stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Top Bar */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/blogs"
              className="text-2xl font-serif italic font-bold text-gray-900 hover:text-gray-700"
            >
              Medium
            </Link>
            <span className="text-sm text-gray-400">Draft</span>
            {hasChanges && (
              <span className="text-sm text-amber-600">Unsaved changes</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleUpdate}
              disabled={!hasChanges || saving}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                hasChanges && !saving
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? "Updating..." : "Update"}
            </button>
            
            <Link
              to={`/blog/${id}`}
              className="px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Title Input */}
          <div>
            <textarea
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={1}
              className="w-full text-4xl md:text-5xl font-serif font-bold text-gray-900 placeholder-gray-300 resize-none border-none outline-none bg-transparent leading-tight"
              style={{ 
                minHeight: '3rem',
                overflow: 'hidden'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
          </div>

          {/* Content Input */}
          <div>
            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xl text-gray-800 placeholder-gray-300 resize-none border-none outline-none bg-transparent leading-relaxed font-serif"
              style={{
                minHeight: '60vh',
                lineHeight: '1.75'
              }}
            />
          </div>
        </form>

        {/* Keyboard shortcut hint */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Cmd/Ctrl + S</kbd> to save
          </p>
        </div>
      </div>
    </div>
  );
}