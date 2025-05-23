import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface HRProfessionalTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const HRProfessionalTemplate: React.FC<HRProfessionalTemplateProps> = ({
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
      }}
    >
      {/* Header Section with Dark Background */}
      <div className="bg-gray-800 text-white p-6 rounded-lg mb-6 flex justify-between">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
          <h2 className="text-xl text-gray-300 mt-1">{personalInfo.title}</h2>
          <p className="text-sm mt-3 text-gray-300">
            Astute and exceptionally dedicated professional with 6+ years of experience in human resources management operations. 
            Equipped with a solid commitment to providing high-quality support to the management for consistent growth and development 
            of human resources of diverse companies. Demonstrated success in developing and executing training programs to optimize 
            employee capabilities.
          </p>
        </div>
        <div className="w-1/4 flex justify-end">
          <div className="rounded-full bg-gray-200 overflow-hidden" style={{ width: "100px", height: "100px" }}>
            {/* Placeholder for photo */}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex justify-end mb-6">
        <div className="space-y-1 text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm">{personalInfo.email}</span>
            <span className="bg-gray-800 text-white p-1 rounded">✉</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm">{personalInfo.phone}</span>
            <span className="bg-gray-800 text-white p-1 rounded">☎</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm">{personalInfo.address}</span>
            <span className="bg-gray-800 text-white p-1 rounded">📍</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm">linkedin.com/in/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '')}</span>
            <span className="bg-gray-800 text-white p-1 rounded">in</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6">
        {/* Left Column - Work Experience */}
        <div className="w-2/3">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gray-800 text-white p-1 rounded">💼</span>
            <h2 className="text-xl font-bold">WORK EXPERIENCE</h2>
          </div>
          
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="mb-6">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.position}</h3>
                <div className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                  {exp.startDate} - {exp.endDate || "Present"}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {exp.company}, {exp.location}
              </div>
              <ul className="list-none mt-2 text-sm">
                {exp.description.split('\n').map((item, i) => (
                  <li key={i} className="flex items-start gap-2 mb-2">
                    <span className="text-amber-500">•</span>
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
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-800 text-white p-1 rounded">🛠️</span>
              <h2 className="text-xl font-bold">SKILLS & COMPETENCIES</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">HRIS</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Data Analysis</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Onboarding</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Recruiting</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Employee Relations</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Conflict Resolution</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">SAP</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Zoho Recruit</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Labor Laws & Regulatory Compliance</div>
              <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Training & Performance Management</div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-800 text-white p-1 rounded">🎓</span>
              <h2 className="text-xl font-bold">CONFERENCES & COURSES</h2>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-bold">Data Handling Training (02/2013)</div>
                <div className="text-xs text-gray-600">KeenAlignment - A Leader in Cultural Alignment Consulting</div>
              </div>
              <div className="text-sm">
                <div className="font-bold">General Industry Safety & Health Training (10/2012)</div>
                <div className="text-xs text-gray-600">Occupational Safety and Health Center</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-800 text-white p-1 rounded">🏆</span>
              <h2 className="text-xl font-bold">CERTIFICATES</h2>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-bold">Certified Professional Human Resources (2014)</div>
                <div className="text-xs text-gray-600">HR Certification Institute</div>
              </div>
              <div className="text-sm">
                <div className="font-bold">Behavioral Interviewing Certification (03/2013)</div>
                <div className="text-xs text-gray-600">KeenAlignment - A Leader in Cultural Alignment Consulting</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-800 text-white p-1 rounded">📚</span>
              <h2 className="text-xl font-bold">EDUCATION</h2>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-bold">MBA in Human Resources Management</div>
                <div>University of Indianapolis</div>
                <div className="text-xs text-gray-600">2011 - 2013</div>
              </div>
              <div className="text-sm">
                <div className="font-bold">Bachelor of Arts in Applied Psychology</div>
                <div>Purdue University Indianapolis</div>
                <div className="text-xs text-gray-600">2008 - 2011</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-800 text-white p-1 rounded">🌐</span>
              <h2 className="text-xl font-bold">LANGUAGES</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="font-semibold">English</div>
                <div className="text-xs text-gray-600">Native or Bilingual</div>
              </div>
              <div>
                <div className="font-semibold">Spanish</div>
                <div className="text-xs text-gray-600">Native or Bilingual</div>
              </div>
              <div>
                <div className="font-semibold">Italian</div>
                <div className="text-xs text-gray-600">Full Professional</div>
              </div>
              <div>
                <div className="font-semibold">German</div>
                <div className="text-xs text-gray-600">Limited Working</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfessionalTemplate;