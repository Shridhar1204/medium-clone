import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { toast } from "react-hot-toast";
import { Avatar } from "../components/BlogCard";

export default function CreateBlog() {
  const [userName, setUserName] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setUserName(userObj.name || "");
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }, []);

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add some content");
      return;
    }

    setIsPublishing(true);
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      const newBlog = response.data;
      toast.success("Story published successfully!");
      navigate(`/blog/${newBlog.id}`);
      
      setTitle("");
      setContent("");
    } catch (error: any) {
      console.error("Error creating blog:", error);
      toast.error(error.response?.data?.message || "Failed to publish story");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    toast.success("Draft saved");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Go back"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">M</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Draft in </span>
                <span className="font-medium">BlogApp</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Saved</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Save draft
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isPublishing || !title.trim() || !content.trim()}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isPublishing || !title.trim() || !content.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
            
            <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm font-medium ml-2">
               <Avatar size="big" name={userName || "?"} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="max-w-3xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="py-12">
          {/* Title Input with Plus Icon */}
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 pt-3">
              <div className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-4xl md:text-5xl font-bold font-serif placeholder-gray-300 focus:outline-none leading-tight text-gray-900"
                autoFocus
              />
            </div>
          </div>

          {/* Content Textarea */}
          <div className="mb-8">
            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xl leading-relaxed placeholder-gray-300 focus:outline-none resize-none text-gray-700 font-normal"
              style={{ minHeight: '60vh', fontFamily: 'charter, Georgia, Cambria, "Times New Roman", Times, serif' }}
            />
          </div>

          {/* Stats Bar */}
          {(title || content) && (
            <div className="flex items-center justify-between py-4 border-t border-gray-100 text-sm text-gray-500">
              <div className="flex items-center gap-6">
                <span>{content.split(' ').filter(word => word.length > 0).length} words</span>
                <span>{getReadingTime(content)} min read</span>
                {title && <span>Title: {title.length} characters</span>}
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  title="More options"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Floating Action Buttons (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={handleSubmit}
          disabled={isPublishing || !title.trim() || !content.trim()}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
            isPublishing || !title.trim() || !content.trim()
              ? 'bg-gray-300 text-gray-500'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isPublishing ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>

      <style>{`
        .font-serif {
          font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
        }
        
        textarea {
          font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
        }
        
        /* Hide scrollbar but keep functionality */
        textarea::-webkit-scrollbar {
          display: none;
        }
        
        textarea {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 768px) {
          .max-w-3xl {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}