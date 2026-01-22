import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cyan-500 flex items-center justify-center mx-auto animate-pulse shadow-2xl shadow-cyan-500/40">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-cyan-500 mb-3">
          TaskFlow
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-medium">Loading your workspace...</p>

        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;