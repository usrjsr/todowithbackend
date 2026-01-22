import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setLoading } =
    useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="bg-[#111111] border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-cyan-500 mb-4 shadow-xl shadow-cyan-500/40">
            <svg className="w-7 h-7 sm:w-10 sm:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-500 mb-2">Welcome Back</h2>
          <p className="text-sm sm:text-base text-gray-400">Sign in to TaskFlow</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4 sm:space-y-5">
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
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-200 text-sm sm:text-base text-gray-200 placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-cyan-500 text-black text-sm sm:text-base font-semibold hover:bg-cyan-400 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-cyan-500/20"
          >
            Login
          </button>

          <div className="text-center">
            <span className="text-sm sm:text-base text-gray-500">Or</span>
          </div>

          <Link
            to="/register"
            className="block text-center text-sm sm:text-base text-cyan-500 hover:text-cyan-400 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;