import React, { useState } from "react";
import BASE_URL from "../../api";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const notify = () => toast("Wow so easy!");

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // Handle Input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const res = await fetch(`${BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Login failed");
                return;
            }

            // Save Token + User (RIGHT WAY)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            console.log("Token:", data.token);

            // Success message
            toast("Login successful");

            // Clear form
            setForm({
                email: "",
                password: "",
            });

            // Redirect
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {
             toast.error(error.message || "Something went wrong");
            //toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    }; 

    return (
        <div>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

                <div className="w-full max-w-sm">

                    {/* Title */}
                    <h1 className="text-2xl font-medium text-gray-900">
                        Login Account
                    </h1>

                    <p className="text-sm text-gray-500 mb-6">
                        Enter your details to login
                    </p>

                    {/* Message */}
                    {message && (
                        <div
                            className={`p-3 rounded text-sm mb-4 ${
                                message.includes("success")
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

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
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
                                className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-black"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>

                        {/* Register Link */}
                        <a
                            href="/register"
                            className="text-sm text-gray-500 hover:text-black block"
                        >
                            Don't have an account?{" "}
                            <span className="text-blue-600">
                                Register
                            </span>
                        </a>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-black text-white hover:bg-gray-800 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                </div>

            </div>

        <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer
        className="z-50"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="light"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      </div>

        </div>
    );
}

export default Login;