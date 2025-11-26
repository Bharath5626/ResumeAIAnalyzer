// src/components/template-previews/SidebarPreview.jsx
import { useResume } from "../../hooks/useResume";

export default function SidebarPreview() {
  const { resumeData } = useResume();
  const { contact, summary, experience, education, skills, certifications } =
    resumeData || {};

  return (
    <div className="grid grid-cols-3 min-h-full font-inter text-gray-900">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="col-span-1 bg-[#0f253a] text-white p-8 flex flex-col gap-8">

        {/* PHOTO (optional) */}
        {contact?.photo && (
          <img
            src={contact.photo}
            alt="profile"
            className="w-40 h-40 object-cover rounded-lg mx-auto mb-4"
          />
        )}

        {/* NAME + TITLE */}
        <div>
          <h1 className="text-2xl font-bold leading-tight">
            {contact?.name || "Your Name"}
          </h1>
          <p className="text-sm mt-1 opacity-90">
            {contact?.title || "Professional Title"}
          </p>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <h3 className="text-xs font-semibold uppercase mb-2 tracking-wide opacity-80">
            Contact
          </h3>
          <ul className="text-xs space-y-1 opacity-90">
            {contact?.email && <li>{contact.email}</li>}
            {contact?.phone && <li>{contact.phone}</li>}
            {contact?.address && <li>{contact.address}</li>}
            {contact?.linkedin && <li>LinkedIn: {contact.linkedin}</li>}
            {contact?.github && <li>GitHub: {contact.github}</li>}
          </ul>
        </div>

        {/* SKILLS */}
        {(skills?.technical?.length ||
          skills?.soft?.length ||
          skills?.tools?.length) && (
          <div>
            <h3 className="text-xs font-semibold uppercase mb-2 tracking-wide opacity-80">
              Skills
            </h3>
            <ul className="text-xs space-y-1 opacity-90 list-disc ml-4">
              {[...(skills.technical || []),
                ...(skills.soft || []),
                ...(skills.tools || [])
              ].map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certifications?.length > 0 && certifications[0].name && (
          <div>
            <h3 className="text-xs font-semibold uppercase mb-2 tracking-wide opacity-80">
              Certifications
            </h3>
            <ul className="text-xs opacity-90 space-y-1">
              {certifications.map((cert, idx) => (
                <li key={idx}>{cert.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ================= RIGHT MAIN CONTENT ================= */}
      <div className="col-span-2 p-10">

        {/* SUMMARY */}
        {summary && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-[#0f253a] border-b-2 border-[#0f253a] mb-2 uppercase">
              Profile
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience?.length > 0 && experience[0].position && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-[#0f253a] border-b-2 border-[#0f253a] mb-3 uppercase">
              Professional Experience
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
          <section>
            <h2 className="text-lg font-semibold text-[#0f253a] border-b-2 border-[#0f253a] mb-3 uppercase">
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
      </div>
    </div>
  );
}
