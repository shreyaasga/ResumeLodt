import React from "react";
import { ResumeData } from "../../contexts/ResumeContext";

interface ITTemplateProps {
  resumeData: ResumeData;
}

const ITTemplate: React.FC<ITTemplateProps> = ({ resumeData }) => {
  const { personalInfo, education, experience, skills } = resumeData;

  return (
    <div className="resume-paper bg-white text-black p-8 shadow-lg max-w-[8.5in] w-full mx-auto">
      {/* Header Section */}
      <header className="border-b-2 border-primary pb-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">{personalInfo.fullName}</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-1">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap gap-3 mt-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{personalInfo.address}</span>
            </div>
          )}
        </div>
      </header>

      {/* Two-column layout for main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Skills and Education */}
        <div className="md:w-1/3 space-y-6">
          {/* Technical Skills Section */}
          <section>
            <h2 className="text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-3">
              Technical Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            level <= skill.level ? "bg-primary" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-xs text-gray-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                  {edu.description && (
                    <p className="text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section>
            <h2 className="text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h2>
            <div className="space-y-4">
              {resumeData.certifications && resumeData.certifications.map((cert) => (
                <div key={cert.id} className="space-y-1">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm">{cert.issuer}</p>
                  <p className="text-xs text-gray-600">
                    {cert.issueDate}
                    {cert.credentialId && ` • ID: ${cert.credentialId}`}
                  </p>
                  {cert.description && (
                    <p className="text-sm mt-1">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Languages Section */}
          <section>
            <h2 className="text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-3">
              Languages
            </h2>
            <div className="space-y-2">
              {resumeData.languages && resumeData.languages.map((lang, index) => (
                <div key={index} className="text-sm">
                  <div className="font-semibold">{lang.language}</div>
                  <div className="text-xs text-gray-600">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column - Summary and Experience */}
        <div className="md:w-2/3 space-y-6">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-3">
                Professional Summary
              </h2>
              <p className="text-sm">{personalInfo.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          <section>
            <h2 className="text-lg font-bold text-primary border-b border-gray-300 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span className="text-xs text-gray-600">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  {exp.description && (
                    <p className="text-sm whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ITTemplate;