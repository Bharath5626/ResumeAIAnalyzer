import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

useEffect(() => {
  const loadUser = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    let name = "User";

    const storedName = localStorage.getItem("user_name");
    const storedEmail = localStorage.getItem("user_email");

    if (storedName) {
      name = storedName;
    } else if (storedEmail) {
      name = storedEmail.split("@")[0];
    }

    setUserName(name);
  };

  loadUser();
}, [navigate]);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Main Section */}
      <div className="flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-poppins font-bold text-gray-900">
            Welcome back, <span className="text-blue-600">{userName}</span> 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your resumes, analyze ATS scores, or start building a new one.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {/* Card 1 - Build Resume */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
               onClick={() => navigate("/builder/templates")}>
            <div className="flex flex-col items-start space-y-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-8 w-8 text-blue-600" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6 4a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Build a Resume</h3>
              <p className="text-gray-500 text-sm">
                Create a new resume from templates tailored to your style.
              </p>
            </div>
          </div>

          {/* Card 2 - Check ATS */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
               onClick={() => navigate("/ats")}>
            <div className="flex flex-col items-start space-y-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-8 w-8 text-green-600" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2l4 -4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">ATS Analyzer</h3>
              <p className="text-gray-500 text-sm">
                Upload your resume to check its ATS compatibility and score.
              </p>
            </div>
          </div>

          {/* Card 3 - Saved Resumes */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
               onClick={() => navigate("/saved-resumes")}>
            <div className="flex flex-col items-start space-y-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-8 w-8 text-purple-600" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Saved Resumes</h3>
              <p className="text-gray-500 text-sm">
                View and download previously created resumes.
              </p>
            </div>
          </div>
        </div>

        {/* Stats / Placeholder */}
        <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
          <p className="text-gray-500 text-sm">
            Your recent resume and ATS activity will appear here soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
