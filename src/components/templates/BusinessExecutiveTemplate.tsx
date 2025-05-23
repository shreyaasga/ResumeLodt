import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface BusinessExecutiveTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const BusinessExecutiveTemplate: React.FC<BusinessExecutiveTemplateProps> = ({
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
      {/* Header with Photo */}
      <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden mb-6">
        {/* Photo Section */}
        <div 
          className="bg-gray-200 overflow-hidden"
          style={{ width: "150px", height: "150px" }}
        >
          {/* Placeholder for photo */}
        </div>
        
        {/* Name and Title */}
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold text-gray-800">{personalInfo.fullName}</h1>
          <h2 className="text-xl text-blue-700 mt-1">{personalInfo.title}</h2>
          
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
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
          </div>
        </div>
      </div>
      
      {/* Add the rest of your template content here */}
    </div>
  );
};

export default BusinessExecutiveTemplate;