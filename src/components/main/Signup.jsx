import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Toast = ({ message }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2C2416] text-[#EDE4D8] text-xs px-5 py-3 rounded-xl shadow-lg animate-bounce">
    {message}
  </div>
);

const Signup = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [picture, setPicture] = useState(null);
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

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (picture) data.append("picture", picture);

    try {
      await axios.post(`${API}/register/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show toast then redirect
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5EFE8] flex items-center justify-center px-4 py-12">

      {showToast && <Toast message="Account created successfully! Redirecting..." />}

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#2C2416] text-xl font-semibold tracking-tight">
            Create account
          </h1>
          <p className="text-[#8C7B6E] text-xs mt-1">
            Fill in your details to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-6 flex flex-col gap-4">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-xs">
              {typeof error === "string"
                ? error
                : Object.entries(error).map(([k, v]) => (
                    <p key={k}><span className="font-medium">{k}:</span> {v}</p>
                  ))}
            </div>
          )}

          {/* Name row */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[#2C2416] text-xs font-medium">First name<span className="text-[#8C7B6E] font-normal">(Required)</span></label>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Rahim"
                className="bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[#2C2416] text-xs font-medium">Last name<span className="text-[#8C7B6E] font-normal">(Required)</span></label>
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Khan"
                className="bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[#2C2416] text-xs font-medium">Email<span className="text-[#8C7B6E] font-normal">(Required)</span></label>
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

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-[#2C2416] text-xs font-medium">
              Phone <span className="text-[#8C7B6E] font-normal">(Required)</span>
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-[#2C2416] text-xs font-medium">
              Address <span className="text-[#8C7B6E] font-normal">(optional)</span>
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
              className="bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-sm text-[#2C2416] placeholder-[#C8B9A8] focus:outline-none focus:border-[#8C7B6E] transition-colors duration-150"
            />
          </div>

          {/* Picture */}
          <div className="flex flex-col gap-1">
            <label className="text-[#2C2416] text-xs font-medium">
              Profile picture <span className="text-[#8C7B6E] font-normal">(optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPicture(e.target.files[0])}
              className="bg-[#F5EFE8] border border-[#C8B9A8] rounded-lg px-3 py-2 text-xs text-[#8C7B6E] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-[#2C2416] file:text-[#EDE4D8] hover:file:bg-[#4A3728] transition-colors duration-150 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 bg-[#2C2416] text-[#EDE4D8] text-sm px-4 py-2.5 rounded-lg hover:bg-[#4A3728] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </div>

        {/* Login link */}
        <p className="text-center text-[#8C7B6E] text-xs mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2C2416] font-medium hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Signup;