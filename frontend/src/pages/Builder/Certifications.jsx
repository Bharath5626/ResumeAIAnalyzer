// src/pages/Builder/Certifications.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import { useResume } from "../../hooks/useResume";

function Certifications() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

  // Load existing certifications OR initialize empty one
  const [certs, setCerts] = useState(
    resumeData.certifications?.length
      ? resumeData.certifications
      : [
          {
            name: "",
            issuer: "",
            date: "",
            description: "",
          },
        ]
  );

  // Sync with ResumeContext on every update
  useEffect(() => {
    setResumeData((prev) => ({ ...prev, certifications: certs }));
  }, [certs, setResumeData]);

  const handleChange = (index, e) => {
    const updated = [...certs];
    updated[index][e.target.name] = e.target.value;
    setCerts(updated);
  };

  const addCert = () => {
    setCerts([
      ...certs,
      { name: "", issuer: "", date: "", description: "" }
    ]);
  };

  const removeCert = (index) => {
    setCerts(certs.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    navigate("/builder/skills");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-4 gap-8">
        <Sidebar currentStep="Certifications" />

        <div className="flex-1 bg-white border border-gray-200 shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
            Certifications & Courses
          </h2>

          {certs.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm bg-gray-50">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Certification / Course Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={cert.name}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    name="issuer"
                    value={cert.issuer}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Date Issued
                  </label>
                  <input
                    type="month"
                    name="date"
                    value={cert.date}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Description / Highlights
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={cert.description}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>

              {certs.length > 1 && (
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => removeCert(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addCert}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition font-medium mb-8"
          >
            + Add Another Certification
          </button>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => navigate("/builder/education")}
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

export default Certifications;
