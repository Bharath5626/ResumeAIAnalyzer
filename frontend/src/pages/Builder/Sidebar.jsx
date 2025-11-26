function Sidebar({ currentStep }) {
  const steps = [
    "Contact",
    "Experience",
    "Education",
    "Certifications",
    "Skills",
    "Summary",
    "Finalize",
  ];

  return (
    <aside className="hidden md:flex flex-col bg-white border border-gray-200 rounded-2xl shadow-md w-64 p-6">
      <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-4">
        Resume Builder
      </h3>
      <ul className="space-y-3">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`p-2 rounded-lg text-sm font-medium ${
              step === currentStep
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {index + 1}. {step}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
