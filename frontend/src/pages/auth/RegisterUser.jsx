import React, { useState } from "react";
import BASE_URL from "../../api";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
//import {  FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const notify = () => toast("Wow so easy!");

  // Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");



    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // Error
      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      // Save Token
      if (data.token) { localStorage.setItem("token", data.token); }
      // Save User
      if (data.user) { localStorage.setItem("user", JSON.stringify(data.user)); }
      // Success
      toast.success("Account created successfully");
      // Redirect
      setTimeout(() => { navigate("/login"); }, 1000);
    } catch (error) {
      alert(error)
      console.log(error);
      setMessage("Server error");


    } finally { setLoading(false); }

  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">



        <div className="w-full max-w-sm">
          <spam className="text-gray-900 text-2xl text-center text-boarder-30w" > </spam>
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-gray-900">
            Create Account
          </h1>
          {/* Paragraph */}
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Register to continue
          </p>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded text-sm text-center mb-4 ${message.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {message}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-3
              focus:outline-none focus:border-black"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-3
              focus:outline-none focus:border-black"
              required
            />

            {/* Password */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-3 pr-10
                focus:outline-none focus:border-black"
                required
              />

              {/* Toggle */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-0 top-1/2
                -translate-y-1/2 text-gray-500"
              >
                {
                  showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                }
              </button>

            </div>

            {/* Login Link */}
            <a
              href="/login"
              className="text-sm text-gray-500 hover:text-black mb-4 block"
            >
              Already have an account? <spam className="text-blue-600" >LogIn</spam>
            </a>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white
              hover:bg-gray-800 transition duration-200
              disabled:opacity-70"
            >
              {
                loading
                  ? "Creating account..."
                  : "Register"
              }
            </button>

          </form>

        </div>

      </div>

      <div>
      <button onclick={notify}>Notify</button>
      <toastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </div>

    </div>
  );
}

export default Register;