import { useEffect, useState } from "react";
import {
  User,
  Mail,
  FileText,
  Download,
  Eye,
  CalendarDays,
} from "lucide-react";

import DashbordNavbar from "../../components/navbar/DashbordNavbar";

export default function UserProfile() {

  // Dummy User Data
  const [user, setUser] = useState({
    name: "Muhammad Hamza",
    email: "hamza@gmail.com",
    image:
      "https://i.pravatar.cc/300",
  });

  // Dummy Resume Data
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Frontend Developer Resume",
      template: "Professional Template",
      createdAt: "12 May 2026",
    },
    {
      id: 2,
      title: "UI UX Designer Resume",
      template: "Creative Template",
      createdAt: "20 May 2026",
    },
    {
      id: 3,
      title: "Software Engineer Resume",
      template: "Tech Template",
      createdAt: "25 May 2026",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <DashbordNavbar />

      <div className="pt-28 px-5 md:px-10 pb-12">

        <div className="max-w-7xl mx-auto">

          {/* PROFILE CARD */}
          <div className="
            bg-white
            rounded-[32px]
            shadow-sm
            border
            overflow-hidden
          ">

            {/* Cover */}
            <div className="
              h-52
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              relative
            ">

              <div className="
                absolute
                inset-0
                bg-black/10
              "></div>

            </div>

            {/* User Info */}
            <div className="
              px-8
              pb-8
              relative
            ">

              {/* Image */}
              <div className="
                w-36
                h-36
                rounded-full
                border-[6px]
                border-white
                overflow-hidden
                shadow-xl
                -mt-20
                bg-white
              ">

                <img
                  src={user.image}
                  alt="user"
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Name */}
              <div className="mt-5">

                <h1 className="text-4xl font-bold text-slate-800">
                  {user.name}
                </h1>

                <div className="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                  mt-3
                ">
                  <Mail size={18} />
                  {user.email}
                </div>

              </div>

              {/* Stats */}
              <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
                mt-8
              ">

                <div className="
                  bg-slate-50
                  rounded-2xl
                  p-5
                  border
                ">
                  <h3 className="text-3xl font-bold text-blue-600">
                    {resumes.length}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    Total Resumes
                  </p>
                </div>

                <div className="
                  bg-slate-50
                  rounded-2xl
                  p-5
                  border
                ">
                  <h3 className="text-3xl font-bold text-indigo-600">
                    4
                  </h3>

                  <p className="text-slate-500 mt-1">
                    Templates Used
                  </p>
                </div>

                <div className="
                  bg-slate-50
                  rounded-2xl
                  p-5
                  border
                ">
                  <h3 className="text-3xl font-bold text-purple-600">
                    12
                  </h3>

                  <p className="text-slate-500 mt-1">
                    Downloads
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* RESUMES SECTION */}
          <div className="mt-12">

            <div className="
              flex
              items-center
              justify-between
              mb-7
            ">

              <h2 className="
                text-3xl
                font-bold
                text-slate-800
              ">
                Created Resumes
              </h2>

            </div>

            {/* Resume Cards */}
            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-7
            ">

              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    shadow-sm
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    overflow-hidden
                    group
                  "
                >

                  {/* Template Preview */}
                  <div className="
                    h-56
                    bg-gradient-to-br
                    from-slate-100
                    to-slate-200
                    flex
                    items-center
                    justify-center
                    relative
                  ">

                    <FileText
                      size={70}
                      className="
                        text-slate-400
                        group-hover:scale-110
                        transition-all
                      "
                    />

                    <div className="
                      absolute
                      top-4
                      right-4
                      bg-white
                      shadow-md
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      text-slate-600
                    ">
                      {resume.template}
                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <h3 className="
                      text-xl
                      font-bold
                      text-slate-800
                    ">
                      {resume.title}
                    </h3>

                    <div className="
                      flex
                      items-center
                      gap-2
                      text-slate-500
                      mt-3
                    ">
                      <CalendarDays size={16} />
                      {resume.createdAt}
                    </div>

                    {/* Buttons */}
                    <div className="
                      flex
                      gap-3
                      mt-6
                    ">

                      <button className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-slate-100
                        hover:bg-slate-200
                        py-3
                        rounded-xl
                        transition-all
                      ">
                        <Eye size={18} />
                        Preview
                      </button>

                      <button className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3
                        rounded-xl
                        transition-all
                      ">
                        <Download size={18} />
                        Download
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}