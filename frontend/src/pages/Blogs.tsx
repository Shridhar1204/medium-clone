
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";

const BlogCardSkeleton = () => (
  <div className="border-b border-gray-100 pb-8 mb-8 animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-6 h-6 bg-gray-200 rounded-full mr-3"></div>
      <div className="flex items-center space-x-2">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
    <div className="h-7 bg-gray-200 rounded w-4/5 mb-3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-100 rounded w-full"></div>
      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
    </div>
  </div>
);

const SidebarSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-100 rounded w-full"></div>
      <div className="h-3 bg-gray-100 rounded w-2/3"></div>
    </div>
  </div>
);

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Appbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content skeleton */}
            <div className="lg:col-span-8">
              <div className="max-w-2xl">
                {[...Array(5)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Sidebar skeleton */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <SidebarSkeleton key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Appbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">No stories yet</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Be the first to share your story with the community.
            </p>
            <Link
              to="/new-blog"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200"
            >
              Start writing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      
      {/* Hero/Featured Section */}
      {/* Hero/Featured Section */}
<div className="border-b border-gray-200 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="max-w-3xl">
      <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight font-serif">
        Human<br />stories & ideas
      </h1>
      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        A place to read, write, and deepen your understanding
      </p>
      <Link
        to="/new-blog"
        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200"
      >
        Start writing
      </Link>
    </div>
  </div>
</div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8">
            <div className="max-w-2xl">
              {/* Trending Topics Bar */}
              <div className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">TRENDING ON MEDIUM</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Technology", "Design", "Programming", "Startup", "Writing", "Self Improvement"].map((topic, index) => (
                    <div key={topic} className="flex items-start">
                      <span className="text-2xl font-bold text-gray-200 mr-3">0{index + 1}</span>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 leading-tight mb-1">
                          {topic} Trends for 2024
                        </h4>
                        <p className="text-xs text-gray-500">Popular in {topic}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blog Posts */}
              <div className="space-y-8">
                {blogs.map((blog) => (
                  <article key={blog.id} className="border-b border-gray-100 pb-8 last:border-b-0">
                    {/* Author Info */}
                    <div className="flex items-center mb-4">
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-medium">
                          {blog.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{blog.author.name}</span>
                        <span className="mx-2">·</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                        <span className="mx-2">·</span>
                        <span>{Math.ceil(blog.content.split(' ').length / 200)} min read</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <Link to={`/blog/${blog.id}`} className="group">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-gray-700 transition-colors duration-200 font-serif">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {blog.content.length > 150
                            ? blog.content.slice(0, 150) + "..."
                            : blog.content}
                        </p>
                      </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <span className="text-sm text-gray-500">24</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </button>
                          <span className="text-sm text-gray-500">3</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Staff Picks */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Staff Picks</h3>
                <div className="space-y-4">
                  {blogs.slice(0, 3).map((blog) => (
                    <div key={blog.id} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">
                          {blog.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center text-xs text-gray-600 mb-1">
                          <span className="font-medium text-gray-900">{blog.author.name}</span>
                        </div>
                        <Link to={`/blog/${blog.id}`} className="block">
                          <h4 className="text-sm font-medium text-gray-900 leading-tight hover:text-gray-700 transition-colors duration-200">
                            {blog.title.length > 50 ? blog.title.slice(0, 50) + "..." : blog.title}
                          </h4>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Topics */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Recommended Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["Programming", "Technology", "Design", "Startup", "Writing", "Self Improvement", "Health", "Politics"].map((topic) => (
                    <button
                      key={topic}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
                <button className="text-green-600 text-sm font-medium mt-3 hover:text-green-700 transition-colors duration-200">
                  See more topics
                </button>
              </div>

              {/* Footer Links */}
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a href="#" className="hover:text-gray-700">Help</a>
                  <a href="#" className="hover:text-gray-700">Status</a>
                  <a href="#" className="hover:text-gray-700">Writers</a>
                  <a href="#" className="hover:text-gray-700">Blog</a>
                  <a href="#" className="hover:text-gray-700">Careers</a>
                  <a href="#" className="hover:text-gray-700">Privacy</a>
                  <a href="#" className="hover:text-gray-700">Terms</a>
                  <a href="#" className="hover:text-gray-700">About</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .font-serif {
          font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
        }
      `}</style>
    </div>
  );
};