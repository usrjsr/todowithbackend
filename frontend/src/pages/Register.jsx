import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="bg-[#111111] border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-cyan-500 mb-4 shadow-xl shadow-cyan-500/40">
            <svg className="w-7 h-7 sm:w-10 sm:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-500 mb-2">Create Account</h2>
          <p className="text-sm sm:text-base text-gray-400">Join TaskFlow today</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-200 text-sm sm:text-base text-gray-200 placeholder-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-200 text-sm sm:text-base text-gray-200 placeholder-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-200 text-sm sm:text-base text-gray-200 placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-cyan-500 text-black text-sm sm:text-base font-semibold hover:bg-cyan-400 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-cyan-500/20"
          >
            Sign Up
          </button>

          <div className="text-center">
            <span className="text-sm sm:text-base text-gray-500">Or</span>
          </div>

          <Link
            to="/login"
            className="block text-center text-sm sm:text-base text-cyan-500 hover:text-cyan-400 font-semibold transition-colors"
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;