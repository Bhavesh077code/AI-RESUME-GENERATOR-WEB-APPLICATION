import React from "react";
import { FileText, Sparkles, Download } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import image from "../../assets/image.jpg";

function Home() {
  return (
    <div className="bg-white relative overflow-hidden">

      {/* 🌈 Background blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl opacity-40"></div>

      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center justify-between relative z-10">

        {/* LEFT SIDE */}
        <div className="md:w-1/2 space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium">
            <Sparkles size={14} />
            AI Resume Builder
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Build a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              stunning resume
            </span>{" "}
            in minutes
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg">
            Create ATS-friendly resumes with modern design, AI suggestions, and instant PDF download.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">

            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition">
              Create Resume
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:border-purple-400 hover:text-purple-600 transition">
              View Templates
            </button>

          </div>

        </div>

        {/* RIGHT SIDE (ONLY ONE IMAGE) */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">

          {/* Glow effect */}
          <div className="absolute w-[45000px] h-[450px] bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl opacity-30"></div>

          {/* Image */}
          <img
            src={image}
            alt="Resume Preview"
            className="relative z-10 w-[600px] md:w-[500px] h-[600px] object-cover rounded-3xl shadow-2xl border border-white/40 hover:scale-105 transition duration-500"
          />

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-16">

        <h2 className="text-2xl font-semibold text-center mb-10 text-gray-900">
          Why choose ResumeAI?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-xl border hover:shadow-lg transition bg-gradient-to-b from-white to-purple-50">
            <Sparkles className="text-purple-500 mb-3" />
            <h3 className="font-semibold">AI Suggestions</h3>
            <p className="text-sm text-gray-600">
              Smart content suggestions for better resumes.
            </p>
          </div>

          <div className="p-6 rounded-xl border hover:shadow-lg transition bg-gradient-to-b from-white to-pink-50">
            <FileText className="text-pink-500 mb-3" />
            <h3 className="font-semibold">ATS Friendly</h3>
            <p className="text-sm text-gray-600">
              Optimized resumes for job applications.
            </p>
          </div>

          <div className="p-6 rounded-xl border hover:shadow-lg transition bg-gradient-to-b from-white to-blue-50">
            <Download className="text-blue-500 mb-3" />
            <h3 className="font-semibold">PDF Export</h3>
            <p className="text-sm text-gray-600">
              Download your resume instantly.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-purple-50 to-pink-50">

        <h2 className="text-3xl font-bold mb-4">
          Ready to build your resume?
        </h2>

        <p className="text-gray-600 mb-6">
          Start creating your professional resume in minutes.
        </p>

        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition">
          Start Now
        </button>

      </section>

      {/* FOOTER */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © 2026 ResumeAI. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;