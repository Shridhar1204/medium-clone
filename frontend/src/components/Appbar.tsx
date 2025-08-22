import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Appbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo / Brand */}
        <Link to={"/blogs"}>
          <div className="text-2xl font-extrabold text-gray-900 tracking-tight cursor-pointer">
            Medium
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link 
            to={"/blogs"} 
            className="hover:text-gray-900 transition"
          >
            Home
          </Link>
          <Link 
            to={"/my-blogs"} 
            className="hover:text-gray-900 transition"
          >
            My Blogs
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* New Post Button */}
          <Link to={"/new-blog"}>
            <button className="px-5 py-2 text-md font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-700 transition">
              New Post
            </button>
          </Link>

          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none"
            >
              <Avatar size={"big"} name="Shridhar" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
