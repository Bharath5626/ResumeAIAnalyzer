// src/components/templates/ClassicTemplate.jsx
import React from "react";

function ClassicTemplate({ data, accentColor, accentBg }) {
  const { contact, summary, experience, education, certifications, skills } = data || {};

  return (
    <div className="font-serif text-gray-900 leading-relaxed text-sm">
      {/* HEADER */}
      <header className="border-b pb-3 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {contact?.name || "Your Name"}
        </h1>
        <p className="mt-1 text-[13px]">
          {contact?.title || "Job Title / Role"}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-600">
          {contact?.email && <span>{contact.email}</span>}
          {contact?.phone && <span>{contact.phone}</span>}
          {contact?.address && <span>{contact.address}</span>}
          {contact?.linkedin && <span>LinkedIn: {contact.linkedin}</span>}
          {contact?.github && <span>GitHub: {contact.github}</span>}
          {contact?.portfolio && <span>Portfolio: {contact.portfolio}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && summary.trim() && (
        <section className="mb-4">
          <h2
            className={`text-[11px] font-semibold uppercase tracking-wide border-b pb-1 mb-1 ${accentColor}`}
          >
            Professional Summary
          </h2>
          <p className="text-[12px] leading-relaxed">{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience && experience.length > 0 && experience[0].position && (
        <section className="mb-4">
          <h2
            className={`text-[11px] font-semibold uppercase tracking-wide border-b pb-1 mb-1 ${accentColor}`}
          >
            Experience
          </h2>
          <div className="space-y-2">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-[12px]">
                    {exp.position || "Position"}
                    {exp.company && ` — ${exp.company}`}
                  </p>
                  <p className="text-[11px] text-gray-600">
                    {exp.startDate}
                    {exp.startDate && exp.endDate && " – "}
                    {exp.endDate || ""}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-[12px] text-gray-800 mt-1 leading-snug">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education && education.length > 0 && education[0].degree && (
        <section className="mb-4">
          <h2
            className={`text-[11px] font-semibold uppercase tracking-wide border-b pb-1 mb-1 ${accentColor}`}
          >
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-[12px]">
                    {edu.degree || "Degree"}
                    {edu.school && ` — ${edu.school}`}
                  </p>
                  <p className="text-[11px] text-gray-600">
                    {edu.startDate}
                    {edu.startDate && edu.endDate && " – "}
                    {edu.endDate || ""}
                  </p>
                </div>
                {edu.description && (
                  <p className="text-[12px] text-gray-800 mt-1 leading-snug">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications &&
        certifications.length > 0 &&
        (certifications[0].name || certifications[0].issuer) && (
          <section className="mb-4">
            <h2
              className={`text-[11px] font-semibold uppercase tracking-wide border-b pb-1 mb-1 ${accentColor}`}
            >
              Certifications
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-[12px]">
                    {cert.name || "Certification"}
                  </p>
                  <p className="text-[11px] text-gray-700">
                    {cert.issuer && <span>{cert.issuer}</span>}
                    {cert.date && cert.issuer && " • "}
                    {cert.date && <span>Issued: {cert.date}</span>}
                  </p>
                  {cert.description && (
                    <p className="text-[12px] text-gray-800 mt-1 leading-snug">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* SKILLS */}
      {skills &&
        (skills.technical?.length ||
          skills.soft?.length ||
          skills.tools?.length) && (
        <section className="mb-2">
          <h2
            className={`text-[11px] font-semibold uppercase tracking-wide border-b pb-1 mb-1 ${accentColor}`}
          >
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[12px]">
            {skills.technical?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-0.5">Technical</h3>
                <ul className="list-disc list-inside space-y-0.5">
                  {skills.technical.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-0.5">Soft Skills</h3>
                <ul className="list-disc list-inside space-y-0.5">
                  {skills.soft.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-0.5">Tools & Tech</h3>
                <ul className="list-disc list-inside space-y-0.5">
                  {skills.tools.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* BOTTOM LINE / VISUAL ANCHOR */}
      <div className={`${accentBg} h-3 rounded mt-4`} />
    </div>
  );
}

export default ClassicTemplate;
