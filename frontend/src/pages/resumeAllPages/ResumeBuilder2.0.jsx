import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../api";
import Dashboard from "./Dashboard";
import PersonalInfo from "./steps/PersonalInfo";
import Experince from "./steps/Experince";
import Education from "./steps/Education";
import Skills from "./steps/Skills";
import Projects from "./steps/Projects";
import SocialLinks from "./steps/SocialLinks";
import Certifications from "./steps/Certifications";
import Summary from "./steps/Summary";
import StepNavigation from "../../components/templateCard/resume/StepNavigation";
import ProgressBar from "../../components/templateCard/resume/ProgressBar";
import DashbordNavbar from "../../components/navbar/DashbordNavbar";

function ResumeBuilder() {
    const { category, slug } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Preview ke liye states
    const [htmlPreview, setHtmlPreview] = useState("");
    const [previewLoading, setPreviewLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        image: null,
        summary: "",
        experience: [{ company: "", role: "", startDate: "", endDate: "", desc: "" }],
        education: [{ school: "", degree: "", field: "", year: "" }],
        project: [{ title: "", link: "", desc: "" }],
        links: [{ github: "", linkedin: "", portfolio: "", twitter: "", website: "" }],
        skills: [{ skill: "" }],
        certifications: [{ name: "", issuer: "", date: "" }],
        languages: [{ language: "" }],
    });

    const [imagePreview, setImagePreview] = useState("");
    const getCategoryBySlug = (templateSlug) => {
        if (!templateSlug) return "professional";

        const lowerSlug = templateSlug.toLowerCase();

        if (lowerSlug.includes("tech")) return "tech";
        if (lowerSlug.includes("simple")) return "simple";
        if (lowerSlug.includes("creative")) return "creative";

        return "professional";
    };

    useEffect(() => {
        const fetchPreview = async () => {
            if (!slug) return;

            try {
                setPreviewLoading(true);

                const content = {
                    fullName: form.fullName || "",
                    email: form.email || "",
                    phone: form.phone || "",
                    location: form.location || "",
                    summary: form.summary || "",
                    experience: form.experience || [],
                    education: form.education || [],
                    project: form.project || [],
                    certification: form.certifications || [],
                    skills: (form.skills || []).map(s => s?.skill || ""),
                    languages: (form.languages || []).map(l => l?.language || ""),
                    links: form.links?.[0] || {},
                };

                const res = await fetch(`${BASE_URL}/create/preview`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    
                    body: JSON.stringify({
                        slug,
                        data: content,
                    }), 
                });

                const result = await res.json();

                if (res.ok && result.success) {
                    setHtmlPreview(result.html);
                } else {
                    console.error("Backend Error:", result.message);
                }

            } catch (error) {
                console.error("Preview Fetch Error:", error);
            } finally {
                setPreviewLoading(false);
            }
        };

        const timer = setTimeout(fetchPreview, 500);
        return () => clearTimeout(timer);

    }, [form, slug]);

    // ================= HANDLERS (UNCHANGED) =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleExperienceChange = (index, e) => {
        const updated = [...form.experience];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, experience: updated });
    };

    const addExperience = () => {
        setForm({
            ...form,
            experience: [...form.experience, { company: "", role: "", startDate: "", endDate: "", desc: "" }],
        });
    };

    const removeExperience = (index) => {
        setForm((prev) => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index),
        }));
    };

    const handleEducationChange = (index, e) => {
        const updated = [...form.education];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, education: updated });
    };

    const addEducation = () => {
        setForm({
            ...form,
            education: [...form.education, { school: "", degree: "", field: "", year: "" }],
        });
    };

    const removeEducation = (index) => {
        setForm((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    const handleProjectChange = (index, e) => {
        const updated = [...form.project];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, project: updated });
    };

    const addProject = () => {
        setForm({ ...form, project: [...form.project, { title: "", link: "", desc: "" }] });
    };

    const removeProject = (index) => {
        setForm((prev) => ({
            ...prev,
            project: prev.project.filter((_, i) => i !== index),
        }));
    };

    const handleSkillChange = (index, e) => {
        const updated = [...form.skills];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, skills: updated });
    };

    const addSkill = () => {
        setForm({ ...form, skills: [...form.skills, { skill: "" }] });
    };

    const removeSkill = (index) => {
        setForm((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    const handleLanguageChange = (index, e) => {
        const updated = [...form.languages];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, languages: updated });
    };

    const addLanguage = () => {
        setForm({ ...form, languages: [...form.languages, { language: "" }] });
    };

    const removeLanguage = (index) => {
        setForm((prev) => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index),
        }));
    };

    const handleCertificationChange = (index, e) => {
        const updated = [...form.certifications];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, certifications: updated });
    };

    const addCertification = () => {
        setForm({
            ...form,
            certifications: [...form.certifications, { name: "", issuer: "", date: "" }],
        });
    };

    const removeCertification = (index) => {
        setForm((prev) => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index),
        }));
    };

    const handleLinksChange = (index, e) => {
        const updated = [...form.links];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, links: updated });
    };

    // ================= SUBMIT (UNCHANGED) =================
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const data = new FormData();

            data.append("title", form.title || "Resume");
            data.append("templateSlug", slug);

            const content = {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                location: form.location,
                summary: form.summary,
                experience: form.experience,
                education: form.education,
                project: form.project,
                certification: form.certifications,
                skills: form.skills.map((s) => s.skill),
                languages: form.languages.map((l) => l.language),
                links: form.links[0],
            };

            data.append("content", JSON.stringify(content));

            if (form.image) {
                data.append("image", form.image);
            }

            const res = await fetch(`${BASE_URL}/resume/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Error creating resume");
            console.log(result);
        } catch (error) {
            console.error("Resume Submit Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <DashbordNavbar />

            <div className="min-h-screen py-10 px-2 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <ProgressBar step={step} />

                    {/* Grid Layout Fix: Shifting to 2 columns on large screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                        {/* LEFT SIDE: FORM SECTIONS */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="bg-white/80 backdrop-blur-xl border border-white rounded-[40px] shadow-xl p-8 md:p-12 sticky top-6"
                        >
                            {step === 1 && (
                                <PersonalInfo
                                    form={form}
                                    handleChange={handleChange}
                                    imagePreview={imagePreview}
                                    setImagePreview={setImagePreview}
                                    setForm={setForm}
                                />
                            )}

                            {step === 2 && (
                                <Experince
                                    form={form}
                                    handleExperienceChange={handleExperienceChange}
                                    addExperience={addExperience}
                                    removeExperience={removeExperience}
                                />
                            )}

                            {step === 3 && (
                                <Education
                                    form={form}
                                    handleEducationChange={handleEducationChange}
                                    addEducation={addEducation}
                                    removeEducation={removeEducation}
                                />
                            )}

                            {step === 4 && (
                                <Skills
                                    form={form}
                                    setForm={setForm}
                                    handleSkillChange={handleSkillChange}
                                    addSkill={addSkill}
                                    removeSkill={removeSkill}
                                />
                            )}

                            {step === 5 && (
                                <Projects
                                    form={form}
                                    handleProjectChange={handleProjectChange}
                                    addProject={addProject}
                                    removeProject={removeProject}
                                />
                            )}

                            {step === 6 && (
                                <SocialLinks
                                    form={form}
                                    handleLinksChange={handleLinksChange}
                                />
                            )}

                            {step === 7 && (
                                <Certifications
                                    form={form}
                                    handleCertificationChange={handleCertificationChange}
                                    addCertification={addCertification}
                                    removeCertification={removeCertification}
                                />
                            )}

                            {step === 8 && (
                                <Summary
                                    form={form}
                                    handleChange={handleChange}
                                />
                            )}

                            <StepNavigation
                                step={step}
                                setStep={setStep}
                                handleSubmit={handleSubmit}
                                loading={loading}
                            />
                        </form>

                        {/* RIGHT SIDE: REAL-TIME PREVIEW PANELS */}
                        <div className="bg-white border border-slate-200 rounded-[40px] shadow-xl p-6 min-h-[700px] sticky top-6 flex flex-col">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-800">Live Preview </h3>
                                {previewLoading && (
                                    <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full animate-pulse">
                                        Updating...
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 overflow-auto rounded-2xl border border-slate-100 bg-slate-50 p-2">
                                {htmlPreview ? (
                                    <div
                                        className="bg-white shadow-sm preview-container"
                                        dangerouslySetInnerHTML={{ __html: htmlPreview }}
                                    />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                        <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm">Yahan aapka live resume preview dikhega.</p>
                                        <p className="text-xs text-slate-400 mt-1">Form fill karna shuru karein...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeBuilder;