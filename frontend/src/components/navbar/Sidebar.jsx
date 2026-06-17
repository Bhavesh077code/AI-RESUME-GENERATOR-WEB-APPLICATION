


import React from "react";
import {
  X,
  Crown,
  HelpCircle,
  BookOpen,
  LayoutDashboard,
  FileText,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import app from "../../assets/app.png";

function Sidebar({ open, setOpen }) {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Resume Builder",
      path: "/resume-builder",
      icon: <FileText size={20} />,
    },
    {
      name: "Templates",
      path: "/templates",
      icon: <FileText size={20} />,
    },
    {
      name: "Interview Prep",
      path: "/questions",
      icon: <HelpCircle size={20} />,
    },
    {
      name: "Question Generator",
      path: "/generator",
      icon: <BookOpen size={20} />,
    },
  ];

  return (
    <>
      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-72
          bg-white/95 backdrop-blur-xl
          border-r border-gray-200
          shadow-2xl z-50
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">

          {/* LOGO */}
          <div className="flex items-center gap-3 group cursor-pointer">

            {/* IMAGE */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200 shadow-md group-hover:scale-105 transition">

              <img
                src={app}
                alt="ResumeAI Logo"
                className="w-full h-full object-cover"
              />

            </div>

            {/* TEXT */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                ResumeAI
              </h1>

              <p className="text-xs text-gray-500">
                AI Resume Builder
              </p>
            </div>

          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="
              p-2 rounded-xl
              hover:bg-gray-100
              transition
            "
          >
            <X size={22} />
          </button>

        </div>

        {/* ================= MENU ================= */}
        <div className="p-4 flex flex-col gap-2">

          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3 rounded-2xl
                transition-all duration-300
                font-medium
                ${isActive
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
                }
              `
              }
            >
              <div>
                {item.icon}
              </div>

              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* DIVIDER */}
          <div className="my-4 border-t border-gray-200"></div>

          {/* LOGIN BUTTON */}
          <button
            className="
              w-full text-left
              px-4 py-3 rounded-2xl
              hover:bg-gray-100
              transition
              font-medium
            "
          >
            Login
          </button>

          {/* PRO BUTTON */}
          <button
            className="
              flex items-center justify-center gap-2
              w-full py-3 rounded-2xl
              bg-black text-white
              hover:bg-gray-800
              transition-all duration-300
              shadow-lg hover:scale-[1.02]
              font-medium
            "
          >
            <Crown size={18} />
            Upgrade Pro
          </button>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="absolute bottom-5 left-0 w-full px-4">

          <div
            className="
              bg-gradient-to-r from-purple-500 to-pink-500
              rounded-2xl p-4 text-white shadow-xl
            "
          >
            <h2 className="font-semibold mb-1">
              🚀 Pro Features
            </h2>

            <p className="text-sm text-white/80">
              Unlock premium templates & AI tools
            </p>

            <button
              className="
                mt-3 w-full py-2 rounded-xl
                bg-white text-black
                font-medium
                hover:scale-105
                transition
              "
            >
              Go Premium
            </button>
          </div>

        </div>

      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0
            bg-black/20
            z-40
            transition-opacity duration-300
          "
        ></div>
      )}
    </>
  );
}

export default Sidebar;