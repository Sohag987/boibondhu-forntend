import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Toast = ({ message }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-3 rounded-xl shadow-lg animate-bounce">
    {message}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://127.0.0.1:8000/login/", formData);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", res.data.username);

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5EFE8] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#2C2416] text-xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-[#8C7B6E] text-xs mt-1">
            Log in to your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-6 flex flex-col gap-4">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-xs">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[#2C2416] text-xs font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="rahim@example.com"
              className="bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[#2C2416] text-xs font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 bg-[#2C2416] text-[#EDE4D8] text-sm px-4 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </div>

        {/* Signup link */}
        <p className="text-center text-[#8C7B6E] text-xs mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#2C2416] font-medium hover:underline">
            Sign up
          </Link>
        </p>

      </div>

      {showToast && <Toast message="Logged in successfully! Redirecting..." />}

    </main>
  );
};

export default Login;