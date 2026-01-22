import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context, server } from "./main";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const { setUser, setIsAuthenticated, setLoading, loading } =
    useContext(Context);

  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser({});
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUser, setIsAuthenticated, setLoading]);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111111',
              color: '#e5e5e5',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              padding: '16px',
              boxShadow: '0 10px 40px rgba(6, 182, 212, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#06b6d4',
                secondary: '#000',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;