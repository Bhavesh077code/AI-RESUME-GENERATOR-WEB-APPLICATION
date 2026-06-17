

import React, { useState } from "react";
//import Navbar from "../../components/navbar/Navbar";
import Dashboard from "./Dashboard";
import BASE_URL from "../../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PersonalInfo from "./steps/PersonalInfo";
import Experince from "./steps/Experince";
import Education from "./steps/Education";
import Skills from "./steps/Skills";
//import Languages from "./steps/Languages";
import Projects from "./steps/Projects";
import SocialLinks from "./steps/SocialLinks";
import Certifications from "./steps/Certifications";
import Summary from "./steps/Summary";
import StepNavigation from "../../components/templateCard/resume/StepNavigation";
import ProgressBar from "../../components/templateCard/resume/ProgressBar";
import DashbordNavbar from "../../components/navbar/DashbordNavbar";
import Navbar from "../../components/navbar/Navbar";




function ResumeBuilder() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        image: null,
        summary: "",
        experience: [{ company: "", role: "", startDate: "", endDate: "", desc: "" },],
        education: [{ school: "", degree: "", field: "", year: "" },],
        project: [{ title: "", link: "", desc: "" },],
        links: [{ github: "", linkedin: "", portfolio: "", twitter: "", website: "", },],
        skills: [{ skill: "" }],
        certifications: [{ name: "", issuer: "", date: "" },],
        languages: [{ language: "" }],
    });

    const [imagePreview, setImagePreview] = useState("");

    // ================= INPUT =================
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ================= EXPERIENCE =================
    const handleExperienceChange = (index, e) => {
        const updated = [...form.experience];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, experience: updated });
    };

    const addExperience = () => {
        setForm({
            ...form,
            experience: [
                ...form.experience,
                { company: "", role: "", startDate: "", endDate: "", desc: "" },
            ],
        });
    };

    const removeExperience = (index) => {
        setForm((prev) => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index),
        }));
    };


    // ================= EDUCATION =================
    const handleEducationChange = (index, e) => {
        const updated = [...form.education];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, education: updated });
    };

    const addEducation = () => {
        setForm({
            ...form,
            education: [...form.education, { school: "", degree: "", field: "", year: "" },
            ],
        });
    };

    const removeEducation = (index) => {
        setForm((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    // ================= PROJECT =================
    const handleProjectChange = (index, e) => {
        const updated = [...form.project];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, project: updated });
    };

    const addProject = () => {
        setForm({ ...form, project: [...form.project, { title: "", link: "", desc: "" }], });
    };

    const removeProject = (index) => {
        setForm((prev) => ({
            ...prev,
            project: prev.project.filter((_, i) => i !== index),
        }));
    };

    // ================= SKILLS =================
    const handleSkillChange = (index, e) => {
        const updated = [...form.skills];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, skills: updated });
    };

    const addSkill = () => {
        setForm({
            ...form,
            skills: [...form.skills, { skill: "" }],
        });
    };

    const removeSkill = (index) => {
        setForm((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    // ================= LANGUAGES =================
    const handleLanguageChange = (index, e) => {
        const updated = [...form.languages];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, languages: updated });
    };

    const addLanguage = () => {
        setForm({
            ...form,
            languages: [...form.languages, { language: "" }],
        });
    };

    const removeLanguage = (index) => {
        setForm((prev) => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index),
        }));
    };

    // ================= CERTIFICATIONS =================
    const handleCertificationChange = (index, e) => {
        const updated = [...form.certifications];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, certifications: updated });
    };

    const addCertification = () => {
        setForm({
            ...form,
            certifications: [
                ...form.certifications,
                { name: "", issuer: "", date: "" },
            ],
        });
    };

    const removeCertification = (index) => {
        setForm((prev) => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index),
        }));
    }

    const handleLinksChange = (index, e) => {
        const updated = [...form.links];
        updated[index][e.target.name] = e.target.value;
        setForm({ ...form, links: updated });
    };

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                body: data, // ✅ FIXED
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Error creating resume");
            }

            console.log(result);

        } catch (error) {
            console.error("Resume Submit Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>

                <DashbordNavbar />

                <div className="min-h-screen py-10 px-2 bg-gradient-to-br from-slate-50 via-white to-indigo-50">

                    <div className="max-w-7xl mx-auto px-4 py-12">

                        <ProgressBar step={step} />


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            <form
                                className="
              bg-white/80
              backdrop-blur-xl
              border border-white
              rounded-[40px]
              shadow-xl
              p-8 md:p-12
            "
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


                        </div>

                    </div>
                </div>
            </div>

        
        </div>
    );
};

export default ResumeBuilder;

