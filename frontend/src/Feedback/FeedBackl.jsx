import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";

function ProFeedback() {
  const [form, setForm] = useState({
    mood: "",
    ease: "",
    value: "",
    trust: "",
    suggestion: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Thanks! Your feedback helps us improve 🚀");

    setForm({
      mood: "",
      ease: "",
      value: "",
      trust: "",
      suggestion: ""
    });
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">

      {/* CARD */}
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl border shadow-2xl rounded-3xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Help Us Improve <span className="text-purple-600">ResumeAI</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Your feedback shapes the future 🚀
          </p>
        </div>

        {/* GRID QUESTIONS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Mood */}
          <div>
            <label className="text-sm font-medium">😊 Experience Mood</label>
            <select
              name="mood"
              value={form.mood}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select</option>
              <option>Very Happy 😄</option>
              <option>Good 🙂</option>
              <option>Neutral 😐</option>
              <option>Confused 😕</option>
              <option>Frustrated 😡</option>
            </select>
          </div>

          {/* Ease */}
          <div>
            <label className="text-sm font-medium">⚡ Ease of Use</label>
            <select
              name="ease"
              value={form.ease}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select</option>
              <option>Very Easy</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Difficult</option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="text-sm font-medium">💡 Value to You</label>
            <select
              name="value"
              value={form.value}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select</option>
              <option>Very Helpful</option>
              <option>Helpful</option>
              <option>Neutral</option>
              <option>Not Helpful</option>
            </select>
          </div>

          {/* Trust */}
          <div>
            <label className="text-sm font-medium">🤝 Trust Level</label>
            <select
              name="trust"
              value={form.trust}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select</option>
              <option>Fully Trust</option>
              <option>Somewhat</option>
              <option>Not Sure</option>
              <option>No Trust</option>
            </select>
          </div>

        </div>

        {/* SUGGESTION BOX */}
        <div className="mt-6">
          <label className="text-sm font-medium">🧠 Suggestions / Improvements</label>

          <textarea
            name="suggestion"
            value={form.suggestion}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-xl h-28 focus:ring-2 focus:ring-purple-400"
            placeholder="Tell us what to improve..."
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition font-medium"
        >
          Submit Feedback 🚀
        </button>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Your data helps improve AI experience & features
        </p>

      </div>
    </div>
    </div>
  );
}

export default ProFeedback;