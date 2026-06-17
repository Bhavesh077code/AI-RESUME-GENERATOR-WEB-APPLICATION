import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  BookOpen,
  HelpCircle,
  LogOut,
  FolderOpen,
  User,
  Camera,
} from "lucide-react";

import { Link } from "react-router-dom";
import app from "../../assets/app.png";
import image10 from "../../assets/image10.jpeg";

function Navbar() {
  const [open, setOpen] = useState(false);

  // ✅ SAFE USER STATE (no crash)
  const [user, setUser] = useState(null);

  const fileInputRef = useRef(null);

  // ================= LOAD USER =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setUser((prev) => ({
        ...prev,
        photo: imageUrl,
      }));
    }
  };

  // ================= MENU ITEMS =================
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Cover Letter Builder",
      icon: <FileText size={20} />,
      path: "",
    },
    {
      name: "Templates",
      icon: <FolderOpen size={20} />,
      path: "",
    },
    {
      name: "Interview Prep",
      icon: <HelpCircle size={20} />,
      path: "",
    },
    {
      name: "Question Generator",
      icon: <BookOpen size={20} />,
      path: "",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full h-16 md:h-20 bg-white/90 backdrop-blur-xl border-b border-gray-200 z-50">

        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setOpen(true)}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
            >
              <Menu size={24} />
            </button>

            <Link to="/dashboard" className="flex items-center gap-3">

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src={app}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-lg sm:text-2xl font-black text-gray-900">
                  ResumeAI
                </h1>
                <p className="hidden sm:block text-xs text-gray-500">
                  Smart Resume Platform
                </p>
              </div>

            </Link>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* USER INFO (SAFE) */}
            <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl shadow-sm">

              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                {/*
                <img
                  src={
                    user?.photo ||
                    "https://i.pravatar.cc/150?img=12"
                  }
                  alt="user"
                  className="w-full h-full object-cover"
                /> */}
                <div className="w-10 h-10 center rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-3xl text-center font-semibold">
                      {(user?.name || user?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  {user?.name || "Guest"}
                </h3>
                <p className="text-xs text-gray-500">
                  {user?.email || "guest@gmail.com"}
                </p>
              </div>

            </div>

            {/* LOGOUT */}
            <Link
              to="/login"
              className="px-4 py-2.5 bg-black text-white rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </Link>

          </div>

        </div>

      </nav>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-screen w-[85%] sm:w-80 bg-white shadow-2xl z-50 transition-all duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >

        {/* HEADER */}
        <div className="h-20 border-b border-gray-200 px-5 flex items-center justify-between flex-shrink-0">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow">
              <img src={app} alt="logo" className="w-full h-full object-cover" />
            </div>

            <div>
              <h2 className="text-xl font-black">ResumeAI</h2>
              <p className="text-xs text-gray-500">Smart Career Builder</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-black hover:text-white transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* USER CARD */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">

          <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-3xl p-4 flex items-center gap-4 shadow-2xl">

            {/* IMAGE */}
            <div className="relative">

              <div
                onClick={() => fileInputRef.current.click()}
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer group"
              >
                {/*
                <img
                  src={
                    user?.photo ||
                    "https://i.pravatar.cc/150?img=12"
                  }
                  alt="user"
                  className="w-full h-full object-cover"
                />  */}

                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-5xl text-center font-italic">
                      {(user?.name || user?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>


                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Camera size={20} />
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

            </div>

            {/* INFO */}
            <div className="flex-1 overflow-hidden">

              <h3 className="text-base font-bold truncate">
                {user?.name || "Guest User"}
              </h3>

              <p className="text-xs text-gray-300 truncate">
                {user?.email || "guest@gmail.com"}
              </p>

              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-medium text-gray-200">
                Premium User ✨
              </div>

            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-4 px-4 py-4 rounded-2xl bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            >
              <div className="group-hover:scale-110 transition">
                {item.icon}
              </div>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}

        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-200 bg-white">

          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-xl font-semibold"
          >
            <LogOut size={20} />
            Logout
          </Link>

        </div>

      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
}

export default Navbar;