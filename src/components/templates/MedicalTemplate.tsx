import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface MedicalTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const MedicalTemplate: React.FC<MedicalTemplateProps> = ({
  resumeData,
  scale = 1,
}) => {
  const { personalInfo, education, experience, skills } = resumeData;

  return (
    <div
      className="bg-white text-black mx-auto"
      style={{
        width: `${8.5 * scale}in`,
        height: `${11 * scale}in`,
        padding: `${0.75 * scale}in`,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header Section */}
      <div className="border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-center">{personalInfo.fullName}</h1>
        <h2 className="text-xl text-center text-gray-600 mt-1">{personalInfo.title}</h2>
        <p className="text-sm text-center mt-2">{personalInfo.summary}</p>
        
        {/* Contact Info */}
        <div className="flex justify-center items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">📧</span>
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">📱</span>
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">📍</span>
            <span>{personalInfo.address}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex mt-6 gap-8">
        {/* Left Column */}
        <div style={{ width: `${(2 / 3) * 100}%` }}>
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-4">Work Experience</h2>
            {experience.map((exp, index) => (
              <div key={exp.id || index} className="mb-5">
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-sm">{exp.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                </div>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {exp.description.split('\n').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: `${(1 / 3) * 100}%` }}>
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="grid grid-cols-1 gap-2">
              {skills.map((skill, index) => (
                <div key={skill.id || index} className="text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            level <= skill.level ? "bg-black" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Certificates</h2>
            <div className="space-y-2">
              {resumeData.certifications && resumeData.certifications.length > 0 ? (
                resumeData.certifications.map((cert, index) => (
                  <div key={cert.id || index} className="text-sm">
                    <div className="font-semibold">{cert.name}</div>
                    <div>{cert.issuer}</div>
                    <div className="text-xs text-gray-600">
                      {cert.issueDate} - {cert.expiryDate || "No Expiry"}
                      {cert.credentialId && ` • ID: ${cert.credentialId}`}
                    </div>
                    {cert.description && (
                      <div className="text-xs mt-1">{cert.description}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No certificates added yet</div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="text-sm">
                  <div className="font-semibold">{edu.degree}</div>
                  <div>{edu.institution}</div>
                  <div className="text-xs text-gray-600">{edu.startDate} - {edu.endDate || "Present"}</div>
                  {edu.description && (
                    <div className="text-xs mt-1">{edu.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Languages</h2>
            <div className="space-y-1 text-sm">
              <div>English - Native or Bilingual</div>
              <div>Spanish - Native or Bilingual</div>
              <div>French - Professional Working</div>
              <div>Italian - Professional Working</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalTemplate;