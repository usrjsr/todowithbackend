import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/mytasks`, { withCredentials: true })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Something went wrong");
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const filteredTasks = Array.isArray(tasks)
    ? tasks
        .filter((task) => {
          if (filter === "active") return !task.isCompleted;
          if (filter === "completed") return task.isCompleted;
          return true;
        })
        .filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-[#111111] border border-cyan-500/20 p-4 sm:p-6 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 sm:mb-0">Total Tasks</p>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-500">{totalTasks}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 bg-cyan-500/10 items-center justify-center border border-cyan-500/30">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-blue-500/20 p-4 sm:p-6 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-500/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 sm:mb-0">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-500">{activeTasks}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/10 items-center justify-center border border-blue-500/30">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-green-500/20 p-4 sm:p-6 shadow-lg shadow-green-500/5 hover:shadow-green-500/10 transition-all duration-300 hover:border-green-500/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 sm:mb-0">Completed</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-500">{completedTasks}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 bg-green-500/10 items-center justify-center border border-green-500/30">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-purple-500/20 p-4 sm:p-6 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 sm:mb-0">Completion</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-500">{completionRate}%</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/10 items-center justify-center border border-purple-500/30">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111111] border border-cyan-500/20 shadow-lg shadow-cyan-500/5 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-cyan-500 mb-4 sm:mb-6 flex items-center">
            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 flex items-center justify-center mr-2 sm:mr-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            Add New Task
          </h2>
          <form onSubmit={submitHandler} className="space-y-3 sm:space-y-4">
            <input
              type="text"
              placeholder="Task title..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 bg-[#0a0a0a] border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-200 text-gray-200 placeholder-gray-500"
            />
            <textarea
              placeholder="Task description..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 sm:py-3 bg-[#0a0a0a] border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-200 resize-none text-gray-200 placeholder-gray-500"
            />
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 sm:py-3 bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Adding Task..." : "Add Task"}
            </button>
          </form>
        </div>

        <div className="bg-[#111111] border border-cyan-500/20 shadow-lg shadow-cyan-500/5 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 sm:py-3 bg-[#0a0a0a] border-2 border-gray-700 focus:border-cyan-500 outline-none transition-all duration-200 text-gray-200 placeholder-gray-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`flex-1 lg:flex-none px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-200 ${
                  filter === "all"
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : "bg-[#0a0a0a] text-gray-400 border border-gray-700 hover:border-cyan-500/50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`flex-1 lg:flex-none px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-200 ${
                  filter === "active"
                    ? "bg-blue-500 text-black shadow-lg shadow-blue-500/20"
                    : "bg-[#0a0a0a] text-gray-400 border border-gray-700 hover:border-blue-500/50"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`flex-1 lg:flex-none px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-200 ${
                  filter === "completed"
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                    : "bg-[#0a0a0a] text-gray-400 border border-gray-700 hover:border-green-500/50"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-[#111111] border border-cyan-500/20 shadow-lg shadow-cyan-500/5 p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No tasks found</h3>
              <p className="text-sm sm:text-base text-gray-600">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Start by adding your first task above!"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TodoItem
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;