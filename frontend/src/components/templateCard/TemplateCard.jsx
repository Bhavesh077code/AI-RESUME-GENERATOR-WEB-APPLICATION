
/*
import { useNavigate } from "react-router-dom"

export default function TemplateCard({ template }) {

  const navigate = useNavigate()

  const handleUseTemplate = () => {

    // Navigate to builder with template slug
    navigate("/resume-builder", {
      state: {
        templateSlug: template.slug
      }
    })
  }

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "10px"
      }}
    >

      <img
        src={template.thumbnail}
        alt={template.name}
        width="250"
      />

      <h2>{template.name}</h2>

      <button onClick={handleUseTemplate}>
        Use Template
      </button>

    </div>
  )
}
  */



/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TemplateCard({ template }) {

  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const handleUseTemplate = () => {
    if(!template?.slug) return
    navigate(`/resume-builder/${template.slug}`, {
    });
  };

  return (

    <>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100  hover:shadow-lg transition ">

    
        <div className="relative">

          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-[300px] object-cover"
          />

          
          <button
            onClick={() => setShowPreview(true)}
            className="
              absolute inset-0
              flex items-center justify-center
              bg-black/0 hover:bg-black/40
              text-white
              transition
            "
          >
            <span className="
              bg-black/90
              text-white
              px-4 py-2.5
              rounded-full
              text-sm
            
            ">
              Tap to Preview
            </span>
          </button>

        </div>


        <div className="p-5">

          
          <h2 className="
            text-lg
            bg-green-100
            text-green-800
            px-20 py-1
            rounded-full
            font-semibold
            text-slate-900
            tracking-tight
            truncate
          ">
            {template.name}
          </h2>

        
          <button
            onClick={handleUseTemplate}
            className="
              mt-4 w-full
              bg-orange-600
              text-white
              py-3
              rounded-xl
              font-semibold
              shadow-md
              active:scale-95
              hover:from-orange-700 hover:to-blue-800
              transition
            "
          >
            Use Template
          </button>

        </div>

      </div>

    
      {showPreview && (

        <div className="
          fixed inset-0
          bg-black/80
          flex items-center justify-center
          z-50
          p-4
        ">

          <div
            onClick={() => setShowPreview(false)}
            className="absolute inset-0"
          />

          <div className="
            relative
            max-w-4xl
            w-full
            bg-white
            rounded-2xl
            overflow-hidden
            shadow-2xl
            z-10
          ">

            <button
              onClick={() => setShowPreview(false)}
              className="
                absolute top-3 right-3
                bg-white
                text-black
                w-10 h-10
                rounded-full
                shadow-md
                font-bold
              "
            >
              ✕
            </button>

            <img
              src={template.thumbnail}
              alt={template.name}
              className="
                w-full
                max-h-[85vh]
                object-contain
                bg-white
              "
            />

          </div>

        </div>

      )}

    </>

  );
}
*/



import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TemplateCard({ template }) {

  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);

  // SAFETY CHECK + CLEAN NAVIGATION
  const handleUseTemplate = () => {

    if (!template?.slug) {
      console.error("Template slug missing");
      return;
    }

    navigate(`/resume-builder/${template.slug}`);
  };

  // SAFETY CHECK FOR IMAGE
  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/600x800?text=Template+Preview";
  };

  return (

    <>

    
      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-sm
          border border-slate-200
          hover:shadow-2xl
          transition-all
          duration-300
        "
      >

       
        <div className="relative group">

          <img
            src={template?.thumbnail}
            alt={template?.name || "Resume Template"}
            loading="lazy"
            onError={handleImageError}
            className="
              w-full
              h-[320px]
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

         
          <button
            type="button"
            aria-label={`Preview ${template?.name}`}
            onClick={() => setShowPreview(true)}
            className="
              absolute inset-0
              flex items-center justify-center
              bg-black/0
              group-hover:bg-black/50
              transition-all
              duration-300
            "
          >

            <span
              className="
                opacity-0
                group-hover:opacity-100
                translate-y-3
                group-hover:translate-y-0
                transition-all
                duration-300
                bg-white
                text-slate-900
                px-5 py-2.5
                rounded-full
                text-sm
                font-semibold
                shadow-lg
              "
            >
              Preview Template
            </span>

          </button>

        </div>

        
        <div className="p-5">

          
          <h2
            className="
              text-lg
              font-bold
              text-slate-800
              truncate
            "
          >
            {template?.name || "Untitled Template"}
          </h2>

          
          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Professional Resume Template
          </p>

         
          <button
            type="button"
            aria-label={`Use ${template?.name} template`}
            onClick={handleUseTemplate}
            className="
              mt-5
              w-full
              bg-orange-600
              hover:bg-orange-700
              active:scale-[0.98]
              text-white
              py-3
              rounded-xl
              font-semibold
              shadow-md
              transition-all
              duration-200
            "
          >
            Use Template
          </button>

        </div>

      </div>

      
      {showPreview && (

        <div
          className="
            fixed inset-0
            z-50
            flex items-center justify-center
            bg-black/80
            p-4
          "
        >

         
          <div
            className="absolute inset-0"
            onClick={() => setShowPreview(false)}
          />

          
          <div
            className="
              relative
              z-10
              w-full
              max-w-5xl
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-2xl
              animate-in
              fade-in
              zoom-in-95
            "
          >

           
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setShowPreview(false)}
              className="
                absolute
                top-4
                right-4
                w-10
                h-10
                rounded-full
                bg-white
                text-slate-800
                shadow-lg
                font-bold
                hover:bg-slate-100
                transition
              "
            >
              ✕
            </button>

           
            <img
              src={template?.thumbnail}
              alt={template?.name || "Template Preview"}
              loading="lazy"
              onError={handleImageError}
              className="
                w-full
                max-h-[90vh]
                object-contain
                bg-slate-100
              "
            />

          </div>

        </div>

      )}

    </>

  );
} 

