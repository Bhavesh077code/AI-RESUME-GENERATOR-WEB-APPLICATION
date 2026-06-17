import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles, Download, ArrowRight } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { AnimatePresence } from "framer-motion";


// images
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.webp";
import image4 from "../../assets/image4.webp";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.webp";
import image7 from "../../assets/image7.png";
import image8 from "../../assets/image8.jpg"
import image9 from "../../assets/image9.png"
import image10 from "../../assets/image10.jpeg"

function Home() {

    const images = [image8, image10, image9, image1, image2, image3, image4, image5, image6, image7];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // slower = premium feel

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-100 overflow-x-hidden relative">
       <div className="bg-gray-100 overflow-x-hidden relative">

            {/* 🌈 BACKGROUND */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">

                <motion.div
                    animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"
                />

                <motion.div
                    animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"
                />

                <motion.div
                    animate={{ y: [0, 60, 0], x: [0, 10, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"
                />

            </div>

            <Navbar />

            {/* ================= HERO ================= */}
            <section className="min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">

                <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex-1 space-y-6 text-center lg:text-left"
                    >

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border shadow-sm text-purple-700 text-sm"
                        >
                            <Sparkles size={16} />
                            AI Resume Builder
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
                        >
                            Build a{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
                                stunning resume
                            </span>{" "}
                            in minutes
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0"
                        >
                            Create ATS-friendly resumes with AI suggestions,
                            modern templates, and instant PDF export.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >

                            <motion.button
                                whileHover={{
                                    scale: 1.08,
                                    boxShadow: "0px 15px 35px rgba(168,85,247,0.35)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg transition flex items-center gap-2 justify-center"
                            >
                                Create Resume
                                <ArrowRight className="group-hover:translate-x-1 transition duration-300" />
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: "#a855f7",
                                    color: "#9333ea"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 border rounded-xl transition bg-white/60 backdrop-blur"
                            >
                                View Templates
                            </motion.button>

                        </motion.div>

                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex-1 flex justify-center relative"
                    >

                        {/* GLOW */}
                        <motion.div
                            animate={{
                                scale: [1, 1.12, 1],
                                opacity: [0.25, 0.4, 0.25],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute w-[520px] h-[520px] bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-full blur-3xl"
                        />

                        {/* FLOATING CARD */}
                        <motion.div

                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 1, 0, -1, 0],
                            }}

                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}

                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut"
                                }
                            }}

                            className="relative w-[300px] sm:w-[400px] md:w-[500px] lg:w-[580px] xl:w-[620px] h-[650px] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.25)] border border-white/30 backdrop-blur-xl"
                        >

                            {/* IMAGE SLIDER */}
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={index}
                                    className="absolute inset-0 w-full h-full origin-center"
                                    style={{ perspective: 1200 }} // Gives 3D depth to the container

                                    /* 3D MATRIX REVEAL MOVEMENT */
                                    initial={{
                                        opacity: 0,
                                        scale: 1.15,
                                        rotateX: -8,
                                        z: -100
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotateX: 0,
                                        z: 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        rotateX: 8,
                                        z: -150,
                                        filter: "blur(20px)"
                                    }}
                                    transition={{
                                        duration: 2.4,
                                        ease: [0.16, 1, 0.3, 1], // Ultra-luxurious custom cubic-bezier curve
                                    }}
                                >
                                    {/* 1. IMAGE WITH CINEMATIC DISPLACEMENT & LENS BLUR */}
                                    <motion.img
                                        src={images[index]}
                                        alt="premium_showcase"
                                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"

                                        initial={{
                                            filter: "blur(40px) brightness(0.2) contrast(1.5)",
                                            scale: 1.2,
                                            saturate: 0
                                        }}
                                        animate={{
                                            filter: [
                                                "blur(30px) brightness(0.3) contrast(1.4)",
                                                "blur(8px) brightness(1.2) contrast(1.1)",
                                                "blur(0px) brightness(1) contrast(1)"
                                            ],
                                            scale: 1,
                                            saturate: 1
                                        }}
                                        transition={{
                                            duration: 2.6,
                                            ease: [0.16, 1, 0.3, 1],
                                            times: [0, 0.4, 1] // Controls the pacing of the blur-to-sharp animation
                                        }}
                                    />

                                    {/* 2. GLITCH CHROMATIC ABERRATION OVERLAY */}
                                    <motion.div
                                        initial={{ opacity: 0.8 }}
                                        animate={{ opacity: 0 }}
                                        transition={{ duration: 1.4, ease: "easeOut" }}
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-magenta-500/10 mix-blend-screen pointer-events-none"
                                    />

                                    {/* 3. RADIAL LIGHT FLARE EFFECT */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0.9 }}
                                        animate={{ scale: 2.5, opacity: 0 }}
                                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0 m-auto w-[50%] h-[50%] rounded-full bg-radial from-white/60 via-white/10 to-transparent blur-3xl pointer-events-none mix-blend-overlay"
                                    />

                                    {/* 4. HIGH-TECH HORIZONTAL LASER BEAM */}
                                    <motion.div
                                        initial={{ top: "-10%", opacity: 0 }}
                                        animate={{
                                            top: ["0%", "100%"],
                                            opacity: [0, 1, 1, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            ease: [0.33, 1, 0.68, 1],
                                            times: [0, 0.2, 0.8, 1]
                                        }}
                                        className="absolute left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_30px_5px_rgba(255,255,255,0.8)] pointer-events-none z-10"
                                    />

                                    {/* 5. DIGITAL HUD MATRIX GRID OVERLAY */}
                                    <motion.div
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: 0 }}
                                        transition={{ duration: 2.2, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] backdrop-blur-[2px] pointer-events-none"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* SHINE EFFECT */}
                            <motion.div
                                animate={{
                                    x: ["-150%", "250%"],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                            />

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />

                        </motion.div>

                    </motion.div>

                </div>

            </section>

            {/* FEATURES */}
            <section className="py-23 px-6   ">

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
                        { icon: <Sparkles />, title: "AI Suggestions", desc: "Smart improvements instantly." },
                        { icon: <FileText />, title: "ATS Friendly", desc: "Optimized resumes." },
                        { icon: <Download />, title: "PDF Export", desc: "Download instantly." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="p-6 border rounded-2xl shadow-sm hover:shadow-xl bg-white"
                        >
                            <div className="text-purple-600 mb-2">{item.icon}</div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}

                </div>
            </section>

            {/* CTA IMAGE SLIDER */}
            <section className=" relative py-12 text-center overflow-hidden rounded-0xl">

                {/* BACKGROUND SLIDER */}
                <div className="absolute inset-0">

                    <motion.img
                        key={index}
                        src={images[index]}
                        alt="cta background"

                        className="w-full h-full object-cover absolute inset-0"

                        // smooth entry
                        initial={{
                            opacity: 0,
                            scale: 1.15,
                            filter: "blur(8px)"
                        }}

                        // smooth active motion
                        animate={{
                            opacity: 1,
                            scale: [1.08, 1, 1.08], // zoom in/out
                            y: [0, -10, 0],         // floating
                            filter: "blur(0px)"
                        }}

                        // smooth exit
                        exit={{
                            opacity: 0,
                            scale: 0.95
                        }}

                        transition={{
                            duration: 4,
                            ease: [0.25, 1, 0.5, 1]
                        }}
                    />

                </div>

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/55"></div>

                {/* COLOR GLOW */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-pink-500/20 to-blue-500/30"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-3xl mx-auto px-6">

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                    >
                        Ready to build your dream resume?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-200 text-lg mb-8"
                    >
                        Create modern ATS-friendly resumes with stunning templates and AI-powered suggestions.
                    </motion.p>

                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 0px 30px rgba(255,255,255,0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl shadow-2xl hover:bg-purple-100 transition duration-300"
                    >
                        Get Started Free
                    </motion.button>

                </div>

            </section>


            <Footer />


        </div>
        </div>
    );
}

export default Home;