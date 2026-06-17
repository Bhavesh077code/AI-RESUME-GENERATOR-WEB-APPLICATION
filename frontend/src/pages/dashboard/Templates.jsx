import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import BASE_URL from "../../api";
import DashbordNavbar from "../../components/navbar/DashbordNavbar";

export default function Templates() {

  const { category } = useParams();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // FETCH TEMPLATES
  useEffect(() => {
    fetchTemplates();
  }, [category]);

  // SEARCH FILTER
  useEffect(() => {

    const filtered = templates.filter((template) =>
      template.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredTemplates(filtered);

  }, [search, templates]);

  const fetchTemplates = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/create/templates?category=${category}`
      );

      setTemplates(res.data.templates);
      setFilteredTemplates(res.data.templates);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // HANDLE USE TEMPLATE
  const handleUseTemplate = (template) => {

    const token = localStorage.getItem("token");

    // USER NOT LOGIN
    if (!token) {

      navigate("/login");
      return;

    }

    // USER LOGIN
    navigate("/resume-builder", {
      state: {
        templateSlug: template.slug
      }
    });

  };

  return (

    <div className="bg-[#f8fafc] min-h-screen">

      {/* NAVBAR */}
      <DashbordNavbar />

      {/* PAGE */}
      <div className="pt-28 pb-20 px-4 md:px-8">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-14">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <h1 className="
                text-4xl md:text-5xl
                font-bold
                text-slate-800
                capitalize
              ">
                {category} Templates
              </h1>

              <p className="text-slate-500 mt-3 text-lg">
                Choose a professional resume template
              </p>

            </div>

            {/* SEARCH */}
            <div className="w-full lg:w-[350px]">

              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />

            </div>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="
            flex items-center justify-center
            h-[400px]
          ">

            <div className="
              w-14 h-14
              border-4 border-blue-200
              border-t-blue-600
              rounded-full
              animate-spin
            " />

          </div>

        ) : (

          <>
            {/* TEMPLATE GRID */}
            <div className="
              max-w-7xl mx-auto
              grid gap-8
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            ">

              {filteredTemplates.length > 0 ? (

                filteredTemplates.map((template) => (

                  <div
                    key={template._id}
                    className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      border border-slate-200
                      hover:border-slate-300
                      hover:shadow-2xl
                      hover:-translate-y-1
                      transition-all duration-300
                    "
                  >

                    {/* IMAGE */}
                    <div className="relative group">

                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="
                          w-full
                          h-[400px]
                          object-cover
                        "
                      />

                      {/* OVERLAY */}
                      <div className="
                        absolute inset-0
                        bg-black/40
                        opacity-0
                        group-hover:opacity-100
                        transition
                        flex items-center justify-center
                      ">

                        <button
                          onClick={() => setSelectedTemplate(template)}
                          className="
                            bg-white
                            text-slate-800
                            px-6 py-3
                            rounded-xl
                            font-semibold
                            hover:bg-slate-100
                          "
                        >
                          Preview
                        </button>

                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      <h2 className="
                        text-xl
                        font-bold
                        text-slate-800
                      ">
                        {template.name}
                      </h2>

                      <p className="
                        text-slate-500
                        text-sm
                        mt-2
                      ">
                        Professional ATS-friendly resume template
                      </p>

                      {/* BUTTONS */}
                      <div className="flex gap-3 mt-6">

                        <button
                          onClick={() => setSelectedTemplate(template)}
                          className="
                            flex-1
                            border border-slate-200
                            hover:bg-slate-100
                            py-3
                            rounded-xl
                            font-medium
                            transition
                          "
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => handleUseTemplate(template)}
                          className="
                            flex-1
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-xl
                            font-medium
                            transition
                          "
                        >
                          Use Template
                        </button>

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div className="
                  col-span-full
                  bg-white
                  border border-slate-200
                  rounded-3xl
                  py-24
                  text-center
                ">

                  <h2 className="
                    text-2xl
                    font-bold
                    text-slate-700
                  ">
                    No templates found
                  </h2>

                </div>

              )}

            </div>

          </>

        )}

      </div>

      {/* PREVIEW MODAL */}
      {selectedTemplate && (

        <div className="
          fixed inset-0
          bg-black/70
          flex items-center justify-center
          z-50
          p-4
        ">

          <div className="
            bg-white
            rounded-3xl
            max-w-4xl
            w-full
            p-6
            relative
          ">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className="
                absolute top-4 right-4
                text-3xl
                text-slate-500
              "
            >
              ×
            </button>

            <h2 className="
              text-2xl
              font-bold
              mb-5
            ">
              {selectedTemplate.name}
            </h2>

            <img
              src={selectedTemplate.thumbnail}
              alt={selectedTemplate.name}
              className="
                w-full
                rounded-2xl
                border
              "
            />

            <button
              onClick={() => handleUseTemplate(selectedTemplate)}
              className="
                mt-6
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8 py-3
                rounded-xl
                font-medium
              "
            >
              Use This Template
            </button>

          </div>

        </div>

      )}

    </div>

  );
}