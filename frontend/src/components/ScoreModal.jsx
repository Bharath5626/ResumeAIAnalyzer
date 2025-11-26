import { useEffect } from "react";
import api from "../services/api";

function ScoreModal({ open, onClose, result }) {
  // ✅ FIX: The useEffect hook is now at the top level,
  // before any conditional returns.
  useEffect(() => {
    // This logic handles both open and closed states
    document.body.style.overflow = open ? "hidden" : "auto";
    
    // Cleanup function: always reset to auto when effect re-runs or unmounts
    return () => (document.body.style.overflow = "auto");
  }, [open]); // Dependency array is correct

  // Now, you can have your conditional return.
  if (!open) return null;
  
  const extracted_data = result?.analysis?.extracted_data || {};


  // This logic will only run if the modal is open, which is fine.
  // ✅ Safe conversion for score
  const rawScore = result?.analysis?.score;

  let score = parseInt(rawScore);

  if (isNaN(score)) score = 0; // fallback to 0 if invalid

//   const issues = [
//   ...(result?.analysis?.strengths?.map(s => ({
//       category: "Strength",
//       description: s
//   })) ?? []),
//   ...(result?.analysis?.weaknesses?.map(w => ({
//       category: "Weakness",
//       description: w
//   })) ?? []),
//   ...(result?.analysis?.suggestions?.map(su => ({
//       category: "Suggestion",
//       description: su
//   })) ?? [])
// ];


  const radius = 56; // matches your <circle r="56">
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-2">
          ATS Analysis Result
        </h2>
        <p className="text-gray-500 mb-6">
          Here’s how your resume performed in the ATS scan.
        </p>

        {/* Score Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#2563eb"
                strokeWidth="8"
                fill="none"
                strokeDasharray="351"
                strokeDashoffset={`${offset}`}   // ✅ safe string conversion
                strokeLinecap="round"
                transform="rotate(-90 64 64)"
              />

              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {score}%
                </span>
              </div>
            </div>
            <p className="text-gray-600 mt-2 font-medium">ATS Score</p>
          </div>

          {/* Extracted Data */}
          <div className="flex-1 space-y-2 text-left bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p>
            <span className="font-semibold text-gray-800">Name:</span>{" "}
            {extracted_data.name || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Email:</span>{" "}
            {extracted_data.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Phone:</span>{" "}
            {extracted_data.phone || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Position:</span>{" "}
            {extracted_data.position || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Skills:</span>{" "}
            {(extracted_data.skills || []).join(", ") || "N/A"}
          </p>

          </div>
        </div>

          {/* Missing Keywords */}
    <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-red-600 text-xl">❗</span>
        <h3 className="text-lg font-semibold text-red-700">Missing Keywords</h3>
      </div>

      {result?.analysis?.keywords_missing?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {result.analysis.keywords_missing.map((kw, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium shadow-sm"
            >
              {kw}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-green-600 text-sm font-medium">All required keywords are present ✔</p>
      )}
    </div>

            {/* Keyword Match Meter */}
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Keyword Match</h3>

      {(() => {
        const missing = result?.analysis?.keywords_missing?.length ?? 0;
        const total = missing + (result?.analysis?.skills_found?.length ?? 10); // fallback estimate
        const percent = Math.round(((total - missing) / total) * 100);

        return (
          <>
            <p className="text-sm text-gray-600 mb-2">{percent}% Match</p>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </>
        );
      })()}
    </div>


        {/* Issues / Suggestions */}
          {/* Strengths */}
    <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-green-600 text-xl">✔</span>
        <h3 className="text-lg font-semibold text-green-700">Strengths</h3>
      </div>

      <ul className="list-disc list-inside text-green-800 space-y-1">
        {(result?.analysis?.strengths ?? []).map((item, idx) => (
          <li key={idx} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>

    {/* Weaknesses */}
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-orange-600 text-xl">⚠</span>
        <h3 className="text-lg font-semibold text-orange-700">Weaknesses</h3>
      </div>

      <ul className="list-disc list-inside text-orange-800 space-y-1">
        {(result?.analysis?.weaknesses ?? []).map((item, idx) => (
          <li key={idx} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>

    {/* Suggestions */}
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-blue-600 text-xl">💡</span>
        <h3 className="text-lg font-semibold text-blue-700">Suggestions</h3>
      </div>

      {/* Job Description Match */}
<div className="bg-purple-50 border border-purple-200 rounded-xl p-5 shadow-sm mb-6">
  <div className="flex items-center gap-2 mb-3">
    <span className="text-purple-600 text-xl">📄</span>
    <h3 className="text-lg font-semibold text-purple-700">Job Description Match</h3>
  </div>

  <p className="text-sm text-purple-600 font-medium">
    Match Score: {result?.jd_comparison?.match_score ?? "N/A"}%
  </p>

  <h4 className="font-semibold mt-3 text-purple-700">Missing Keywords:</h4>
  <div className="flex flex-wrap gap-2 mt-2">
    {(result?.jd_comparison?.jd_missing_keywords ?? []).map((kw, i) => (
      <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
        {kw}
      </span>
    ))}
  </div>

  <h4 className="font-semibold mt-3 text-purple-700">Recommendations:</h4>
  <ul className="list-disc list-inside text-purple-800 mt-1">
    {(result?.jd_comparison?.recommendations ?? []).map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
</div>


      <ul className="list-disc list-inside text-blue-800 space-y-1">
        {(result?.analysis?.suggestions ?? []).map((item, idx) => (
          <li key={idx} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>



        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button
        onClick={async () => {
          const res = await api.post("/ats/export", result, {
            responseType: "blob",
          });
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "ATS_Report.pdf";
          a.click();
        }}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
      >
        Download Report
      </button>

        </div>
      </div>
    </div>
  );
}

export default ScoreModal;