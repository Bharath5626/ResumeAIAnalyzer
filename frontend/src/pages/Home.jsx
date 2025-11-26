import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();


  const handleBuildResume = () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    // Not logged in → go to login with redirect
    navigate("/login?redirect=/builder/templates");
  } else {
    // Logged in → go directly to builder
    navigate("/builder/templates");
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-poppins font-bold text-gray-900 leading-tight">
            Build a Resume that <span className="text-blue-600">Stands Out</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Create a modern, ATS-friendly resume in minutes using AI tools that
            help you write, format, and optimize your content.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/ats")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
              Check ATS
            </button>
            <button
              onClick={handleBuildResume}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
            >
              Build My Resume
            </button>

          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/assets/hero_ai.png"
            alt="Resume AI Illustration"
            className="w-[85%] max-w-lg"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
