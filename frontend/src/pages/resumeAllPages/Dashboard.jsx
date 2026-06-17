/*
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

  const navigate = useNavigate()

  const categories = [
    "simple",
    "professional",
    "creative",
    "tech"
  ]

  return (
  <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4">

    <h1 className="text-4xl font-bold text-slate-800 mb-10 tracking-wide">
      Resume Categories
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">

      {
        categories.map((cat) => (

          <button
            key={cat}
            onClick={() => navigate(`/templates/${cat}`)}
            className="
              bg-white
              border border-slate-200
              rounded-2xl
              p-6
              text-xl
              font-semibold
              capitalize
              text-slate-700
              shadow-md
              hover:shadow-2xl
              hover:-translate-y-1
              hover:bg-gradient-to-r
              hover:from-blue-600
              hover:to-indigo-600
              hover:text-white
              transition-all
              duration-300
            "
          >
            {cat}
          </button>

        ))
      }

    </div>

  </div>
)
}

*/





import { useNavigate } from "react-router-dom";
import { FileText, Briefcase, Palette, Code } from "lucide-react";
import Sidebar from "../../components/navbar/Sidebar";
import DashbordNavbar from "../../components/navbar/DashbordNavbar"

export default function Dashboard() {
  const navigate = useNavigate();


  const token = localStorage.getItem("token");

  // Redirect to login if not authenticated
  const categories = [
    {
      name: "simple",
      desc: "Clean and minimal resume style",
      icon: <FileText size={28} />,
      color: "from-gray-100 to-gray-200",
    },
    {
      name: "professional",
      desc: "Corporate and job-ready design",
      icon: <Briefcase size={28} />,
      color: "from-blue-100 to-indigo-200",
    },
    {
      name: "creative",
      desc: "Modern and eye-catching layouts",
      icon: <Palette size={28} />,
      color: "from-pink-100 to-purple-200",
    },
    {
      name: "tech",
      desc: "Developer focused resume style",
      icon: <Code size={28} />,
      color: "from-green-100 to-emerald-200",
    },
  ];

  return (
    <div>
      <DashbordNavbar />
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-20 pb-10 px-4 py-14">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
        Choose Resume Style
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Select a category to start building your professional resume
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/templates/${cat.name}`)}
            className={`
              cursor-pointer
              rounded-2xl
              p-6
              bg-gradient-to-br ${cat.color}
              shadow-md
              hover:shadow-xl
              hover:-translate-y-2
              transition-all
              duration-300
              border border-white
            `}
          >

            {/* Icon */}
            <div className="mb-4 text-gray-700">
              {cat.icon}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold capitalize text-gray-800">
              {cat.name}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-1">
              {cat.desc}
            </p>

          </div>
        ))}

      </div>

    </div>
    </div>
  );
}


