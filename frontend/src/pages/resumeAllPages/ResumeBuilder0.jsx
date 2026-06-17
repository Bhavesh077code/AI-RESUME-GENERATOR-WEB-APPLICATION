import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Dashboard from "./Dashboard";
import DashbordNavbar from "../../components/navbar/DashbordNavbar"
import BASE_URL from "../../api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function ResumeBuilder() {
  const { slug } = useParams();
  const navigate = useNavigate();


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

  // ================= PROJECT =================
  const handleProjectChange = (index, e) => {
    const updated = [...form.project];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, project: updated });
  };

  const addProject = () => {
    setForm({ ...form, project: [...form.project, { title: "", link: "", desc: "" }], });
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

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };


  return (
    <div>
      <DashbordNavbar />
      <div className="min-h-screen py-10 px-2 bg-gradient-to-br from-slate-50 via-white to-indigo-50">


        <div className="max-w-6xl mx-auto px-4 py-12">


          {/* HEADING */}
          <div className="mb-12">

            <h1 className="text-5xl font-bold text-slate-900">
              Build Your Resume
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Create a modern ATS-friendly resume in minutes.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
            bg-white/80
            backdrop-blur-xl
            border border-white
            rounded-[40px]
            shadow-xl
            p-8 md:p-12
            space-y-14
          "
          >

            {/* ========================= */}
            {/* RESUME TITLE */}
            {/* ========================= */}
            <input
              type="text"
              name="title"
              placeholder="Resume Title"
              value={form.title}
              onChange={handleChange}
              className="input"
            />



            {/* ========================= */}
            {/* PERSONAL DETAILS */}
            {/* ========================= */}
            <div>

              <div className="mb-8">

                <h2 className="text-2xl font-bold text-slate-900">
                  Personal Details
                </h2>

                <p className="text-slate-500 mt-1">
                  Add your personal information
                </p>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  className="input"
                />

                {/*
              <input
                type="text"
                name="image"
                placeholder="Profile Image URL"
                value={form.image}
                onChange={handleChange}
                className="input md:col-span-2"
              />  */}
                <input
                  type="file"
                  accept="image/*"
                  className="input sm:col-span-2"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setImagePreview(url);
                      setForm({ ...form, image: file });
                    }
                  }}
                />

                {imagePreview && (
                  <div className="sm:col-span-2 flex justify-center sm:justify-start">
                    <img
                      src={imagePreview}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border shadow"
                      alt="preview"
                    />
                  </div>
                )}

              </div>
            </div>

            {/* ========================= */}
            {/* EXPERIENCE */}
            {/* ========================= */}
            <div>

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Experience
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Add your work experience
                  </p>

                </div>

                <button
                  type="button"
                  onClick={addExperience}
                  className="
                  h-12 w-12 rounded-full
                  bg-black text-white
                  text-2xl
                  flex items-center justify-center
                  hover:scale-105 transition
                "
                >
                  +
                </button>

              </div>

              <div className="space-y-6">

                {form.experience.map((exp, index) => (

                  <div
                    key={index}
                    className="
                    border border-slate-200
                    rounded-3xl
                    p-6
                    bg-slate-50/70
                    space-y-5
                  "
                  >

                    <div className="grid md:grid-cols-2 gap-4">

                      <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="input"
                      />

                      <input
                        type="text"
                        name="role"
                        placeholder="Job Role"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="input"
                      />

                      <input
                        type="text"
                        name="startDate"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="input"
                      />

                      <input
                        type="text"
                        name="endDate"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="input"
                      />

                    </div>

                    <textarea
                      name="desc"
                      rows={4}
                      placeholder="Describe your work..."
                      value={exp.desc}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="input"
                    />

                  </div>

                ))}

              </div>

            </div>


            {/* ========================= */}
            {/* EDUCATION */}
            {/* ========================= */}
            <div>

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Education
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Add education details
                  </p>

                </div>

                <button
                  type="button"
                  onClick={addEducation}
                  className="
                  h-12 w-12 rounded-full
                  bg-black text-white
                  text-2xl
                  flex items-center justify-center
                "
                >
                  +
                </button>

              </div>

              <div className="space-y-6">

                {form.education.map((edu, index) => (

                  <div
                    key={index}
                    className="
                    border border-slate-200
                    rounded-3xl
                    p-6
                    bg-slate-50/70
                    grid md:grid-cols-2 gap-4
                  "
                  >

                    <input
                      type="text"
                      name="school"
                      placeholder="School / University"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="input"
                    />

                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="input"
                    />

                    <input
                      type="text"
                      name="field"
                      placeholder="Field"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="input"
                    />

                    <input
                      type="text"
                      name="year"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="input"
                    />

                  </div>

                ))}

              </div>

            </div>

            {/* ========================= */}
            {/* SKILLS */}
            {/* ========================= */}
            <div>

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Skills
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Add your skills
                  </p>

                </div>

                <button
                  type="button"
                  onClick={addSkill}
                  className="
h-12 w-12 rounded-full
bg-black text-white
text-2xl
flex items-center justify-center
"
                >
                  +
                </button>

              </div>

              <div className="space-y-6">

                {form.skills.map((skill, index) => (

                  <div
                    key={index}
                    className="
border border-slate-200
rounded-3xl
p-6
bg-slate-50/70
"
                  >

                    <input
                      type="text"
                      name="skill"
                      placeholder="Skill"
                      value={skill.skill}
                      onChange={(e) => handleSkillChange(index, e)}
                      className="input"
                    />

                  </div>

                ))}

              </div>

            </div>


            {/* ========================= */}
            {/* LANGUAGES */}
            {/* ========================= */}
            <div>

              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Languages</h2>
                  <p className="text-slate-500 text-sm mt-1">Add languages</p>
                </div>

                <button
                  type="button"
                  onClick={addLanguage}
                  className="h-12 w-12 rounded-full bg-black text-white text-2xl flex items-center justify-center"
                >
                  +
                </button>

              </div>

              <div className="space-y-6">

                {form.languages.map((l, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-3xl p-6 bg-slate-50/70 space-y-5"
                  >

                    <div className="grid md:grid-cols-2 gap-4">

                      <input
                        type="text"
                        name="language"
                        placeholder="Language"
                        value={l.language}
                        onChange={(e) => handleLanguageChange(index, e)}
                        className="input"
                      />

                      <input
                        type="text"
                        name="level"
                        placeholder="Level"
                        value={l.level}
                        onChange={(e) => handleLanguageChange(index, e)}
                        className="input"
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>


            {/* ========================= */}
            {/* PROJECTS */}
            {/* ========================= */}
            <div>

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Projects
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Showcase your projects
                  </p>

                </div>

                <button
                  type="button"
                  onClick={addProject}
                  className="
                  h-12 w-12 rounded-full
                  bg-black text-white
                  text-2xl
                  flex items-center justify-center
                "
                >
                  +
                </button>

              </div>

              <div className="space-y-6">

                {form.project.map((pro, index) => (

                  <div
                    key={index}
                    className="
                    border border-slate-200
                    rounded-3xl
                    p-6
                    bg-slate-50/70
                    space-y-4
                  "
                  >

                    <input
                      type="text"
                      name="title"
                      placeholder="Project Title"
                      value={pro.title}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="input"
                    />

                    <input
                      type="text"
                      name="link"
                      placeholder="Project Link"
                      value={pro.link}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="input"
                    />

                    <textarea
                      name="desc"
                      rows={4}
                      placeholder="Project Description"
                      value={pro.desc}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="input"
                    />

                  </div>

                ))}

              </div>

            </div>


            {/* ========================= */}
            {/* Socials links */}
            {/* ========================= */}
            <div>

              <h2 className="text-2xl font-bold mb-8">
                Social Links
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  name="github"
                  placeholder="Github"
                  value={form.links[0].github}
                  onChange={(e) => handleLinksChange(0, e)}
                  className="input"
                />

                <input
                  name="linkedin"
                  placeholder="LinkedIn"
                  value={form.links[0].linkedin}
                  onChange={(e) => handleLinksChange(0, e)}
                  className="input"
                />

                <input
                  name="portfolio"
                  placeholder="Portfolio"
                  value={form.links[0].portfolio}
                  onChange={(e) => handleLinksChange(0, e)}
                  className="input"
                />

                <input
                  name="twitter"
                  placeholder="Twitter"
                  value={form.links[0].twitter}
                  onChange={(e) => handleLinksChange(0, e)}
                  className="input"
                />

                <input
                  name="website"
                  placeholder="Website"
                  value={form.links[0].website}
                  onChange={(e) => handleLinksChange(0, e)}
                  className="input"
                />

              </div>

            </div>




            {/* ========================= */}
            {/* CERTIFICATIONS */}
            {/* ========================= */}
            <div>

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold">
                  Certifications
                </h2>

                <button
                  type="button"
                  onClick={addCertification}
                  className="h-12 w-12 rounded-full bg-black text-white"
                >
                  +
                </button>

              </div>

              {form.certifications.map((cert, index) => (

                <div
                  key={index}
                  className="
border border-slate-200
rounded-3xl
p-6
bg-slate-50/70
grid md:grid-cols-3 gap-4
"
                >

                  <input
                    name="name"
                    placeholder="Certificate Name"
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, e)}
                    className="input"
                  />

                  <input
                    name="issuer"
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => handleCertificationChange(index, e)}
                    className="input"
                  />

                  <input
                    name="date"
                    placeholder="Date"
                    value={cert.date}
                    onChange={(e) => handleCertificationChange(index, e)}
                    className="input"
                  />

                </div>

              ))}

            </div>




            {/* ========================= */}
            {/* SUMMARY */}
            {/* ========================= */}
            <div
              className="
              border border-violet-200
              bg-gradient-to-br from-violet-50 to-indigo-50
              rounded-3xl
              p-8
            "
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Professional Summary
                  </h2>

                  <p className="text-slate-600 text-sm mt-1">
                    Generate ATS-friendly summary with AI
                  </p>

                </div>

                <button
                  type="button"
                  className="
                  px-6 py-3 rounded-2xl
                  bg-gradient-to-r from-violet-600 to-indigo-600
                  text-white font-medium
                  hover:scale-105 transition
                "
                >
                  Generate with AI
                </button>

              </div>

              <textarea
                name="summary"
                rows={6}
                placeholder="Write your professional summary..."
                value={form.summary}
                onChange={handleChange}
                className="input bg-white"
              />

            </div>



            {/* SUBMIT */}
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="
      w-full py-5 rounded-3xl
      bg-black text-white
      font-semibold text-lg
      hover:bg-slate-800 transition
    "
            >
              Generate Resume
            </button>


          </form>

        </div>

        {/* GLOBAL INPUT STYLE */}
        <style>
          {`
          .input {
            width: 100%;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            padding: 16px;
            outline: none;
            background: white;
            transition: 0.3s;
          }

          .input:focus {
            border-color: black;
          }
        `}
        </style>

      </div>
    </div>
  );
}

export default ResumeBuilder;






















