import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import ResumePreview from "../../components/ResumePreview";
import { useResume } from "../../hooks/useResume";
import html2pdf from "html2pdf.js";

function Finalize() {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const [viewMode, setViewMode] = useState("page"); // "page" | "full"

const handleDownload = () => {
  const element = document.getElementById("resume-preview");

  if (!element) {
    alert("Resume preview not ready yet.");
    return;
  }

  const options = {
    margin: 0,
    filename: `${resumeData?.contact?.name || "resume"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "px", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-4 gap-8">
        {/* Sidebar */}
        <Sidebar currentStep="Finalize" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white border border-gray-200 shadow-md rounded-2xl p-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-poppins font-bold text-gray-900">
                Finalize Your Resume
              </h2>
              <p className="text-gray-600 text-sm">
                Review your resume preview, adjust sections, and download as PDF.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("page")}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  viewMode === "page"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                Page View
              </button>
              <button
                onClick={() => setViewMode("full")}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  viewMode === "full"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                Full Width
              </button>
            </div>
          </div>

          {/* Preview Area */}
          {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-100 rounded-xl">
        <div id="resume-preview-wrapper" className="flex justify-center py-6">
          <div id="resume-preview">
            <ResumePreview viewMode={viewMode} />
          </div>
        </div>
      </div>


          {/* Action Bar */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => navigate("/builder/summary")}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Back
            </button>
            <div className="flex gap-3">
                          <button
              onClick={handleDownload}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
            >
              Download PDF
            </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finalize;
