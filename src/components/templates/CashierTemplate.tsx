import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface CashierTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const CashierTemplate: React.FC<CashierTemplateProps> = ({
  resumeData,
  scale = 1,
}) => {
  const { personalInfo, education, experience, skills } = resumeData;

  return (
    <div
      className="bg-white text-black"
      style={{
        width: `${8.5 * scale}in`,
        height: `${11 * scale}in`,
        padding: `${0.5 * scale}in`,
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
        <h2 className="text-xl text-amber-500 mt-1">{personalInfo.title}</h2>
        <p className="text-sm mt-2 max-w-3xl">{personalInfo.summary}</p>
        
        {/* Contact Info */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <span>📧</span>
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📱</span>
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{personalInfo.address}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔗</span>
            <span>linkedin.com/in/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-xl">💎</span>
          </div>
          <h2 className="text-xl font-bold">SKILLS</h2>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div key={skill.id || index} className="mb-4">
              <div className="font-semibold">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-xl">💼</span>
          </div>
          <h2 className="text-xl font-bold">WORK EXPERIENCE</h2>
        </div>
        
        {experience.map((exp, index) => (
          <div key={exp.id || index} className="mb-6">
            <h3 className="text-lg font-bold">{exp.position}</h3>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{exp.company}</span>
              <div className="flex items-center gap-2">
                <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                <span>{exp.location}</span>
              </div>
            </div>
            <ul className="list-none mt-2 text-sm space-y-2">
              {exp.description.split('\n').map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">◇</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Certificates */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-xl">🏆</span>
          </div>
          <h2 className="text-xl font-bold">CERTIFICATES</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {resumeData.certifications && resumeData.certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="font-bold">{cert.name}</div>
              <div className="text-sm text-gray-600">
                {cert.issuer} • {cert.issueDate}
                {cert.credentialId && ` • ID: ${cert.credentialId}`}
              </div>
              {cert.description && (
                <div className="text-sm text-gray-600 mt-1">{cert.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-xl">🗣️</span>
          </div>
          <h2 className="text-xl font-bold">LANGUAGES</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {resumeData.languages && resumeData.languages.map((lang, index) => (
            <div key={index} className="mb-3">
              <div className="font-bold">{lang.language}</div>
              <div className="text-sm text-gray-600">{lang.proficiency}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CashierTemplate;