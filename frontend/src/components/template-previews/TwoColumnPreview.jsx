// src/components/template-previews/TwoColumnPreview.jsx
import { useResume } from "../../hooks/useResume";

export default function TwoColumnPreview() {
  const { resumeData } = useResume();
  const { contact, summary, experience, education, skills, certifications } =
    resumeData || {};

  return (
    <div className="font-inter text-gray-900 p-10 leading-relaxed">

      {/* HEADER */}
      <div className="pb-4 mb-6 border-b border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide">
          {contact?.name || "Your Name"}
        </h1>
        <p className="text-lg text-blue-700 font-medium mt-1 uppercase tracking-wide">
          {contact?.title || "Job Title / Role"}
        </p>
      </div>

      {/* TWO COLUMN GRID */}
      <div className="grid grid-cols-3 gap-8">

        {/* LEFT SIDEBAR */}
        <div className="col-span-1 space-y-8">

          {/* CONTACT */}
          <section>
            <h3 className="text-sm font-semibold uppercase mb-2 text-blue-700">
              Contact
            </h3>
            <ul className="text-xs text-gray-700 space-y-1">
              {contact?.email && <li>{contact.email}</li>}
              {contact?.phone && <li>{contact.phone}</li>}
              {contact?.address && <li>{contact.address}</li>}
              {contact?.linkedin && <li>{contact.linkedin}</li>}
              {contact?.github && <li>{contact.github}</li>}
              {contact?.portfolio && <li>{contact.portfolio}</li>}
            </ul>
          </section>

          {/* SKILLS */}
          {(skills?.technical?.length ||
            skills?.soft?.length ||
            skills?.tools?.length) && (
            <section>
              <h3 className="text-sm font-semibold uppercase mb-2 text-blue-700">
                Skills
              </h3>
              <ul className="text-xs text-gray-800 list-disc ml-4 space-y-1">
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
              <h3 className="text-sm font-semibold uppercase mb-2 text-blue-700">
                Certifications
              </h3>
              {certifications.map((cert, idx) => (
                <div key={idx} className="mb-2 text-xs text-gray-800">
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-gray-600">{cert.issuer}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="col-span-2 space-y-8">

          {/* SUMMARY */}
          {summary && (
            <section>
              <h2 className="text-sm font-semibold uppercase mb-2 text-blue-700">
                Summary
              </h2>
              <p className="text-sm text-gray-800 leading-relaxed">
                {summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience?.length > 0 && experience[0].position && (
            <section>
              <h2 className="text-sm font-semibold uppercase mb-3 text-blue-700">
                Experience
              </h2>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between text-sm font-semibold text-gray-900">
                    <span>{exp.position}</span>
                    <span className="text-gray-600 text-xs">
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
            <section>
              <h2 className="text-sm font-semibold uppercase mb-3 text-blue-700">
                Education
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between text-sm font-semibold text-gray-900">
                    <span>{edu.degree}</span>
                    <span className="text-gray-600 text-xs">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-gray-700">{edu.school}</div>
                  {edu.description && (
                    <p className="text-xs text-gray-800 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
