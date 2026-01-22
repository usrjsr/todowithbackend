import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  const avatarLetter = user?.name?.charAt(0).toUpperCase() || "U";
  
  const userStats = [
    { label: "Member Since", value: "2024", icon: "📅" },
    { label: "Total Tasks", value: "0", icon: "📝" },
    { label: "Completed", value: "0", icon: "✅" },
    { label: "Active", value: "0", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-6 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-[#111111] border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 overflow-hidden">
          
          <div className="h-24 sm:h-32 bg-cyan-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="relative px-4 sm:px-8 pb-6 sm:pb-8">
            <div className="flex justify-center -mt-12 sm:-mt-16 mb-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500 flex items-center justify-center text-black text-4xl sm:text-5xl font-bold shadow-2xl border-4 border-[#111111] transform hover:scale-110 transition-transform duration-300">
                {avatarLetter}
              </div>
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-2">
                {user?.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-400 flex items-center justify-center gap-2 flex-wrap">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="break-all">{user?.email}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {userStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#0a0a0a] border border-cyan-500/20 p-3 sm:p-4 text-center hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
                >
                  <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-sm sm:text-base">Edit Profile</span>
              </button>
              <button className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-blue-600 text-white font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm sm:text-base">Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-[#111111] border border-cyan-500/20 shadow-lg shadow-cyan-500/5 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </span>
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-500"></div>
                <span>Account created</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-blue-500"></div>
                <span>Profile viewed</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-cyan-500/20 shadow-lg shadow-cyan-500/5 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-[#0a0a0a] transition-colors text-gray-300 text-sm border border-transparent hover:border-cyan-500/20">
                📊 View Analytics
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-[#0a0a0a] transition-colors text-gray-300 text-sm border border-transparent hover:border-cyan-500/20">
                🔔 Notifications
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-[#0a0a0a] transition-colors text-gray-300 text-sm border border-transparent hover:border-cyan-500/20">
                🎨 Customize Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;