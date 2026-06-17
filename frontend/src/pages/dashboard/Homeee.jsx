import React from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles, Download, ArrowRight } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import image from "../../assets/image4.jpg";
import hello from "../../assets/hello.png";

function Home() {
    return (
        <div className="bg-white overflow-hidden">

            {/* 🌈 BACKGROUND BLUR BLOBS */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <Navbar />

            {/* ================= HERO ================= */}
            <section className="min-h-screen flex items-center">

                <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-6 text-center lg:text-left"
                    >

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border shadow-sm text-purple-700 text-sm">
                            <Sparkles size={16} />
                            AI Resume Builder
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                            Build a{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
                                stunning resume
                            </span>{" "}
                            in minutes
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0">
                            Create ATS-friendly resumes with AI suggestions, modern templates,
                            and instant PDF export. Build your career in seconds.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

                            <button className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2">
                                Create Resume
                                <ArrowRight className="group-hover:translate-x-1 transition" />
                            </button>

                            <button className="px-6 py-3 border rounded-xl hover:border-purple-400 hover:text-purple-600 transition bg-white/60 backdrop-blur">
                                View Templates
                            </button>

                        </div>

                        {/* Stats */}
                        <div className="flex gap-10 justify-center lg:justify-start pt-4">

                            <div>
                                <h3 className="text-2xl font-bold">10K+</h3>
                                <p className="text-sm text-gray-500">Users</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">95%</h3>
                                <p className="text-sm text-gray-500">ATS Success</p>
                            </div>

                        </div>

                    </motion.div>

                    {/* RIGHT SIDE IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 flex justify-center relative"
                    >

                        {/* Glow */}
                        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl opacity-30"></div>

                        {/* Floating Image */}
                        <motion.img
                            src={image}
                            alt="resume"
                            className=" w-[300px] sm:w-[400px] md:w-[500px] lg:w-[580px] xl:w-[620px] h-[650px] object-cover rounded-3xl shadow-2xl"
                            animate={{ y: [0, -15, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{ scale: 1.05 }}
                        />

                    </motion.div>

                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="py-24 px-6">

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center mb-14"
                >
                    Why choose ResumeAI?
                </motion.h2>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

                    {[
                        {
                            icon: <Sparkles />,
                            title: "AI Suggestions",
                            desc: "Smart resume improvements instantly."
                        },
                        {
                            icon: <FileText />,
                            title: "ATS Friendly",
                            desc: "Optimized for job systems."
                        },
                        {
                            icon: <Download />,
                            title: "PDF Export",
                            desc: "Download instantly."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition"
                        >
                            <div className="text-purple-600 mb-3">{item.icon}</div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}

                </div>
            </section>

            {/* ================= CTA ================= */}
            {/* ================= CTA ================= */}
            <section className="py-28 text-center bg-gradient-to-r from-purple-50 to-pink-50">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold mb-4"
                >
                    Ready to build your resume?
                </motion.h2>

                <p className="text-gray-600 mb-8">
                    Start your journey in minutes.
                </p>

                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition">
                    Get Started Free
                </button>
            </section> 

            {/* FOOTER */}
            <footer className="py-6 text-center text-gray-500 border-t">
                © 2026 ResumeAI. All rights reserved.
            </footer>

        </div>
    );
}

export default Home;