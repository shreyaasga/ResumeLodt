import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface ClassicTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ 
  resumeData,
  scale = 1 
}) => {
  const { personalInfo, education, experience, skills } = resumeData;

  return (
    <div 
      className="font-serif text-black bg-white"
      style={{
        width: `${8.5 * scale}in`,
        height: `${11 * scale}in`,
        padding: `${0.75 * scale}in`,
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <div className="text-sm">
          {personalInfo.title && <div className="font-semibold mb-1">{personalInfo.title}</div>}
          <div>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.email && personalInfo.phone && <span> • </span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {(personalInfo.email || personalInfo.phone) && personalInfo.address && <span> • </span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
        </div>
      </div>

      {/* Summary/Objective Section */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">Education</h2>
        {education && education.length > 0 ? (
          education.map((edu) => (
            <div key={edu.id || Math.random().toString()} className="mb-3">
              <div className="flex justify-between items-center">
                <div className="font-bold">{edu.institution}</div>
                
              </div>
              <div className="flex justify-between items-center">
                <div>{edu.degree} {edu.field && `in ${edu.field}`}</div>
                <div>{edu.startDate} - {edu.endDate || "Present"}</div>
              </div>
              {edu.description && <div className="text-sm mt-1">{edu.description}</div>}
            </div>
          ))
        ) : (
          <div className="text-sm italic">No education information provided</div>
        )}
      </div>

      {/* Experience Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">Experience</h2>
        {experience && experience.length > 0 ? (
          experience.map((exp) => (
            <div key={exp.id || Math.random().toString()} className="mb-4">
              <div className="flex justify-between items-center">
                <div className="font-bold">{exp.position}</div>
                <div>{exp.location}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>{exp.company}</div>
                <div>{exp.startDate} - {exp.endDate || "Present"}</div>
              </div>
              {exp.description && (
                <ul className="list-disc ml-5 mt-1">
                  {exp.description.split('\n').filter(item => item.trim()).map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div className="text-sm italic">No experience information provided</div>
        )}
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">Skills</h2>
        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <div key={skill.id || Math.random().toString()} className="w-1/2 mb-2">
                <span className="font-semibold">{skill.name}: </span>
                <span className="text-sm">
                  {Array(skill.level || 0).fill('●').join(' ')}
                  {Array(5 - (skill.level || 0)).fill('○').join(' ')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm italic">No skills information provided</div>
        )}
      </div>

      {/* Optional Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">Certifications</h2>
          <div className="flex flex-wrap">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="w-full mb-2">
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer && <span className="text-sm"> - {cert.issuer}</span>}
                <span className="text-sm">
                  {cert.issueDate && ` Issued: ${cert.issueDate}`}
                  {cert.expiryDate && ` Expires: ${cert.expiryDate}`}
                  {!cert.issueDate && !cert.expiryDate && cert.credentialId && ` ID: ${cert.credentialId}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;