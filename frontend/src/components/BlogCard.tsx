import { Link } from "react-router-dom";
import { useState } from "react";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 5);
  const [isLiked, setIsLiked] = useState(false);
  
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle menu options
  };

  return (
    <article className="border-b border-gray-100 pb-8 mb-8 last:border-b-0 group">
      {/* Author Info */}
      <div className="flex items-center mb-4">
        <Avatar name={authorName} size="small" />
        <div className="ml-3 flex items-center text-sm text-gray-600">
          <Link 
            to={`/author/${authorName.toLowerCase().replace(' ', '-')}`}
            className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {authorName}
          </Link>
          <Circle />
          <span>{formatDate(publishedDate)}</span>
          <Circle />
          <span>{getReadingTime(content)}</span>
        </div>
      </div>

      {/* Main Content */}
      <Link to={`/blog/${id}`} className="block group-hover:opacity-95 transition-opacity duration-200">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight font-serif group-hover:text-gray-700 transition-colors duration-200">
            {title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg line-clamp-3">
            {content.length > 140 ? `${content.slice(0, 140)}...` : content}
          </p>
        </div>
      </Link>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${
                isLiked ? 'text-red-500 fill-current' : 'text-gray-500'
              }`} 
              fill={isLiked ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm text-gray-500">{likes}</span>
          </button>

          {/* Comment Button */}
          <Link 
            to={`/blog/${id}#comments`}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm text-gray-500">{Math.floor(Math.random() * 10) + 1}</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            title={isBookmarked ? "Remove bookmark" : "Save to reading list"}
          >
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${
                isBookmarked ? 'text-green-600 fill-current' : 'text-gray-500'
              }`} 
              fill={isBookmarked ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>

          {/* Menu Button */}
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            title="More options"
          >
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export function Avatar({
  name,
  size = "small",
  status,
}: {
  name: string;
  size?: "small" | "medium" | "big" | "large";
  status?: "online" | "offline";
}) {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  
  // Generate consistent colors based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-cyan-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-6 h-6 text-xs";
      case "medium":
        return "w-8 h-8 text-sm";
      case "big":
        return "w-10 h-10 text-base";
      case "large":
        return "w-12 h-12 text-lg";
      default:
        return "w-6 h-6 text-xs";
    }
  };

  return (
    <div className="relative inline-flex">
      <div
        className={`
          relative inline-flex items-center justify-center overflow-hidden 
          rounded-full text-white font-semibold shadow-sm
          ${getSizeClasses()} ${getAvatarColor(name)}
          hover:shadow-md transition-shadow duration-200
        `}
      >
        {firstLetter}
      </div>
      
      {/* Status indicator */}
      {status && (
        <div className={`
          absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white
          ${size === "small" ? "w-2.5 h-2.5" : "w-3 h-3"}
          ${status === "online" ? "bg-green-400" : "bg-gray-400"}
        `} />
      )}
    </div>
  );
}

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-gray-400 mx-2" />;
}

// Additional utility component for author links
export function AuthorInfo({ 
  name, 
  date, 
  readTime, 
  avatarSize = "small" 
}: { 
  name: string; 
  date: string; 
  readTime: string;
  avatarSize?: "small" | "medium" | "big" | "large";
}) {
  return (
    <div className="flex items-center">
      <Avatar name={name} size={avatarSize} />
      <div className="ml-3 flex items-center text-sm text-gray-600">
        <Link 
          to={`/author/${name.toLowerCase().replace(' ', '-')}`}
          className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
        >
          {name}
        </Link>
        <Circle />
        <span>{date}</span>
        <Circle />
        <span>{readTime}</span>
      </div>
    </div>
  );
}

// Tag component for topics
export function Tag({ 
  children, 
  variant = "default",
  onClick 
}: { 
  children: React.ReactNode;
  variant?: "default" | "featured";
  onClick?: () => void;
}) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer";
  const variantClasses = variant === "featured" 
    ? "bg-gray-900 text-white hover:bg-gray-800" 
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
  
  return (
    <span 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}