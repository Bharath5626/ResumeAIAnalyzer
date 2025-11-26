import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import { useResume } from "../../hooks/useResume";

function Skills() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

const [skills, setSkills] = useState({
  technical: resumeData.skills?.technical || [],
  soft: resumeData.skills?.soft || [],
  tools: resumeData.skills?.tools || [],
});


  const [inputs, setInputs] = useState({
    technical: "",
    soft: "",
    tools: "",
  });

  useEffect(() => {
    setResumeData((prev) => ({ ...prev, skills }));
  }, [skills, setResumeData]);

  const addSkill = (category) => {
    const value = inputs[category].trim();
    if (value && !skills[category].includes(value)) {
      setSkills({
        ...skills,
        [category]: [...skills[category], value],
      });
    }
    setInputs({ ...inputs, [category]: "" });
  };

  const removeSkill = (category, index) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index),
    });
  };

  const handleNext = () => {
    if (skills.technical.length === 0) {
      alert("Please enter at least one technical skill.");
      return;
    }
    navigate("/builder/summary");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 mb-12 px-4 gap-8">
        {/* Sidebar */}
        <Sidebar currentStep="Skills" />

        {/* Main Content */}
        <div className="flex-1 bg-white border border-gray-200 shadow-md rounded-2xl p-8 overflow-y-auto">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
            Skills
          </h2>

          {/* CATEGORY BLOCK */}
          {["technical", "soft", "tools"].map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                {category === "technical"
                  ? "Technical Skills"
                  : category === "soft"
                  ? "Soft Skills"
                  : "Tools & Technologies"}
              </h3>

              {/* Input + Add button */}
              <div className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={inputs[category]}
                  onChange={(e) =>
                    setInputs({ ...inputs, [category]: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && addSkill(category)}
                  placeholder="Press Enter to add"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => addSkill(category)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>

              {/* Skill Tags */}
             <div className="flex flex-wrap gap-2">
  {skills[category]?.map((skill, index) => (
    <span
      key={index}
      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
    >
      {skill}
      <button
        onClick={() => removeSkill(category, index)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        ×
      </button>
    </span>
  ))}
</div>

            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => navigate("/builder/certifications")}
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

export default Skills;
