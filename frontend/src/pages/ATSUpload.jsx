import Navbar from "../components/Navbar";
import { useState } from "react";
import ScoreModal from "../components/ScoreModal";
import api from "../api/axios"; // <-- make sure you have this Axios instance

function ATSUpload() {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null); // <-- new state for backend result
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");



  const handleFileChange = (e) => setFile(e.target.files[0]);

  // ✅ Updated handler with backend call
  const handleUpload = async (e) => {
  e.preventDefault();

  if (!file) {
    alert("Please select a resume.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_description", jobDescription);


  try {
    setLoading(true);   // ⬅️ START LOADING
    const res = await api.post("/ats/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setResult(res.data);   // ⬅️ store JSON result
    setShowModal(true);    // ⬅️ open modal
  } catch (err) {
    console.error(err);
    alert("ATS Analysis failed.");
  } finally {
    setLoading(false);  // ⬅️ STOP LOADING
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Upload Section */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md w-full max-w-lg p-8 text-center">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-2">
            Free AI Resume ATS Checker
          </h2>
          <p className="text-gray-500 mb-8">
            Upload your resume and instantly get an ATS compatibility score with
            improvement suggestions.
          </p>

          {/* File Upload Box */}
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 w-full flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-600 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0l-4 4m4-4l4 4M7 8v8m0 0h10a2 2 0 002-2V6a2 2 0 00-2-2H7z"
              />
            </svg>

            <span className="text-gray-600 font-medium">
              {file ? file.name : "Click to upload or drag and drop"}
            </span>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUpload}
            className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all w-full shadow-sm"
          >
            Check ATS
          </button>

                <textarea
        placeholder="Paste job description (optional)"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-3 mt-4 h-32 resize-none"
      ></textarea>


          <p className="text-xs text-gray-400 mt-3">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>
      </div>

      {loading && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-white mt-4 text-lg font-medium">
        Analyzing your resume...
      </p>
    </div>
  </div>
)}


      {showModal && result && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4">
    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">

      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        ATS Analysis Result
      </h2>

      {/* Score */}
      <div className="flex flex-col items-center my-4">
        <div className="w-32 h-32 rounded-full border-4 border-blue-600 flex items-center justify-center">
          <span className="text-3xl font-bold text-blue-600">
            {result.score}%
          </span>
        </div>
        <p className="text-gray-500 mt-2">ATS Compatibility Score</p>
      </div>

     {/* Missing Keywords */}
<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-2">Missing Keywords</h3>
  {result?.keywords_missing?.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {result?.keywords_missing ?? [].map((kw, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm"
        >
          {kw}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-green-600">No missing keywords 🎉</p>
  )}
</div>


      {/* Strengths */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Strengths</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {result?.strengths ?? [].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Weaknesses</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {result?.weaknesses ?? [].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Suggestions</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {result?.suggestions ?? [].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Close Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* Modal */}
      <ScoreModal
        open={showModal}
        onClose={() => setShowModal(false)}
        result={result}   // <-- now uses backend result
      />
    </div>
  );
}

export default ATSUpload;
