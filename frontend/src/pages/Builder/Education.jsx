import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import { useResume } from "../../hooks/useResume";

function Education() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

  const [educationList, setEducationList] = useState(
    resumeData.education?.length
      ? resumeData.education
      : [
          {
            degree: "",
            school: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  useEffect(() => {
    setResumeData((prev) => ({ ...prev, education: educationList }));
  }, [educationList, setResumeData]);

  const handleChange = (index, e) => {
    const updated = [...educationList];
    updated[index][e.target.name] = e.target.value;
    setEducationList(updated);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { degree: "", school: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const removeEducation = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (!educationList[0].degree || !educationList[0].school) {
      alert("Please enter at least one education entry.");
      return;
    }
    navigate("/builder/certifications");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-4 gap-8">
        {/* Sidebar */}
        <Sidebar currentStep="Education" />

        {/* Main Content */}
        <div className="flex-1 bg-white border border-gray-200 shadow-md rounded-2xl p-8 overflow-y-auto">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
            Education
          </h2>

          {educationList.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Degree */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Degree / Qualification
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* School */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    School / University
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={edu.school}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={edu.startDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate"
                    value={edu.endDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={edu.description}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="E.g., Relevant coursework, academic achievements, CGPA…"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>

              {/* Remove Button */}
              {educationList.length > 1 && (
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add More Button */}
          <button
            onClick={addEducation}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition font-medium mb-8"
          >
            + Add Another Education
          </button>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => navigate("/builder/experience")}
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

export default Education;
