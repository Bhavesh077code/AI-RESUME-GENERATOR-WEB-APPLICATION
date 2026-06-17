import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import app from "../../assets/app.png";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full bg-red-100 border-b border-gray-200">

            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3 font-semibold text-xl text-gray-900 tracking-tight group cursor-pointer">
                    <div className="relative w-9 h-9 overflow-hidden rounded-full border border-gray-200/80 shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <img
                            className="w-full h-full object-cover"
                            src={app}
                            alt="ResumeAI Logo"
                        />
                    </div>

                    <span className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent">
                        Resume<span className="text-blue-600">AI</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
                    <a href="/" className="hover:text-black transition">Home</a>
                    <a href="/templates" className="hover:text-black transition">Templates</a>
                    <a href="/about" className="hover:text-black transition">How it works</a>
                    <a href="/review" className="hover:text-black transition">FeedBack</a>
                </div>

                {/* CTA Buttons (Desktop) */}
                <div className="hidden md:flex gap-3">
                    <a href="/login" className="px-4 py-2 text-sm text-gray-700 hover:text-black transition">
                        Login
                    </a>

                    <a href="/register" className="px-4 py-2 text-sm text-gray-700 hover:text-black transition">
                        Register
                    </a>
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-700"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>

            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-4 pb-4 space-y-3 text-sm text-gray-600">

                    <a href="/" className="block hover:text-black">Home</a>
                    <a href="#" className="block hover:text-black">Templates</a>
                    <a href="/about" className="block hover:text-black">How it works</a>
                    <a href="/review" className="block hover:text-black">FeedBack</a>

                    <div className="pt-2 space-y-2">

                        <a
                            href="/login"
                            className="w-full block text-center py-2 border border-gray-300 rounded-lg"
                        >
                            Login
                        </a>

                        <a
                            href="/register"
                            className="w-full block text-center py-2 bg-black text-white rounded-lg"
                        >
                            Register
                        </a>

                    </div>

                </div>
            )}

        </nav>
    );
}

export default Navbar;