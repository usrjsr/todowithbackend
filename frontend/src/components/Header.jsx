import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-cyan-500">
              TaskFlow
            </span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <Link
              to="/"
              className="text-sm sm:text-base text-gray-300 hover:text-cyan-500 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link
              to="/profile"
              className="text-sm sm:text-base text-gray-300 hover:text-cyan-500 font-medium transition-colors duration-200 relative group"
            >
              Profile
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {isAuthenticated ? (
              <button
                disabled={loading}
                onClick={logoutHandler}
                className="px-3 py-1.5 sm:px-6 sm:py-2 bg-red-600 text-white text-sm sm:text-base font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "..." : "Logout"}
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 sm:px-6 sm:py-2 bg-cyan-500 text-black text-sm sm:text-base font-semibold hover:bg-cyan-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/20"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;