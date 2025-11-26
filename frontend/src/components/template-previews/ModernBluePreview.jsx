// src/components/template-previews/ModernBluePreview.jsx
import { useResume } from "../../hooks/useResume";

export default function ModernBluePreview() {
  const { resumeData } = useResume();
  const { contact, summary, experience, education, skills, certifications } =
    resumeData || {};

  return (
    <div className="p-10 text-gray-900 font-inter leading-relaxed">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {contact?.name || "YOUR NAME"}
        </h1>
        <p className="text-xl text-blue-700 font-medium mt-1">
          {contact?.title || "Professional Title"}
        </p>
      </div>

      {/* CONTACT ROW */}
      <div className="flex justify-center gap-6 text-sm text-gray-700 mb-6">
        {contact?.email && <span>{contact.email}</span>}
        {contact?.phone && <span>{contact.phone}</span>}
        {contact?.address && <span>{contact.address}</span>}
        {contact?.linkedin && <span>LinkedIn: {contact.linkedin}</span>}
      </div>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-semibold text-lg border-b-2 border-blue-200 mb-2">
            Summary
          </h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && experience[0].position && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-semibold text-lg border-b-2 border-blue-200 mb-3">
            Experience
          </h2>

          {experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm font-semibold">
                <span>{exp.position}</span>
                <span className="text-gray-600">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <div className="text-xs text-gray-700 mb-1">{exp.company}</div>

              {exp.description && (
                <ul className="list-disc ml-4 text-xs text-gray-800 space-y-1">
                  {exp.description.split("\n").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && education[0].degree && (
        <section className="mb-6">
          <h2 className="text-blue-700 font-semibold text-lg border-b-2 border-blue-200 mb-3">
            Education
          </h2>

          {education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>{edu.degree}</span>
                <span className="text-gray-600">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div className="text-xs text-gray-700">{edu.school}</div>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills &&
        (skills.technical?.length ||
          skills.soft?.length ||
          skills.tools?.length) && (
          <section className="mb-6">
            <h2 className="text-blue-700 font-semibold text-lg border-b-2 border-blue-200 mb-3">
              Skills
            </h2>

            <ul className="grid grid-cols-2 text-xs list-disc ml-4 gap-y-1 text-gray-800">
              {[...(skills.technical || []),
                ...(skills.soft || []),
                ...(skills.tools || [])
              ].map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}

      {/* CERTIFICATIONS */}
      {certifications?.length > 0 && certifications[0].name && (
        <section>
          <h2 className="text-blue-700 font-semibold text-lg border-b-2 border-blue-200 mb-3">
            Certifications
          </h2>

          {certifications.map((cert, idx) => (
            <div key={idx} className="mb-2 text-xs">
              <div className="font-semibold">{cert.name}</div>
              {cert.issuer && <div className="text-gray-600">{cert.issuer}</div>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
