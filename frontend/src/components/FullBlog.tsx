import { Appbar } from "./Appbar";
import type { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog | null }) => {
  if (!blog) {
    return (
      <div>
        <Appbar />
        <div className="flex items-center justify-center h-screen text-xl font-medium text-gray-600">
          Loading blogfull...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-6 py-12">
        {/* Blog Content */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center mt-4 text-sm text-gray-500">
            <span className="font-medium text-gray-700">By {blog.author?.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div className="mt-6 text-lg leading-relaxed text-gray-700 whitespace-pre-line">
            {blog.content}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">About the Author</h2>
            <p className="mt-3 text-gray-600 text-sm">
              {blog.author?.name} is a passionate writer who shares knowledge and insights 
              through blogs. Stay tuned for more posts!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">Related Posts</h2>
            <ul className="mt-3 space-y-2 text-sm text-blue-600">
              <li className="hover:underline cursor-pointer">How to become a better developer</li>
              <li className="hover:underline cursor-pointer">10 Tips for writing clean code</li>
              <li className="hover:underline cursor-pointer">Understanding React Hooks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
