
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import TenplateCard from "../../components/templateCard/TemplateCard"
import BASE_URL from "../../api"
import axios from "axios"
import DashbordNavbar from "../../components/navbar/DashbordNavbar"
import ResumeBuilder from "./ResumeBuilder123"


export default function TemplateList() {

  // Get Category from URL
  const { category } = useParams()
  const [templates, setTemplates] = useState([])

  // Fetch Templates on Category Change
  useEffect(() => {
    fetchTemplates()
  }, [])

  // Fetch Templates Function
  const fetchTemplates = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/create/templates?category=${category}`)
      setTemplates(res.data.templates)
    } catch (error) {
      console.log("Failed to fetch templates")
      console.log(error)
      console.log(error.response.data)
    }
  }
return (
  <div>
    <DashbordNavbar />
  <div className="min-h-screen bg-[] pt-20 pb-10 px-1 md:px-4 mb-5">

    {/* HEADER */}
    <div className="max-w-7xl mx-auto mb-10">

      <h1 className="
        text-3xl md:text-4xl
        font-bold
        text-slate-800
        capitalize
      ">
        {category} Templates
      </h1>

      <p className="text-slate-500 mt-2">
        Choose a template and start building your resume
      </p>

    </div>

    {/* GRID */}
    <div className="
      max-w-7xl mx-auto
      grid gap-6
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
    ">

      {templates.length > 0 ? (

        templates.map((template) => (

          <div
            key={template._id}
            className="
              bg-white
              rounded-2xl
              border border-slate-200
              hover:border-slate-300
              hover:shadow-lg
              transition-all duration-300
              overflow-hidden
            "
          >

            <TenplateCard template={template} />
             

          </div>

        ))

      ) : (

        <div className="
          col-span-full
          bg-white
          border border-slate-200
          rounded-2xl
          py-20
          text-center
        ">

          <h2 className="text-xl font-semibold text-slate-700">
            No templates found
          </h2>

          <p className="text-slate-500 mt-2">
            Try another category
          </p>

        </div>

      )}

    </div>

  </div>
  </div>
)

}
