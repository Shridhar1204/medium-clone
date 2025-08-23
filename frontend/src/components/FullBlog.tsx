import { Appbar } from "./Appbar";
import type { Blog } from "../hooks";
import { useState, useEffect } from "react";
import { Clock, User, Calendar } from "lucide-react";

const FullBlogSkeleton = () => (
  <div className="min-h-screen bg-white animate-pulse">
    <Appbar />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Skeleton */}
      <div className="mb-8">
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-1/3"></div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4 mb-12">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={`h-4 bg-gray-100 rounded ${
            i % 5 === 0 ? 'w-11/12' : i % 5 === 1 ? 'w-full' : i % 5 === 2 ? 'w-10/12' : i % 5 === 3 ? 'w-9/12' : 'w-8/12'
          }`}></div>
        ))}
      </div>

      {/* Author Skeleton */}
      <div className="border-t pt-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

export const FullBlog = ({ blog }: { blog: Blog | null }) => {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (blog?.content) {
      // Calculate reading time (average 200 words per minute)
      const words = blog.content.split(' ').length;
      const time = Math.ceil(words / 200);
      setReadingTime(time);
    }
  }, [blog]);

  if (!blog) {
    return <FullBlogSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      
      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{blog.author?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none mb-16">
          <div className="text-gray-800 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        </div>

        {/* Author Section */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
              {blog.author?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {blog.author?.name || 'Anonymous'}
              </h3>
              <p className="text-gray-600 mt-1 leading-relaxed">
                Writer and developer sharing insights on technology and best practices. 
                Follow for thoughtful articles on software development.
              </p>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};