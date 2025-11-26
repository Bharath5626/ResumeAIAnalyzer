import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import { useResume } from "../../hooks/useResume";

function Summary() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

  const [summary, setSummary] = useState(resumeData.summary || "");

  useEffect(() => {
    setResumeData((prev) => ({ ...prev, summary }));
  }, [summary, setResumeData]);

  const handleNext = () => {
    if (!summary.trim()) {
      alert("Please enter a professional summary.");
      return;
    }
    navigate("/builder/finalize");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-4 gap-8">
        
        {/* Sidebar */}
        <Sidebar currentStep="Summary" />

        {/* Main Content */}
        <div className="flex-1 bg-white border border-gray-200 shadow-md rounded-2xl p-8 overflow-y-auto">
          
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-600 mb-6">
            Write a short introduction that highlights your strengths, expertise, and career goals.
          </p>

          {/* Summary Input */}
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="7"
            placeholder="Example: Passionate software developer with experience in building full-stack applications..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => navigate("/builder/skills")}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
