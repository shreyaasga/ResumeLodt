import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface ProjectManagerTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const ProjectManagerTemplate: React.FC<ProjectManagerTemplateProps> = ({
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
      {/* Header with Photo */}
      <div className="flex gap-6 mb-6">
        {/* Photo Circle */}
        <div 
          className="rounded-full bg-gray-200 overflow-hidden"
          style={{ width: "100px", height: "100px" }}
        >
          {/* Placeholder for photo */}
        </div>
        
        {/* Name and Title */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
          <h2 className="text-xl text-green-700 mt-1">{personalInfo.title}</h2>
          <p className="text-sm mt-2">{personalInfo.summary}</p>
          
          {/* Contact Info */}
          <div className="flex items-center gap-4 mt-2 text-sm">
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
              <span>linkedin.com/in/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '.')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6">
        {/* Left Column - Work Experience */}
        <div className="w-2/3">
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-4">WORK EXPERIENCE</h2>
          
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="mb-6 relative pl-6">
              <div className="absolute left-0 top-1 w-3 h-3 bg-green-700 rounded-full"></div>
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm">{exp.startDate} - {exp.endDate || "Present"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold flex items-center gap-1">
                  <span>{exp.company}</span>
                  <span className="text-xs">🔗</span>
                </span>
                <span>{exp.location}</span>
              </div>
              <ul className="list-none mt-2 text-sm">
                {exp.description.split('\n').map((item, i) => (
                  <li key={i} className="flex items-start gap-2 mb-2">
                    <span className="text-green-700">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Right Column - Skills and Education */}
        <div className="w-1/3">
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-4">AREAS OF EXPERTISE</h2>
            <div className="grid grid-cols-1 gap-2">
              {skills.map((skill, index) => (
                <div key={skill.id || index} className="bg-green-50 border border-green-200 p-2 rounded text-sm">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-4">TRAINING AND CERTIFICATIONS</h2>
            <div className="space-y-3">
              {resumeData.certifications && resumeData.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <div className="font-bold">{cert.name}</div>
                  <div className="text-xs text-gray-600">
                    {cert.issuer} • {cert.issueDate}
                    {cert.credentialId && ` • ID: ${cert.credentialId}`}
                  </div>
                  {cert.description && (
                    <div className="text-xs mt-1">{cert.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-4">EDUCATION</h2>
            <div className="text-sm">
              <div className="font-bold">
                {education[0]?.degree || "Master of Science in Project Management"}
              </div>
              <div>{education[0]?.institution || "New York University"}</div>
              <div className="text-xs text-gray-600">
                {education[0]?.startDate || "2010"} - {education[0]?.endDate || "2012"}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-4">LANGUAGES</h2>
            <div className="grid grid-cols-2 gap-2">
              {resumeData.languages && resumeData.languages.map((lang, index) => (
                <div key={index} className="text-sm">
                  <div>{lang.language}</div>
                  <div className="text-xs text-gray-600">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerTemplate;