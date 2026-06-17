import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEditDocument, MdArrowBack, MdVisibility, MdVisibilityOff, MdContentCopy, MdCheck } from "react-icons/md";
import { BsCloudDownloadFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import BASE_URL from "../../api";
import DashbordNavbar from "../../components/navbar/DashbordNavbar";

function ResumeViewPage() {
    // urlCategory aur templateSlug ko fallback ke liye rakha hai
    const { category: urlCategory, templateSlug, slug: urlSlug, id } = useParams();
    const navigate = useNavigate();

    const [htmlPreview, setHtmlPreview] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPublic, setIsPublic] = useState(false);
    const [publicSlug, setPublicSlug] = useState(null);
    const [dbTemplateSlug, setDbTemplateSlug] = useState(""); // ✅ Server se sahi slug save karne ke liye state
    const [dbCategory, setDbCategory] = useState("");         // ✅ Server se sahi category save karne ke liye state
    const [copied, setCopied] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");

    // Dynamic category detection helper
    const getCategoryBySlug = (tSlug) => {
        if (!tSlug) return "professional";
        const lowerSlug = tSlug.toLowerCase();
        if (lowerSlug.startsWith("tech")) return "tech";
        if (lowerSlug.startsWith("simple")) return "simple";
        if (lowerSlug.startsWith("creative")) return "creative";
        return "professional";
    };

    // 🚀 STEP 1: LOAD REAL RESUME DATA FROM BACKEND DATABASE
    useEffect(() => {
        const fetchSavedResumeHTML = async () => {
            if (!id) return;
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`${BASE_URL}/resume/resume/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.error(`Backend Response Error! Status: ${res.status}`);
                    setLoading(false);
                    return;
                }

                const result = await res.json();

                if (result.success && result.data) {
                    const resumeData = result.data;

                    // Database ke andar real template slug jo saved hai use priority di
                    const finalSlug = resumeData.templateSlug || urlSlug || templateSlug || "simple";
                    const detectedCategory = urlCategory || getCategoryBySlug(finalSlug);

                    // PDF URL save karo
                    setPdfUrl(resumeData.pdfUrl || "");

                    setIsPublic(resumeData.isPublic || false);
                    setPublicSlug(resumeData.publicSlug || null);
                    setDbTemplateSlug(finalSlug); // ✅ State update for global usage
                    setDbCategory(detectedCategory); // ✅ State update for global usage

                    // 🚀 STEP 2: GENERATE REAL HTML PREVIEW FROM DATABASE CONTENT
                    const previewRes = await fetch(`${BASE_URL}/create/preview`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            category: detectedCategory,
                            slug: finalSlug,
                            data: {
                                ...resumeData.content,
                                image: resumeData.image || ""
                            }
                        }),
                    });

                    const previewResult = await previewRes.json();
                    if (previewRes.ok && previewResult.success) {
                        const rawHtml = previewResult.html;

                        {/* 🛠️ INJECTING CSS: Mouse Scroll Allow Rakha Hai Par Scrollbar Lines Ko Hide Kar Diya Hai */ }
                        const cleanHtml = rawHtml.includes("</head>")
                            ? rawHtml.replace("</head>", `<style>
                                ::-webkit-scrollbar { display: none !important; } 
                                html, body { 
                                    margin: 0 !important; 
                                    padding: 0 !important; 
                                    overflow-y: auto !important;
                                    overflow-x: hidden !important;
                                    scrollbar-width: none;
                                    -ms-overflow-style: none;
                                    background: white !important;
                                }
                             </style></head>`)
                            : `<style>
                                ::-webkit-scrollbar { display: none !important; } 
                                html, body { overflow-y: auto !important; overflow-x: hidden !important; scrollbar-width: none; }
                             </style>${rawHtml}`;

                        setHtmlPreview(cleanHtml);
                    }
                }

            } catch (error) {
                console.error("Error loading resume page structure:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedResumeHTML();
    }, [id, urlSlug, templateSlug, urlCategory]);


    // 🚀 STEP 3: TOGGLE PRIVACY (PUBLISH / PRIVATE CONTROLLER)
    const handlePrivacyToggle = async () => {
        try {
            const token = localStorage.getItem("token");

            const targetEndpoint = isPublic
                ? `${BASE_URL}/resume/private/${id}`
                : `${BASE_URL}/resume/public/${id}`;

            const res = await fetch(targetEndpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setIsPublic(result.data.isPublic);
                setPublicSlug(result.data.publicSlug);
            } else {
                alert(result.message || "Privacy state update failed.");
            }
        } catch (err) {
            console.error("Status toggle operations failed:", err);
        }
    };

    // 🚀 STEP 4: LINK COPY ENGINE (FIXED: Route mapping with live client domain standard)
    const copyShareLink = () => {
        if (!publicSlug) return;
        // Agar aapke frontend router mein router path "/share/:slug" hai to "/share/" rakhein, agar "/share/r/:slug" hai to niche badal sakte hain
        const shareUrl = `${window.location.origin}/${publicSlug}`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 🚀 STEP 5: REAL BINARY PDF DOWNLOAD PIPELINE
    const handleDownload = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${BASE_URL}/resume/download/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("PDF generation failed on backend");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${publicSlug || "resume"}.pdf`;
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download Error:", error);
            alert("PDF download karne me kuch dikkat aayi!");
        }
    };

    // 🚀 STEP 6: MODIFY REDIRECT LOGIC (FIXED: Mapped directly with authenticated states)
    const handleEditRedirect = () => {
        // const activeCategory = dbCategory || urlCategory || "professional";
        // const activeSlug = dbTemplateSlug || urlSlug || "simple";

        if (!id) {
            alert("Resume ID nahi mili!");
            return;
        }

        // Sahi template context route target logic
        navigate(`/resume-builder/${urlCategory}/${urlSlug}/${id}`);
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-slate-500 text-sm font-medium tracking-wide">Syncing Workspace Structure...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col bg-[#f1f3f5] overflow-hidden">

            {/* Top Bar Full Width Navbar */}
            <div className="w-full  flex-shrink-0 z-30 shadow-sm">

            </div>

            {/* Centered Canvas Container Area */}
            <div className="flex-1 w-full overflow-hidden p-8 lg:p-8 pt-8 pb-8 mb-8 flex justify-center items-center">

                {/* Main Dynamic Flexible Layout */}
                 <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 max-w-4xl w-full h-[calc(100vh-50px)]">

                    {/* 📄 LEFT CANVAS: Full size with Mouse Scroll active, seamless background */}
                    <div className="flex-1 overflow-y-auto h-full w-full border-none bg-transparent"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none"
                        }}
                    >
                        <style>{`
                            .flex-1::-webkit-scrollbar { display: none; }
                        `}</style>

                        {htmlPreview ? (
                            <div className="w-full flex justify-center" >
                            <iframe
                                srcDoc={htmlPreview}
                                //className="w-full h-full border-none block m-0 p-0 rounded-xl shadow-lg"
                                // className="w-full h-[calc(100vh-100px)] border-none"
                                className="w-[800px] h-[calc(100vh-100px)] border-none rounded-xl shadow-lg"
                                style={{
                                    minHeight: "297mm",
                                    minWidth: "275mm",
                                    background: "white"
                                }}
                                sandbox="allow-scripts"
                                title="Final Resume Preview"
                            />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                                Preview load nahi ho paya, kripya data check karein.
                            </div>
                        )}
                    </div>
                    </div>

                    {/* RIGHT CONTAINER: Control Settings Panel */}
                    <div className="w-full lg:w-[280px] bg-white border border-slate-200/60 rounded-2xl p-4  flex flex-col justify-between flex-shrink-0 shadow-lg shadow-slate-300/20 self-start mt-6 h-auto">

                        <div className="w-full flex flex-col gap-4">

                            <div className="flex items-center gap-2 text-slate-400 font-bold tracking-wider text-[10px] uppercase pb-1 border-b border-slate-100">
                                <IoSettingsOutline className="text-sm" /> Document Controls
                            </div>

                            {/* Status Info Block */}
                            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/40">
                                <span className="text-[11px] font-semibold text-slate-600">Privacy Mode:</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isPublic ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                                    {isPublic ? "Public" : "Private"}
                                </span>
                            </div>

                            {/* 1. PUBLIC / PRIVATE TOGGLE BUTTON */}
                            <button
                                onClick={handlePrivacyToggle}
                                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border ${isPublic
                                    ? "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                                    : "bg-black hover:bg-slate-800 text-white border-transparent"
                                    }`}
                            >
                                {isPublic ? (
                                    <>
                                        <MdVisibilityOff className="text-base" /> Make Private
                                    </>
                                ) : (
                                    <>
                                        <MdVisibility className="text-base" /> Make Public
                                    </>
                                )}
                            </button>

                            {/* 🔗 LIVE DYNAMIC SHARING SUB-CARD */}
                            {isPublic && publicSlug && (
                                <div className="w-full p-2 bg-emerald-50/40 border border-emerald-100 rounded-xl flex items-center justify-between gap-2 mt-1 animate-fadeIn">
                                    <span className="text-[10px] font-medium text-emerald-800 truncate px-1">
                                        {publicSlug}
                                    </span>
                                    <button
                                        onClick={copyShareLink}
                                        className="p-1.5 bg-white text-slate-700 border border-slate-200/60 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0"
                                        title="Copy Sharing Link"
                                    >
                                        {copied ? <MdCheck className="text-emerald-600" /> : <MdContentCopy />}
                                    </button>
                                </div>
                            )}

                            {/* 2. DOWNLOAD BUTTON */}
                            <button
                                onClick={handleDownload}
                                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-black hover:bg-slate-800 text-white rounded-xl font-medium text-xs transition-all shadow-sm"
                            >
                                <BsCloudDownloadFill className="text-base" /> Download PDF
                            </button>

                            {/* 3. EDIT ACTION */}
                            <button
                                onClick={handleEditRedirect}
                                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium text-xs transition-all"
                            >
                                <MdEditDocument className="text-base text-slate-500" /> Modify Resume
                            </button>
                        </div>

                        {/* 4. DASHBOARD LINK AT FOOTER */}
                        <div className="pt-3 border-t border-slate-100 mt-4">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold text-[11px] rounded-xl transition-all border border-slate-200/40"
                            >
                                <MdArrowBack className="text-xs" /> Dashboard
                            </button>
                        </div>


                        <div className="flex-1 mt-6 h-full border-none bg-transparent overflow-y-auto">
                            {pdfUrl && (
                                <div className="w-full p-3 bg-slate-50 border rounded-xl">
                                    <p className="text-xs font-medium mb-2">PDF URL</p>

                                    <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-xs break-all underline"
                                    >
                                        {pdfUrl}
                                    </a>

                                    <button
                                        onClick={() => navigator.clipboard.writeText(pdfUrl)}
                                        className="mt-2 w-full py-2 bg-black hover:bg-slate-800 text-center font-semibold transition-colors text-white rounded-lg text-xs"
                                    >
                                        Copy PDF Link
                                    </button>
                                </div>
                            )}
                        </div>



                        {/* 🔗 LIVE DYNAMIC SHARING SUB-CARD */}
                        {  pdfUrl && (
                            <div className="w-full p-2 bg-emerald-50/40 border border-emerald-100 rounded-xl flex items-center justify-between gap-2 mt-1 animate-fadeIn">
                                <span className="text-[10px] font-medium text-emerald-800 truncate px-1">
                                    {pdfUrl}
                                </span>
                                <button
                                    onClick={pdfUrl && copyShareLink}
                                    className="p-1.5 bg-white text-slate-700 border border-slate-200/60 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0"
                                    title="Copy Sharing Link"
                                >
                                    {copied ? <MdCheck className="text-emerald-600" /> : <MdContentCopy />}
                                </button>
                            </div>
                        )}



                    </div>
                </div>
            </div>
       
    );
}

export default ResumeViewPage;