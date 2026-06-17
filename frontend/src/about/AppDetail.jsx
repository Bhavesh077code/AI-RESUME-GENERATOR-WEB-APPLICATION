import React from "react";
import { Sparkles, FileText, Download, Rocket } from "lucide-react";
import Navbar from "../components/navbar/Navbar";

function About() {
  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-white px-6 py-20">

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-purple-600">ResumeAI</span>
        </h1>

        <p className="text-gray-600 mt-4">
          ResumeAI is a smart AI-powered platform that helps you build professional,
          ATS-friendly resumes in minutes.
        </p>

      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">

        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition">
          <Sparkles className="text-purple-600 mb-3" />
          <h2 className="font-semibold text-lg">1. AI Input</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your details or upload your resume.
          </p>
        </div>

        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition">
          <FileText className="text-pink-500 mb-3" />
          <h2 className="font-semibold text-lg">2. Smart Analysis</h2>
          <p className="text-gray-500 text-sm mt-2">
            AI analyzes and improves your resume instantly.
          </p>
        </div>

        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition">
          <Download className="text-blue-500 mb-3" />
          <h2 className="font-semibold text-lg">3. Download PDF</h2>
          <p className="text-gray-500 text-sm mt-2">
            Get your professional resume in one click.
          </p>
        </div>

      </div>

      {/* FEATURES */}
      <div className="mt-20 text-center">

        <h2 className="text-2xl font-bold mb-10">Why Choose Us?</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">

          <div className="p-6 border rounded-xl">
            <Rocket className="text-purple-600 mb-2" />
            <h3 className="font-semibold">Fast & Easy</h3>
            <p className="text-gray-500 text-sm">
              Build resumes in less than 2 minutes.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <Sparkles className="text-pink-500 mb-2" />
            <h3 className="font-semibold">AI Powered</h3>
            <p className="text-gray-500 text-sm">
              Smart suggestions for better job chances.
            </p>
          </div>

        </div>

      </div>

      {/* FOOTER NOTE */}
      <div className="text-center mt-20 text-gray-500 text-sm">
        © 2026 ResumeAI - Built for your career growth 🚀
      </div>

    </div>
    </div>
  );
}

export default About;