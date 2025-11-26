import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import { useResume } from "../../hooks/useResume";

function Contact() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

  const [contact, setContact] = useState(
    resumeData.contact || {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      portfolio: "",
      title: "",
    }
  );

  useEffect(() => {
    setResumeData((prev) => ({ ...prev, contact }));
  }, [contact, setResumeData]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!contact.name || !contact.email) {
      alert("Name and Email are required.");
      return;
    }
    navigate("/builder/experience");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-4 gap-8">
        {/* Sidebar */}
        <Sidebar currentStep="Contact" />

        {/* Main Content */}
        <div className="flex-1 bg-white border border-gray-200 shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Professional Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Professional Title
              </label>
              <input
                type="text"
                name="title"
                value={contact.title}
                onChange={handleChange}
                placeholder="e.g., Software Developer"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={contact.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                value={contact.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                GitHub
              </label>
              <input
                type="text"
                name="github"
                value={contact.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Portfolio */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Portfolio / Website
              </label>
              <input
                type="text"
                name="portfolio"
                value={contact.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 mt-8">
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

export default Contact;
