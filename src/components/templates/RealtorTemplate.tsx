import React from "react";
import { ResumeData } from "@/contexts/ResumeContext";

interface RealtorTemplateProps {
  resumeData: ResumeData;
  scale?: number;
}

const RealtorTemplate: React.FC<RealtorTemplateProps> = ({
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
      {/* Header Section with Photo */}
      <div className="flex mb-6">
        <div className="w-1/3">
          <div className="rounded-full bg-gray-200 overflow-hidden mb-4" style={{ width: "120px", height: "120px" }}>
            {/* Placeholder for photo */}
          </div>
          
          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-500">✉</span>
              <span className="text-sm">{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">☎</span>
              <span className="text-sm">{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">📍</span>
              <span className="text-sm">{personalInfo.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">🌐</span>
              <span className="text-sm">{personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">in</span>
              <span className="text-sm">linkedin.com/in/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '.')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">📸</span>
              <span className="text-sm">instagram.com/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '.')}</span>
            </div>
          </div>
        </div>
        
        <div className="w-2/3">
          <div className="bg-amber-400 p-4 rounded-lg h-full">
            <h1 className="text-3xl font-bold text-white">{personalInfo.fullName}</h1>
            <h2 className="text-xl text-white mt-1">{personalInfo.title}</h2>
            <p className="text-sm mt-3 text-white">
              {personalInfo.summary || "Dedicated realtor with 5+ years of property management experience. Has closed 30+ successful transactions as the buyer's sole representative. As a recent Certified Property Manager, is up-to-date with real estate trends and constantly improves their property management skills."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Column - Skills and Certificates */}
        <div className="w-1/3">
          <h2 className="text-xl font-bold text-amber-500 border-b border-amber-200 pb-1 mb-4">SKILLS</h2>
          <div className="space-y-2 mb-6">
            {skills.map((skill, index) => (
              <div key={skill.id || index} className="text-sm">
                {skill.name}
              </div>
            ))}
            {skills.length === 0 && (
              <>
                <div className="text-sm">Market and Risk Analysis</div>
                <div className="text-sm">Property Management</div>
                <div className="text-sm">Property Manager 5000 Software</div>
                <div className="text-sm">MLS Database</div>
                <div className="text-sm">Negotiation</div>
                <div className="text-sm">Written and Verbal Communication</div>
                <div className="text-sm">Organization</div>
                <div className="text-sm">Networking</div>
              </>
            )}
          </div>
          
          <h2 className="text-xl font-bold text-amber-500 border-b border-amber-200 pb-1 mb-4">CERTIFICATES</h2>
          <div className="space-y-3 mb-6">
            <div className="text-sm">
              <div className="font-bold">Licensed Realtor in Florida</div>
              <div className="text-xs text-gray-600">Valid until 09/2029</div>
            </div>
            <div className="text-sm">
              <div className="font-bold">Certified Property Manager</div>
              <div className="text-xs text-gray-600">The Institute of Real Estate Management</div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Work Experience and Education */}
        <div className="w-2/3">
          <h2 className="text-xl font-bold text-amber-500 border-b border-amber-200 pb-1 mb-4">WORK EXPERIENCE</h2>
          
          {experience.length > 0 ? (
            experience.map((exp, index) => (
              <div key={exp.id || index} className="mb-6">
                <h3 className="text-lg font-bold">{exp.position}</h3>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-amber-500">Achievements:</h4>
                  <ul className="list-none mt-1 text-sm">
                    {exp.description.split('\n').map((item, i) => (
                      <li key={i} className="flex items-start gap-2 mb-1">
                        <span className="text-amber-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* First Job */}
              <div className="mb-6">
                <h3 className="text-lg font-bold">Realtor</h3>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">American Realty & Associates</span>
                  <span>03/2019 - Present</span>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-amber-500">Achievements:</h4>
                  <ul className="list-none mt-1 text-sm">
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Promoted apartment listings via social media, ads, Facebook groups, and more.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Closed 20+ successful transactions with $5+ million in volume as the buyer's sole representative.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Accompanied buyers to apartment viewings and helped them with evaluating the properties.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Led and taught a team of 5 to generate lists of available properties based on market demand and prepare and handle all customers' documents such as deeds and leases.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Advised clients on market conditions, prices, and mortgages.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Led the negotiation process between buyers and sellers.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Second Job */}
              <div className="mb-6">
                <h3 className="text-lg font-bold">Real Estate Agent</h3>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Penny Realty Inc.</span>
                  <span>01/2017 - 02/2019</span>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-amber-500">Achievements:</h4>
                  <ul className="list-none mt-1 text-sm">
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Increased client retention by creating and managing a newsletter with the latest market trends and expert advice.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Helped in successfully closing 15+ transactions during last year of work.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Managed appointments to show homes to prospective buyers, as well as I prepared legal documents such as loyalty contracts, purchase agreements, deeds, and leases.</span>
                    </li>
                    <li className="flex items-start gap-2 mb-1">
                      <span className="text-amber-500">•</span>
                      <span>Create real estate sale properties' lists with information on location, rooms, square footage, etc.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          
          <h2 className="text-xl font-bold text-amber-500 border-b border-amber-200 pb-1 mb-4">EDUCATION</h2>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={edu.id || index} className="mb-6">
                <h3 className="font-bold">{edu.degree}</h3>
                <div className="text-sm">{edu.institution}</div>
                <div className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))
          ) : (
            <div className="mb-6">
              <h3 className="font-bold">BA in Business Administration</h3>
              <div className="text-sm">University of Florida</div>
              <div className="text-xs text-gray-600">2012 - 2016</div>
            </div>
          )}
          
          <h2 className="text-xl font-bold text-amber-500 border-b border-amber-200 pb-1 mb-4">MEMBERSHIPS</h2>
          <div className="space-y-1 mb-6">
            <div className="text-sm">National Association of Realtors</div>
            <div className="text-sm">Institute of Real Estate Management</div>
          </div>
          
          <h2 className="text-xl font-bold text-amber-500 border-b border-amber-200 pb-1 mb-4">LANGUAGES</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">English</div>
              <div className="text-xs text-gray-600">Native or Bilingual Proficiency</div>
            </div>
            <div>
              <div className="font-semibold">Spanish</div>
              <div className="text-xs text-gray-600">Professional Working Proficiency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtorTemplate;