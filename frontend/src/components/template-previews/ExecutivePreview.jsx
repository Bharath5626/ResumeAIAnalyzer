// src/components/template-previews/ExecutivePreview.jsx
import { useResume } from "../../hooks/useResume";

export default function ExecutivePreview() {
  const { resumeData } = useResume();
  const { contact, summary, experience, education, skills, certifications } =
    resumeData || {};

  return (
    <div className="font-inter text-gray-900 p-10 leading-relaxed">

      {/* ================= HEADER ================= */}
      <div className="pb-6 mb-8 border-b-4 border-gray-800">
        <h1 className="text-4xl font-bold tracking-tight">
          {contact?.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-700 mt-1">
          {contact?.title || "Professional Title"}
        </p>

        {/* Contact Row */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-700 mt-3">
          {contact?.email && <span>{contact.email}</span>}
          {contact?.phone && <span>{contact.phone}</span>}
          {contact?.address && <span>{contact.address}</span>}
          {contact?.linkedin && <span>{contact.linkedin}</span>}
          {contact?.github && <span>{contact.github}</span>}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wide">
            Summary
          </h2>
          <p className="text-sm text-gray-800">
            {summary}
          </p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {experience?.length > 0 && experience[0].position && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Professional Experience
          </h2>

          {experience.map((exp, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between text-sm font-semibold text-gray-900">
                <span>{exp.position}</span>
                <span className="text-gray-600">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700 italic mb-1">
                {exp.company}
              </div>

              {exp.description && (
                <ul className="list-disc ml-4 text-sm text-gray-800 space-y-1">
                  {exp.description.split("\n").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {education?.length > 0 && education[0].degree && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Education
          </h2>

          {education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm font-semibold text-gray-900">
                <span>{edu.degree}</span>
                <span className="text-gray-600">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700 italic">
                {edu.school}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {(skills?.technical?.length ||
        skills?.soft?.length ||
        skills?.tools?.length) && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Skills
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {skills.technical?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-1">Technical</h3>
                <ul className="list-disc ml-4 space-y-1">
                  {skills.technical.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-1">Soft Skills</h3>
                <ul className="list-disc ml-4 space-y-1">
                  {skills.soft.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-1">Tools & Tech</h3>
                <ul className="list-disc ml-4 space-y-1">
                  {skills.tools.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {certifications?.length > 0 && certifications[0].name && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Awards & Certifications
          </h2>

          {certifications.map((cert, idx) => (
            <div key={idx} className="mb-2 text-sm">
              <div className="font-semibold">{cert.name}</div>
              <div className="text-gray-700">
                {cert.issuer}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
