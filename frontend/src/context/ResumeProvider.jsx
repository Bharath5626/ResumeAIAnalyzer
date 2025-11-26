// src/context/ResumeProvider.jsx
import React, { useState, useEffect } from "react";
import { ResumeContext } from "./ResumeContext";

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const raw = localStorage.getItem("resume_data");
      return raw
        ? JSON.parse(raw)
        : {
            template: "",
            contact: {
              name: "",
              email: "",
              phone: "",
              address: "",
              linkedin: "",
              github: "",
              portfolio: "",
              title: "",
            },
            experience: [],
            education: [],
            certifications: [],
            skills: [],
            summary: "",
          };
    } catch {
      return {
        template: "",
        contact: {},
        experience: [],
        education: [],
        certifications: [],
        skills: [],
        summary: "",
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("resume_data", JSON.stringify(resumeData));
  }, [resumeData]);

  const setTemplate = (templateId) => {
    setResumeData((prev) => ({ ...prev, template: templateId }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, setTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
}
