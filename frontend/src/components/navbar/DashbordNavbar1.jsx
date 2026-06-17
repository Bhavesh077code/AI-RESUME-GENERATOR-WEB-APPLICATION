
import React, { useState } from "react";
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
} from "lucide-react";

import { Link } from "react-router-dom";
import app from "../../assets/app.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-50">

        <div className="h-full px-4 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>

            {/* LOGO */}
            <Link
              to="/dashboard"
              className="flex items-center gap-3"
            >

              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={app}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-xl font-bold text-gray-900">
                ResumeAI
              </h1>

            </Link>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* USER */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">

              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                H
              </div>

              <div className="leading-tight">
                <p className="text-sm font-medium text-gray-900">
                  Huzaifa
                </p>
                <p className="text-xs text-gray-500">
                  Premium User
                </p>
              </div>

            </div>

            {/* LOGOUT */}
            <Link
              to="/login"
              className="px-4 py-2 bg-black text-white rounded-xl text-sm flex items-center gap-2 hover:bg-gray-800 transition"
            >
              <LogOut size={16} />
              Logout
            </Link>

          </div>

        </div>

      </nav>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 shadow-2xl z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* HEADER */}
        <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={app}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-bold">
              ResumeAI
            </h2>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* MENU */}
        <div className="p-4 space-y-2">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/resume-builder"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
          >
            <FileText size={20} />
            Resume Builder
          </Link>

          <Link
            to="/templates"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
          >
            <FolderOpen size={20} />
            Templates
          </Link>

          <Link
            to="/questions"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
          >
            <HelpCircle size={20} />
            Interview Prep
          </Link>

          <Link
            to="/generator"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
          >
            <BookOpen size={20} />
            Question Generator
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
          >
            <User size={20} />
            Profile
          </Link>

        </div>

       
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200">

          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <LogOut size={18} />
            Logout
          </Link>

        </div>

      </div>

     
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 "
        />
      )}
    </>
  );
}

export default Navbar;

