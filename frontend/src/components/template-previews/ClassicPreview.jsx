import React from "react";
import { useResume } from "../../hooks/useResume";

export default function ClassicPreview() {
  const { resumeData } = useResume();
  const { contact, experience, education, certifications, skills, summary } =
    resumeData || {};

  return (
    <div className="p-8 text-gray-900 leading-relaxed">

      {/* Header */}
      <h1 className="text-3xl font-bold">{contact?.name || "Your Name"}</h1>
      <p className="text-sm mt-1">{contact?.title || "Job Title / Role"}</p>
      <p className="text-xs mt-2">
        {contact?.email} | {contact?.phone} | {contact?.address}
      </p>

      {/* Summary */}
      {summary && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">Summary</h2>
          <p className="text-sm mt-2">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && experience[0].position && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mt-3">
              <div className="font-semibold">{exp.position}</div>
              <div className="text-xs text-gray-700">
                {exp.company} — {exp.startDate} to {exp.endDate}
              </div>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && education[0].degree && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mt-3">
              <div className="font-semibold">{edu.degree}</div>
              <div className="text-xs text-gray-700">
                {edu.school} — {edu.startDate} to {edu.endDate}
              </div>
              <p className="text-sm mt-1">{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && certifications[0].name && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} className="mt-2">
              <div className="font-semibold">{cert.name}</div>
              <div className="text-xs text-gray-700">
                {cert.issuer} — {cert.issueDate}
                {cert.noExpiry ? "" : ` to ${cert.expiryDate}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(skills?.technical?.length ||
        skills?.soft?.length ||
        skills?.tools?.length) && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">Skills</h2>
          <ul className="list-disc ml-5 text-sm mt-2">
            {skills.technical?.map((s, i) => <li key={i}>{s}</li>)}
            {skills.soft?.map((s, i) => <li key={i}>{s}</li>)}
            {skills.tools?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
