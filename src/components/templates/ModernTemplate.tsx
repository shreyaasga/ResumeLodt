import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface ModernTemplateProps {
  resumeData: ResumeData;
  printMode?: boolean;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData, printMode }) => {
  const { personalInfo, education, experience, skills } = resumeData;

  const primaryColor = resumeData.colors?.primary || "#1a365d";
  const secondaryColor = resumeData.colors?.secondary || "#2a4365";

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDateRange = (start: string, end: string) => {
    const startFormatted = formatDate(start);
    const endFormatted = end ? formatDate(end) : 'Present';
    if (!startFormatted && !endFormatted) return '';
    if (!startFormatted) return endFormatted;
    if (!endFormatted) return startFormatted;
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className={`flex ${printMode ? 'flex-row' : 'flex-col md:flex-row'} font-sans`}
      style={printMode ? {
        width: '9in',
        height: '11in',
        background: 'white',
        margin: 0,
        padding: 0,
        overflow: 'visible'  // Add this line
      } : {}}>
      {/* Sidebar */}
      <div style={{
        width: printMode ? '2.8in' : '100%',
        background: primaryColor,
        color: 'white',
        paddingTop: '0.5rem',
        paddingRight: '0.5rem',
        paddingBottom: '0.5rem', 
        paddingLeft: '0.5rem',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1,
        transform: 'none'
      }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-tight">{personalInfo.fullName}</h1>
          <p className="text-base font-medium mt-1">{personalInfo.title}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-white/30 pb-1 mb-3">Personal Info</h2>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Email:</strong> <div>{personalInfo.email}</div>
            </div>
            <div>
              <strong>Phone:</strong> <div>{personalInfo.phone}</div>
            </div>
            <div>
              <strong>Location:</strong> <div>{personalInfo.address}</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold border-b border-white/30 pb-1 mb-3">Skills</h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="text-sm font-medium">{skill.name}</div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(skill.level / 5) * 100}%`,
                      backgroundColor: secondaryColor,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        width: printMode ? 'calc(8.5in - 2.8in)' : 'calc(100% - 300px)',
        padding: printMode ? '1rem' : '2rem',
        boxSizing: 'border-box',
        background: 'white',
        overflow: 'hidden'
      }}>
        {/* Professional Summary Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-800" 
             style={{ 
               maxWidth: '95%',
               overflowWrap: 'break-word',
               paddingRight: '1rem'
             }}>
            {personalInfo.summary}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor, color: primaryColor }}>
            Work Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="font-semibold text-lg" style={{ color: primaryColor }}>{exp.position}</div>
              <div className="text-base font-medium text-gray-800">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              <div className="text-sm text-gray-800 mb-1">{formatDateRange(exp.startDate, exp.endDate)}</div>
              <p className="text-sm leading-normal whitespace-pre-line text-gray-700">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor, color: primaryColor }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="font-semibold text-lg" style={{ color: primaryColor }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
              <div className="text-base font-medium text-gray-800">{edu.institution}</div>
              <div className="text-sm text-gray-800 mb-1">{formatDateRange(edu.startDate, edu.endDate)}</div>
              <p className="text-sm leading-normal whitespace-pre-line text-gray-700">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
