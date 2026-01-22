import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className={`bg-[#111111] border-2 p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isCompleted ? 'border-green-500/40 bg-green-500/5' : 'border-cyan-500/20'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex-shrink-0 mt-1">
            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => updateHandler(id)}
                className="sr-only peer"
              />
              <div className={`w-5 h-5 sm:w-6 sm:h-6 border-2 transition-all duration-300 flex items-center justify-center ${
                isCompleted
                  ? 'bg-green-500 border-green-500'
                  : 'bg-transparent border-gray-600 group-hover:border-cyan-500'
              }`}>
                {isCompleted && (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </label>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className={`text-base sm:text-lg font-bold mb-2 transition-all duration-300 break-words ${
              isCompleted ? 'text-gray-500 line-through' : 'text-gray-200'
            }`}>
              {title}
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed transition-all duration-300 break-words ${
              isCompleted ? 'text-gray-600 line-through' : 'text-gray-400'
            }`}>
              {description}
            </p>

            <div className="mt-3">
              <span className={`inline-flex items-center px-2 sm:px-3 py-1 text-xs font-semibold ${
                isCompleted
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {isCompleted ? (
                  <>
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    In Progress
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => deleteHandler(id)}
          className="flex-shrink-0 w-full sm:w-auto p-2 sm:p-2.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 hover:border-red-600 transition-all duration-200 hover:scale-110 group"
          title="Delete task"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;