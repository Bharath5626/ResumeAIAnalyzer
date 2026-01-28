// src/pages/TemplateSelection.jsx
import React, { useState } from "react";
import templates from "../data/templates";
import { useNavigate } from "react-router-dom";
import { useResume } from "../hooks/useResume";

function ReactPreview({ accent = "blue" }) {
  const accentClasses = {
    blue: "border-blue-600 text-blue-600",
    grey: "border-gray-400 text-gray-700",
    teal: "border-teal-600 text-teal-600",
    dark: "border-gray-800 text-gray-800"
  };
  const ac = accentClasses[accent] || accentClasses.blue;

  return (
    <div
      className={`p-3 border rounded-md w-full h-48 flex flex-col justify-between ${ac} bg-white`}
    >
      <div className="flex justify-between items-start">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gray-100 rounded" />
        <div className="h-3 w-1/2 bg-gray-100 rounded" />
        <div className="h-3 w-2/3 bg-gray-100 rounded" />
      </div>

      <div className="flex gap-2">
        <div className="h-8 w-16 bg-gray-100 rounded"></div>
        <div className="h-8 w-10 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}

export default function TemplateSelection() {
  const navigate = useNavigate();
  const { resumeData, setTemplate } = useResume();
  const [selected, setSelected] = useState(resumeData.template || "");

  const handleSelect = (id) => {
    setSelected(id);
    setTemplate(id);
    navigate("/builder/contact"); // 👈 navigate immediately on template click
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
       <div className="text-center">
  <h1 className="text-3xl font-bold mb-4">Choose a Resume Template</h1>
   <p className="text-gray-600 mb-8" >
          Click a template to start building your resume.
        </p>
</div>
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => handleSelect(t.id)}
              role="button"
              tabIndex={0}
              className={`group cursor-pointer p-3 bg-white border rounded-2xl shadow-sm 
                transition-transform duration-200 hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-4 focus:ring-blue-300
                ${selected === t.id ? "ring-4 ring-blue-300 scale-105" : ""}`}
            >
              <div className="mb-3 text-sm font-semibold">{t.title}</div>
              <div className="mb-2 text-xs text-gray-500">{t.subtitle}</div>

              <div className="flex justify-center items-center bg-white">
                {t.previewType === "image" && t.thumbnail ? (
                  <img
                    src={t.thumbnail}
                    alt={t.title}
                    className="w-full object-contain border rounded mx-auto 
                               transition-transform duration-200 group-hover:scale-100 hover:scale-105"
                    style={{ maxHeight: "340px" }}
                  />
                ) : (
                  <ReactPreview accent={t.accent || "blue"} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
