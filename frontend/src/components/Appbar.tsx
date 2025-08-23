import { Avatar } from "./BlogCard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const Appbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/blogs" className="text-2xl font-serif italic font-bold text-gray-900 hover:text-gray-700">
            Medium
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/blogs"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/blogs") ? "text-black underline underline-offset-4" : "text-gray-600 hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              to="/my-blogs"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/my-blogs") ? "text-black underline underline-offset-4" : "text-gray-600 hover:text-black"
              }`}
            >
              Your stories
            </Link>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-3 py-1.5 text-sm rounded-full border border-gray-300 focus:ring-1 focus:ring-black focus:border-black"
              />
              <svg
                className="w-4 h-4 absolute left-2.5 top-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Write */}
            <Link to="/new-blog">
              <button className="hidden sm:flex items-center px-6 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-green-700 transition-colors">
                New Post
              </button>
            </Link>

            {/* Notifications */}
            <button className="hidden sm:block p-2 text-gray-600 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5H6l5 5-5 5h5zm0 0v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2" />
              </svg>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)} className="flex items-center">
                <Avatar size="big" name={userName || "?"} />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-60 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {/* User */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{userName || "Anonymous"}</p>
                    <p className="text-xs text-gray-500">Signed in</p>
                  </div>

                  {/* Menu */}
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/my-blogs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                      Your stories
                    </Link>
                    <Link to="/bookmarks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                      Reading list
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <Link to="/blogs" className="block text-gray-600 hover:text-black" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/my-blogs" className="block text-gray-600 hover:text-black" onClick={() => setMobileMenuOpen(false)}>
              Your stories
            </Link>
            <Link to="/new-blog" className="block text-gray-600 hover:text-black" onClick={() => setMobileMenuOpen(false)}>
              Write
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};