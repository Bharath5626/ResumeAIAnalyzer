import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar";
import { useResume } from "../../hooks/useResume";

function Experience() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

  const [experienceList, setExperienceList] = useState(
    resumeData.experience?.length
      ? resumeData.experience
      : [
          {
            position: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  useEffect(() => {
    setResumeData((prev) => ({ ...prev, experience: experienceList }));
  }, [experienceList, setResumeData]);

  const handleChange = (index, e) => {
    const newList = [...experienceList];
    newList[index][e.target.name] = e.target.value;
    setExperienceList(newList);
  };

  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      { position: "", company: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const removeExperience = (index) => {
    const newList = experienceList.filter((_, i) => i !== index);
    setExperienceList(newList);
  };

  const handleNext = () => {
    navigate("/builder/education");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-4 gap-8">
        {/* Sidebar */}
        <Sidebar currentStep="Experience" />

        {/* Main Content */}
        <div className="flex-1 bg-white border border-gray-200 shadow-md rounded-2xl p-8 overflow-y-auto">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
            Experience
          </h2>

          {experienceList.map((exp, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Job Title / Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate"
                    value={exp.endDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Description / Achievements
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={exp.description}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g., Developed REST APIs, improved backend performance by 30%..."
                  ></textarea>
                </div>
              </div>

              {experienceList.length > 1 && (
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addExperience}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition font-medium mb-8"
          >
            + Add Another Experience
          </button>

          <div className="flex justify-between gap-3">
            <button
              onClick={() => navigate("/builder/contact")}
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

export default Experience;
