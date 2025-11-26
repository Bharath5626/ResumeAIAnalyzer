import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function SavedResumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("auth_token");
  if (!token) navigate("/login");
}, [navigate]);



  const handleDownload = (resume) => {
    alert(`Downloading resume: ${resume.title}`);
    // Later integrate backend PDF endpoint
  };

  const handleDelete = (index) => {
    const updated = resumes.filter((_, i) => i !== index);
    setResumes(updated);
    localStorage.setItem("saved_resumes", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Main Section */}
      <div className="flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-6">
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
          Your Saved Resumes 💾
        </h1>
        <p className="text-gray-600 mb-10">
          View, download, or manage the resumes you’ve built using ResumeAI Pro.
        </p>

        {resumes.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            <p>No saved resumes found.</p>
            <button
              onClick={() => (window.location.href = "/builder/templates")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition"
            >
              Build Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {resumes.map((resume, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {resume.title || "Untitled Resume"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Last updated: {resume.date || "Unknown"}
                  </p>
                  <ul className="text-gray-700 text-sm mb-6 list-disc list-inside">
                    <li>{resume.template || "Classic Template"}</li>
                    <li>{resume.experience?.length || 0} Experience entries</li>
                    <li>{resume.education?.length || 0} Education entries</li>
                  </ul>
                </div>

                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => alert("Preview feature coming soon!")}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(resume)}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedResumes;
