import React, { useState } from "react";
import { Star } from "lucide-react";
import Navbar from "../components/navbar/Navbar";

function FastFeedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [mood, setMood] = useState("");
  const [quick, setQuick] = useState("");
  const [sent, setSent] = useState(false);

  const sendFeedback = async () => {
    const data = { rating, mood, quick };

    await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSent(true);

    setTimeout(() => {
      setSent(false);
      setRating(0);
      setMood("");
      setQuick("");
    }, 2000);
  };

  return (
    <div>
        <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">

        {/* ⭐ TOP HEADER RATING */}
        <div className="text-center mb-6">

          <h1 className="text-2xl font-bold">
            Rate ResumeAI ⭐
          </h1>

          <p className="text-gray-500 text-sm mt-1 mb-4">
            How was your experience?
          </p>

          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={34}
                className={`cursor-pointer transition ${
                  (hover || rating) >= star
                    ? "text-yellow-400 fill-yellow-400 scale-110"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>

          {/* rating text */}
          {rating > 0 && (
            <p className="text-sm text-purple-600 mt-2 font-medium">
              You rated {rating} / 5 ⭐
            </p>
          )}

        </div>

        {/* EMOJI MOOD */}
        <div className="flex justify-between text-3xl mb-6">

          {[
            { emoji: "😡", label: "bad" },
            { emoji: "😕", label: "confused" },
            { emoji: "😐", label: "ok" },
            { emoji: "🙂", label: "good" },
            { emoji: "😄", label: "amazing" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setMood(item.label)}
              className={`p-2 rounded-xl transition hover:scale-125 ${
                mood === item.label ? "bg-purple-100 scale-125" : ""
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        {/* QUICK OPTIONS */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          {[
            "Too slow",
            "Very easy",
            "Confusing UI",
            "Loved it",
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setQuick(item)}
              className={`py-2 px-3 rounded-xl border text-sm transition ${
                quick === item
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-50"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* SUBMIT */}
        <button
          onClick={sendFeedback}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition font-medium"
        >
          Submit Feedback ⚡
        </button>

        {/* SUCCESS */}
        {sent && (
          <p className="mt-4 text-green-500 font-medium animate-pulse text-center">
            Thanks! Feedback saved 🚀
          </p>
        )}

      </div>
    </div>
    </div>
  );
}

export default FastFeedback;