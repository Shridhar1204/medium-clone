import { Link } from "react-router-dom";

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
  return (
    <Link to={`/blog/${id}`}>
      <div className="group p-6 border-b border-slate-200 w-full max-w-3xl mx-auto cursor-pointer hover:bg-gray-50 transition rounded-xl">
        
        {/* Author Section */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Avatar name={authorName} />
          <span className="font-medium">{authorName}</span>
          <Circle />
          <span className="text-gray-500">{publishedDate}</span>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition">
          {title}
        </h2>

        {/* Content Preview */}
        <p className="mt-2 text-gray-600 text-base leading-relaxed line-clamp-3">
          {content.slice(0, 150)}...
        </p>

        {/* Footer */}
        <div className="mt-3 text-gray-500 text-sm">
          {`${Math.ceil(content.length / 100)} min read`}
        </div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-7 h-7" : "w-12 h-12"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-lg"
        } font-semibold text-gray-700`}
      >
        {name[0]}
      </span>
    </div>
  );
}

function Circle() {
  return <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />;
}
